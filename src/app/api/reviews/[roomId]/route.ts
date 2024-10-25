import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/db";
import { reviews } from '@/db/schema';
import { eq } from "drizzle-orm";
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

// Fetch all reviews for a specific room
export async function GET(request: Request, { params }: { params: { roomId: string } }) {
    const roomId = params.roomId;

    // Validate roomId
    if (!validateUUID(roomId)) {
        return NextResponse.json({ error: 'Invalid roomId' }, { status: 400 });
    }

    const roomReviews = await db
        .select()
        .from(reviews)
        .where(eq(reviews.roomId, roomId)); // Use the `eq` function here.

    return NextResponse.json(roomReviews);
}

// Store a new review for a room
export async function POST(request: Request, { params }: { params: { roomId: string } }) {
    const roomId = params.roomId;

    if (!validateUUID(roomId)) {
        return NextResponse.json({ error: 'Invalid roomId' }, { status: 400 });
    }

    const { userId, rating, review } = await request.json();

    const newReview = await db
        .insert(reviews)
        .values({
        roomId,
        userId,
        rating,
        review,
        })
        .returning();

    return NextResponse.json(newReview);
    }
