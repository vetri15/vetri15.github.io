import { useRouter } from "next/router";

export function useImage(path: string): string {
   return `${process.env.NODE_ENV === "production" ? "/Personal-Website" : ""}${path}`;
}