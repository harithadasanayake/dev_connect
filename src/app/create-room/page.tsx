import { CreateRoomForm } from "./create-room-form";
import Image from "next/image";

export default function CreateRoomPage() {
    return (
        <div className="container mx-auto flex flex-col gap-8 pt-32 pb-24">
            <h1 className="text-4xl font-bold">Create Room</h1>
            
            <div className="flex flex-row gap-8 items-start">
                <CreateRoomForm />
                <div className="flex flex-col gap-4 items-center mt-24 ml-24">
                    <Image src="/video-call.svg" width="400" height="400" alt="Create Room" />
                </div>
            </div>
        </div>
    );
}