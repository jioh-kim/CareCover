// Clerk Middleware

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Add routes that user can see without having to login
  publicRoutes: ["/", "/api/webhook/clerk", "jobs/:id", "/api/uploadthing"],
  ignoredRoutes: ["/api/uploadthing", "/api/webhook/clerk"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
