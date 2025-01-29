'use server';
import {prisma} from "@/db";
import { auth } from "./app/auth";
export async function getSessionEmail():Promise<string|null|undefined>{
    const session = await auth();
    return session?.user?.email;
}
export async function getSessionEmailOrThrow():Promise<string>{
    const userEmail = await getSessionEmail();
    if(!userEmail){
        throw 'not logged in';
    }
    return userEmail;
}
export async function updateProfile(data: FormData, ) {
    const userEmail = await getSessionEmailOrThrow();
    const newUserInfo={
        username: data.get('username') as string,
        name: data.get('name') as string,
        subtitle: data.get('subtitle') as string,
        bio: data.get('bio') as string,
        avatar: data.get('avatar') as string

    }; 
    await prisma.profile.upsert({ 
        where: { 
            email: userEmail, 
        }, 
        update: newUserInfo, 
        create: { 
            email: userEmail, 
            ...newUserInfo, 
        }
    });
}

export async function postEntry(data:FormData){
    const sessionEmail = await getSessionEmailOrThrow();
    const postDoc = await prisma.post.create({
        data:{
            author: sessionEmail,
            image: data.get('image') as string,
            description: data.get('description') as string || '',

        },
    });
    return postDoc.id;
}

export async function postComment(data:FormData) {
    const authorEmail = await getSessionEmailOrThrow();
    return prisma.comment.create({
        data: {
            author: authorEmail,
            postId: data.get('postId') as string,
            text: data.get('text') as string,
        },
    })

}

async function updatePostLikesCount(postId:string){
    await prisma.post.update({
        where:{id:postId},
        data:{
            likesCount: await prisma.like.count({where:{postId}}),
        },
    })
}

export async function likePost(data:FormData){
    const postId = data.get('postId') as string;
    const author = await getSessionEmailOrThrow();
   await prisma.like.create({
        data:{
            author: author,
            postId,
        },
    });
    await updatePostLikesCount(postId);
}

export async function removeLikeFromPost(data:FormData){
    const postId = data.get('postId') as string;
    const author = await getSessionEmailOrThrow();
    await prisma.like.deleteMany({
        where: {
            postId,
            author: author,
        },
    });
    await updatePostLikesCount(postId);
    
}


export async function followProfile(profileIdToFollow:string){
    const sessionProfile = await prisma.profile.findFirstOrThrow({
        where:{email: await getSessionEmailOrThrow()},
    })
   await prisma.follower.create({
        data:{
            followingProfileEmail: await getSessionEmailOrThrow(),
            followingProfileId : sessionProfile.id,
            followedProfileId: profileIdToFollow,
        },
    });
}

export async function unfollowProfile(profileIdToFollow:string){
    const sessionProfile = await prisma.profile.findFirstOrThrow({
        where:{email: await getSessionEmailOrThrow()},
    })
   await prisma.follower.deleteMany({
        where:{
            followingProfileEmail: sessionProfile.email,
            followingProfileId : sessionProfile.id,
        },
    });
}

export async function bookmarkPost(postId:string){
    const sessionEmail = await getSessionEmailOrThrow();
    await prisma.bookmark.create({
        data:{
            author: sessionEmail,
            postId,
        },
    });
}

export async function unBookmarkPost(postId:string){
    const sessionEmail = await getSessionEmailOrThrow();
    await prisma.bookmark.deleteMany({
        where:{
            author: sessionEmail,
            postId,
        },
    });
}

