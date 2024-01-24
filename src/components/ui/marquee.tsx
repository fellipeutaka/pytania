import { cn } from "mizuhara/utils";

export interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  pauseOnHover?: boolean;
  reverse?: boolean;
  children: React.JSX.Element[];
}

export function Marquee({
  pauseOnHover = false,
  reverse = false,
  className,
  children,
  ...props
}: MarqueeProps) {
  if (!children) return null;

  return (
    <div
      role="marquee"
      className={cn(
        "flex overflow-x-hidden motion-reduce:overflow-x-scroll motion-reduce:snap-mandatory motion-reduce:snap-x gap-[--gap] group",
        "[--gap:1rem] [--duration:20s]",
        "[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center motion-reduce:[&>*]:snap-start gap-[--gap] animate-marquee motion-reduce:animate-none",
          pauseOnHover && "group-hover:animate-pause",
          reverse && "animate-reverse",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex items-center motion-reduce:hidden gap-[--gap] animate-marquee motion-reduce:animate-none",
          pauseOnHover && "group-hover:animate-pause",
          reverse && "animate-reverse",
        )}
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
}
