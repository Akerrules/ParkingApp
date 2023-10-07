/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",

        destination:
          process.env.NODE_ENV === "production"
            ? "https://adityakjun.pythonanywhere.com/api/:path*"
            : "https://adityakjun.pythonanywhere.com/api/", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
