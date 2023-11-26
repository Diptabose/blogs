import React, { useState, useEffect } from "react";
//import { useRouter } from "next/router";
import Error from "next/error";
import * as fs from "fs/promises";

function Slug(props) {
  
  
  const [blog, setBlog] = useState(props.parsedBlog);
  
  const [isError, setError] = useState(false);

  useEffect(() => {
    if ("error" in props) {
      setError(true);
    }
    // setBlog(props.parsedBlog)
  }, [props]);
  
// if(blog===undefined){
//   return(<div>Loading...</div>)
// }

  const ret = (
    <div>
      {isError ? (
        <Error statusCode={404} />
      ) : (
        <div>
          <h1 className="text-3xl text-center my-4">{blog.title}</h1>
          <div className="flex flex-col items-center">
            <p className="max-w-[60%] text-center">{blog.content}</p>
          </div>
        </div>
      )}
    </div>
  );
  return ret;
}

//Using pre-rendering stategy as static side generation (ssg)

//Using getStaticPaths to prefetch all the possible blog urls
//getStaticPaths is mandatory for dynamic links along with getStaticProps
//This runs on entirely on serverside and gets called during build time
//This is called every time a new request is made.
export async function getStaticPaths() {

  console.log("Trying to invoke getStaticPaths");
  try {
    let allBlogs = [];
    //This is returing all the files names in the given directory
    const files = await fs.readdir(`blogdata/`);
  
    //Looping over the files and pushing according to format {params:{dynamicRouteName:data}} in this case its slug
    for (let file of files) {
      allBlogs.push({ params: { slug: file.replace('.json','') } });
    }
    console.log("Its returining ");
    console.log(allBlogs)
    return {
      paths: allBlogs,
      fallback:false,
    };
  } catch (error) {
    console.log("This is the error in static paths");
    console.error(error);
  }
}

//Used to get the props required by our component at server side and hydrating it
export async function getStaticProps(context) {
  //The params returned by getStaticPaths is used here and from context.params we get the slug out of it.
  const resource = context.params;
  console.log("The resource slug is");
  console.log(resource.slug);
  try {
    /* readFile return value is a string which is converted to object using JSON.parse()*/
    const file = await fs.readFile(`blogdata/${resource.slug}.json`, "utf-8"); //.json
    return {
      props: { parsedBlog: JSON.parse(file) },
    };
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    };
  }
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   const blog = await fetch(`http://localhost:3000/api/getblog?blog=${slug}`);
//   console.log(blog);
//   if (blog.status !== 200) {
//     return {
//       props: {
//         parsedBlog: {},
//         error: "Requested file not found",
//         errorCode: blog.status,
//       },
//     };
//   }
//   const parsedBlog = await blog.json();

//   return {
//     props: { parsedBlog },
//   };
// }
export default Slug;
