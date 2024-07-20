import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollToTopRoutes = [
  "/",
  "/about",
  "/cart",
  "/all-dish-detail",
  "/become-a-chef",
  "/faqs",
  "/checkout*",
  "/order-summary",
  "/privacy-policy",
  "/terms-of-servies",
  "/homemade-food-delivery",
  "/all-chef*",
  "/shef-detail*",
  "/dish-detail-single*",
  "/categorize-dishes*",
  "/profile",
  "/order-summary",
  // Dashboard routes
  "/shef/dashboard",
  "/shef/profile",
  "/shef/my-menu",
  "/shef/order",
  "/shef/sales-statment",
  "/shef/order-review",
  "/shef/coupon",
  "/shef/order-summary",
]; // Routes to scroll to top

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Convert routes with wildcards to regex patterns
    const regexPatterns = scrollToTopRoutes.map(
      (route) => new RegExp(`^${route.replace("*", ".*")}$`)
    );

    // Check if current path matches any of the regex patterns
    const shouldScrollToTop = regexPatterns.some((regex) =>
      regex.test(pathname)
    );

    // console.log("Pathname == ", pathname);
    if (shouldScrollToTop) {
      // console.log("Path matched ", shouldScrollToTop);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null; // No need to render any UI
};

export default ScrollToTop;
