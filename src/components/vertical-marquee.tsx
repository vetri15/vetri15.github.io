import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { skills } from "@/data";
import { LogoItem } from "@/types/logo";
import { splitIntoThree } from "@/lib/arraySplitter";

const logostemp = [
  {
    img: "/logos/logo-v-ispum-1.avif",
  },
  {
    img: "/logos/logo-v-ispum-2.avif",
  },
  {
    img: "/logos/logo-v-ispum-3.avif",
  },
  {
    img: "/logos/logo-v-ispum-4.avif",
  },
  {
    img: "/logos/logo-v-ispum-5.avif",
  },
  {
    img: "/logos/logo-v-ispum-6.avif",
  },
  {
    img: "/logos/logo-v-ispum-7.avif",
  },
];



const LogoCard = ({ name, icon }: LogoItem) => {

  return (
    // <figure
    //   className={cn(
    //     "flex relative w-28 cursor-pointer items-center justify-center"
    //   )}
    // >
    //   <div className="flex flex-row items-center justify-center my-4">
    //     {/* <img width={50} alt="" src={img} /> */}
    //     <span key={name} className={`${icon} size-6`} />
    //   </div>
    // </figure>
    <figure
      className={cn(
        "relative flex items-center justify-center p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
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
    return accum.concat(i.items)
  },[])

  let logoGroups = splitIntoThree(logos);


  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden md:shadw-xl gap-2 lg:gap-8">
      <Marquee
        reverse
        vertical
        className="[--duration:10s] items-center justify-center"
      >
        {logoGroups[0].map((logo, i) => (
          <LogoCard key={i} {...logo} />
        ))}
      </Marquee>
      <Marquee
        vertical
        className="[--duration:10s] items-center justify-center"
      >
        {logoGroups[1].map((logo, i) => (
          <LogoCard key={i} {...logo} />
        ))}
      </Marquee>
      <Marquee
        reverse
        vertical
        className="[--duration:10s] items-center justify-center"
      >
        {logoGroups[2].map((logo, i) => (
          <LogoCard key={i} {...logo} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-zinc-200 dark:from-zinc-800"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-200 dark:from-zinc-800"></div>
    </div>
  );
}
