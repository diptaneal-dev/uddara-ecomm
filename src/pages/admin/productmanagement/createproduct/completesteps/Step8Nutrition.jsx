// components/ProductWizard/Step8Nutrition.jsx
import React, { useState, useEffect } from "react";
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

const FOOD_CATEGORIES = ["Snacks", "Beverages", "Dairy", "Bakery"];

export default function Step8Nutrition({ data, onNext, onBack, isLastStep }) {
    const [isFoodCategory, setIsFoodCategory] = useState(false);

    const [localData, setLocalData] = useState({
        caloriesPerUnit: data.caloriesPerUnit || "",
        fatPerUnit: data.fatPerUnit || "",
        proteinPerUnit: data.proteinPerUnit || "",
        carbohydratesPerUnit: data.carbohydratesPerUnit || "",
        sodiumPerUnit: data.sodiumPerUnit || "",
        sugarPerUnit: data.sugarPerUnit || "",
        unitOfMeasurement: data.unitOfMeasurement || ""
    });

    useEffect(() => {
        const category = data.category || "";
        setIsFoodCategory(FOOD_CATEGORIES.includes(category));
    }, [data.category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(localData);
    };

    if (!isFoodCategory) {
        // Skip step if not a food product
        onNext({});
        return null;
    }

    return (
        <Container>
            <Heading>Step 8: Nutrition Information</Heading>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label htmlFor="caloriesPerUnit">Calories</Label>
                        <Input
                            type="number"
                            name="caloriesPerUnit"
                            value={localData.caloriesPerUnit}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="fatPerUnit">Fat (g)</Label>
                        <Input
                            type="number"
                            name="fatPerUnit"
                            value={localData.fatPerUnit}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="proteinPerUnit">Protein (g)</Label>
                        <Input
                            type="number"
                            name="proteinPerUnit"
                            value={localData.proteinPerUnit}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="carbohydratesPerUnit">Carbohydrates (g)</Label>
                        <Input
                            type="number"
                            name="carbohydratesPerUnit"
                            value={localData.carbohydratesPerUnit}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup>
                        <Label htmlFor="sodiumPerUnit">Sodium (mg)</Label>
                        <Input
                            type="number"
                            name="sodiumPerUnit"
                            value={localData.sodiumPerUnit}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="sugarPerUnit">Sugar (g)</Label>
                        <Input
                            type="number"
                            name="sugarPerUnit"
                            value={localData.sugarPerUnit}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>

                <FormGroup>
                    <Label htmlFor="unitOfMeasurement">Unit of Measurement</Label>
                    <Input
                        type="text"
                        name="unitOfMeasurement"
                        placeholder="e.g., per 100g"
                        value={localData.unitOfMeasurement}
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
