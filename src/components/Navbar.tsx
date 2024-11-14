"use client";

import {
    SignedIn,
    SignedOut,
    SignOutButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

function Navbar() {
    const toggleProfile = () => {
        redirect("/profile");
    };

    const { user } = useUser();

    return (
        <header className="w-full bg-slate-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-white text-xl font-bold">
                            <Link href={"/"}>My App</Link>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <SignedIn>
                            <div className="flex items-center space-x-4">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10",
                                        },
                                    }}
                                />

                                {user && (
                                    <Button onClick={toggleProfile}>
                                        <p className="text-white font-medium">
                                            {user.firstName}
                                        </p>
                                    </Button>
                                )}
                                <Button>
                                    <Link href="/create">Create</Link>
                                </Button>
                                <Button>
                                    <Link href="/myposts">My Posts</Link>
                                </Button>
                                <SignOutButton>
                                    <button className="text-white hover:text-gray-200 transition-colors">
                                        Sign Out
                                    </button>
                                </SignOutButton>
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-white hover:text-gray-200 transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
