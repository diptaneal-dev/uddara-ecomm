// components/ProductCreateWizard/ProductDetails.jsx
import React, { useState } from "react";
import {
  Container,
  Heading,
  FormGroup,
  Form,
  Row,
  Label,
  Input,
  Select
} from "./ProductWizard.styles";
import WizardActions from "../../../../components/Button/WizardActions";

const unitOptions = ["g", "kg", "ml", "l", "pcs"];
const itemFormOptions = ["solid", "powder", "liquid", "oil", "gas", "paste", "other"];

export default function ProductDetailsCapture({ data, onNext, onBack, isLastStep }) {
  const [localData, setLocalData] = useState({
    itemForm: data.itemForm || "solid",
    itemWeight: data.itemWeight || "",
    unitOfMeasurement: data.unitOfMeasurement || "g",
    itemVolume: data.itemVolume || "",
    netQuantity: data.netQuantity || "",
    flavour: data.flavour || "",
    dietType: data.dietType || "",
    numberOfItems: data.numberOfItems || "",
    numberOfPieces: data.numberOfPieces || "",
    itemPackageQuantity: data.itemPackageQuantity || "",
    packageInformation: data.packageInformation || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(localData);
  };

  const isVolumeForm = ["liquid", "oil", "gas"].includes(localData.itemForm);
  const isWeightForm = ["solid", "powder", "paste", "other"].includes(localData.itemForm);

  return (
    <Container>
      <Heading>Product Details (Food & Grocery)</Heading>
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup>
            <Label htmlFor="itemForm">Item Form</Label>
            <Select
              name="itemForm"
              id="itemForm"
              value={localData.itemForm}
              onChange={handleChange}
            >
              {itemFormOptions.map(form => (
                <option key={form} value={form}>
                  {form.charAt(0).toUpperCase() + form.slice(1)}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="netQuantity">Net Quantity</Label>
            <Input
              type="text"
              id="netQuantity"
              name="netQuantity"
              value={localData.netQuantity}
              onChange={handleChange}
              placeholder="e.g. 500g, 1L"
            />
          </FormGroup>
        </Row>

        {isWeightForm && (
          <Row>
            <FormGroup>
              <Label htmlFor="itemWeight">Item Weight</Label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Input
                  type="number"
                  id="itemWeight"
                  name="itemWeight"
                  value={localData.itemWeight}
                  onChange={handleChange}
                />
                <Select
                  name="unitOfMeasurement"
                  value={localData.unitOfMeasurement}
                  onChange={handleChange}
                  style={{ maxWidth: "100px" }}
                >
                  {["g", "kg"].map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </Select>
              </div>
            </FormGroup>
          </Row>
        )}

        {isVolumeForm && (
          <Row>
            <FormGroup>
              <Label htmlFor="itemVolume">Item Volume</Label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Input
                  type="number"
                  id="itemVolume"
                  name="itemVolume"
                  value={localData.itemVolume}
                  onChange={handleChange}
                />
                <Select
                  name="unitOfMeasurement"
                  value={localData.unitOfMeasurement}
                  onChange={handleChange}
                  style={{ maxWidth: "100px" }}
                >
                  {["ml", "l"].map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </Select>
              </div>
            </FormGroup>
          </Row>
        )}

        <Row>
          <FormGroup>
            <Label htmlFor="flavour">Flavour</Label>
            <Input
              type="text"
              id="flavour"
              name="flavour"
              value={localData.flavour}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="dietType">Diet Type</Label>
            <Input
              type="text"
              id="dietType"
              name="dietType"
              value={localData.dietType}
              onChange={handleChange}
              placeholder="e.g. Vegetarian, Vegan"
            />
          </FormGroup>
        </Row>

        <Row>
          <FormGroup>
            <Label htmlFor="numberOfItems">Number of Items</Label>
            <Input
              type="number"
              id="numberOfItems"
              name="numberOfItems"
              value={localData.numberOfItems}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="numberOfPieces">Number of Pieces</Label>
            <Input
              type="number"
              id="numberOfPieces"
              name="numberOfPieces"
              value={localData.numberOfPieces}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>

        <Row>
          <FormGroup>
            <Label htmlFor="itemPackageQuantity">Package Quantity</Label>
            <Input
              type="number"
              id="itemPackageQuantity"
              name="itemPackageQuantity"
              value={localData.itemPackageQuantity}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="packageInformation">Package Type</Label>
            <Input
              type="text"
              id="packageInformation"
              name="packageInformation"
              value={localData.packageInformation}
              onChange={handleChange}
              placeholder="e.g. Bottle, Bag, Box"
            />
          </FormGroup>
        </Row>

        <WizardActions onBack={onBack} isLastStep={isLastStep} />
      </Form>
    </Container>
  );
}
