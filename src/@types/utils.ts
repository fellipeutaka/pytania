export type PropsWithChildren<T = unknown> = T & { children: React.ReactNode };

export type PropsWithOptionalChildren<T = unknown> = T & {
  children?: React.ReactNode;
};

export type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
