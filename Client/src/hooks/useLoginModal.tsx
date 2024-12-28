import { useState } from "react";
import { useMetaMask } from "./useMetaMask";

export const useLoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { connectWallet, loading, error } = useMetaMask();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConnect = async () => {
    await connectWallet();
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    handleConnect,
    isConnecting: loading,
    error,
  };
};
