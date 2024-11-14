"use client";

import SearchForm from "@/components/SearchForm";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";

export default function SearchPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const searchQuery =
        typeof searchParams.query === "string" ? searchParams.query : "";

    const [query, setQuery] = useState(searchQuery);

    const searchResults = useQuery(api.tasks.search, { query }) || [];

    useEffect(() => {
        if (searchQuery !== query) {
            setQuery(searchQuery);
        }
    }, []);

    return (
        <div>
            <SearchForm />
            <h2>Search Results for: {query}</h2>
            <div>
                {searchResults.length > 0 ? (
                    searchResults.map((message) => (
                        <li key={message._id}>
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {message.title}
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    {message.body}
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
}
