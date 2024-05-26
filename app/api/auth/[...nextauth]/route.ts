import NextAuth from "next-auth"; 
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
    providers: [
        FacebookProvider({
          
          clientId: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          userinfo:{
            params: { fields: "id,name,email,picture" }
          }
        })
      ] 
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
