// components/ProductWizard/Step5PricingTax.jsx
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
} from "../ProductWizard.styles";
import { Button } from "../../../../../components/Button/Button";

export default function Step5PricingTax({ data, onNext, onBack, isLastStep }) {
    const [localData, setLocalData] = useState({
        basePrice: data.basePrice || "",
        oldPrice: data.oldPrice || "",
        price: data.price || "",
        discount: data.discount || "",
        wholesalePrice: data.wholesalePrice || "",
        currency: data.currency || "INR",
        unitOfMeasurement: data.unitOfMeasurement || "",
        minOrderQty: data.minOrderQty || "",
        taxCategory: data.taxCategory || ""
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
            <Heading>Step 5: Pricing & Tax</Heading>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label htmlFor="basePrice">Base Price</Label>
                        <Input
                            type="number"
                            id="basePrice"
                            name="basePrice"
                            value={localData.basePrice}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="price">Selling Price</Label>
                        <Input
                            type="number"
                            id="price"
                            name="price"
                            value={localData.price}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="oldPrice">Old Price (optional)</Label>
                        <Input
                            type="number"
                            id="oldPrice"
                            name="oldPrice"
                            value={localData.oldPrice}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="discount">Discount (%)</Label>
                        <Input
                            type="number"
                            id="discount"
                            name="discount"
                            value={localData.discount}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="wholesalePrice">Wholesale Price</Label>
                        <Input
                            type="number"
                            id="wholesalePrice"
                            name="wholesalePrice"
                            value={localData.wholesalePrice}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="minOrderQty">Min Order Quantity</Label>
                        <Input
                            type="number"
                            id="minOrderQty"
                            name="minOrderQty"
                            value={localData.minOrderQty}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="currency">Currency</Label>
                        <Select
                            id="currency"
                            name="currency"
                            value={localData.currency}
                            onChange={handleChange}
                        >
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="unitOfMeasurement">Unit of Measurement</Label>
                        <Input
                            type="text"
                            id="unitOfMeasurement"
                            name="unitOfMeasurement"
                            placeholder="e.g. per kg, per pack"
                            value={localData.unitOfMeasurement}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <FormGroup>
                    <Label htmlFor="taxCategory">Tax Category (HSN Code)</Label>
                    <Input
                        type="text"
                        id="taxCategory"
                        name="taxCategory"
                        placeholder="Enter HSN Code or Category"
                        value={localData.taxCategory}
                        onChange={handleChange}
                    />
                </FormGroup>

                <Row>
                    {onBack && (
                        <Button
                            $outline
                            $variant="primary"
                            color={({ theme }) => theme.colors.purple}
                            borderColor={({ theme }) => theme.colors.purple}
                            type="button"
                            onClick={onBack}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        $variant="primary"
                        bg={({ theme }) => theme.colors.pink}
                        type="submit"
                    >
                        {isLastStep ? "Submit" : "Next"}
                    </Button>
                </Row>
            </Form>
        </Container>
    );
}
