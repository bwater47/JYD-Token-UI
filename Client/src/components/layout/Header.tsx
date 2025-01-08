import { Link } from "react-router-dom";
import { useMetaMask } from "../../hooks/useMetaMask";
import LoginButton from "../common/Login";
import "../../styles/components/layout/Header.css";

const Header = () => {
  const { account } = useMetaMask();

  return (
    <header className="header">
      <div className="header-content">
        <nav className="header-nav">
          <div className="header-left">
            <Link to="/" className="logo">
              JYD Token
            </Link>
            <div className="nav-links">
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
          </div>

          <div className="header-right">
            <LoginButton account={account} onLogin={() => {}} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
