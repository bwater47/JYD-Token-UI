import { Outlet } from "react-router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
