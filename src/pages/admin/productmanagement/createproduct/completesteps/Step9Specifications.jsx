// components/ProductWizard/Step9Specifications.jsx
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

const dataTypes = ["STRING", "NUMBER", "BOOLEAN", "DATE"];

export default function Step9Specifications({ data, onNext, onBack, isLastStep }) {
    const [specs, setSpecs] = useState(data.specifications || []);

    const handleChange = (index, field, value) => {
        const updated = [...specs];
        updated[index][field] = value;
        setSpecs(updated);
    };

    const handleAddSpec = () => {
        setSpecs([
            ...specs,
            { specKey: "", specValue: "", dataType: "STRING" }
        ]);
    };

    const handleRemoveSpec = (index) => {
        setSpecs(specs.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ specifications: specs });
    };

    return (
        <Container>
            <Heading>Step 9: Specifications</Heading>
            <Form onSubmit={handleSubmit}>
                {specs.map((spec, index) => (
                    <div key={index} style={{ borderBottom: "1px solid #eee", marginBottom: "1.5rem", paddingBottom: "1.5rem" }}>
                        <Row>
                            <FormGroup>
                                <Label>Key</Label>
                                <Input
                                    type="text"
                                    value={spec.specKey}
                                    onChange={(e) => handleChange(index, "specKey", e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Value</Label>
                                <Input
                                    type="text"
                                    value={spec.specValue}
                                    onChange={(e) => handleChange(index, "specValue", e.target.value)}
                                />
                            </FormGroup>
                        </Row>

                        <FormGroup>
                            <Label>Data Type</Label>
                            <Select
                                value={spec.dataType}
                                onChange={(e) => handleChange(index, "dataType", e.target.value)}
                            >
                                {dataTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </Select>
                        </FormGroup>

                        <Button type="button" onClick={() => handleRemoveSpec(index)}>
                            Remove
                        </Button>
                    </div>
                ))}

                <Button type="button" onClick={handleAddSpec}>
                    + Add Specification
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
