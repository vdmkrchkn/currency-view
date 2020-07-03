import React from 'react';

import './footer.css';

const Footer: React.FunctionComponent = ({children}) => (
  <footer>
    {children}
    <a
      className="footer-link"
      href="https://github.com/vdmkrchkn"
      target="_blank"
      rel="noopener noreferrer"
    >
          See my repos at github
    </a>
  </footer>
);

export default Footer;
