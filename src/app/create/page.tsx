"use client";

import React, { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";


function AddForm() {
    const createTask = useMutation(api.tasks.createTask);
    const generateUploadUrl = useMutation(api.tasks.generateUploadUrl);

    const imageInput = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { userId } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        // Assuming `generateUploadUrl` returns a storage ID
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": selectedImage!.type },
            body: selectedImage,
        });
        const { storageId } = await result.json();

        await createTask({
            title: formData.get("title") as string,
            body: formData.get("body") as string,
            author: userId ?? "Anonymous",
            storageId, 
        });
    };

    return (
        <>
            <Navbar />
            <form
                className="flex flex-col h-30 w-40 space-y-2"
                onSubmit={handleSubmit}
            >
                <input name="title" placeholder="Enter title" />
                <input name="body" placeholder="Enter body" />
                <input
                    type="file"
                    accept="image/*"
                    ref={imageInput}
                    onChange={(event) =>
                        setSelectedImage(event.target.files![0])
                    }
                    className="ms-2 btn btn-primary"
                    disabled={selectedImage !== null}
                />
                <input
                    type="submit"
                    value="Send Image"
                    disabled={selectedImage === null}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

function Image({ message }: { message: { url: string } }) {
    return <img src={message.url} height="300px" width="auto" />;
}
export default AddForm;
