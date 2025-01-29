import { getSessionEmailOrThrow } from "@/actions";
import BookmarkButton from "@/components/BookmarkButton";
import Comment from "@/components/Comment";
import LikesInfo from "@/components/LikesInfo";
import Preloader from "@/components/Preloader";
import SessionCommentForm from "@/components/SessionCommentsForm";
import { prisma } from "@/db";
import { BookmarkIcon } from "lucide-react";
import { Suspense } from "react";


export default async function SinglePostPage({params}:{params:{id:string}}){
    const post = await prisma.post.findFirstOrThrow({where:{id:params.id}});
    const authorProfile = await prisma.profile.findFirstOrThrow({where:{email:post.author}});
    const comments = await prisma.comment.findMany({where:{postId:post.id}});
    const uniq = require('lodash/uniq');
    const commentsAuthor = await prisma.profile.findMany({
        where:{
            email: {in: uniq(comments.map(c => c.author))},
        },
    });
    const myLike = await prisma.like.findFirst({
        where:{
            author: await getSessionEmailOrThrow(),
            postId: post.id,
        }
    })
    const myBookmark = await prisma.bookmark.findFirst({
        where:{
            author: await getSessionEmailOrThrow(),
            postId: post.id,
        }
    })
    return(
      <div className="">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <img
                className="rounded-md" 
                src={post.image} alt={post.description}/>
            </div>
            <div>
                <Comment
                createdAt={post.createdAt}
                text={post.description} authorProfile={authorProfile}/>
                <div className="pt-4 flex flex-col gap-4">
                    {comments.map(comment => (
                        <div key={comment.id}>
                            <Comment 
                            createdAt={comment.createdAt}
                            text={comment.text} authorProfile={commentsAuthor.find(a => a.email === comment.author)}/>
                        </div>
                    ))}
                </div>
                <div className="flex text-gray-700 items-center gap-2 justify-between py-4 mt-4 border-t-gray-300">
                        <LikesInfo post={post} sessionLike={myLike}/>
                    <div className="flex items-center">
                        <BookmarkButton post={post} sessionBookmark={myBookmark}/>
                    </div>
                    
                </div>
                <div className="pt-8 border-t border-t-gray-300">
                    <Suspense fallback={<Preloader/>}>
                        <SessionCommentForm postId={post.id}/>
                    </Suspense>
                </div>
            </div>
        </div>
      </div>  
    );
}