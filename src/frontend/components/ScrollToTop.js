import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollToTopRoutes = [
  "/",
  "/about",
  "/cart",
  "/all-dish-detail",
  "/become-a-chef",
  "/faqs",
  "/checkout",
  "/order-summary",
  "/privacy-policy",
  "/terms-of-servies",
  "/homemade-food-delivery",
  '/all-chef',
]; // Routes to scroll to top

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const shouldScrollToTop = scrollToTopRoutes.includes(pathname);

    if (shouldScrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null; // No need to render any UI
};

export default ScrollToTop;
