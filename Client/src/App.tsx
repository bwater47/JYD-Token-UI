// Haven't added pages however adding an index.html at root of client directory, and setting up
// routing inside of the main.jsx
// then connecting the scripts path to the index.html file
// then configuring the vite setup to match the IP of the backend
// will achieve a connection to a backend repo with a server deployed (production/staging) or a server directory in the same repo.

import LoginButton from "./components/common/LoginButton";
import LoginModal from "./UI/modals/LoginModal";
import { useMetaMask } from "./hooks/useMetaMask";
import { useLoginModal } from "./hooks/useLoginModal";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { account, error: metamaskError } = useMetaMask();
  const {
    isOpen,
    openModal,
    closeModal,
    handleConnect,
    isConnecting,
    error: modalError,
  } = useLoginModal();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm" style={{ maxWidth: "400px" }}>
        <div className="card-header">
          <h5 className="card-title mb-0">JYD Token Interface</h5>
        </div>
        <div className="card-body">
          {!account ? (
            <LoginButton openModal={openModal} />
          ) : (
            <div className="alert alert-success">Connected: {account}</div>
          )}
          {metamaskError && (
            <div className="alert alert-danger mt-3">{metamaskError}</div>
          )}
        </div>
      </div>
      <LoginModal
        isOpen={isOpen}
        onClose={closeModal}
        onConnect={handleConnect}
        isConnecting={isConnecting}
        error={modalError}
      />
    </div>
  );
};

export default App;