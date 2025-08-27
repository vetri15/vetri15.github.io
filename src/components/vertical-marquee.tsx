import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { skills } from "@/data";
import { LogoItem } from "@/types/logo";
import { splitIntoThree } from "@/lib/arraySplitter";


const LogoCard = ({ name, icon, group }: LogoItem) => {

  const groupGradients: Record<string, string> = {
  "Front End Development": "bg-gradient-to-r from-pink-500 via-red-500 to-orange-500", 
  "Backend Development": "bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-500", // primary
  "Data Analysis": "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600",
  "CRM Development": "bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600",
};

const gradientClass = groupGradients[group] || "";


  return (
    <figure
      className={cn(
        "relative flex items-center justify-center p-[2px] rounded-xl",
        gradientClass
      )}
    >
      <div className="flex flex-row items-center justify-center w-24 h-24 rounded-xl bg-white dark:bg-zinc-900">
        <span key={name} className={`${icon} size-8`} />
      </div>
    </figure>
  );
};

export function VerticalMarquee() {

  let logos : LogoItem[] = skills.reduce((accum: LogoItem[] , i)=>{

  const itemsWithTitle: LogoItem[] = i.items.map(item => ({
    ...item,
    group : i.title, // attach parent title
  }));

  return accum.concat(itemsWithTitle);

  },[])

  let logoGroups = splitIntoThree(logos);


  return (
  <div className="relative flex items-center justify-center">
    {/* Gradient border wrapper */}
    <div className="relative w-full h-[500px] p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500">
      {/* Inner content */}
      <div className="relative flex h-full w-full flex-row items-center justify-center overflow-hidden gap-2 lg:gap-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 md:shadow-xl">
        <Marquee reverse vertical className="[--duration:10s] items-center justify-center">
          {logoGroups[0].map((logo, i) => <LogoCard key={i} {...logo} />)}
        </Marquee>

        <Marquee vertical className="[--duration:10s] items-center justify-center">
          {logoGroups[1].map((logo, i) => <LogoCard key={i} {...logo} />)}
        </Marquee>

        <Marquee reverse vertical className="[--duration:10s] items-center justify-center">
          {logoGroups[2].map((logo, i) => <LogoCard key={i} {...logo} />)}
        </Marquee>

        {/* Top + bottom fade masks MUST match the rounding */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-2xl bg-gradient-to-b from-zinc-200/90 dark:from-zinc-800/90"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl bg-gradient-to-t from-zinc-200/90 dark:from-zinc-800/90"></div>
      </div>
    </div>
  </div>
);


}
