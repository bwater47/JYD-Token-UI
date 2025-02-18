import React from "react";
import "../../styles/components/common/Login.css";

interface LoginButtonProps {
  account: string | null;
  onLogin: () => void;
}

/**
 * Renders a button that handles wallet connection status
 * @param account Connected wallet address
 * @param onLogin Callback function for login action
 */

const LoginButton: React.FC<LoginButtonProps> = ({ account, onLogin }) => {
  const copyAddress = async () => {
    if (account) {
      await navigator.clipboard.writeText(account);
    }
  };

  return account ? (
    <div className="connected-status">
      <span className="address">
        {`${account.slice(0, 6)}...${account.slice(-4)}`}
      </span>
      <button
        className="copy-button"
        onClick={copyAddress}
        aria-label="Copy address"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>
    </div>
  ) : (
    <button className="login-btn" onClick={onLogin} aria-label="Login">
      <span>Login</span>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
      </svg> */}
    </button>
  );
};

export default LoginButton;
