"use client";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { deleteAccountAction } from "./actions";
import { redirect, useRouter } from "next/navigation";


export function DeleteProfile() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <button
                className="mt-2 bg-red-500 text-white py-2 px-4 ml-60 rounded"
                onClick={() => setOpen(true)}
            >
                Delete Account
            </button>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove your account
                            and any data associated with it.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                await deleteAccountAction();
                                setOpen(false);
                                router.push("/sign-in");
                            }}
                        >
                            Yes, delete my account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}