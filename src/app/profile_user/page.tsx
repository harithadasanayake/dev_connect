'use client';
import { useEffect, useState } from 'react';
import { deleteUserAccount, getUserProfile, saveProfile } from './action';


interface ProfileData {
    displayName: string | null;
    bio: string | null;
    image: string | null;
    email: string;
}

export default function ProfilePage({ params }: { params: { id: number } }) {
    const { id } = params;
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [editingBio, setEditingBio] = useState(false);
    const [image, setImage] = useState('/placeholder.png');

    // useEffect(() => {
    //     async function fetchProfile() {
    //     const data = await getUserProfile(id);
    //     if (data) {
    //         setProfile({
    //             displayName: data.displayName ?? null,
    //             bio: data.bio ?? null,
    //             image: data.image ?? null,
    //             email: data.email ?? ''
    //         });
    //         setDisplayName(data.displayName || '');
    //         setBio(data.bio || '');
    //         setImage(data.image || '/placeholder.png');
    //     }
    //     }
    //     fetchProfile();
    // }, [id]);

    // const handleSave = async () => {
    //     if (profile) {
    //     await saveProfile(id, displayName, bio, image);
    //     }
    // };

    // const handleDeleteAccount = async () => {
    //     await deleteUserAccount(id);
    //     alert('Account deleted successfully');
    //     // Redirect to home or login page after deletion
    // };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        setImage(URL.createObjectURL(file));
        }
    };

    // if (!profile) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center p-6 py-40 min-h-[80dvh] justify-center mx-auto">
        <div className="flex flex-col items-start w-full max-w-lg">
            {/* Profile Image and Name Section */}
            <div className="flex items-center">
            <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200">
                <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                />
                </div>
                <input type="file" onChange={handleImageChange} className="mt-2 text-blue-500" />
            </div>

            <div className="ml-4">
                <label className="block text-lg font-semibold">Display Name</label>
                <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                />
                <label className="text-lg font-semibold">Email</label>
                {/* <p className="text-gray-500">{profile.email}</p> */}
            </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6 w-full">
            <label className="text-lg font-semibold">Bio</label>
            <textarea
                className="w-full mt-2 p-2 border rounded"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!editingBio}
            />
            <button
                className="mt-2 text-blue-500"
                onClick={() => setEditingBio(!editingBio)}
            >
                {editingBio ? 'Cancel' : 'Edit Bio'}
            </button>
            </div>

            {/* Save Button */}
            <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            // onClick={handleSave}
            >
            Save
            </button>

            {/* Delete Account Section */}
            <div className="mt-8 border-t pt-4">
            <p className="text-red-500">Delete your account permanently.</p>
            <button
                className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
                // onClick={handleDeleteAccount}
            >
                Delete Account
            </button>
            </div>
        </div>
        </div>
    );
}
