import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const socialMediaLinks = [
  { href: '', label: 'twitch' },
  { href: '', label: 'twitter' },
  { href: '', label: 'discord' },
];

function Home() {
  return (
    <div>
      <Head>
        <title>hades | startseite</title>
        <meta
          name="description"
          content="The website allows you to quickly and easily create custom RegEx rules not only for Fossabot, but also for a variety of other applications."
        />
        <meta
          name="keywords"
          content="Regex, regular expressions, creating regex, Fossabot regex"
        />
      </Head>
      <div className="social">
        <ul className="nav justify-content-center">
          {socialMediaLinks.map(({ href, label }, index) => (
            <React.Fragment key={href}>
              <li>
                <a
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                  className="nav-link px-3"
                >
                  {label}
                </a>
              </li>
              {index < socialMediaLinks.length - 1 && <span className="slash">/</span>}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className="hades">
        <h1>
          hades<span className="point">.</span>
        </h1>
        <h5 className="regex-website">
          <Link href="/regex">/REGEX-WEBSITE</Link>
        </h5>
      </div>
    </div>
  );
}

export default Home;
