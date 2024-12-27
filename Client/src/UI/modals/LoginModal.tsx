import React from "react";
import { useLoginModal } from "../../auth/useLoginModal";
import MetaMaskIcon from "../../assets/metamask-icon.svg";
import "./LoginModal.css";

const LoginModal: React.FC = () => {
  const { isOpen, closeModal, handleConnect, isConnecting, error } =
    useLoginModal();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Connect to Junkyard Dogs</h2>
          <button className="close-button" onClick={closeModal}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <button
            className="wallet-option"
            onClick={handleConnect}
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
