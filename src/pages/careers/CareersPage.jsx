import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../context/ThemeContext";
import careersService from "../../services/CareersService";
import { SectionHeading, SectionSubHeading, JobTitle, MessageCard } from "./CareersPage.styles";
import { Button } from "../../components/Button/Button";

const CareersPage = () => {
  const { darkMode } = useTheme();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    resume: null,
  });

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await careersService.getOpenPositions();
        setPositions(response || []);
      } catch (err) {
        console.error("Error fetching positions:", err);
        setPositions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await careersService.submitInterest(formData);
      alert("🎉 Your application has been submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        resume: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      alert("❌ Failed to submit your application. Please try again later.");
    }
  };

  return (
    <div className={`container mt-5 py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="text-center mb-5">
        <SectionHeading>Join Our Team</SectionHeading>
        <p className="lead">We are looking for passionate individuals to be part of our journey. Explore our open positions and apply today!</p>
      </div>

      {/* Why Work With Us */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-5">
          <div className="card shadow-sm p-4 text-center">
            <h5 className="fw-bold">Innovative Work Environment</h5>
            <p>We believe in fostering creativity, innovation, and a culture of learning. Work with the best minds and build cutting-edge solutions.</p>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card shadow-sm p-4 text-center">
            <h5 className="fw-bold">Growth & Career Development</h5>
            <p>We invest in your growth and provide career advancement opportunities, mentorship, and the tools you need to succeed.</p>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <SectionHeading as="h3">Current Openings</SectionHeading>
          {loading ? (
            <p className="text-center">Loading positions...</p>
          ) : positions.length > 0 ? (
            <ul className="list-group shadow">
              {positions.map((job) => (
                <li key={job.id} className="list-group-item d-flex flex-column">
                  <JobTitle>{job.title}</JobTitle>
                  <p>
                    <strong>Role Type:</strong> {job.roleType} | <strong>Location:</strong> {job.location} |{" "}
                    <strong>Positions:</strong> {job.positions} | <strong>Experience:</strong> {job.experience}
                  </p>
                  <button className="btn btn-sm btn-outline-primary w-25">Apply</button>
                </li>
              ))}
            </ul>
          ) : (
            <MessageCard>
              <p className="mb-2 fs-5">🚀 We're not hiring at this moment.</p>
              <p>Positions will be open soon. Stay connected!</p>
            </MessageCard>
          )}
        </div>
      </div>

      {/* General Application */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <SectionHeading as="h4">Didn't find a role?</SectionHeading>
          <SectionSubHeading>Send us your details!</SectionSubHeading>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white text-dark">
            <div className="mb-3">
              <input type="text" name="name" className="form-control" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="email" name="email" className="form-control" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="text" name="phone" className="form-control" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <textarea name="message" className="form-control" rows="3" placeholder="Tell us about yourself & your skills" value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <input type="file" className="form-control" onChange={handleFileChange} accept=".pdf,.doc,.docx" ref={fileInputRef} required />
            </div>
            <Button outline variant="primary" style={{ width: "120px", height: "40px", fontSize: "0.9rem" }}>
              Apply
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
