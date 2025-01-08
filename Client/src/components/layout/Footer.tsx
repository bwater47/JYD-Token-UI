import "../../styles/components/layout/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>App</h3>
            <a href="/trade">Trade</a>
            <a href="/pool">Pool</a>
            <a href="/explore">Explore</a>
          </div>

          <div className="footer-section">
            <h3>Protocol</h3>
            <a href="/governance">Governance</a>
            <a href="/docs">Docs</a>
            <a href="/analytics">Analytics</a>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <a href="/help">Help Center</a>
            <a href="/contact">Contact Us</a>
            <a href="/bug-bounty">Bug Bounty</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 JYD Token. All rights reserved.</p>
          <div className="social-links">
            <a href="https://twitter.com">Twitter</a>
            <a href="https://discord.com">Discord</a>
            <a href="https://github.com">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
