import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'PaceX — Where Excellence Meets Direction',
  description: 'Get trained. Get paid. Get placed. Career readiness platform bridging the gap between education and employability.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <Cursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
