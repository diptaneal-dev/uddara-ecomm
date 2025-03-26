import React, { useState } from 'react';
import storeService from '../../services/StoreService';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setError('');
        setSuccess('');

        try {
            await storeService.subscribeToNewsletter(33, email);
            setSuccess('Thank you for subscribing!');
            setEmail('');
        } catch (error) {
            setError('Failed to subscribe. Please try again.');
        }
    };

    return (
        <section className="container-fluid py-0 px-0 mr-0 ml-0" style={{ backgroundColor: '#2E4F35' }}>
            <div className="row align-items-center justify-content-center ml-4 mr-0 px-0">

                {/* Left Section - Subscription Form (Centered & Limited Height) */}
                <div className="col-lg-6 px-0">
                    <div className="text-center text-lg-start px-5">
                        <h2 className="fw-bold" style={{ color: '#C6A969' }}>Sign up for Regular Updates</h2>
                        <p style={{ color: '#FAF6F1' }}>Subscribe to our newsletter.</p>
                        <form onSubmit={handleSubmit} className="d-flex">
                            <input
                                type="email"
                                className="form-control me-2"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ backgroundColor: '#FAF6F1', border: '1px solid #ccc', color: '#333' }}
                            />
                            <button type="submit" className="btn"
                                style={{ backgroundColor: "#C6A969", color: "black", border: "1px solid #C6A969" }}>
                                Submit
                            </button>
                        </form>
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </div>
                </div>

                {/* Right Section - Image (Now Properly Sized) */}
                <div className="col-lg-6 d-flex justify-content-center">
                    <img
                        src="/images/subscriptionImage.jpeg"
                        alt="Newsletter"
                        className="img-fluid rounded"
                        style={{ maxHeight: '350px', width: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>
        </section>

    );
};

export default NewsletterSubscription;
