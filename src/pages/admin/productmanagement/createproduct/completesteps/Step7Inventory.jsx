// components/ProductWizard/Step7Inventory.jsx
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

export default function Step7Inventory({ data, onNext, onBack, isLastStep }) {
    const [localData, setLocalData] = useState({
        quantityRemaining: data.quantityRemaining || "",
        storeId: data.storeId || "",
        unitCost: data.unitCost || "",
        supplierId: data.supplierId || "",
        reorderThreshold: data.reorderThreshold || "",
        batchNumber: data.batchNumber || "",
        productionDate: data.productionDate || "",
        expiryDate: data.expiryDate || "",
        storageCondition: data.storageCondition || "",
        storageLocation: data.storageLocation || ""
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
            <Heading>Step 7: Inventory</Heading>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label htmlFor="quantityRemaining">Quantity Remaining</Label>
                        <Input
                            type="number"
                            name="quantityRemaining"
                            value={localData.quantityRemaining}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="unitCost">Unit Cost</Label>
                        <Input
                            type="number"
                            name="unitCost"
                            value={localData.unitCost}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="storeId">Store ID</Label>
                        <Input
                            type="text"
                            name="storeId"
                            value={localData.storeId}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="supplierId">Supplier ID</Label>
                        <Input
                            type="text"
                            name="supplierId"
                            value={localData.supplierId}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="reorderThreshold">Reorder Threshold</Label>
                        <Input
                            type="number"
                            name="reorderThreshold"
                            value={localData.reorderThreshold}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="batchNumber">Batch Number</Label>
                        <Input
                            type="text"
                            name="batchNumber"
                            value={localData.batchNumber}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="productionDate">Production Date</Label>
                        <Input
                            type="date"
                            name="productionDate"
                            value={localData.productionDate}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                            type="date"
                            name="expiryDate"
                            value={localData.expiryDate}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="storageCondition">Storage Condition</Label>
                        <Input
                            type="text"
                            name="storageCondition"
                            value={localData.storageCondition}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="storageLocation">Storage Location</Label>
                        <Input
                            type="text"
                            name="storageLocation"
                            value={localData.storageLocation}
                            onChange={handleChange}
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
