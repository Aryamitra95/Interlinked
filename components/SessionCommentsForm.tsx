import { auth } from "@/app/auth";
import { prisma } from "@/db";
import CommentForm from "./CommentForm";

export default async function SessionCommentForm({postId}:{postId:string}){
    const session = await auth();
    const profile = await prisma.profile.findFirstOrThrow({where:{email:session?.user?.email as string}});
    return(
        <CommentForm postId={postId} avatar={profile.avatar||''}/>
    );
}