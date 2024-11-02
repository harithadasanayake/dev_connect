import { db } from "@/db";
import { Profile, profiles } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { eq } from "drizzle-orm";

export async function createProfile(
  userId: UserId,
  displayName: string,
  image?: string
) {
  const [profile] = await db
    .insert(profiles)
    .values({
      userId,
      image,
      displayName,
    })
    .onConflictDoNothing()
    .returning();
  return profile;
}

export async function updateProfile(
  userId: UserId,
  updateProfile: Partial<Profile>
) {
  await db
    .update(profiles)
    .set(updateProfile)
    .where(eq(profiles.userId, userId));
}

export async function getProfile(userId: UserId) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return profile;
}

export async function editprofile(profileData: Profile) {
  const updated = await db.update(profiles).set(profileData).where(eq(profiles.id, profileData.id)).returning();
  return updated[0];
}

export async function getUserProfile(profileId: Number) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, Number(profileId)),
  });

}