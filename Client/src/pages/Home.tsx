import { useState } from "react";
import LoginButton from "../components/common/Login";
import LoginModal from "../UI/modals/LoginModal";
import { useMetaMask } from "../hooks/useMetaMask";
import NFTGallery from "../components/features/NFT/NFTGallery";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account, loading, error, connectWallet } = useMetaMask();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-sm"
        style={{ maxWidth: account ? "800px" : "400px" }}
      >
        <div className="card-header">
          <h5 className="card-title mb-0">JYD Token Interface</h5>
        </div>
        <div className="card-body">
          <LoginButton account={account} onLogin={() => setIsModalOpen(true)} />
          {account && <NFTGallery />}
        </div>
      </div>
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={connectWallet}
        isConnecting={loading}
        error={error}
      />
    </div>
  );
};

export default Home;
