import { Types } from "mongoose";
import { Forbidden } from "./customError";
/**
 * Validates whether the provided string is a valid ObjectId.
 * @param {string} id - The string to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the id is valid.
 */
export default async function validObjectId(id: string): Promise<boolean> {
  let isValid: boolean = false;
    try {
        isValid = await Types.ObjectId.isValid(id);
    if (!isValid)
      throw new Forbidden(`${id} is invalid!`)
    return isValid;
  } catch (error: any) {
    throw new Forbidden(`Id is invalid!`);
  }
}