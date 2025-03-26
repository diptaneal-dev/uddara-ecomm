import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from 'react-bootstrap';

const ReviewSummary = ({ reviews, onReviewClick }) => {
    const overallRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 0;
    
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <span>
                {[...Array(fullStars)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} className="text-warning me-1" />)}
                {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-warning me-1" />}
                {[...Array(emptyStars)].map((_, i) => <FontAwesomeIcon key={i} icon={faStarEmpty} className="text-muted me-1" />)}
            </span>
        );
    };

    return (
        <div className="card p-3 shadow-sm">
            <h4 className="text-center">Overall Rating</h4>
            <h2 className="text-center">{overallRating}</h2>
            <div className="text-center">{renderStars(overallRating)}</div>
            <hr />
            <button className="btn btn-primary w-100" onClick={onReviewClick}>Give Review</button>
        </div>
    );
};

const ReviewList = ({ reviews }) => {
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <span>
                {[...Array(fullStars)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} className="text-warning me-1" />)}
                {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-warning me-1" />}
                {[...Array(emptyStars)].map((_, i) => <FontAwesomeIcon key={i} icon={faStarEmpty} className="text-muted me-1" />)}
            </span>
        );
    };

    return (
        <div>
            {reviews.length > 0 ? reviews.map((review, index) => (
                <div key={index} className="card mb-3 p-3 shadow-sm">
                    <h5>{review.subject}</h5>
                    <div>{renderStars(review.rating)}</div>
                    <p className="text-muted">{review.comment}</p>
                </div>
            )) : <p className="text-center text-muted">No reviews yet.</p>}
        </div>
    );
};

const ReviewModal = ({ show, onHide, onSubmit, newReview, setNewReview }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}>
                        {[5, 4, 3, 2, 1].map((num) => (
                            <option key={num} value={num}>{num} Stars</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" value={newReview.subject} onChange={(e) => setNewReview({ ...newReview, subject: e.target.value })} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Review</Form.Label>
                    <Form.Control as="textarea" rows={3} value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Cancel</Button>
            <Button variant="primary" onClick={onSubmit}>Submit Review</Button>
        </Modal.Footer>
    </Modal>
);

const ReviewPage = ({ reviews }) => {
    const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, subject: "", comment: "" });

    return (
        <div className="container mt-4">
            <div className="row align-items-start">
                <div className="col-md-4">
                    <ReviewSummary reviews={reviews} onReviewClick={() => setShowModal(true)} />
                </div>
                <div className="col-md-8">
                    <ReviewList reviews={reviews} />
                </div>
            </div>
            <ReviewModal show={showModal} onHide={() => setShowModal(false)} onSubmit={() => setShowModal(false)} newReview={newReview} setNewReview={setNewReview} />
        </div>
    );
};

export { ReviewSummary, ReviewList, ReviewModal, ReviewPage };
