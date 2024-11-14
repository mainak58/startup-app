import Navbar from "@/components/Navbar";
import { UserProfile } from "@clerk/nextjs";

function page() {
    return (
        <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
        <UserProfile />
        </div>
        </>
    );
}

export default page;
