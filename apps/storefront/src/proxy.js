import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions (e.g. .png, .jpg, .svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export default function middleware(req) {
  const url = req.nextUrl;
  
  // Get hostname of request (e.g. demo.creator.com, demo.localhost:3000)
  const hostname = req.headers.get('host') || 'localhost:3000';

  // Define allowed domains (e.g. localhost:3000 in dev, or your main domain in prod)
  // Usually this comes from an env var like process.env.NEXT_PUBLIC_ROOT_DOMAIN
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';

  // Get the path (e.g. /product/123)
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  // If the request is for the root domain, do nothing (let it hit the normal routes)
  if (hostname === rootDomain) {
    return NextResponse.next();
  }

  // Otherwise, it's a subdomain (e.g. test-creator.localhost:3000) or a custom domain.
  // We extract the domain part (without the port).
  // For custom domain mapping, we could fetch from API here or let the page component handle it.
  // For now, we pass the full hostname (without port) as the [domain] parameter.
  const currentHost = hostname.split(':')[0]; // test-creator.localhost or cuahangcuatoi.com
  
  let storeSlug = currentHost;
  
  // If it's a subdomain of our platform (e.g. test-creator.localhost), extract the subdomain part
  if (currentHost.endsWith(`.${rootDomain.split(':')[0]}`)) {
    storeSlug = currentHost.replace(`.${rootDomain.split(':')[0]}`, '');
  }

  // Rewrite to the [domain] dynamic route
  return NextResponse.rewrite(new URL(`/${storeSlug}${path === '/' ? '' : path}`, req.url));
}
