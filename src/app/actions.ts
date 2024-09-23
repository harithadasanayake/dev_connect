'use server'

import { deleteUser, setEmailVerified } from "@/data-access/users";
import { validateRequest } from "@/lib/validate-request";


export async function deleteAccountAction() {
    
    
    const { user } = await validateRequest();

    if (!setEmailVerified) {
        throw new Error("you must be logged in to delete your account");
    }

    if (!user) {
        throw new Error("you must be logged in to delete your account");
    }

    await deleteUser(user.id);

}