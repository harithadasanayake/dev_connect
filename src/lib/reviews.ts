

export const fetchRoomReviews = async (roomId: number) => {
    const res = await fetch(`/api/reviews/${roomId}`);
    return res.json();
};

export const addRoomReview = async ({ roomId, rating, review }: { roomId: number, rating: number, review: string }) => {
const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomId, rating, review }),
});

return res.json();
};
