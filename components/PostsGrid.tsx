'use client';
import { Post } from "@prisma/client";
import { Link } from "lucide-react";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";



const breakpointColumnsObj = {
    default: 4,
    800: 3,
    500: 2
  };

export default function PostsGrid({posts}:{posts:Post[]}) {
  
  return(
        <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex justify-center gap-2"
        columnClassName="">
        {posts.map(post =>(
          <a 
          key={post.id}
          href={`/posts/${post.id}`} className="mb-4 ">
              <img className="rounded-lg" src={post.image}  alt=""/>
          </a>
            
        ))}
      </Masonry>
    );
}