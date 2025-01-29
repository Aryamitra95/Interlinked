'use client';
import { bookmarkPost, likePost, removeLikeFromPost, unBookmarkPost } from "@/actions";
import { prisma } from "@/db";
import { Bookmark, Like, Post } from "@prisma/client";
import { BookmarkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default async function BookmarkButton({
    post,
    sessionBookmark,
}:{
    post:Post,
    sessionBookmark:Bookmark|null,
}){ 
    const router = useRouter();
    const [bookmarkedByMe, setBookmarkedByMe] = useState(!!sessionBookmark);
    return(
    <div className="">
        <form 
        action={async(data:FormData)=>{
            setBookmarkedByMe(prev => !prev);
            if(bookmarkedByMe){
                await unBookmarkPost(post.id);
            }else{
               await bookmarkPost(post.id);
            }
            router.refresh();
         }}
        className="flex items-center gap-2 ">
            <input type="hidden" name="postId" value={post.id}/>
                 <button 
                 type="submit" 
                 className="">
                <BookmarkIcon className={bookmarkedByMe ? 'fill-gray-800 dark:text-white dark:fill-white':'dark:text-white'}/>
             </button>
        </form>
    </div>
    );
}