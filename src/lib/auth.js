'use server'
import { createSecretKey } from "crypto";
import { SignJWT,jwtVerify } from "jose"

const secret = createSecretKey(process.env.JWT_SECRET, "utf-8");

export async function createToken(payload){
    return await new SignJWT(payload)
     .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verify(token){
    try{
         const { payload } = await jwtVerify(token, secret);
            return payload;
    }
    catch { 
    return null;
  }
}