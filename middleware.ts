import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/rankings(.*)',
  '/academy/ai-for-non-engineers(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  
  // Protect specific API POST routes
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
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
