import { hash, compare } from "bcrypt";
import { generate } from "generate-password";

// hash the password 
export const passwordHash = async (password: string) => await hash(password, 8);

// compare the password 
export const passwordCompare = async (password: string, hash: string) => await compare(password, hash);

// generate random  password 
export const passwordGenerator = () => generate({ length: 15, numbers: true });
