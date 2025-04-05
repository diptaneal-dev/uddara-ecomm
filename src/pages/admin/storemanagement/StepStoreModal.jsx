// src/components/StepStoreModal/index.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  ModalOverlay,
  ModalDialog,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  FormGrid,
  FormGroup,
  Label,
  Input,
  Select
} from "./StepStoreModal.styles";
import { Button } from "../../../components/Button/Button";
import TimeSelect from "../../../components/TimeSelect/TimeSelect";
import StepProgressBar from "../../../components/StepProgressBar/StepProgressBar";
import storeService from "../../../services/StoreService";

const businessHoursRequiredTypes = [
  "RESTAURANT", "RETAIL", "SUPERMARKET", "PHARMACY", "BAKERY",
  "CAFE", "BAR", "SALON", "SPA", "GROCERY", "POPUP"
];

const stepLabels = [
  "Basic Info",
  "Configuration",
  "Business Hours",
  "Manager Info"
];

export default function StepStoreModal({ storeGroups, onClose, onSubmit, renderFooter }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    storeName: "",
    storeType: "",
    legalName: "",
    storeGroupId: "",
    currency: "",
    timezone: "",
    region: "",
    enableDelivery: false,
    storeManagerName: "",
    businessHours: {
      openingTime: "",
      closingTime: "",
      daysOpen: []
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem("storeFormDraft");
    if (saved) {
      setForm(JSON.parse(saved));
      toast.info("Loaded draft form");
    }
  }, []);

  useEffect(() => {
    if (form.storeGroupId) {
      const group = storeGroups.find((g) => g.id.toString() === form.storeGroupId);
      if (group && group.currency && !form.currency) {
        setForm((prev) => ({ ...prev, currency: group.currency }));
      }
    }
  }, [form.storeGroupId, form.currency]);

  const saveDraft = () => {
    localStorage.setItem("storeFormDraft", JSON.stringify(form));
    toast.success("Draft saved");
  };

  const handleNext = () => {
    if (step === 1 && (!form.storeName || !form.storeType || !form.legalName || !form.storeGroupId)) {
      toast.warning("Please fill required fields in Step 1");
      return;
    }
    if (step === 3 && businessHoursRequiredTypes.includes(form.storeType)) {
      const { openingTime, closingTime, daysOpen } = form.businessHours;
      if (!openingTime || !closingTime || daysOpen.length === 0) {
        toast.warning("Please fill business hours");
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleFinalSubmit = async () => {
    try {
      console.log("Store Form: ", form);
      await storeService.createStore(form);
      localStorage.removeItem("storeFormDraft");
      toast.success("Store created!");
      onSubmit();
    } catch (err) {
      toast.error("Failed to create store");
    }
  };

  const toggleDay = (day) => {
    const days = form.businessHours.daysOpen;
    setForm({
      ...form,
      businessHours: {
        ...form.businessHours,
        daysOpen: days.includes(day)
          ? days.filter((d) => d !== day)
          : [...days, day]
      }
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalDialog onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{stepLabels[step - 1]}</ModalTitle>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </ModalHeader>

          <ModalBody>
            <StepProgressBar
              currentStep={step}
              steps={stepLabels}
              variant="bubble" // or "fill" or "dot"
              showLabels={true}
              showStepText={true}
            />

            {step === 1 && (
              <FormGrid>
                <FormGroup>
                  <Label>Store Name</Label>
                  <Input value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label>Store Type</Label>
                  <Select value={form.storeType} onChange={(e) => setForm({ ...form, storeType: e.target.value })}>
                    <option value="">Select Store Type</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="RETAIL">Retail</option>
                    <option value="SUPERMARKET">Supermarket</option>
                    <option value="PHARMACY">Pharmacy</option>
                    <option value="CAFE">Café</option>
                    <option value="BAR">Bar</option>
                    <option value="SALON">Salon</option>
                    <option value="SPA">Spa</option>
                    <option value="GROCERY">Grocery</option>
                    <option value="BAKERY">Bakery</option>
                    <option value="WAREHOUSE">Warehouse</option>
                    <option value="ECOMMERCE">E-commerce</option>
                    <option value="ONLINE_ONLY">Online Only</option>
                    <option value="POPUP">Pop-up Store</option>
                    <option value="OTHER">Other</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Legal Name</Label>
                  <Input value={form.legalName} onChange={(e) => setForm({ ...form, legalName: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label>Store Group</Label>
                  <Select value={form.storeGroupId} onChange={(e) => setForm({ ...form, storeGroupId: e.target.value })}>
                    <option value="">Select Store Group</option>
                    {storeGroups.map((g) => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </Select>
                </FormGroup>
              </FormGrid>
            )}

            {step === 2 && (
              <FormGrid>
                <FormGroup>
                  <Label>Region</Label>
                  <Input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label>Currency</Label>
                  <Select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
                    <option value="">Select Currency</option>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Timezone</Label>
                  <Select value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })}>
                    <option value="">Select Timezone</option>
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>&nbsp;</Label>
                  <label>
                    <input
                      type="checkbox"
                      checked={form.enableDelivery}
                      onChange={(e) => setForm({ ...form, enableDelivery: e.target.checked })}
                    />{" Enable Delivery"}
                  </label>
                </FormGroup>
              </FormGrid>
            )}

            {step === 3 && businessHoursRequiredTypes.includes(form.storeType) && (
              <FormGrid>
                <FormGroup>
                  <Label>Opening Time</Label>
                  <TimeSelect
                    value={form.businessHours.openingTime}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        businessHours: {
                          ...form.businessHours,
                          openingTime: e.target.value,
                        },
                      })
                    }
                    interval={30}
                    variant="default" // or "minimal", "borderless"
                    name="openingTime"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Closing Time</Label>
                  <TimeSelect
                    value={form.businessHours.closingTime}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        businessHours: {
                          ...form.businessHours,
                          closingTime: e.target.value,
                        },
                      })
                    }
                    interval={30}
                    variant="default"
                    name="closingTime"
                  />
                </FormGroup>

                <FormGroup style={{ gridColumn: "1 / -1" }}>
                  <Label>Days of Operation</Label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <label key={day}>
                        <input
                          type="checkbox"
                          checked={form.businessHours.daysOpen.includes(day)}
                          onChange={() => toggleDay(day)}
                        />{" "}
                        {day}
                      </label>
                    ))}
                  </div>
                </FormGroup>
              </FormGrid>
            )}

            {step === 4 && (
              <FormGrid>
                <FormGroup>
                  <Label>Store Manager Name</Label>
                  <Input value={form.storeManagerName} onChange={(e) => setForm({ ...form, storeManagerName: e.target.value })} />
                </FormGroup>
              </FormGrid>
            )}
          </ModalBody>

          <ModalFooter>
            {renderFooter ? renderFooter({
              step,
              onClose,
              onSaveDraft: saveDraft,
              onBack: handleBack,
              onNext: handleNext,
              onSubmit: handleFinalSubmit
            }) : (
              <>
                <Button $size="sm" $variant="secondary" onClick={onClose}>Cancel</Button>
                <Button $size="sm" $outline onClick={saveDraft}>Save Draft</Button>
                {step > 1 && <Button $size="sm" $variant="secondary" onClick={handleBack}>Back</Button>}
                {step < 4 && <Button $size="sm" onClick={handleNext}>Next</Button>}
                {step === 4 && <Button $size="sm" $variant="success" onClick={handleFinalSubmit}>Submit</Button>}
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </ModalDialog>
    </ModalOverlay>
  );
}

StepStoreModal.propTypes = {
  storeGroups: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  renderFooter: PropTypes.func
};
