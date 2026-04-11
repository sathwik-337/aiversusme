import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/rankings(.*)',
  '/academy/ai-for-non-engineers(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect the routes defined above
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  
  // Also protect specific API POST routes
  if (req.method === 'POST') {
    if (req.nextUrl.pathname.startsWith('/api/comments/') || 
        req.nextUrl.pathname.startsWith('/api/polls/') ||
        req.nextUrl.pathname.startsWith('/api/academy/') ||
        req.nextUrl.pathname.startsWith('/api/users/sync')) {
      await auth.protect();
    }
  }
});

export const config = {
  // This matcher ensures the middleware runs on all routes
  // except for static files and Next.js internals.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
