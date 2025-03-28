// src/hooks/useStoreGroupForm.js
import { useState } from "react";
import { toast } from "react-toastify";
import storeService from "../../../services/StoreService";

export function useStoreGroupForm(setStoreGroups, closeModal) {
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [groupForm, setGroupForm] = useState({
    name: "",
    region: "",
    country: "",
    domain: "",
    contactEmail: "",
    supportPhone: "",
    currency: "",
    timezone: "",
  });

  const startCreate = () => {
    setGroupForm({
      name: "",
      region: "",
      country: "",
      domain: "",
      contactEmail: "",
      supportPhone: "",
      currency: "",
      timezone: "",
    });
    setEditingGroupId(null);
  };

  const startEdit = (groupId, storeGroups) => {
    const group = storeGroups.find((g) => g.id === groupId);
    if (!group) return;

    setGroupForm({
      name: group.name || "",
      region: group.region || "",
      country: group.country || "",
      domain: group.domain || "",
      contactEmail: group.contactEmail || "",
      supportPhone: group.supportPhone || "",
      currency: group.currency || "",
      timezone: group.timezone || "",
    });

    setEditingGroupId(groupId);
  };

  const submit = async () => {
    const { name, region, domain } = groupForm;
    if (!name || !region || !domain) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      if (editingGroupId) {
        await storeService.updateStoreGroup(editingGroupId, groupForm);
        toast.success("Store group updated!");
      } else {
        await storeService.createStoreGroup(groupForm);
        toast.success("Store group created!");
      }

      const updatedGroups = await storeService.getMyStoreGroups();
      setStoreGroups(updatedGroups);

      closeModal();
      startCreate();
    } catch (err) {
      toast.error(`Failed to ${editingGroupId ? "update" : "create"} store group.`);
    }
  };

  return {
    groupForm,
    setGroupForm,
    editingGroupId,
    startCreate,
    startEdit,
    submit,
  };
}