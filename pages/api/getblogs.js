import * as fs from 'fs/promises'

export default async function handler(req,res){
    try{
      let allBlogs=[];                                               
    const files = await fs.readdir(`blogdata/`);
    
    for(let file of files ){
        const fileContent = await fs.readFile("blogdata/".concat(file) , "utf-8");
        allBlogs.push(JSON.parse(fileContent));
    }
    res.status(200).json(allBlogs);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}