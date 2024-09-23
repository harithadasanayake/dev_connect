"use server";

import { getCurrentUser } from "@/lib/session";
import { validateRequest } from "@/lib/validate-request";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {

    const { session } = await validateRequest();

    if (!session) {
        throw new Error("No session found");
    }
    // Define values.
    const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
    const api_secret = process.env.GET_STREAM_SECRET_KEY!;
    

    // Initialize a Server Client
    const serverClient = StreamChat.getInstance( api_key, api_secret);

    const userId = String(session.userId);
    // Create User Token
    const token = serverClient.createToken(userId);
    return token;
}