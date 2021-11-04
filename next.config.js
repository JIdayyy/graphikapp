/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const withOffline = require("next-offline");
const runtimeCaching = require("next-pwa/cache");
const nextConfig = withPWA({
    reactStrictMode: true,
    images: {
        domains: ["res.cloudinary.com"],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    pwa: {
        dest: "public",
        runtimeCaching,
    },
});

module.exports = withOffline(nextConfig);
