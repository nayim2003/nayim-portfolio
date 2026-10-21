/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // এই লাইনটা Vercel-কে বাধ্য করবে আপনার app ফোল্ডার ঠিকমতো খুঁজতে
  trailingSlash: true, 
};

module.exports = nextConfig;
