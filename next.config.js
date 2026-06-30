/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pacex.co.in' },
      { protocol: 'https', hostname: 'wordpress-backend.pacex.co.in' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async rewrites() {
    return {
      afterFiles: [
        { source: '/elementor-5014/:path*', destination: 'https://wordpress-backend.pacex.co.in/elementor-5014/:path*' },
        { source: '/wp-admin/:path*', destination: 'https://wordpress-backend.pacex.co.in/wp-admin/:path*' },
        { source: '/wp-json/:path*', destination: 'https://wordpress-backend.pacex.co.in/wp-json/:path*' },
        { source: '/wp-content/:path*', destination: 'https://wordpress-backend.pacex.co.in/wp-content/:path*' },
        { source: '/wp-includes/:path*', destination: 'https://wordpress-backend.pacex.co.in/wp-includes/:path*' },
        { source: '/wp-login.php', destination: 'https://wordpress-backend.pacex.co.in/wp-login.php' },
      ],
    };
  },
};

module.exports = nextConfig;
