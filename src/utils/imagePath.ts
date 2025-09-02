export function appendBaseUrl(path: string): string {
   const isProd = process.env.NODE_ENV === "production";
   const isVercel = !!process.env.VERCEL;
   return `${ (isProd && !isVercel) ? "/Personal-Website" : ""}${path}`;
}