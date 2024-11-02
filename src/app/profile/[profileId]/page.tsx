
import { getProfile } from "@/data-access/profiles";
import { EditProfileForm } from "./edit-profile-form";
import { getUser } from "@/data-access/users";
import Image from "next/image";
import { DeleteProfile } from "./delete-profile";


export default async function EditProfilePage({params}: {params: {profileId: string}}) {

    const profileId = Number(params.profileId);
    const profile = await getProfile(profileId);
    const user = await getUser(profileId);

    if (!profile) {
        return <div>Profile not found</div>
    }

    if (!user) {
        return <div>User not found</div>
    }

    return (

        <main className="min-h-screen justify-between p-16 pt-40">
                <div className="container mx-auto flex flex-col">
                    <h1 className="text-4xl pb-8">Profile</h1>

                    <div className="flex flex-row gap-8 items-start">
                        <EditProfileForm profile={profile} user={user} />
                        <div className="flex flex-col gap-4 items-center mt-15 ml-24">
                            <Image src="/profile_details.svg" width="300" height="300" alt="Create Room" />
                        </div>
                    </div>
                    <div className="flex flex-row mt-12 border-t pt-8 items-start">
                        <p className="flex flex-col text-red-500">Delete your account permanently.</p>
                        <DeleteProfile />
                        {/* <button
                            className="mt-2 bg-red-500 text-white py-2 px-4 ml-60 rounded"
                        >
                            Delete Account
                        </button> */}
                    </div>
                </div>
        </main>

    );
}