// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './frontend/pages/Home'
import About from './frontend/pages/About';
import SignIn from './frontend/pages/SignIn';
import SignUp from './frontend/pages/SignUp';
import BecomeChef from './frontend/pages/BecomeChef';
import ShefDetailPage from './frontend/pages/ShefDetailPage';
import CartPage from './frontend/pages/CartPage';
import Checkout from './frontend/pages/Checkout';
import OrderSummary from './frontend/pages/OrderSummary';
import Profile from './shef_dashboard/pages/Profile';
import Dashboard from './shef_dashboard/pages/Dashboard';
import MyMenu from './shef_dashboard/pages/MyMenu';
import Order from './shef_dashboard/pages/Order';
import SalesStament from './shef_dashboard/pages/SalesStament';
import OrderReview from './shef_dashboard/pages/OrderReview';
import AllDishDetail from './frontend/pages/AllDishDetail';
import DishDetailSingle from './frontend/pages/DishDetailSingle';
import TermsOfServices from './frontend/pages/TermsOfServices';
import PrivacyPolicy from './frontend/pages/PrivacyPolicy';
import HomeFoodDelivery from './frontend/pages/HomeFoodDelivery';
import Faqs from './frontend/pages/Faqs';
import { useEffect } from "react";
import AuthProtected from "./protected_route/AuthProtected";
import ShefProtected from "./protected_route/ShefProtected";
import ScrollToTop from "./frontend/components/ScrollToTop";
import CategorizeDishes from "./frontend/pages/CategorizeDishes";
import AllChef from "./frontend/pages/AllChef";
import ShefCoupon from "./shef_dashboard/pages/ShefCoupon";
import UserOrder from "./frontend/pages/UserOrder";
import ShefOrderSummary from "./shef_dashboard/pages/ShefOrderSummary";

function App() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  return <BrowserRouter>
    <ScrollToTop/>
    <Routes>
      {/* FRONTEND ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/become-a-chef" element={<BecomeChef />} />
      <Route path="/shef-detail/:chefId?" element={<ShefDetailPage />} />
      <Route path="/all-dish-detail" element={<AllDishDetail />} />
      <Route path="/dish-detail-single/:dishId" element={<DishDetailSingle />} />
      <Route path="/terms-of-servies" element={<TermsOfServices />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/homemade-food-delivery" element={<HomeFoodDelivery />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/categorize-dishes/:foodCategoryId?" element={<CategorizeDishes />} />
      <Route path="/all-chef" element={<AllChef />} />
      {/* Protected Route */}
      <Route element={<AuthProtected/>}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/:chefId" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order" element={<UserOrder />} />
      </Route>

      {/* SHEF DASHBOARD ROUTES */}
      <Route element={<ShefProtected />}>
        <Route path="/shef/dashboard" element={<Dashboard />} />
        <Route path="/shef/profile" element={<Profile />} />
        <Route path="/shef/my-menu" element={<MyMenu />} />
        <Route path="/shef/order" element={<Order />} />
        <Route path="/shef/sales-statment" element={<SalesStament />} />
        <Route path="/shef/order-review" element={<OrderReview />} />
        <Route path="/shef/coupon" element={<ShefCoupon />} />
        <Route path="/shef/order-summary" element={<ShefOrderSummary />} />
      </Route>

    </Routes>
  </BrowserRouter>
}

export default App;
