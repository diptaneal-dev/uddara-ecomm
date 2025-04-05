// pages/admin/create-product.jsx or similar
import WizardContainer from "../../../../components/Wizard/WizardContainer";
import ProductCreateSteps from "./ProductCreateSteps";

export default function CreateProductPage() {

  return (
    <WizardContainer
      steps={ProductCreateSteps}
      draftKey="product-create-draft"
      layout="vertical" 
    />
  );
}
