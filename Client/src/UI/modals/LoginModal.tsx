import React from "react";
import MetaMaskIcon from "../../assets/metamask-icon.tsx";
import "../../themes/UI/modals/LoginModal.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => Promise<void>;
  isConnecting: boolean;
  error: string | null;
}

/**
 * LoginModal component renders a modal for connecting to Junkyard Dogs.
 *
 * @param {boolean} isOpen - Determines if the modal is open.
 * @param {() => void} onClose - Function to close the modal.
 * @param {() => Promise<void>} onConnect - Function to handle the connection process.
 * @param {boolean} isConnecting - Indicates if the connection process is ongoing.
 * @param {string} [error] - Optional error message to display if the connection fails.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if the modal is not open.
 */

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  isConnecting,
  error,
}) => {
  const handleConnect = async () => {
    await onConnect();
    onClose(); // Close modal after successful connection
  };

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
            onClick={handleConnect}
            disabled={isConnecting}
          >
            <MetaMaskIcon />
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
