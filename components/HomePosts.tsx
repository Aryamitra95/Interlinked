import { prisma } from "@/db";
import { Follower, Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import LikesInfo from "./LikesInfo";
import { getSessionEmailOrThrow } from "@/actions";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

export default async function HomePosts({
    follows,
    profiles,
}:{
    follows:Follower[],
    profiles:Profile[],
}){
    const posts = await prisma.post.findMany({
        where:{
            author:{in: profiles.map(p=>p.email)},
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 100,
    });
    const likes = await prisma.like.findMany({
        where: {
            author: await getSessionEmailOrThrow(),
            postId: {in: posts.map(p=> p.id)},
        }
    });
    const bookmarks = await prisma.bookmark.findMany({
        where: {
            author: await getSessionEmailOrThrow(),
            postId: {in: posts.map(p=> p.id)},
        }
    });
    return(
        <div className="max-w-md mx-auto flex flex-col gap-8">
            {posts.map(post=>{
                const profile = profiles.find(p=> p.email === post.author)
                return(
                    <div 
                className=""
                key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                    <img 
                    className="rounded-lg shadow-md shadow-black/50"
                    src={post.image} alt=""/>
                    </Link>
                    <div className="flex items-center gap-2 mt-4 justify-between">
                     <div className="flex gap-2 items-center">
                        <Avatar
                       radius="full"
                       src={profile?.avatar || ''}
                       size="3"
                       fallback="avatar"/>
                       <Link className="font-bold text-grey-700 dark:text-300" href={`/users/${profile?.username}`}>{profile?.name}</Link>
                       <div className="flex gap-2 items-center">
                     </div>
                      
                        <LikesInfo
                        post={post}
                        showText={false}
                        sessionLike={likes.find(like=> like.postId === post.id) || null}
                        />
                        <BookmarkButton post={post} sessionBookmark={bookmarks.find(b=>b.postId === post.id) || null}/>
                       </div>
                    </div>
                    <p className="mt-2 text-slate-600 dark:text-gray-400">
                        {post.description}
                    </p>
                </div>
                );
            })}
        </div>
    );
}