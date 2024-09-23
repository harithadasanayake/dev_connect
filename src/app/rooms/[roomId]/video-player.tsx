
'use client'

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Profile, Room } from '@/db/schema';
import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';

import { cache, useEffect, useState } from 'react';

import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

// const profilerLoader = cache(getUserProfileUseCase);

// async function ProfileData({ userId }: { userId: number }) {
//     const profile = await profilerLoader(userId);
//     return profile;

// }

export function DevConnectVideo({ room}: { room: Room }) {
    
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null >(null);
    const router = useRouter();
    
    useEffect(() => {
        
        if (!room) {
            return;
        }
        // if (!profile){
        //     return;
        // }
        const userId = String(room.userId);
        const client = new StreamVideoClient({ 
            apiKey, 
            user: {
                id: userId,
                // name: profile.displayName ?? undefined,
                // image: profile.image ?? undefined,
            }, 
            tokenProvider: () => generateTokenAction(),
        });
        console.log('Room:', room.id);
        console.log('Client:', client);
        setClient(client);
        const call = client.call('default', room.id);
        call.join({ create: true });
        setCall(call);

        return () => {
            call
                .leave()
                .then(() => client.disconnectUser())
                .catch(console.error);
        };
    }, [ room]);

    return (
        client &&
        call && (
            <StreamVideo client={client}>
                <StreamTheme>
                    <StreamCall call={call}>
                        <SpeakerLayout />
                        <CallControls 
                            onLeave={() => {
                                router.push("/your-rooms");
                            }}/>
                        <CallParticipantsList onClose={() => undefined}/>
                    </StreamCall>
                </StreamTheme>
            </StreamVideo>
        )
    );
};

