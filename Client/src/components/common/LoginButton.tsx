/**
 * LoginButton component.
 *
 * This component renders a button that allows users to log in or displays the connected account status.
 *
 * @component
 * @example
//  * // Usage example:
//  * // <LoginButton account={account} onLogin={handleLogin} />
 *
 * @param {LoginButtonProps} props - The props for the LoginButton component.
 * @param {string | null} props.account - The account address of the connected user. If null, the user is not logged in.
 * @param {() => void} props.onLogin - The function to call when the login button is clicked.
 *
 * @returns {JSX.Element} The rendered LoginButton component.
 *
 * @remarks
 * - If the user is logged in (i.e., `account` is not null), the component displays the account address and a button to copy the address to the clipboard.
 * - If the user is not logged in (i.e., `account` is null), the component displays a login button.
 * - The `copyAddress` function copies the account address to the clipboard when the copy button is clicked.
 * - The `onLogin` function is called when the login button is clicked.
 */
import React from "react";
import "../../themes/components/common/LoginButton.css";

// This LoginButton component is a simple example of a React functional component with an event handler.
// When the button is clicked, it triggers the handleClick function, which logs a message to the console.
// This is a basic starting point, and you can expand the functionality as needed, such as integrating it with authentication logic or styling it with CSS.
// Although to note the useMetaMask hook which handled authentication on its own because its a plugin is inside the app.jsx for reference.
interface LoginButtonProps {
  account: string | null;
  onLogin: () => void;
}

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
      <svg
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
      </svg>
    </button>
  );
};

export default LoginButton;
