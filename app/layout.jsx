import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import ClientProvider from "@/components/ClientProvider";
export const metadata = {
  title: "TOPUY, Ko'chmas mulklarning katta bozori ",
  description: "Ko'chmas mulklarning katta bozori ",
  keywords:
    "Ko'chmas mulklarning katta bozori, Uybor, topuy, uytopish, kvartiratopish, uysotish, uyolish",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-background">
        <ClientProvider>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
};

export default MainLayout;
