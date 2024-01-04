// Imports:
import {
  authMiddleware
} from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

// Exports:
// Middleware: Authentication:
export default authMiddleware({
  
    // Public Routes: Authentication: Not required:
    publicRoutes: ["/api/webhook/clerk", "/api/uploadthing"],

    // Public Routes: Authentication: Ignored:
    ignoredRoutes: ["/api/webhook/clerk"],
});

// Configuration:
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};