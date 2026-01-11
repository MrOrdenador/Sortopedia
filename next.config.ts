import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  serverExternalPackages: ["mongoose"],
  turbopack: {
    resolveAlias: {
      mongoose: "mongoose",
    },
  },
  typedRoutes: true,
};

export default nextConfig;
