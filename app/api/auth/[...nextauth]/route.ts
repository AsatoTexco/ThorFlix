import NextAuth from "next-auth"; 
import FacebookProvider from "next-auth/providers/facebook";
import { authOptions } from '../../../../config/authOptions';
 
export const handler = NextAuth(authOptions);
 

export const GET = (req, res) => {
  return handler(req, res);
}

export const POST = (req, res) => {
  return handler(req, res);
}