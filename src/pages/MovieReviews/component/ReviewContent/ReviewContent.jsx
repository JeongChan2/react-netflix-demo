import React, { useState } from 'react'
import './ReviewContent.style.css'

const ReviewContent = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 200; // 최대 글자 수

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p>
        {isExpanded ? content : content.substring(0, MAX_LENGTH) + '...'}
      </p>
      {content.length > MAX_LENGTH && (
        <button onClick={toggleExpand} className='review-toggle-button'>
          {isExpanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
};

export default ReviewContent
