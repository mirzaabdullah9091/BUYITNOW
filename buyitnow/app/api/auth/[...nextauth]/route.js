
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import user from "@/Backend/models/user";
import bcrypt from 'bcrypt'
import dbConnect from "@/Backend/Config/dbConnet";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",

            async authorize(credentials) {
                const { email, password } = credentials;
                dbConnect();
                const userfound = await user.findOne({ email: email }).select("+password")
                
                if (!userfound)
                    throw new Error("Email is not registered!")
                const passwordMatch = await bcrypt.compare(password, userfound.password);
                
                if (!passwordMatch)
                    throw new Error("Incorrect password or Email");
                return userfound;

            }
        })
    ],
    callbacks: {
        async jwt({ user, token, trigger, session }) {
            if (trigger === "update" && session?.user) {
                // console.log(session)
                // Note that session can be any arbitrary object, remember to validate it!
                token.user = { ...token.user, ...session.user }; // Merge updated session user data
            } else if (user) {
                token.user = user;
                token.uid = user.id;
                token.exp = Math.floor(Date.now() / 1000) + 5 * 60; // Token expiration time (5 minutes)   
            }
            return token;
        },
        session: async ({ session, token, }) => {
            
            if (session?.user && token?.uid) {
                session.user = token.user;
                session.user.id = token.uid;
                delete session?.user?.password;
            }
          
            return session;
        },

    },

    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }