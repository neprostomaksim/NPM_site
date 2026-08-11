/** @type {import('next').NextConfig} */
const nextConfig = {
  // The project sits under a path with Cyrillic characters, and a stray
  // package-lock.json in the home directory makes Next infer ~/ as the
  // workspace root. Internal asset ids then embed "Documents_Основная_…",
  // which Turbopack truncates mid-UTF-8-character and panics on.
  // Pinning the root keeps those ids relative to this directory.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
