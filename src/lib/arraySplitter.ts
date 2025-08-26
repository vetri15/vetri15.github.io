import { LogoItem } from "@/types/logo";


export function splitIntoThree(arr: LogoItem[]): [LogoItem[], LogoItem[], LogoItem[]] {
  const size = Math.ceil(arr.length / 3); // ensures division into 3 parts
  const first = arr.slice(0, size);
  const second = arr.slice(size, size * 2);
  const third = arr.slice(size * 2);
  return [first, second, third];
}