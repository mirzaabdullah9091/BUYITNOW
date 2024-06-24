/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DB_URI:"",
        // HOST_URL:"https://buyitnow-nine.vercel.app",
        HOST_URL:"http://localhost:3000",
        NEXTAUTH_SECRET:"",
        CLOUD_NAME:"diaxgbf6t",
        CLOUDINARY_API_KEY:"486687464557189",
        CLOUDINARY_API_SECRET:"",
        STRIPE_PUBLIC_KEY:"pk_test_51LgtEeEiFmmcfKq1a3ZyBz4tcRrgIWid1Ebc5IyKrGqnVZreregXzqna9PYUvsK7aqnuoOoGrmwSV6i3zvFqir6600GKMRgHLh",
        STRIPE_PRIVATE_KEY:"",
        STRIPE_WEBHOOK_SECRET:""
    },
    images: {
        domains: ["res.cloudinary.com"],
      },
      staticPageGenerationTimeout: 60, // Increase timeout to 120 seconds
      async headers() {
          return [
              {
                  source: '/(.*)',
                  headers: [
                      {
                          key: 'Cache-Control',
                          value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=59'
                      }
                  ]
              }
          ];
      }
};

export default nextConfig;
