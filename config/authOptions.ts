
 
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