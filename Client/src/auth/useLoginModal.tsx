import { useState } from "react";
import { useMetaMask } from "../hooks/useMetaMask";

interface UseLoginModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isConnecting: boolean;
  error: string | null;
  handleConnect: () => Promise<void>;
}

export const useLoginModal = (): UseLoginModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const { connectWallet, loading: isConnecting, error } = useMetaMask();

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
    isConnecting,
    error,
    handleConnect,
  };
};
