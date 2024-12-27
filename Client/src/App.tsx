import React from "react";
import { useMetaMask } from "./hooks/useMetaMask";
import LoginModal from "./UI/modals/LoginModal";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { account, connectWallet, error } = useMetaMask();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm" style={{ maxWidth: "400px" }}>
        <div className="card-header">
          <h5 className="card-title mb-0">JYD Token Interface</h5>
        </div>
        <div className="card-body">
          {!account ? (
            <LoginModal onClick={connectWallet} />
          ) : (
            <div className="alert alert-success">Connected: {account}</div>
          )}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
