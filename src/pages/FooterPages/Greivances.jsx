import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../context/ThemeContext";

const GrievancesPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`container mt-4 py-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <h2 className="text-center mb-4">Grievances Policy</h2>
      <h4>1. Objective</h4>
      <p>We value our users and strive to address any concerns or grievances efficiently and fairly.</p>
      <h4>2. How to File a Complaint</h4>
      <p>If you have a grievance, please email us at <strong>support@bayblabs.com</strong> with a detailed description of your issue.</p>
      <h4>3. Resolution Timeline</h4>
      <p>We aim to acknowledge complaints within <strong>48 hours</strong> and resolve them within <strong>7 business days</strong>.</p>
      <h4>4. Escalation</h4>
      <p>If your grievance is not resolved satisfactorily, you may escalate the issue to our grievance officer at <strong>grievance@bayblabs.com</strong>.</p>
    </div>
  );
};

export default GrievancesPage;
