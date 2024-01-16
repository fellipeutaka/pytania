export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="container prose py-12 dark:prose-invert">{children}</main>
  );
}
