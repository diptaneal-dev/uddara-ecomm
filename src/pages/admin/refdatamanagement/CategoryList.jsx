import React, { useState } from "react";
import {
    Container,
    Heading,
    FormGroup,
    Form,
    Row,
    Label,
    Input,
    Select,
    Button
} from "./RefData.styles";
import { addCategory } from "../../../services/RefDataService";
import { IconButton } from "../../../components/Button/IconButton";
import { XCircle } from "lucide-react";

const CATEGORY_TYPES = ["PRODUCT", "RESTAURANT", "SERVICE"];

const AddCategoryForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        icon: "",
        categoryType: "PRODUCT",
        sortOrder: 0,
        isActive: true,
        description: "",
        tags: "",
        storeId: "",
        subCategories: [{ name: "", slug: "", sortOrder: 0, isActive: true }]
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === "checkbox" ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: finalValue }));
    };

    const handleSubChange = (index, field, value) => {
        const updated = [...formData.subCategories];
        updated[index][field] = value;
        setFormData((prev) => ({
            ...prev,
            subCategories: updated
        }));
    };

    const addSubCategory = () => {
        setFormData((prev) => ({
            ...prev,
            subCategories: [...prev.subCategories, { name: "", slug: "", sortOrder: 0, isActive: true }]
        }));
    };

    const removeSubCategory = (index) => {
        const updated = formData.subCategories.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            subCategories: updated
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                subCategories: formData.subCategories.filter((sc) => sc.name.trim() !== "")
            };
            const response = await addCategory(payload);
            if (onSuccess) onSuccess();
            setFormData({
                name: "",
                slug: "",
                icon: "",
                categoryType: "PRODUCT",
                sortOrder: 0,
                isActive: true,
                description: "",
                tags: "",
                storeId: "",
                subCategories: [{ name: "", slug: "", sortOrder: 0, isActive: true }]
            });
        } catch (err) {
            alert("Error creating category.");
        }
    };

    return (
        <Container>
            <Heading>Add New Category</Heading>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label htmlFor="categoryType">Type</Label>
                        <Select
                            id="categoryType"
                            name="categoryType"
                            value={formData.categoryType}
                            onChange={handleChange}
                        >
                            {CATEGORY_TYPES.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Packaged Food"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="slug">Slug (optional)</Label>
                        <Input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="auto-generated if blank"
                        />
                    </FormGroup>

                </Row>
                <Row>

                    <FormGroup>
                        <Label htmlFor="icon">Icon (optional)</Label>
                        <Input
                            type="text"
                            id="icon"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            placeholder="e.g. Package, BookOpen"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="sortOrder">Sort Order</Label>
                        <Input
                            type="number"
                            id="sortOrder"
                            name="sortOrder"
                            value={formData.sortOrder}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="storeId">Store ID (optional)</Label>
                        <Input
                            type="text"
                            id="storeId"
                            name="storeId"
                            value={formData.storeId}
                            onChange={handleChange}
                            placeholder="leave blank for global"
                        />
                    </FormGroup>
                </Row>

                <FormGroup>
                    <Label htmlFor="description">Description (optional)</Label>
                    <Input
                        as="textarea"
                        rows={3}
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Helpful for POS staff or SEO"
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="snack,vegetarian,gluten-free"
                    />
                </FormGroup>

                <FormGroup>
                    <Label>
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                        />{" "}
                        Active
                    </Label>
                </FormGroup>

                <Heading style={{ fontSize: "1.1rem", marginTop: "2rem" }}>
                    Subcategories
                </Heading>

                <Button type="button" $variant="primary" onClick={addSubCategory} $fitContent>
                    + Add Subcategory
                </Button>

                {formData.subCategories.map((sub, idx) => (
                    <Row key={idx}>
                        <FormGroup>
                            <Label>Name #{idx + 1}</Label>
                            <Input
                                type="text"
                                value={sub.name}
                                onChange={(e) => handleSubChange(idx, "name", e.target.value)}
                                placeholder="Subcategory name"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Slug</Label>
                            <Input
                                type="text"
                                value={sub.slug}
                                onChange={(e) => handleSubChange(idx, "slug", e.target.value)}
                                placeholder="Optional"
                            />
                        </FormGroup>

                        {formData.subCategories.length > 1 && (
                            <IconButton
                                type="button"
                                onClick={() => removeSubCategory(idx)}
                                iconSize="sm"
                                color="#c00"
                                hoverColor="#fdd"
                            >
                                <XCircle />
                            </IconButton>
                        )}
                    </Row>
                ))}

                <Row style={{ marginTop: "1.5rem" }}>
                    <Button type="submit" $variant="primary" $fitContent>
                        Save Category
                    </Button>
                </Row>
            </Form>
        </Container>
    );
};

export default AddCategoryForm;
