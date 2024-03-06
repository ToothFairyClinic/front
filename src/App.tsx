import { useEffect } from "react";
import { isLoggedInReactive } from "./modules/auth/store/reactive-vars";
import { Header } from "./common/components/header/header.component";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./modules/main/pages/main.page";
import { Footer } from "./common/components/footer/footer.component";

export const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    isLoggedInReactive(Boolean(token));
  }, []);
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      {/* <CartSidebar /> */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
