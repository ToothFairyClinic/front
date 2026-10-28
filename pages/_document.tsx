import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";
import { INLINE_CSS } from "@app/generated/inline-css";

const GTM_ID = "GTM-MBW8636W";

// GTM (GA4, Clarity, мікророзмітка, події) завантажується після завантаження сторінки або при першій дії
// відвідувача, щоб сторонні скрипти не затримували перший показ. Події до цього накопичуються в dataLayer.
const GTM_SCRIPT = `(function(){var done=false;function load(){if(done)return;done=true;(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');}
['pointerdown','keydown','scroll','touchstart'].forEach(function(e){window.addEventListener(e,load,{once:true,passive:true});});
if(document.readyState==='complete'){setTimeout(load,1500);}else{window.addEventListener('load',function(){setTimeout(load,1500);});}})();`;

// Якщо load настає раніше першого кадру, частина прогонів PageSpeed не показувала готову сторінку до старту GTM
// (FCP 2,4 с при завантаженні 0,8 с). На load додаємо на один кадр невидимий піксель поза #__next, щоб браузер
// намалював кадр одразу. Не текст і не зображення, тож FCP і LCP не підміняє. GTM і трекінг не зачіпає.
const PAINT_NUDGE = `(function(){function k(){var b=document.body;if(!b)return;var e=document.createElement('i');e.setAttribute('aria-hidden','true');e.style.cssText='position:fixed;left:0;top:0;width:1px;height:1px;opacity:.01;pointer-events:none';b.appendChild(e);requestAnimationFrame(function(){requestAnimationFrame(function(){e.remove();});});}if(document.readyState==='complete'){k();}else{window.addEventListener('load',k);}})();`;

type Props = DocumentInitialProps & { htmlLang: string };

export default class AppDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    const initialProps = await Document.getInitialProps(ctx);
    const lang = (ctx.query?.lang as string) || "ua";
    return { ...initialProps, htmlLang: lang === "en" ? "en" : "uk" };
  }

  render() {
    return (
      <Html lang={this.props.htmlLang}>
        <Head>
          {/* Весь CSS сайту вбудований: браузер малює сторінку, не чекаючи файлів стилів (scripts/build-inline-css.js) */}
          <style dangerouslySetInnerHTML={{ __html: INLINE_CSS }} />
          <link rel="preload" href="/fonts/montserrat-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="" />
          <link rel="preload" href="/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
          <script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
          <script dangerouslySetInnerHTML={{ __html: PAINT_NUDGE }} />
          <link rel="preconnect" href="https://hasura.toothfairy.clinic" crossOrigin="" />
          <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/assets/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#000000" />
          <meta name="msapplication-TileColor" content="#ffc40d" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
