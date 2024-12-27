import React from "react";
import { useLoginModal } from "../../auth/useLoginModal";
import "../themes/components/common/loginbutton.css";

const LoginButton: React.FC = () => {
  const { openModal } = useLoginModal();

  return (
    <button className="login-btn" onClick={openModal} aria-label="Login">
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
