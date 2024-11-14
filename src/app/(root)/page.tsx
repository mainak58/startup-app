"use client";

import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Home() {
    const listAll = useQuery(api.tasks.listAllDocuments) || [];

    const router = useRouter();

    return (
        <>
            <Navbar />
            <div className="main-container gap-5">
                <p className="text-4xl">All Start Ups Are Here</p>
                <SearchForm />
            </div>

            <div className="content-div">
                {listAll?.map((message) => (
                    <li key={message._id} className="p-4">
                        <div className="bg-white shadow-lg rounded-lg p-6 content-container">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {message.title}
                            </h2>
                            <p className="text-gray-600 mt-2">{message.body}</p>

                            {message.format === "image" && message.url ? (
                                <Image message={message} alt="Post image" />
                            ) : (
                                <h1 className="text-gray-500 mt-4">
                                    No images
                                </h1>
                            )}
                            <button
                                onClick={() => {
                                    console.log(message._id)
                                    router.push(`/post/${message._id}`);
                                }}
                            >
                                Load
                            </button>
                        </div>
                    </li>
                ))}
            </div>
        </>
    );
}

function Image({ message }: { message: { url: string } }) {
    return (
        <img src={message.url} height="300px" width="300px" alt="Post image" />
    );
}
