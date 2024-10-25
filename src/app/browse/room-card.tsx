"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Profile, Review, Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { useEffect, useState } from "react";

import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { addRoomReview, fetchRoomReviews } from "@/lib/reviews";
import { RatingStars } from "@/components/RatingStars";
import { useToast } from "@/components/ui/use-toast";



export function RoomCard({ room, profile }: { room: any, profile: Profile }) {

    // const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);
    // const [reviews, setReviews] = useState<Review[]>([]);
    // const [newReview, setNewReview] = useState('');
    // const [newRating, setNewRating] = useState(0);

    // const handleOpenPopup = async () => {
    // // const roomReviews = await fetchRoomReviews(room.id);
    // // setReviews(roomReviews);
    // setReviewPopupOpen(true);
    // };

    // const handleAddReview = async () => {
    // if (newRating > 0 && newReview) {
    //     await addRoomReview({ roomId: room.id, rating: newRating, review: newReview });
    //     const updatedReviews = await fetchRoomReviews(room.id);
    //     setReviews(updatedReviews);
    //     setNewRating(0);
    //     setNewReview('');
    // }
    // };



    const [isOpen, setIsOpen] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const { toast } = useToast();
    
        // Fetch room reviews
        useEffect(() => {
            if (isOpen) {
                fetch(`/api/reviews/${room.id}`)
                    .then((res) => res.json())
                    .then((data) => setReviews(data));
            }
        }, [isOpen, room.id]);
    
        // Submit review handler
        const handleSubmitReview = async () => {
        await fetch(`/api/reviews/${room.id}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            userId: profile.userId, 
            rating,
            review: reviewText,
            }),
        });

        toast({
            title: "Review Submitted",
            description: "Your review has been submitted successfully.",
        });
    
        // Close the modal after submitting
        setIsOpen(false);
    };


    return(
        <>
            <Card>
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <TagsList tags={splitTags(room.tags)} />
                {room.githubRepo && (
                <Link 
                    href={room.githubRepo} 
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GithubIcon />
                    Github Project
                </Link>
                )}
            </CardContent>
            <CardFooter className="flex gap-4">
                <Button asChild>
                <Link href={`/rooms/${room.id}`}>Join Room</Link>
                </Button>
                {/* <Button onClick={handleOpenPopup}>Show Reviews</Button> */}
                <Button onClick={() => setIsOpen(true)}>Reviews</Button>
            </CardFooter>
            </Card>

            {/* <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <DialogHeader>
                    <DialogTitle>User Reviews</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id}>
                    <RatingStars value={review.rating} onChange={() => {}} />
                    <p>{review.review}</p>
                    </div>
                ))}

                <h3>Add a Review</h3>
                <RatingStars value={rating} onChange={(value) => setRating(value)} />
                <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                ></textarea>

                <Button onClick={handleSubmitReview}>Submit Review</Button>
                </div>
            </Modal> */}

            {/* {isReviewPopupOpen && (
                <Modal isOpen={isReviewPopupOpen} onClose={() => setReviewPopupOpen(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-semibold">User Reviews for {room.name}</h3>
                    <ul className="mt-4 space-y-4">
                    {reviews.map((review) => (
                        <li key={review.id} className="border p-3 rounded">
                        <p><strong>Rating:</strong> {Array.from({ length: review.rating ?? 0 }).map((_, idx) => (
                            <span key={idx}>⭐</span>
                        ))}</p>
                        <p>{review.review}</p>
                        </li>
                    ))}
                    </ul>
                    <div className="mt-6">
                    <h4 className="text-md font-medium">Add Your Review</h4>
                    <div className="mt-2">
                        <StarRating rating={newRating} onRatingChange={setNewRating} />
                    </div>
                    <Textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review..."
                        className="mt-2"
                    />
                    <Button onClick={handleAddReview} className="mt-4">Submit Review</Button>
                    </div>
                </div>
                </Modal>
            )} */}

            {isOpen && (
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="h-[500px] w-[470px] flex flex-col">
                    <div className="flex-1 overflow-y-scroll p-6">
                        <h3 className="text-lg font-semibold">User Reviews for {room.name}</h3>
                        <ul className="mt-4 space-y-4">
                        {reviews.map((review) => (
                            <li key={review.id} className="border p-3 rounded">
                            <p><strong>Rating:</strong> {Array.from({ length: review.rating ?? 0 }).map((_, idx) => (
                                <span key={idx}>⭐</span>
                            ))}</p>
                            <p>{review.review}</p>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="p-6">
                        <h4 className="text-md font-medium">Add Your Review</h4>
                        <div className="mt-2">
                            <RatingStars value={rating} onChange={(value) => setRating(value)}  />
                        </div>
                        <Textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review..."
                            className="mt-2"
                        />
                        <Button onClick={handleSubmitReview} className="mt-4">Submit Review</Button>
                    </div>
                </div>
                </Modal>
            )}
        </>

    );
}
