// components/ProductWizard/Step1BasicInfo.jsx
import React, { useState } from "react";
import {
    Container,
    Heading,
    FormGroup,
    Form,
    Row,
    Label,
    Input,
} from "../ProductWizard.styles";
import { Button } from "../../../../../components/Button/Button";

export default function Step1BasicInfo({ data, onNext, onBack, isLastStep }) {
    const [localData, setLocalData] = useState({
        name: data.name || "",
        productSKU: data.productSKU || "",
        category: data.category || "",
        brand: data.brand || "",
        description: data.description || ""
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
            <Heading>Step 1: Basic Product Info</Heading>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={localData.name}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="productSKU">Product SKU</Label>
                        <Input
                            type="text"
                            id="productSKU"
                            name="productSKU"
                            value={localData.productSKU}
                            onChange={handleChange}
                            placeholder="Auto-generated if left blank"
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="category">Category</Label>
                        <Input
                            type="text"
                            id="category"
                            name="category"
                            value={localData.category}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                            type="text"
                            id="brand"
                            name="brand"
                            value={localData.brand}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        as="textarea"
                        rows={4}
                        id="description"
                        name="description"
                        value={localData.description}
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
