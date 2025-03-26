import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ review }) => {
    const { name, customer_rating, review_datetime, verified_purchaser, comment } = review;
    const boxColor = verified_purchaser ? "bg-success text-white" : "bg-secondary text-white";

    console.log("Incoming review is:", review);

    const renderStars = (rating) => {
        if (typeof rating !== "number" || rating < 0 || rating > 5) {
            console.error("Invalid rating value:", rating);
            return <span className="text-muted">No rating</span>;
        }

        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let starIcons = [];

        for (let i = 0; i < fullStars; i++) {
            starIcons.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-warning me-1" />);
        }

        if (hasHalfStar) {
            starIcons.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-warning me-1" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            starIcons.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} className="text-muted me-1" />);
        }

        return <span>{starIcons}</span>;
    };

    const calculateDuration = (reviewDate) => {
        if (!reviewDate) return "Date not available";

        const today = new Date();
        const reviewDateObj = new Date(reviewDate);
        if (isNaN(reviewDateObj)) return "Invalid date";

        const timeDiff = today - reviewDateObj;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return days === 0 ? "Reviewed today" : `Reviewed ${days} day${days !== 1 ? "s" : ""} ago`;
    };

    return (
        <div className="card mb-3 shadow-sm border-0 p-3">
            <div className="card-body">
                {/* Name and Star Rating */}
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{name}</h5>
                    <div>{renderStars(customer_rating)}</div>
                </div>

                {/* Date and Verified Purchase Status */}
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <small className="text-muted">{calculateDuration(review_datetime)}</small>
                    <span className={`badge ${boxColor}`}>{verified_purchaser ? 'Verified Purchase' : 'Not Verified'}</span>
                </div>

                {/* Customer Feedback */}
                <p className="card-text mt-3">{comment}</p>
            </div>
        </div>
    );
};

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <div className="text-center text-muted">No reviews available.</div>;
    }

    return (
        <div className="mt-3">
            {reviews.map((review, index) => (
                <ReviewCard key={index} review={{ ...review, customer_rating: review.rating }} />
            ))}
        </div>
    );
};

export default ReviewList;
