import { useState, useEffect } from "react";

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
import storeService from "../../../services/StoreService";

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

const ROLE_SCOPE_MAP = {
    PLATFORM: ["SUPERADMIN", "SUPPORT"],
    GROUP: ["GROUPADMIN"],
    STORE: ["STOREADMIN", "STAFF"]
};


const InviteUserScreen = () => {
    const [storeOptions, setStoreOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [availableDomains, setAvailableDomains] = useState([]);
    const [overrideDomain, setOverrideDomain] = useState(false);

    const [form, setForm] = useState({
        email: "",
        role: "STAFF",
        scopeType: "STORE",
        scopeId: "",
        expiration: "",
        domain: ""
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [stores, groups] = await Promise.all([
                    storeService.getMyStores(),
                    storeService.getMyStoreGroups()
                ]);
                setStoreOptions(stores || []);
                setGroupOptions(groups || []);
            } catch (error) {
                console.error("Failed to load stores/groups:", error);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchDomains = async () => {
            if (!form.scopeId) return;

            let domains = [];

            if (form.scopeType === "STORE") {
                const stores = await storeService.getMyStores();
                const matched = stores.find((s) => s.id.toString() === form.scopeId);
                if (matched?.domain) domains.push(matched.domain);
            }

            if (form.scopeType === "GROUP") {
                const groups = await storeService.getMyStoreGroups();
                const matched = groups.find((g) => g.id.toString() === form.scopeId);
                if (matched?.domain) domains.push(matched.domain);
            }

            setAvailableDomains(domains);
        };

        fetchDomains();
    }, [form.scopeType, form.scopeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            let updatedForm = { ...prev, [name]: value };

            if (name === "scopeType") {
                // Reset scopeId because scope context has changed
                updatedForm.scopeId = "";

                // Validate role: if current role isn't valid for new scope, default to first valid
                const validRoles = ROLE_SCOPE_MAP[value];
                if (!validRoles.includes(prev.role)) {
                    updatedForm.role = validRoles[0];
                }
            }

            return updatedForm;
        });
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
                        <Label>Scope Type</Label>
                        <Select name="scopeType" value={form.scopeType} onChange={handleChange}>
                            {SCOPE_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type.charAt(0) + type.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label>Role</Label>
                        <Select name="role" value={form.role} onChange={handleChange}>
                            {ROLE_SCOPE_MAP[form.scopeType].map((role) => (
                                <option key={role} value={role}>
                                    {role.charAt(0) + role.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                </Row>

                {form.scopeType !== "PLATFORM" && (
                    <FormGroup>
                        <Label>
                            {form.scopeType === "GROUP" ? "Select Store Group" : "Select Store"}
                        </Label>
                        <Select
                            name="scopeId"
                            value={form.scopeId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select --</option>
                            {(form.scopeType === "GROUP" ? groupOptions : storeOptions).map((item) => (
                                <option key={item.id} value={item.id}>
                                    {form.scopeType === "STORE"
                                        ? `${item.storeName} (${item.id})`
                                        : `${item.name} (${item.id})`}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                )}

                {form.scopeType !== "PLATFORM" && (
                    <FormGroup>
                        <Label>Domain / Subdomain</Label>

                        {!overrideDomain && availableDomains.length > 0 ? (
                            <Select
                                name="domain"
                                value={form.domain}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Domain --</option>
                                {availableDomains.map((domain) => (
                                    <option key={domain} value={domain}>
                                        {domain}
                                    </option>
                                ))}
                            </Select>
                        ) : (
                            <Input
                                type="text"
                                name="domain"
                                value={form.domain}
                                onChange={handleChange}
                                placeholder="e.g., custom.mystore.com"
                                required
                            />
                        )}

                        <div style={{ marginTop: "0.5rem" }}>
                            <Label style={{ fontWeight: "400", fontSize: "0.8rem" }}>
                                <input
                                    type="checkbox"
                                    checked={overrideDomain}
                                    onChange={(e) => setOverrideDomain(e.target.checked)}
                                    style={{ marginRight: "0.4rem" }}
                                />
                                Override and enter a custom domain
                            </Label>
                        </div>
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
