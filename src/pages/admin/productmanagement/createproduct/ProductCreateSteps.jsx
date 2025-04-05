// components/Wizard/ProductCreateSteps.jsx
import BasicInfo from "./BasicInfo";
import ProductDetailsCapture from "./ProductDetailsCapture";
import ProductCreationReviewSubmit from "./ProductCreationReviewSubmit";

const ProductCreateSteps = [
  { label: "Basic Info", component: BasicInfo },
  { label: "Product Details", component: ProductDetailsCapture },
  { label: "Review & Submit", component: ProductCreationReviewSubmit },
];

export default ProductCreateSteps;