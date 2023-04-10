import React from 'react';
import Icons from './Icons';

const socialMediaLinks = [
  { href: '', label: 'twitch' },
  { href: '', label: 'twitter' },
  { href: '', label: 'discord' },
];

const Header = ({ t }) => (
  <>
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
    <div className="regex-titel">
      <h1>{t('regex-erstellen')}</h1>
    </div>
    <Icons t={t} />
  </>
);

export default Header;
