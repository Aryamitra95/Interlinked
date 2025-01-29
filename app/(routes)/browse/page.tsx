import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";

export default async function BrowsePage(){
    const posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'},
        take: 100,
    });
    return(
        <div className="">
            <div className="mb-4">
            <h1 className="text-2xl font-bold text-slate-700">Browse</h1>
            <p className="text-gray-500">Check lastest posts and find some inspiration</p>
            </div>
            <PostsGrid posts={posts}/>
        </div>
    );
}