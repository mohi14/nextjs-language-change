import { Html, Head, Main, NextScript } from 'next/document';

const fonts = [
  { href: '/fonts/RobotoMono-Regular.ttf', type: 'font/ttf' },
  { href: '/fonts/PublicPixel.ttf', type: 'font/ttf' },
  { href: '/fonts/eight-bit-dragon.otf', type: 'font/otf' },
];

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: `(function () { var savedColor = localStorage.getItem('--primary'); if (savedColor) { document.documentElement.style.setProperty('--primary', savedColor); } })()` }}></script>
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
