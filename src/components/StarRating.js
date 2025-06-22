import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange, projectId }) => {
  const handleStarClick = (starIndex) => {
    const newRating = starIndex + 1;
    onRatingChange(projectId, newRating);
  };

  return (
    <div className="star-rating">
      {[0, 1, 2, 3, 4].map((starIndex) => (
        <span
          key={starIndex}
          className={`star ${starIndex < rating ? 'filled' : ''}`}
          onClick={() => handleStarClick(starIndex)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleStarClick(starIndex);
            }
          }}
        >
          ★
        </span>
      ))}
      <span className="rating-text">({rating}/5)</span>
    </div>
  );
};

export default StarRating; 