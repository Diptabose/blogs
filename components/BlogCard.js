import React from "react";
import Link from "next/link";

function BlogCard(props) {
  const bc = (
    <div
      id="blog_card"
      className="border-2 border-black transition-[border-color] duration-500 hover:border-blue-500 rounded-md p-4 my-2 w-[60%] bg-gray-200 shadow-sm shadow-blue-300 "
    >
      <Link href={`/blogposts/${props.to}`}>
        <h1 className="text-2xl cursor-pointer">{props.title}</h1>
      </Link>
      <p >{props.content.substr(0,240)}...</p>
    </div>
  );

  return bc;
}

export default BlogCard;
