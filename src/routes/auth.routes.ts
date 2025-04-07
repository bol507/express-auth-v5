import { ExpressAuth } from "@auth/express"
import Credentials from "@auth/express/providers/credentials"
import express from "express"
import { saltAndHashPassword } from "@/utils/password"
import GitHub from "@auth/express/providers/github"
import Google from "@auth/express/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/utils/prisma"
 
const app = express()
app.use(
  "/auth/*",
  ExpressAuth({
    providers: [
      Credentials({
        
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          let user = null
 
          // logic to salt and hash password
          const pwHash = saltAndHashPassword(credentials.password)
 
          // logic to verify if the user exists
          user = await getUserFromDb(credentials.email, pwHash)
 
          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.")
          }
 
          // return user object with the their profile data
          return user
        },
      }),
      GitHub,
      Google
    ],
    adapter: PrismaAdapter(prisma),
  })
)