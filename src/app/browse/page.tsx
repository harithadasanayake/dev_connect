import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "./room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { getProfile } from "@/data-access/profiles";
import { getCurrentUser } from "@/lib/session";


export default async function Home({
  searchParams,
}: {
  searchParams: {
  search: string;
  };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  const user = await getCurrentUser();
    
    if(!user) {
        return <div>Not authenticated</div>;
    }

    const profile = await getProfile(user.id);

    if (!profile) {
        return <div>No profile of this ID found</div>;
    }

  return (
    <main className="min-h-screen justify-between p-16 pt-40">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
        <SearchBar />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} profile={profile}/>;
        })}
      </div>
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image src="/no-data.svg" width="200" height="200" alt="No data" />
          <h2 className="text-2xl">No rooms created</h2>
          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
