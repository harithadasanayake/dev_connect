"use server";

import { editRoom, getRoom } from "@/data-access/rooms";
import { Room } from "@/db/schema";
import { validateRequest } from "@/lib/validate-request";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function editRoomAction(roomData: Omit<Room, "userId">) {
    
    const { session } = await validateRequest();

    if (!session) {
        throw new Error("you must be logged in to edit this room");
    }

    const room = await getRoom(roomData.id);

    if (room?.userId !== session.userId) {
        throw new Error("User not authorized");
    }

    await editRoom({ ...roomData, userId: room.userId});

    revalidatePath("/your-rooms");
    revalidatePath(`/edit-room/${roomData.id}`);
    redirect("/your-rooms");
}