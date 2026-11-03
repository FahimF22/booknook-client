import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { APIError, createAuthMiddleware } from "better-auth/api";
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
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      const { email, password } = (ctx.body ?? {}) as { email?: string; password?: string };

      // Same password rules as the form, enforced on the server too
      if (!password || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must have an uppercase letter, a lowercase letter and at least 6 characters",
        });
      }

      // With autoSignIn off, BetterAuth hides duplicate emails. The assignment wants an error shown.
      if (email && (await ctx.context.internalAdapter.findUserByEmail(email.toLowerCase()))) {
        throw new APIError("UNPROCESSABLE_ENTITY", {
          code: "USER_ALREADY_EXISTS",
          message: "An account with this email already exists. Please log in.",
        });
      }
    }),
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
