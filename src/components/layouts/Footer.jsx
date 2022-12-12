import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <a
            href="https://www.veryfi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Veryfi
          </a>
        </li>
        <li>
          <a
            href="https://github.com/veryfi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Veryfi Github
          </a>
        </li>
        <li>
          {" "}
          <a
            href="https://hub.veryfi.com/api/docs/toc/?ref=footer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Veryfi API Documentation
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
