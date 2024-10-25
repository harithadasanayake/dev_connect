import { ReactNode } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { RatingStars } from '../RatingStars';



// interface ModalProps {
//     isOpen: boolean;
//     setIsOpen: (isOpen: boolean) => void;
//     reviews: { id: number, rating: number, review: string }[];
//     rating: number;
//     setRating: (rating: number) => void;
//     reviewText: string;
//     setReviewText: (text: string) => void;
//     handleSubmitReview: () => void;
// }

// const Modal = ({ isOpen, setIsOpen, reviews, rating, setRating, reviewText, setReviewText, handleSubmitReview }: ModalProps) => {
//     return (
//         <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
//             <DialogHeader>
//                 <DialogTitle>User Reviews</DialogTitle>
//             </DialogHeader>

//             <div className="space-y-4 p-4">
//                 {reviews.map((review) => (
//                     <div key={review.id} className="border-b pb-2">
//                         <RatingStars value={review.rating} onChange={() => {}} />
//                         <p className="text-gray-700">{review.review}</p>
//                     </div>
//                 ))}

//                 <h3 className="text-lg font-semibold">Add a Review</h3>
//                 <RatingStars value={rating} onChange={(value) => setRating(value)} />
//                 <textarea
//                     className="w-full p-2 border border-gray-300 rounded"
//                     value={reviewText}
//                     onChange={(e) => setReviewText(e.target.value)}
//                     placeholder="Write your review here"
//                 ></textarea>

//                 <DialogFooter>
//                     <Button onClick={handleSubmitReview}>Submit Review</Button>
//                 </DialogFooter>
//             </div>
//         </Dialog>
//     );
// };

// export default Modal;


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        {/* <DialogOverlay className="fixed inset-0 bg-black/50" /> */}
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6">
            {children}
        </DialogPanel>
        </div>
    </Dialog>
    );
};



// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// interface ModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     children: React.ReactNode;
// }

// export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//         <DialogContent>
//             {children}
//         </DialogContent>
//         </Dialog>
//     );
// };


