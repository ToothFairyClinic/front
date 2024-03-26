import { useEffect } from "react";
import { isLoggedInReactive } from "./modules/auth/store/reactive-vars";
import { Header } from "./common/components/header/header.component";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./modules/main/pages/main.page";
import { Footer } from "./common/components/footer/footer.component";
import { PriceListPage } from "./modules/price-list/pages/price-list.page";
import { ServicePage } from "./modules/services/pages/services.page";
import { ReviewsPage } from "./modules/reviews/pages/reviews.page";

export const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    isLoggedInReactive(Boolean(token));
  }, []);
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      {/* <CartSidebar /> */}
      <div className="flex-grow  ">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/price-list" element={<PriceListPage />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/review" element={<ReviewsPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
