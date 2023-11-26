import * as fs from 'fs/promises'
import React from "react";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Error from "next/error";


function Blogs(props) {
  const [blogs] = useState(props.allBlogs);
  const[isError , setError]=useState(false);
  useEffect(()=>{
    if("error" in props){
      setError(true);
    }
  },[props])
  return (
    <div className="px-2 mt-4">
      <h1 className="text-3xl mb-2">Latest Blogs</h1>
      { (!isError)?(<div className="flex flex-col w-full items-center">
        {blogs.map((blog) => {
          return (
            <BlogCard
            key={blog.slug}
              to={blog.slug}
              title={blog.title}
              content={blog.content}
            />
          );
        })}
      </div>):(<Error statusCode={props.errorCode}/>) }
    </div>
  );
}


//Using static site generation to get all the blogs 
export async function getStaticProps(context){
  let allBlogs=[];  
  try{                                      
    const files = await fs.readdir(`blogdata/`);
    for(let file of files ){
        const fileContent = await fs.readFile("blogdata/".concat(file) , "utf-8");
        allBlogs.push(JSON.parse(fileContent));
    }
    return{
      props:{allBlogs}
    }
  }
  catch(error){
    console.error(error);
    return{
      notFound:true
    }
  }
}










// Performing server side rendering
//console is accessible to vscode terminal
//context gives the req parameters 
//Send error status in props if a ssr has error in loading a resource

// export async function getServerSideProps(context) {
//   const allBlogs = await fetch("http://localhost:3000/api/getblogs");
//   console.log(allBlogs)
//   if(allBlogs.status!==200){
//     return {
//       props:{ allBlogs:[] , error:"Internal server error" , errorCode :allBlogs.status}
//     }
//   }
//   const parsedAllBlogs = await allBlogs.json();
//   console.log(parsedAllBlogs);
//   return {
//     props: { allBlogs: parsedAllBlogs },
//   };
// }

export default Blogs;
