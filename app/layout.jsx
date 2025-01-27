// app/layout.js yoki app/layout.tsx
import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import ClientProvider from "@/components/ClientProvider";
// import { useEffect } from "react";

const MainLayout = ({ children }) => {
  return (
    <html>
      <head>
        <title>TOPUY, Ko'chmas mulklarning katta bozori </title>
        <meta name="description" content="Ko'chmas mulklarning katta bozori" />
        <meta
          name="keywords"
          content="Ko'chmas mulklarning katta bozori, Uybor, topuy, uytopish, kvartiratopish, uysotish, uyolish"
        />
        <meta
          name="google-site-verification"
          content="UkR4dh55Cj77k3gf1-90XU77TKTWqS6iGqR-z1wC7Tw"
        />

        <meta
          name="google-site-verification"
          content="InbzaIkrewXeIjjlHT6PFV17-hHEw8cJXGOQ4TSYo6k"
        />

        <link rel="icon" href="/images/logo3.png" type="image/svg+xml" />

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
        {/* <!-- Yandex.RTB --> */}
        <script>window.yaContextCb=window.yaContextCb||[]</script>
        <script src="https://yandex.ru/ads/system/context.js" async></script>
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
          <div className="min-h-[80vh] h-max">{children}</div>
          <Footer />
        </ClientProvider>
        {/* <!-- Yandex.RTB R-A-12881203-2 --> */}
        <div id="yandex_rtb_R-A-12881203-2"></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.yaContextCb = window.yaContextCb || [];
              window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                  blockId: "R-A-12881203-2",
                  renderTo: "yandex_rtb_R-A-12881203-2",
                });
              });
            `,
          }}
        ></script>
      </body>
    </html>
  );
};

export default MainLayout;
