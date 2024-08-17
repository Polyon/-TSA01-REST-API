import { sign, verify } from "jsonwebtoken";
import environment from "../environments/environment.config";
import { BadRequest, Forbidden } from "./customError";
 /**
  * Create and verify JSON Web Tokens (JWTs)
  */
 export default class JWT_Token {
   private _tokenKey: string;
   private _tokenLife: number;
   /**
    * Initialize the JWT_Token class with the secret key and token expiration time
    */
   constructor() {
     this._tokenKey = environment.SECRET_KEY;
     this._tokenLife = environment.JWT_LIFE;
   }
   /**
    * Create a JWT token from the given data
    * @param {any} data - The data to be encrypted in the token
    * @returns {Promise<string>} - The encrypted JWT token
    * @throws {BadRequest} - If an error occurs during token creation
    */
   async createToken(data: any): Promise<string> {
     try {
       let token: string = await sign(data, this._tokenKey, {
         expiresIn: this._tokenLife,
       });
       return token;
     } catch (error: any) {
       throw new BadRequest(error.message);
     }
   }
   /**
    * Verify the given JWT token
    * @param {string} token - The JWT token to be verified
    * @returns {Promise<any>} - The decoded token data
    * @throws {Forbidden} - If the token is invalid or an error occurs during verification
    */
   async verifyToken(token: string): Promise<any> {
     try {
       let decodedToken: any = await verify(token, this._tokenKey);
       return decodedToken;
     } catch (error: any) {
       throw new Forbidden(error.message);
     }
   }
 }