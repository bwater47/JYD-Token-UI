import "../../styles/components/layout/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-bottom">
            <p>© 2024 JYD Token. All rights reserved.</p>
            <div className="social-links">
              <a href="https://twitter.com">Twitter</a>
              <a href="https://discord.com">Discord</a>
              <a href="https://github.com">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
