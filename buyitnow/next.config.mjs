/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DB_URI:"mongodb+srv://abdullahmirza9091:HondaCivic1459@abdullah.4xyfsua.mongodb.net/BUYITNOW",
        HOST_URL:"http://localhost:3000/"
    },
    images: {
        domains: ["res.cloudinary.com"],
      },
};

export default nextConfig;
