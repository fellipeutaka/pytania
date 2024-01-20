import withMDX from "@next/mdx";
import million from "million/compiler";
await import("./src/lib/env/index.mjs");

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	pageExtensions: ["mdx", "ts", "tsx"],
	...(process.env.NODE_ENV === "production" && {
		compiler: {
			removeConsole: true,
		},
	}),
};

export default withMDX()(million.next(config, { auto: { rsc: true } }));
