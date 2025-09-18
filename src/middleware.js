import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { createSecretKey } from "crypto";

export async function middleware(req){
    const token = req.cookies.get("session")?.value

    if(!token){
        return NextResponse.redirect(new URL("/",req.url))
    }
        try{
            const secret = createSecretKey(process.env.JWT_SECRET, "utf-8");
            await jwtVerify(token,secret)
            return NextResponse.next();
        }
        catch{
            return NextResponse.redirect(new URL("/",req.url))
        }
}

export const config = {
  matcher: ["/Dashboard/:path*"],
};