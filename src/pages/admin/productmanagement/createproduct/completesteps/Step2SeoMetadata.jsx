// components/ProductWizard/Step2SeoMetadata.jsx
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

export default function Step2SeoMetadata({ data, onNext, onBack, isLastStep }) {
    const [localData, setLocalData] = useState({
        seoMetaTitle: data.seoMetaTitle || "",
        seoMetaDescription: data.seoMetaDescription || "",
        seoMetaKeywords: data.seoMetaKeywords || "",
        shareText: data.shareText || "",
        additionalInfo: data.additionalInfo || ""
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
            <Heading>Step 2: SEO & Metadata</Heading>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="seoMetaTitle">SEO Meta Title</Label>
                    <Input
                        type="text"
                        id="seoMetaTitle"
                        name="seoMetaTitle"
                        value={localData.seoMetaTitle}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="seoMetaDescription">SEO Meta Description</Label>
                    <Input
                        as="textarea"
                        rows={3}
                        id="seoMetaDescription"
                        name="seoMetaDescription"
                        value={localData.seoMetaDescription}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="seoMetaKeywords">SEO Meta Keywords</Label>
                    <Input
                        type="text"
                        id="seoMetaKeywords"
                        name="seoMetaKeywords"
                        value={localData.seoMetaKeywords}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="shareText">Share Text</Label>
                    <Input
                        type="text"
                        id="shareText"
                        name="shareText"
                        value={localData.shareText}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="additionalInfo">Additional Info</Label>
                    <Input
                        as="textarea"
                        rows={3}
                        id="additionalInfo"
                        name="additionalInfo"
                        value={localData.additionalInfo}
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
