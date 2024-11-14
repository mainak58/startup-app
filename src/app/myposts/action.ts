"use server";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
    // Create a new post
    // ...

    // Redirect to the new post
    redirect(`/posts/${data.id}`);
}
