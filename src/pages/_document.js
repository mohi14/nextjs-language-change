import Document, { Html, Head, Main, NextScript } from "next/document";
import i18n from "../../i18n";

const fonts = [
  { href: "/fonts/RobotoMono-Regular.ttf", type: "font/ttf" },
  { href: "/fonts/PublicPixel.ttf", type: "font/ttf" },
  { href: "/fonts/eight-bit-dragon.otf", type: "font/otf" },
];

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    const { req } = ctx;
    const lng = req?.cookies?.i18next || "en"; // get the language from cookies or fallback to 'en'

    await i18n.changeLanguage(lng); // set the language for i18n on the server-side

    return {
      ...initialProps,
      lng,
    };
  }

  render() {
    return (
      <Html lang={this.props.lng}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function () { var savedColor = localStorage.getItem('--primary'); if (savedColor) { document.documentElement.style.setProperty('--primary', savedColor); } })()`,
            }}
          ></script>
          {fonts.map(({ href, type }) => (
            <link
              key={href}
              rel="preload"
              href={href}
              as="font"
              type={type}
              crossOrigin="anonymous"
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
