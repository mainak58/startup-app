"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

function Page() {
    const { userId } = useAuth();
    const myPosts = useQuery(api.tasks.listTasksForUser, { userId }) || [];

    return (
        <>
            <Navbar />
            <ul>
                {myPosts?.map((message) => (
                    <li key={message._id} className="p-4">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {message.title}
                            </h2>
                            <p className="text-gray-600 mt-2">{message.body}</p>

                            {message.format === "image" ? (
                                <Image message={message} />
                            ) : (
                                <h1 className="text-gray-500 mt-4">
                                    No images
                                </h1>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

function Image({ message }: { message: { url: string } }) {
    return (
        <img src={message.url} height="300px" width="300px" alt="Post image" />
    );
}

export default Page;
