// components/ProductWizard/Step3FoodCompliance.jsx
import React, { useState, useEffect } from "react";
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

const FOOD_CATEGORIES = ["Snacks", "Beverages", "Dairy", "Bakery"];

export default function Step3FoodCompliance({ data, onNext, onBack, isLastStep }) {
    const [localData, setLocalData] = useState({
        dietType: data.dietType || "",
        flavour: data.flavour || "",
        ingredients: data.ingredients || "",
        legalDisclaimer: data.legalDisclaimer || "",
        allergens: data.allergens || ""
    });

    const [isFoodCategory, setIsFoodCategory] = useState(false);

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
            <Heading>Step 3: Food & Compliance</Heading>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label htmlFor="dietType">Diet Type</Label>
                        <Select
                            id="dietType"
                            name="dietType"
                            value={localData.dietType}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Keto">Keto</option>
                            <option value="Paleo">Paleo</option>
                        </Select>
                    </FormGroup>

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
                </Row>

                <FormGroup>
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Input
                        as="textarea"
                        rows={3}
                        id="ingredients"
                        name="ingredients"
                        value={localData.ingredients}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="allergens">Allergens</Label>
                    <Input
                        type="text"
                        id="allergens"
                        name="allergens"
                        placeholder="Comma-separated (e.g., milk, nuts)"
                        value={localData.allergens}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="legalDisclaimer">Legal Disclaimer</Label>
                    <Input
                        as="textarea"
                        rows={3}
                        id="legalDisclaimer"
                        name="legalDisclaimer"
                        value={localData.legalDisclaimer}
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
