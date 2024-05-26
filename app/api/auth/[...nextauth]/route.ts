import NextAuth from "next-auth"; 
import FacebookProvider from "next-auth/providers/facebook";
import { authOptions } from '../../../../config/authOptions';
 
export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
