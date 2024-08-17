import { compare, genSaltSync, hash } from "bcryptjs";
import environment from "../environments/environment.config";
import { BadRequest, Unauthorized } from "./customError";

/**
 * This class encrypt the password
 */
export default class Encryption {
    private _hashSalt: string;
    /**
     * Constructs an instance of the Encryption class.
     */
    constructor() {
        this._hashSalt = environment.HASH_SALT;
        this._hashSalt = genSaltSync(+this._hashSalt)
    }
    /**
     * This method encrypt given password
     * @param { string } password 
     * @returns { string } encrypted password
     */
    async generateHash(password: string): Promise<string> {
        try {
            const hashPassword: string = await hash(password, this._hashSalt);
            return hashPassword;
        } catch (error: any) {
            throw new BadRequest(error.message);
        }
    }
    /**
     * This method validate the input password with encrypted password
     * @param { string } password that received from user
     * @param { string | undefined } hashPassword that saved in server
     * @returns { boolean } true if validated else false
     */
    async validate(password?: string, hashPassword?: string): Promise<boolean> {
        let isMatch: boolean = false;
        try {
            if (password && hashPassword)
                isMatch = await compare(password, hashPassword);
            else
                throw new BadRequest(`Enter value properly`)
            return isMatch;
        } catch (error: any) {
            throw new Unauthorized(error.message);
        }
    }
    /**
     * This method check given password format to server format
     * @param { string } password that received from server
     * @returns { boolean } true if format is match else false
     */
    async checkPasswordPattern(password: string): Promise<boolean> {
        let isCorrect: boolean = false;
        try {
            isCorrect = environment.PASSWORD_PATTERN.test(password);
            return isCorrect;
        } catch (error: any) {
            throw new BadRequest(error.message);
        }
    }
}