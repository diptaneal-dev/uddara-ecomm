// components/ProductWizard/Step10Images.jsx
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

export default function Step10Images({ data, onNext, onBack, isLastStep }) {
    const [images, setImages] = useState(data.images || []);

    const handleChange = (index, value) => {
        const updated = [...images];
        updated[index] = value;
        setImages(updated);
    };

    const handleAddImage = () => {
        setImages([...images, ""]);
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ images });
    };

    return (
        <Container>
            <Heading>Step 10: Product Images</Heading>
            <Form onSubmit={handleSubmit}>
                {images.map((url, index) => (
                    <Row key={index}>
                        <FormGroup>
                            <Label>Image URL</Label>
                            <Input
                                type="text"
                                value={url}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        </FormGroup>
                        <Button type="button" onClick={() => handleRemoveImage(index)}>
                            Remove
                        </Button>
                    </Row>
                ))}

                <Button type="button" onClick={handleAddImage}>
                    + Add Image
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
