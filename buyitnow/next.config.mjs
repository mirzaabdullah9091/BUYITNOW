/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DB_URI:"mongodb+srv://abdullahmirza9091:HondaCivic1459@abdullah.4xyfsua.mongodb.net/BUYITNOW",
        HOST_URL:"http://localhost:3000/",
        NEXTAUTH_SECRET:"hondacivicxisshaper",
        CLOUD_NAME:"diaxgbf6t",
        CLOUDINARY_API_KEY:"486687464557189",
        CLOUDINARY_API_SECRET:"0zO_Us1TWjAh_ZMas3N6HtSfxNY",
        STRIPE_PUBLIC_KEY:"pk_test_51LgtEeEiFmmcfKq1a3ZyBz4tcRrgIWid1Ebc5IyKrGqnVZreregXzqna9PYUvsK7aqnuoOoGrmwSV6i3zvFqir6600GKMRgHLh",
        STRIPE_PRIVATE_KEY:"sk_test_51LgtEeEiFmmcfKq16NngJioJHNTOLpOGL4HhQiTfWQjw4ixSwPN3vd18DIzqyTTTPSicUbk11yLa8lCGmLxTyEf700GcHJUns8",
        STRIPE_WEBHOOK_SECRET:"whsec_aeed4a77ec103bd1266cc9507f350aa8b42cae2c38260e072973b53c67a27a2e"
    },
    images: {
        domains: ["res.cloudinary.com"],
      },
};

export default nextConfig;
