import * as fs from "fs/promises";


export default async function handler(req, res) {
  const resource = req.query;
  
  try {
    const file = await fs.readFile(`blogdata/${resource.blog}.json`, "utf-8");
   
    res.status(200).json(JSON.parse(file));
  } catch (error) {
    console.error(error);
    res.status(404).json({error:"Internal server Error"});
  }
}
