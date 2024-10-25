import { useState } from "react";

interface RatingStarsProps {
    value: number;
    onChange: (value: number) => void;
}

export const RatingStars = ({ value, onChange }: RatingStarsProps) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    return (
        <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <svg
            key={star}
            className={`w-6 h-6 cursor-pointer ${
                hoverValue ? (hoverValue >= star ? "text-yellow-500" : "text-gray-300") : (value >= star ? "text-yellow-500" : "text-gray-300")
            }`}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={() => onChange(star)}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            >
            <path d="M12 2l3.09 6.26 6.91 1.01-5 4.87 1.18 6.88L12 17.27 7.82 21l1.18-6.88-5-4.87 6.91-1.01L12 2z" />
            </svg>
        ))}
        </div>
    );
};



// import { useState } from 'react';

// interface StarRatingProps {
//     rating: number;
//     onRatingChange: (rating: number) => void;
// }

// export const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
//     const [hoverRating, setHoverRating] = useState(0);

//     return (
//     <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//         <Star
//             key={star}
//             filled={star <= (hoverRating || rating)}
//             onMouseEnter={() => setHoverRating(star)}
//             onMouseLeave={() => setHoverRating(0)}
//             onClick={() => onRatingChange(star)}
//         />
//         ))}
//     </div>
//     );
// };

// const Star = ({ filled, onMouseEnter, onMouseLeave, onClick }: any) => (
//     <svg
//         onMouseEnter={onMouseEnter}
//         onMouseLeave={onMouseLeave}
//         onClick={onClick}
//         xmlns="http://www.w3.org/2000/svg"
//         fill={filled ? 'gold' : 'gray'}
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="currentColor"
//         className="w-6 h-6 cursor-pointer"
//     >
//     <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
//     />
//     </svg>
// );
