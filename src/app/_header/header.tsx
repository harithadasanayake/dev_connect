import Link from "next/link";
import { Suspense, cache } from "react";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, Loader2Icon, LogOut } from "lucide-react";
import { getUserProfileUseCase } from "@/use-cases/users";
import { UserId } from "@/types";
import { ModeToggle } from "./mode-toggle";
import { MenuButton } from "./menu-button";
import Image from "next/image";
import { getProfile } from "@/data-access/profiles";

const profilerLoader = cache(getUserProfileUseCase);

export async function Header() {
const user = await getCurrentUser();

const profile = user ? await getProfile(user.id) : null;


return (
<div className="border-b py-4 fixed top-0 left-0 right-0 z-50 shadow-md bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto flex justify-between items-center">
    <div className="flex gap-8 items-center">
        <Link href="/" className="flex gap-2 items-center text-xl">
        <Image 
            src="/dev_connect_logo.png"
            width ="50"
            height="50"
            alt="DevConnect Logo"
        />
        <div className="hidden md:block">DevConnect</div>
        </Link>

        <div className="flex items-center gap-2">
        {user && (
            <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
            >
            <Link href={`/profile/${profile?.id}`}>
                <LayoutDashboard className="w-4 h-4" /> Profile
            </Link>
            </Button>
        )}
        </div>
        <div className="flex items-center gap-2">
        {user && (
            <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
            >
            <Link href={"/browse"}>
                Browse
            </Link>
            </Button>
        )}
        </div>
        <div className="flex items-center gap-2">
        {user && (
            <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
            >
            <Link href={"/your-rooms"}>
                Your Rooms
            </Link>
            </Button>
        )}
        </div>
    </div>

    <div className="flex items-center justify-between gap-5">
        <Suspense
        fallback={
            <div className="flex items-center justify-center w-40">
            <Loader2Icon className="animate-spin w-4 h-4" />
            </div>
        }
        >
        <HeaderActions />
        </Suspense>
    </div>
    </div>
</div>
);
}

async function ProfileAvatar({ userId }: { userId: number }) {
const profile = await profilerLoader(userId);

return (
<Avatar>
    <AvatarImage src={profile.image ?? ''} />
    <AvatarFallback>
    {profile.displayName?.substring(0, 2).toUpperCase() ?? "AA"}
    </AvatarFallback>
</Avatar>
);
}

async function HeaderActions() {
const user = await getCurrentUser();
const isSignedIn = !!user;

return (
<>
    {isSignedIn ? (
    <>
        <div className="hidden md:block">
        <ModeToggle />
        </div>
        <ProfileDropdown userId={user.id} />
        <div className="md:hidden">
        <MenuButton />
        </div>
    </>
    ) : (
    <>
        <ModeToggle />

        <Button asChild variant="secondary">
        <Link href="/sign-in">Sign In</Link>
        </Button>
    </>
    )}
</>
);
}
async function ProfileDropdown({ userId }: { userId: UserId }) {
const profile = await profilerLoader(userId);
return (
<DropdownMenu>
    <DropdownMenuTrigger>
    <Suspense
        fallback={
        <div className="bg-gray-800 rounded-full h-10 w-10 shrink-0 flex items-center justify-center">
            ..
        </div>
        }
    >
        <ProfileAvatar userId={userId} />
    </Suspense>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="space-y-2">
    <DropdownMenuLabel>{profile.displayName}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem asChild className="cursor-pointer">
        <Link className="flex items-center" href={"/api/sign-out"}>
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
        </Link>
    </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
);
}
