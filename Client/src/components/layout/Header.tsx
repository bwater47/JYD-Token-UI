import { Link } from "react-router-dom";
import "../../styles/components/layout/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="header-nav">
          <div className="header-left">
            <Link to="/" className="header-logo">
              {/* Add your logo here */}
              <span className="logo-text">JYD Token</span>
            </Link>
          </div>

          <div className="header-center">
            <Link to="/trade" className="nav-link">
              Trade
            </Link>
            <Link to="/pool" className="nav-link">
              Pool
            </Link>
            <Link to="/explore" className="nav-link">
              Explore
            </Link>
          </div>

          <div className="header-right">
            <button className="connect-button">Connect Wallet</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
