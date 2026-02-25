import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import CartDrawer from "@/components/ui/CartDrawer";

export const metadata = {
  title: "Sterlin | High Jewellery & Exquisite Craftsmanship",
  description: "Unleash the shining beauty. Best jewellery from the world's finest designers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="grain-overlay"></div>
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
      </body>
    </html>
  );
}
