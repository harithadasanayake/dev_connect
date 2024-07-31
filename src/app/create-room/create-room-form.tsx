'use client'

import { z } from "zod"
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
import { createRoomAction } from "./actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({  
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    githubRepo: z.string().min(1).max(500),
    tags: z.string().min(1).max(500),

})

export function CreateRoomForm() {
    const { toast } = useToast();
    
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            githubRepo: "",
            tags: "",
        },
        })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        const room = await createRoomAction(values);
        toast({
            title: "Room created",
            description: "Your room was successfully created",
        });
        router.push(`/rooms/${room.id}`);
    }

    return (
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Dev Connect web app" style={{ width: '650px' }}/>
                    </FormControl>
                    <FormDescription>
                        This is your public room name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="I'm working on a side project, come join with me" style={{ width: '650px' }}/>
                    </FormControl>
                    <FormDescription>
                        Please describe what you are doing in this room.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="githubRepo"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Github Repo</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="https://github.com/example/github-repo" style={{ width: '650px' }}/>
                    </FormControl>
                    <FormDescription>
                        Please add a link to the project repository.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="TypeScript, Next.js, Tailwind" style={{ width: '650px' }}/>
                    </FormControl>
                    <FormDescription>
                        List your programming languages, frameworks, libraries so people can find your content.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        
    )
}