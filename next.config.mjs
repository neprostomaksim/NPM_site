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
  // Сайт (app/(site)) и лендинги (app/(landings)/*) живут под разными корневыми
  // layout'ами, общего app/layout.js нет — поэтому 404 для несуществующих адресов
  // задаётся отдельно в app/global-not-found.js.
  experimental: {
    globalNotFound: true,
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
