// components/ProductWizard/Step4SizePackaging.jsx
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

export default function Step4SizePackaging({ data, onNext, onBack, isLastStep }) {
    const [localData, setLocalData] = useState({
        itemWeight: data.itemWeight || "",
        netQuantity: data.netQuantity || "",
        numberOfItems: data.numberOfItems || "",
        itemPackageQuantity: data.itemPackageQuantity || "",
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
            <Heading>Step 4: Size & Packaging</Heading>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label htmlFor="itemWeight">Item Weight (in grams or kg)</Label>
                        <Input
                            type="number"
                            id="itemWeight"
                            name="itemWeight"
                            value={localData.itemWeight}
                            onChange={handleChange}
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
                            placeholder="e.g. 500g, 1L"
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
                        <Label htmlFor="itemPackageQuantity">Item Package Quantity</Label>
                        <Input
                            type="number"
                            id="itemPackageQuantity"
                            name="itemPackageQuantity"
                            value={localData.itemPackageQuantity}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <Row>
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

                    <FormGroup>
                        <Label htmlFor="packageInformation">Package Information</Label>
                        <Input
                            type="text"
                            id="packageInformation"
                            name="packageInformation"
                            value={localData.packageInformation}
                            onChange={handleChange}
                            placeholder="Box, Bag, Bottle, etc."
                        />
                    </FormGroup>
                </Row>

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
