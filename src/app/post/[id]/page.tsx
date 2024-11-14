"use client";

import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";

export default function ExampleClientComponent() {
    const router = useRouter();
    const params = useParams();

    const myPosts = useQuery(api.tasks.listTasksForConvexId, {
        convexId: params.id,
    });

    return (
        <div>
            <h2>URL Parameters:</h2>
            <h2>{params.id}</h2>
            {myPosts?.map((message) => (
                <li key={message._id} className="p-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {message.title}
                        </h2>
                        <p className="text-gray-600 mt-2">{message.body}</p>

                        {message.format === "image" && message.url ? (
                            <Image message={message} height="300" width="300" alt="my image"/>
                        ) : (
                            <h1 className="text-gray-500 mt-4">No images</h1>
                        )}
                        <button
                            onClick={() => {
                                console.log(message._id);
                                router.push(`/post/${message._id}`);
                            }}
                        >
                            Load
                        </button>
                    </div>
                </li>
            ))}
        </div>
    );
}
