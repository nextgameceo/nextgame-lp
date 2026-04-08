import { NextRequest, NextResponse } from 'next/server';

// ── 公開するパス（これ以外はトップへリダイレクト）──
const PUBLIC_PATHS = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/lp',
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // APIルート・静的ファイルは除外
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/logo') ||
    pathname.startsWith('/og') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 公開パスかチェック
  const isPublic = PUBLIC_PATHS.some(p =>
    pathname === p || pathname.startsWith(p + '/')
  );

  // 非公開ページはトップへリダイレクト
  if (!isPublic) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // キャッシュ制御
  const response = NextResponse.next();
  response.headers.set('CDN-Cache-Control', 'no-store');
  response.headers.set('Vercel-CDN-Cache-Control', 'no-store');
  response.headers.set('Cache-Control', 'no-store, must-revalidate');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
