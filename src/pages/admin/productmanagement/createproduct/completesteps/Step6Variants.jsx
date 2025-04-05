// components/ProductWizard/Step6Variants.jsx
import React, { useState } from "react";
import {
    Container,
    Heading,
    FormGroup,
    Form,
    Row,
    Label,
    Input
} from "../ProductWizard.styles";
import { Button } from "../../../../../components/Button/Button";

export default function Step6Variants({ data, onNext, onBack, isLastStep }) {
    const [variants, setVariants] = useState(data.variants || []);

    const handleChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
    };

    const handleAddVariant = () => {
        setVariants([
            ...variants,
            {
                variantName: "",
                variantSKU: "",
                variantPrice: "",
                variantWeight: "",
                variantSize: "",
                variantColor: "",
                variantMaterial: "",
                stockQuantity: "",
                hsnCode: "",
                variantDescription: ""
            }
        ]);
    };

    const handleRemoveVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ variants });
    };

    return (
        <Container>
            <Heading>Step 6: Product Variants</Heading>
            <Form onSubmit={handleSubmit}>
                {variants.map((variant, index) => (
                    <div key={index} style={{ borderBottom: "1px solid #eee", marginBottom: "1.5rem", paddingBottom: "1.5rem" }}>
                        <Row>
                            <FormGroup>
                                <Label>Variant Name</Label>
                                <Input
                                    type="text"
                                    value={variant.variantName}
                                    onChange={(e) => handleChange(index, "variantName", e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Variant SKU</Label>
                                <Input
                                    type="text"
                                    value={variant.variantSKU}
                                    onChange={(e) => handleChange(index, "variantSKU", e.target.value)}
                                />
                            </FormGroup>
                        </Row>

                        <Row>
                            <FormGroup>
                                <Label>Variant Price</Label>
                                <Input
                                    type="number"
                                    value={variant.variantPrice}
                                    onChange={(e) => handleChange(index, "variantPrice", e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Stock Quantity</Label>
                                <Input
                                    type="number"
                                    value={variant.stockQuantity}
                                    onChange={(e) => handleChange(index, "stockQuantity", e.target.value)}
                                />
                            </FormGroup>
                        </Row>

                        <Row>
                            <FormGroup>
                                <Label>Weight</Label>
                                <Input
                                    type="text"
                                    value={variant.variantWeight}
                                    onChange={(e) => handleChange(index, "variantWeight", e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Size</Label>
                                <Input
                                    type="text"
                                    value={variant.variantSize}
                                    onChange={(e) => handleChange(index, "variantSize", e.target.value)}
                                />
                            </FormGroup>
                        </Row>

                        <Row>
                            <FormGroup>
                                <Label>Color</Label>
                                <Input
                                    type="text"
                                    value={variant.variantColor}
                                    onChange={(e) => handleChange(index, "variantColor", e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Material</Label>
                                <Input
                                    type="text"
                                    value={variant.variantMaterial}
                                    onChange={(e) => handleChange(index, "variantMaterial", e.target.value)}
                                />
                            </FormGroup>
                        </Row>

                        <Row>
                            <FormGroup>
                                <Label>HSN Code</Label>
                                <Input
                                    type="text"
                                    value={variant.hsnCode}
                                    onChange={(e) => handleChange(index, "hsnCode", e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Variant Description</Label>
                                <Input
                                    as="textarea"
                                    rows={2}
                                    value={variant.variantDescription}
                                    onChange={(e) => handleChange(index, "variantDescription", e.target.value)}
                                />
                            </FormGroup>
                        </Row>

                        <Button type="button" onClick={() => handleRemoveVariant(index)}>
                            Remove Variant
                        </Button>
                    </div>
                ))}

                <Button type="button" onClick={handleAddVariant}>
                    + Add Variant
                </Button>

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
