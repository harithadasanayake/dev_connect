"use server";
import { createRoom } from "@/data-access/rooms";
import { Room } from "@/db/schema";
import { validateRequest } from "@/lib/validate-request";
import { revalidatePath } from "next/cache";

// export async function createRoomAction(roomData: Omit<Room, "id" | "user_id">){
//     const session = await getSession();
    

//     if (!session) {
//         throw new Error("you must be logged in to create this room");
//     }

//     const room = await createRoom(roomData, session.user.id);

//     revalidatePath("/");

//     return room;
// }

// export async function createRoomAction(roomData: Omit<Room, "id" | "userId">){
//     "use server";
//     const { session } = await validateRequest();
    

//     if (!session) {
//         throw new Error("you must be logged in to create this room");
//     }

//     const room = await createRoom(roomData, session.userId);

//     revalidatePath("/");

//     return room;
// }

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">){
    
    const { session } = await validateRequest();
    

    if (!session) {
        throw new Error("you must be logged in to create this room");
    }

    const room = await createRoom(roomData, session.userId);

    revalidatePath("/");

    return room;
}