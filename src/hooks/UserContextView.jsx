import React, { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import {
    Card,
    CardContent,
    Badge,
    Separator,
    TabList,
    TabTrigger,
    TabLayout,
    SectionHeading,
    KeyValueGroup,
    KeyValueItem,
    Key,
    Value,
    GridRow,
    TableWrapper, 
    TableCell, 
    TableRow, 
    TableBody, 
    TableHeader, 
    TableHead, 
    StyledTable

} from "./UserContextView.styles";

import {
    Root as TabsRoot,
    Content as TabsContent,
} from "@radix-ui/react-tabs";

const UserContextView = () => {
    const {
        user,
        stores,
        storeGroups,
        currentStoreId,
        getCurrentStore,
        getUserPreferences,
        getCurrentStorePolicies,
        setCurrentStoreId,
        isSuperAdmin,
        hasRole,
    } = useUserContext();

    const [tab, setTab] = useState("account");
    const scopedRoles = user?.scopedRoles ?? [];
    const currentStore = getCurrentStore();
    const preferences = getUserPreferences("global") || {};
    const policies = getCurrentStorePolicies();

    const allGuest = scopedRoles.length > 0 && scopedRoles.every((r) => r.role === "GUEST");

    useEffect(() => {
        if (!currentStoreId && stores.length > 0) {
            const preferred = stores.find((s) => s.role !== "GUEST") || stores[0];
            setCurrentStoreId(preferred.id);
        }
    }, [currentStoreId, stores, setCurrentStoreId]);

    if (!user || allGuest) {
        return (
            <div className="p-6 max-w-5xl mx-auto text-center">
                <h1 className="text-xl font-semibold text-red-600">Access Denied</h1>
                <p className="mt-2">Guest users are not allowed to view this page.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">👤 User Settings</h1>
            <Separator className="mb-6" />

            <TabsRoot value={tab} onValueChange={setTab}>
                <TabList>
                    <TabTrigger value="account">Account</TabTrigger>
                    <TabTrigger value="access">Access</TabTrigger>
                    <TabTrigger value="preferences">Preferences</TabTrigger>
                </TabList>

                <TabsContent value="account">
                    <GridRow>
                        <SectionHeading>User Info</SectionHeading>
                        <KeyValueGroup>
                            <KeyValueItem>
                                <Key>Name:</Key>
                                <Value>{user.fullName}</Value>
                            </KeyValueItem>
                            <KeyValueItem>
                                <Key>Email:</Key>
                                <Value>{user.email}</Value>
                            </KeyValueItem>
                            <KeyValueItem>
                                <Key>Current Store:</Key>
                                <Value>{currentStore?.storeName || "Not Selected"}</Value>
                            </KeyValueItem>
                            <KeyValueItem>
                                <Key>User ID:</Key>
                                <Value>{user.userId}</Value>
                            </KeyValueItem>
                            <KeyValueItem style={{ alignItems: "flex-start" }}>
                                <Key>Scoped Roles:</Key>
                                <Value>
                                    {scopedRoles.length === 0 ? (
                                        <p>No scoped roles</p>
                                    ) : (
                                        <TableWrapper>
                                            <TableHead>
                                                <tr>
                                                    <TableHeader>Role</TableHeader>
                                                    <TableHeader>Scope Type</TableHeader>
                                                    <TableHeader>Scope ID</TableHeader>
                                                </tr>
                                            </TableHead>
                                            <TableBody>
                                                {scopedRoles.map((r, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{r.role}</TableCell>
                                                        <TableCell>{r.scopeType}</TableCell>
                                                        <TableCell>{r.scopeId}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </TableWrapper>
                                    )}
                                </Value>
                            </KeyValueItem>
                        </KeyValueGroup>
                    </GridRow>
                </TabsContent>

                <TabsContent value="access">
                    {(isSuperAdmin() || hasRole("SUPPORT", "PLATFORM") || hasRole("GROUPADMIN", "GROUP") || hasRole("STOREADMIN", "STORE")) ? (
                        <>
                            <GridRow>
                                <SectionHeading>Store Access</SectionHeading>
                                {stores.length === 0 ? (
                                    <p>No stores found.</p>
                                ) : (
                                    <TableWrapper>
                                        <TableHead>
                                            <tr>
                                                <TableHeader>Store Name</TableHeader>
                                                <TableHeader>Store ID</TableHeader>
                                                <TableHeader>Group ID</TableHeader>
                                                <TableHeader>Role</TableHeader>
                                            </tr>
                                        </TableHead>
                                        <TableBody>
                                            {stores.map((store) => (
                                                <TableRow key={store.id}>
                                                    <TableCell>{store.storeName}</TableCell>
                                                    <TableCell>{store.id}</TableCell>
                                                    <TableCell>{store.storeGroupId}</TableCell>
                                                    <TableCell>{store.role}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </TableWrapper>
                                )}
                            </GridRow>
                            <GridRow>
                                <SectionHeading>Store Groups Access</SectionHeading>
                                {storeGroups.length === 0 ? (
                                    <p>No groups found.</p>
                                ) : (
                                    <TableWrapper>
                                        <TableHead>
                                            <tr>
                                                <TableHeader>Group Name</TableHeader>
                                                <TableHeader>Group ID</TableHeader>
                                                <TableHeader>Region</TableHeader>
                                                <TableHeader>Country</TableHeader>
                                                <TableHeader>Role</TableHeader>
                                            </tr>
                                        </TableHead>
                                        <TableBody>
                                            {storeGroups.map((group) => (
                                                <TableRow key={group.id}>
                                                    <TableCell>{group.name}</TableCell>
                                                    <TableCell>{group.id}</TableCell>
                                                    <TableCell>{group.region}</TableCell>
                                                    <TableCell>{group.country}</TableCell>
                                                    <TableCell>{group.role}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </TableWrapper>
                                )}
                            </GridRow>

                        </>
                    ) : (
                        <p>You do not have access to this section.</p>
                    )}
                </TabsContent>


                <TabsContent value="preferences">
                    <GridRow>
                        <SectionHeading>Preferences</SectionHeading>
                        <KeyValueGroup>
                            <KeyValueItem>
                                <Key>Timezone:</Key>
                                <Value>{preferences.timezone || "Not set"}</Value>
                            </KeyValueItem>
                            <KeyValueItem>
                                <Key>Dark Mode:</Key>
                                <Value>{preferences.theme?.darkMode ? "On" : "Off"}</Value>
                            </KeyValueItem>
                            <KeyValueItem>
                                <Key>Email Notifications:</Key>
                                <Value>{preferences.notifications?.email ? "Enabled" : "Disabled"}</Value>
                            </KeyValueItem>
                            <KeyValueItem>
                                <Key>SMS Notifications:</Key>
                                <Value>{preferences.notifications?.sms ? "Enabled" : "Disabled"}</Value>
                            </KeyValueItem>
                        </KeyValueGroup>
                    </GridRow>
                </TabsContent>
            </TabsRoot>
        </div>
    );
};

export default UserContextView;
