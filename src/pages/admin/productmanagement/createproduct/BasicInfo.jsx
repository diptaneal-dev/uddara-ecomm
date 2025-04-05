// components/ProductCreateWizard/BasicInfo.jsx
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
import HSNLookupModal from "../../../../functional-components/HSNCode/HSNLookupModal";
import { Button } from "../../../../components/Button/Button";

export default function BasicInfo({ data, onNext, onBack, isLastStep }) {
    const [showHSNModal, setShowHSNModal] = useState(false);

    const [localData, setLocalData] = useState({
        name: data.name || "",
        productSKU: data.productSKU || "",
        brand: data.brand || "",
        category: data.category || "",
        description: data.description || "",
        hsn: data.hsn || "",
        shareText: data.shareText || ""
    });

    const handleHSNSelect = (code) => {
        setLocalData((prev) => ({ ...prev, hsn: code }));
        setShowHSNModal(false);
    };

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
            <Heading>Basic Product Information</Heading>
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
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                            type="text"
                            id="brand"
                            name="brand"
                            value={localData.brand}
                            onChange={handleChange}
                        />
                    </FormGroup>

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
                </Row>

                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        as="textarea"
                        rows={4}
                        id="description"
                        name="description"
                        placeholder="About this item....provide in bullet points"
                        value={localData.description}
                        onChange={handleChange}
                    />
                </FormGroup>

                <Row>
                    <FormGroup>
                        <Label htmlFor="hsn">HSN Code</Label>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <Input
                                type="text"
                                id="hsn"
                                name="hsn"
                                value={localData.hsn}
                                onChange={handleChange}
                                placeholder="e.g. 2106"
                                style={{ flex: 1 }}
                            />
                            <Button
                                type="button"
                                onClick={() => setShowHSNModal(true)}
                                $variant="primary"
                                $size="sm"
                            >
                                Lookup
                            </Button>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="shareText">Share Text</Label>
                        <Input
                            type="text"
                            id="shareText"
                            name="shareText"
                            value={localData.shareText}
                            onChange={handleChange}
                            placeholder="One-liner for sharing"
                        />
                    </FormGroup>
                </Row>

                <WizardActions onBack={onBack} isLastStep={isLastStep} />
            </Form>

            {showHSNModal && (
                <HSNLookupModal
                    onClose={() => setShowHSNModal(false)}
                    onSelect={handleHSNSelect}
                />
            )}

        </Container>
    );
}
