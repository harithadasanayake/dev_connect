"use client"

import { useSession } from "@/providers/Session.provider"

export default function ClientUser() {

    const { user } = useSession()
    return (

        <div>
            <h1>Client User</h1>
            {JSON.stringify(user)}
        </div>
    )
}