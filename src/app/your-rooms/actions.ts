"use server";

import { deleteRoom, getRoom } from "@/data-access/rooms";
import { validateRequest } from "@/lib/validate-request";

import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
    // authenticate

    const { session } = await validateRequest();
    if (!session) {
        throw new Error("User not authenticated");
    }

    // did the user create the room? 
    const room = await getRoom(roomId);

    if (room?.userId !== session.userId) {
        throw new Error("User not authorized");
    }

    await deleteRoom(roomId);

    revalidatePath("/your-rooms");
}