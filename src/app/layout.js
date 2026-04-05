import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import CartDrawer from "@/components/ui/CartDrawer";
import Footer from "@/components/ui/Footer";
import AnnouncementBar from "@/components/ui/AnnouncementBar";

export const metadata = {
  title: "Sterly | High Jewellery & Exquisite Craftsmanship",
  description: "A celestial touch for timeless moments. Discover exquisite jewellery from the world's finest designers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className="grain-overlay"></div>
        <AnnouncementBar />
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
