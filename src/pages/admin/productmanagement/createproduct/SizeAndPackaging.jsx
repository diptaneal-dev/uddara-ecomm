// components/ProductCreateWizard/SizeAndPackaging.jsx
import React, { useState } from "react";
import {
  Container,
  Heading,
  FormGroup,
  Form,
  Row,
  Label,
  Input
} from "./ProductWizard.styles";
import WizardActions from "../../../../components/Button/WizardActions";

export default function SizeAndPackaging({ data, onNext, onBack, isLastStep }) {
  const [localData, setLocalData] = useState({
    itemWeight: data.itemWeight || "",
    netQuantity: data.netQuantity || "",
    numberOfItems: data.numberOfItems || "",
    numberOfPieces: data.numberOfPieces || "",
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

  return (
    <Container>
      <Heading>Size & Packaging</Heading>
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup>
            <Label htmlFor="itemWeight">Item Weight</Label>
            <Input
              type="number"
              id="itemWeight"
              name="itemWeight"
              value={localData.itemWeight}
              onChange={handleChange}
              placeholder="e.g., 500 (grams)"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="netQuantity">Net Quantity</Label>
            <Input
              type="text"
              id="netQuantity"
              name="netQuantity"
              value={localData.netQuantity}
              onChange={handleChange}
              placeholder="e.g., 500g, 1L"
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

        <FormGroup>
          <Label htmlFor="packageInformation">Package Type</Label>
          <Input
            type="text"
            id="packageInformation"
            name="packageInformation"
            value={localData.packageInformation}
            onChange={handleChange}
            placeholder="e.g., Box, Pouch, Bottle"
          />
        </FormGroup>

        <WizardActions onBack={onBack} isLastStep={isLastStep} />
      </Form>
    </Container>
  );
}
