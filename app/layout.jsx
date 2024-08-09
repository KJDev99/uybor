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
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta
          name="google-site-verification"
          content="UkR4dh55Cj77k3gf1-90XU77TKTWqS6iGqR-z1wC7Tw"
        />
        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(98023827, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true,
                   ecommerce:"dataLayer"
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/98023827"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}
      </head>
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
