import { prisma } from "@/db";
import { profile } from "console";
import Avatar from "./Avatar";
import Link from "next/link";
import PostsGrid from "./PostsGrid";

export default async function SearchResults({query}:{query:string}){
    const profiles = await prisma.profile.findMany({
        where: {
            OR: [
                {username : {contains: query},},
                {name:{contains:query},},
            ]
        },
        take: 10,
    });
    const posts = await prisma.post.findMany({
        where: {description: {contains: query}},
        take: 100,
    });
    return(
        <div>
            <h1 className="text-lg">
              Search Results for "{query}"
            </h1>
            {profiles?.length > 0 && (
            <div className="grid grid-col-2 gap-2">
            {profiles.map(profile => (
                <Link href={`/users/${profile.username}`} className="flex gap-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded-full">
                    <div>
                        <Avatar src={profile.avatar||''}/>
                    </div>
                    <div>
                        <h3>{profile.name}</h3>
                        <h4 className="text-gray-500 dark:text-gray-300 text-sm">
                          @{profile.username}
                        </h4>
                    </div>
                </Link>
            ))}
            </div>
            )}
            <div className="mt-4">
                <PostsGrid posts={posts}/>
            </div>
        </div>
    );
}