import React from "react";
import MetaMaskIcon from "../../assets/metamask-icon.svg";
import "../../themes/UI/modals/LoginModal.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => Promise<void>;
  isConnecting: boolean;
  error: string | null;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  isConnecting,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Connect to Junkyard Dogs</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <button
            className="wallet-option"
            onClick={onConnect}
            disabled={isConnecting}
          >
            <img src={MetaMaskIcon} alt="MetaMask" className="wallet-icon" />
            <span>MetaMask</span>
            <span className="last-used">Last Used</span>
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
