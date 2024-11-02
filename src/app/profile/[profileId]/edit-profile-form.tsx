'use client'

import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useParams } from "next/navigation"
import { Profile, User } from "@/db/schema"
import { toast } from "@/components/ui/use-toast"
import { editProfileAction, uploadProfileImage } from "./actions"
import { Textarea } from "@/components/ui/Textarea"

const formSchema = z.object({  
    displayName: z.string().min(1).max(100),
    email: z.string().min(1).max(500),
    bio: z.string().min(1).max(500),
    image: z.string().min(1).max(500),

})

export function EditProfileForm({ profile, user }: { profile: Profile; user: User }) {

    const params = useParams();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: profile.displayName ?? "",
            email: user.email ?? "",
            bio: profile.bio ?? "",
            image: profile.image ?? "",
        },
        })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {
            await editProfileAction({
                id: params.profileId as string,
                ...values,
            });
            toast({
                title: "Profile updated",
                description: "Your profile was successfully updated",
            });
        } catch (error) {
            toast({
                title: "Error updating profile",
                description: (error as any).message || "An unexpected error occurred.",
            });
        }
    }


    // async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         try {
    //             const imagePath = await uploadProfileImage(file, params.profileId as string);
    //             await editProfileAction({
    //                 id: params.profileId as string,
    //                 image: imagePath,
    //             });
    //             toast({
    //                 title: "Image uploaded",
    //                 description: "Your profile image was successfully uploaded",
    //             });
    //         } catch (error) {
    //             toast({
    //                 title: "Error uploading image",
    //                 description: (error as any).message || "An unexpected error occurred.",
    //             });
    //         }
    //     }
    // }

    async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const data = await response.json();
                const imagePath = data.filePath;

                await editProfileAction({
                    id: params.profileId as string,
                    image: imagePath,
                });

                toast({
                    title: "Image uploaded",
                    description: "Your profile image was successfully uploaded",
                });
            } catch (error) {
                toast({
                    title: "Error uploading image",
                    description: (error as any).message || "An unexpected error occurred.",
                });
            }
        }
    }

    return (
        
        <><div className="relative">
            <div className="w-24 h-24 rounded-full mr-10 bg-gray-200">
            {profile.image ? (
                        <img
                            src={profile.image}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <div className="pt-32">
                            <Button onClick={() => document.getElementById('imageUpload')?.click()} className="cursor-pointer">
                                Upload Image
                            </Button>
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    )}
            </div>
        </div>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} style={{ width: '500px' }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly style={{ width: '500px' }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel><br></br>
                                <FormControl>
                                    <Textarea {...field} style={{ width: '500px', height:'150px' }} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    {/* <FormField
    control={form.control}
    name="image"
    render={({ field }) => (
        <FormItem>
        <FormLabel>Image</FormLabel>
        <FormControl>
            <Input {...field} style={{ width: '650px' }}/>
        </FormControl>
        <FormMessage />
        </FormItem>
    )}
    /> */}
                    <Button type="submit">Save</Button>
                </form>
            </Form>
            </>
        
    )
}