import { Blog } from "../components/blog/types";
const convert = require('xml-js');
import { promises as fs } from 'fs';

export const getBlogs = async (): Promise<Blog[]> => {
    const blogsArray: Blog[] = [];
    const data = await fs.readFile('./import.xml', 'utf8');

    // we have data
    // now find the entries
    const jsonData = convert.xml2json(data, {compact: true, spaces: 4});
    const blogs = JSON.parse(jsonData).feed.entry;
      
    await blogs.forEach(async (b: any,i: number) => {
        // shows that first 50 blogs are internal blogger items
        // console.log(i, ' ', convertTitleToSlug(b.title._text))
      
        if (i > 50) {
      
            blogsArray.push( {
                title: b.title._text,
                html: b.content._text,
                published: b.published._text,
                slug: convertTitleToSlug(b.title._text),
            });
      
        }
    })
    console.log('after lop',blogsArray.length)
    return blogsArray

        
};

const convertTitleToSlug = (str: string) => {
    return str.replaceAll(' ', '-').toLowerCase();
}
