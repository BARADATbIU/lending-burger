import initMap from "./modules/initMap";
import mobileMenu from "./modules/mobileMenu";
import accordionTeam from "./modules/accordionTeam";
import accordionMenu from "./modules/accordionMenu";
import popupReview from "./modules/popupReview";
import orderForm from "./modules/orderForm";
import showIngred from "./modules/showIngred";
import mySlider from "./modules/mySlider";
import onePageScroll from "./modules/onePageScroll";

window.addEventListener("DOMContentLoaded", () => {
  initMap();

  mobileMenu();

  accordionTeam();

  accordionMenu();

  popupReview();

  showIngred();

  mySlider();

  onePageScroll();

  orderForm();
});
