import { Icons } from "./icons";

const techs = [
  {
    name: "Next.js",
    icon: <Icons.NextJS className="h-6 w-auto" />,
    link: "https://nextjs.org",
  },
  {
    name: "Drizzle",
    icon: <Icons.Drizzle className="size-9" />,
    link: "https://orm.drizzle.team",
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
    name: "Auth.js",
    icon: <Icons.AuthJS className="size-9" />,
    link: "https://authjs.dev",
  },
  {
    name: "Resend",
    icon: <Icons.Resend className="h-6 w-auto" />,
    link: "https://resend.com",
  },
  {
    name: "Tailwind CSS",
    icon: <Icons.Tailwind className="size-9" />,
    link: "https://tailwindcss.com",
  },
];

export function TechSection() {
  return (
    <section className="text-muted-foreground motion-safe:animate-fade-up motion-safe:animate-delay-500">
      <h2 className="text-center text-sm font-semibold uppercase">
        The world's most innovative companies use our app
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-10 gap-y-8 lg:gap-14">
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
      </div>
    </section>
  );
}
