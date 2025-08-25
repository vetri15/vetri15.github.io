export function appendBaseUrl(path: string): string {
   return `${process.env.NODE_ENV === "production" ? "/Personal-Website" : ""}${path}`;
}