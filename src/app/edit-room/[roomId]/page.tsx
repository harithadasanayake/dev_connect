import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function EditRoomPage({params}: {params: {roomId: string}}) {

    unstable_noStore();
    const room = await getRoom(params.roomId);

    if (!room) {
        return <div>Room not found</div>
    }

    return (
        <div className="container mx-auto flex flex-col gap-8 pt-40 pb-24">
            <h1 className="text-4xl font-bold">Edit Room</h1>
            
            <div className="flex flex-row gap-8 items-start">
            <EditRoomForm room={room} />
                <div className="flex flex-col gap-4 items-center mt-24 ml-24">
                    <Image src="/data_processing.svg" width="400" height="400" alt="Create Room" />
                </div>
            </div>
        </div>
    );
}