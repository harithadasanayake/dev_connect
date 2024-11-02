"use server";

import { editprofile, getProfile, getUserProfile } from "@/data-access/profiles";
import { Profile } from "@/db/schema";
import { validateRequest } from "@/lib/validate-request";
import { revalidatePath } from "next/cache";
import fs from 'fs';
import path from 'path';
import { deleteUser } from "@/data-access/users";


export async function editProfileAction(profileData: Omit<Profile, "userId"> & { id: string }) {
    
    const { session } = await validateRequest();

    if (!session) {
        throw new Error("you must be logged in to edit this room");
    }

    const profile = await getProfile(profileData.id);

    if (profile?.userId !== session.userId) {
        throw new Error("User not authorized");
    }

    await editprofile({ ...profileData, userId: profile.userId});
    //await editRoom({ ...roomData, userId: room.userId});

    
    revalidatePath(`/profile/${profileData.id}`);
    
}

export async function uploadProfileImage(file: File, profileId: string): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, `${profileId}-${file.name}`);
    const fileStream = fs.createWriteStream(filePath);
    fileStream.write(Buffer.from(await file.arrayBuffer()));
    fileStream.end();

    return `/uploads/${profileId}-${file.name}`;
}

export async function deleteAccountAction() {
    
    const { session } = await validateRequest();

    if (!session) {
        throw new Error("you must be logged in to delete your account");
    }

    await deleteUser(session.userId);

}