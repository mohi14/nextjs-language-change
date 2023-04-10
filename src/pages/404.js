import React from 'react';
import Head from 'next/head';

const socialMediaLinks = [
  { href: '', label: 'twitch' },
  { href: '', label: 'twitter' },
  { href: '', label: 'discord' },
];

export default function Error() {
  return (
    <div>
      <Head>
        <title>hades | error</title>
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
          error<span className="point">.</span>
        </h1>
      </div>
    </div>
  );
}
