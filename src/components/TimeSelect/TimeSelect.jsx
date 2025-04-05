// src/components/TimeSelect/TimeSelect.jsx
import React from "react";
import { StyledSelect, TimeSelectWrapper } from "./TimeSelect.styles";

const generateTimeOptions = (interval = 30) => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += interval) {
      const h24 = String(hour).padStart(2, "0");
      const m = String(min).padStart(2, "0");
      const value = `${h24}:${m}`;
      const hour12 = ((hour + 11) % 12 + 1);
      const suffix = hour < 12 ? "AM" : "PM";
      const label = `${hour12}:${m} ${suffix}`;
      times.push({ value, label });
    }
  }
  return times;
};

export default function TimeSelect({
  value,
  onChange,
  interval = 30,
  variant = "default", // new
  placeholder = "Select Time",
  name,
  id,
}) {
  const timeOptions = generateTimeOptions(interval);

  return (
    <TimeSelectWrapper>
      <StyledSelect
        value={value}
        onChange={onChange}
        variant={variant}
        name={name}
        id={id}
      >
        <option value="">{placeholder}</option>
        {timeOptions.map((time) => (
          <option key={time.value} value={time.value}>
            {time.label}
          </option>
        ))}
      </StyledSelect>
    </TimeSelectWrapper>
  );
}
