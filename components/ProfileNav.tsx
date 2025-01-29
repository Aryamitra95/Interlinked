'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ProfileNav({
    isOurProfile=false,
    username,
}:{
    isOurProfile:boolean;
    username: string;
}){
    const path = usePathname();
    const bookmarkedActive = path.includes('/bookmarked');
    const highlightsActive = path.includes('/highlights');
    const postsActive = !bookmarkedActive && !highlightsActive;
    return(
        <section className="mt-4">
                <div className="flex justify-center gap-4 font-bold">
                <Link className={postsActive ? "text-gray-800 dark:text-gray-300" : "text-gray-500 dark:text-gray-600"} href={isOurProfile? "/profile":`/${username}`}>Posts</Link>
                <Link href={'/highlights'} className={highlightsActive ? "text-gray-800" : "text-gray-500"}>Highlights</Link>
                {isOurProfile &&(
                    <Link href={'/profile/bookmarked'} className={bookmarkedActive ? "text-gray-800 dark:text-gray-300" : "text-gray-500 dark:text-gray-600"}>Bookmarked</Link>
                )}
                </div>    
            </section>
    )
}