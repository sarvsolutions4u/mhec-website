import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Old muscateducation.com addresses → new pages (keeps Google rankings and old links working)
  async redirects() {
    return [
      { source: "/about-mhec", destination: "/about", permanent: true },
      { source: "/about-mhec/", destination: "/about", permanent: true },
      { source: "/open-school", destination: "/pathway-programs#school-completion", permanent: true },
      { source: "/open-school/", destination: "/pathway-programs#school-completion", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/online-programs/category/uk-diplomas-othm", destination: "/pathway-programs/othm-diplomas", permanent: true },
      { source: "/online-programs/:slug(othm-.*)", destination: "/pathway-programs/othm-diplomas#:slug", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
