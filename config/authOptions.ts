
 
import FacebookProvider from "next-auth/providers/facebook";
import jwt from "jsonwebtoken"


export const authOptions = {
    providers: [
      FacebookProvider({ 
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        userinfo:{
          params: { fields: "id,name,email,picture" }
        }
      })
    ],
       
}

// session: {
//   strategy: "jwt",
// },
// secret: process.env.NEXTAUTH_SECRET,
// jwt: {
//   async encode({ secret, token }) {
//     return jwt.sign(token, secret)
//   },
//   async decode({ secret, token }) {
//     return jwt.verify(token, secret)
//   },
// },