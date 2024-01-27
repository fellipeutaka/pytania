import { Icons } from "./icons";
import { Marquee } from "./ui/marquee";

const techs = [
  {
    name: "React",
    icon: <Icons.React className="size-9" />,
    link: "https://react.dev",
  },
  {
    name: "React Query",
    icon: <Icons.ReactQuery className="size-9" />,
    link: "https://tanstack.com/query/latest",
  },
  {
    name: "React Hook Form",
    icon: <Icons.ReactHookForm className="size-9" />,
    link: "https://react-hook-form.com",
  },
  {
    name: "Tailwind CSS",
    icon: <Icons.Tailwind className="size-9" />,
    link: "https://tailwindcss.com",
  },
  {
    name: "Radix UI",
    icon: <Icons.Radix className="size-9" />,
    link: "https://radix-ui.com",
  },
  {
    name: "Next.js",
    icon: <Icons.NextJS className="h-6 w-auto" />,
    link: "https://nextjs.org",
  },
  {
    name: "Auth.js",
    icon: <Icons.AuthJS className="size-9" />,
    link: "https://authjs.dev",
  },
  {
    name: "Drizzle",
    icon: <Icons.Drizzle className="size-9" />,
    link: "https://orm.drizzle.team",
  },
  {
    name: "Postgres",
    icon: <Icons.Postgres className="size-9" />,
    link: "https://www.postgresql.org",
  },
  {
    name: "Neon",
    icon: <Icons.Neon className="h-6 w-auto" />,
    link: "https://neon.tech",
  },
  {
    name: "Docker",
    icon: <Icons.Docker className="size-9" />,
    link: "https://www.docker.com",
  },
  {
    name: "Redis",
    icon: <Icons.Redis className="size-9" />,
    link: "https://redis.io",
  },
  {
    name: "Upstash",
    icon: <Icons.Upstash className="size-9" />,
    link: "https://upstash.com",
  },
  {
    name: "Resend",
    icon: <Icons.Resend className="h-6 w-auto" />,
    link: "https://resend.com",
  },
  {
    name: "TRPC",
    icon: <Icons.TRPC className="size-9" />,
    link: "https://trpc.io",
  },
  {
    name: "Biome.js",
    icon: <Icons.Biome className="size-9" />,
    link: "https://biomejs.dev",
  },
  {
    name: "Bun",
    icon: <Icons.Bun className="size-9" />,
    link: "https://bun.sh",
  },
];

export function TechSection() {
  return (
    <section className="text-muted-foreground motion-safe:animate-fade-up motion-safe:animate-delay-500 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm max-w-xs">
      <h2 className="text-center text-sm font-semibold uppercase">
        The world's most innovative companies use our app
      </h2>
      <Marquee pauseOnHover className="[--gap:4rem]">
        {techs.map((tech) => (
          <a
            href={tech.link}
            key={tech.link}
            className="transition duration-300 hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tech.icon}
            <span className="sr-only">{tech.name}</span>
          </a>
        ))}
      </Marquee>
    </section>
  );
}
