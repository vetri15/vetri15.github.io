import { LogoItem } from "@/types/logo";


export function splitIntoThree(arr: LogoItem[]): [LogoItem[], LogoItem[], LogoItem[]] {

  const groupMap = arr.reduce<Record<string, LogoItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const groups = Object.values(groupMap);

  const result: [LogoItem[], LogoItem[], LogoItem[]] = [[], [], []];
  let bucketIndex = 0;

  for (const groupItems of groups) {
    result[bucketIndex].push(...groupItems);
    bucketIndex = (bucketIndex + 1) % 3;
  }

  return result;
}