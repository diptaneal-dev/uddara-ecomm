import { useState } from "react";
import {
    Container,
    Heading,
    FormGroup,
    Form,
    Label,
    Input,
    Select,
    Row
} from "./InviteUserScreen.styles";
import { Button } from "../../../components/Button/Button";
import userService from "../../../services/UserService";

const ROLE_OPTIONS = [
    "SUPERADMIN",
    "SUPPORT",
    "GROUPADMIN",
    "STOREADMIN",
    "STAFF",
    "CUSTOMER",
    "GUEST"
];

const SCOPE_TYPES = ["PLATFORM", "GROUP", "STORE"];

const InviteUserScreen = () => {
    const [form, setForm] = useState({
        email: "",
        role: "STAFF",
        scopeType: "STORE",
        scopeId: "",
        expiration: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // Reset scopeId if scopeType is changed
        if (name === "scopeType") {
            setForm((prev) => ({ ...prev, scopeId: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Inviting user with:", form);

        try {
            await userService.sendInvitation(form);
            alert("Invitation sent successfully!");
        } catch (err) {
            alert(`Error: ${err?.response?.data || err.message}`);
        }
    };

    return (
        <Container>
            <Heading>Invite New User</Heading>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <Row>
                    <FormGroup>
                        <Label>Role</Label>
                        <Select name="role" value={form.role} onChange={handleChange}>
                            {ROLE_OPTIONS.map((role) => (
                                <option key={role} value={role}>
                                    {role.charAt(0) + role.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label>Scope Type</Label>
                        <Select name="scopeType" value={form.scopeType} onChange={handleChange}>
                            {SCOPE_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type.charAt(0) + type.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                </Row>

                {form.scopeType !== "PLATFORM" && (
                    <FormGroup>
                        <Label>
                            {form.scopeType === "GROUP" ? "Store Group ID" : "Store ID"}
                        </Label>
                        <Input
                            name="scopeId"
                            value={form.scopeId}
                            onChange={handleChange}
                            placeholder={`Enter ${form.scopeType.toLowerCase()} ID`}
                            required
                        />
                    </FormGroup>
                )}

                <FormGroup>
                    <Label>Invite Expiration (optional)</Label>
                    <Input
                        type="date"
                        name="expiration"
                        value={form.expiration}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup style={{ alignItems: "flex-end" }}>
                    <Button type="submit" $size="md" $variant="primary">
                        Send Invitation
                    </Button>
                </FormGroup>
            </Form>
        </Container>
    );
};

export default InviteUserScreen;
