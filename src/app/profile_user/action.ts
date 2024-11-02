import { db } from "@/db";
import { profiles, users } from '@/db/schema';
import { eq } from "drizzle-orm";

// Save profile action
export async function saveProfile(userId: number, displayName: string, bio: string, image: string) {
    await db
        .update(profiles)
        .set({ displayName, bio, image })
        .where(eq(profiles.userId, userId));
    return { success: true };
}

// Delete user account action
export async function deleteUserAccount(userId: number) {
    await db.delete(users).where(eq(users.id, userId));
    return { success: true };
}

// Fetch user profile action
export async function getUserProfile(userId: number) {
    //const profile = await db.select(profiles).where(eq(profiles.userId, userId)).first();
    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.userId, userId),
    });
    //const user = await db.select(users).where(eq(users.id, userId)).first();
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });

    return { ...profile, email: user?.email };
}
