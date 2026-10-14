import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

const GTM_ID = "GTM-MBW8636W";

const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

const FONTS = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap";

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
          <script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link rel="stylesheet" href={FONTS} />
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
