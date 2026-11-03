import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { db, mongoClient } from "./mongodb";

const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

export const auth = betterAuth({
  baseURL,
  database: mongodbAdapter(db, { client: mongoClient }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    // The assignment sends new users to the Login page after registering
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    // Issues short-lived tokens that the Express server checks via /api/auth/jwks
    jwt({
      jwt: {
        issuer: baseURL,
        audience: baseURL,
        expirationTime: "15m",
        definePayload: ({ user }) => ({ name: user.name, email: user.email }),
      },
    }),
    nextCookies(), // must stay last
  ],
});

export type Session = typeof auth.$Infer.Session;
