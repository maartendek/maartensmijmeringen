'use strict';

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const convert = require('xml-js');
const fs = require('node:fs');

const convertTitle = (str) => {
    return str.replaceAll(' ', '-').toLowerCase();
}

module.exports = createCoreController('api::blog.blog', ({ strapi }) => ({

    async importBlogger(ctx) {
        try {
            fs.readFile('./import.xml', 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
                // we have data
                // now find the entries
                const jsonData = convert.xml2json(data, {compact: true, spaces: 4});
                const blogs = JSON.parse(jsonData).feed.entry;
              
              
                blogs.forEach(async (b,i) => {
                  // shows that first 50 blogs are internal blogger items
                  console.log(i, ' ', convertTitle(b.title._text))
              
                  if (i === 51) {
              
                      const entry = await strapi.entityService.create('api::blog.blog', {
                          data: {
                              title: b.title._text,
                              html: b.content._text,
                              published: b.published._text,
                              slug: convertTitle(b.title._text),
                          },
                        });
              
                        console.log('entered entry', entry)
                        ctx.body = 'you did it!';
                  }
                })
              
              });
        } catch (err) {
            ctx.body = err;
        }
    }

}))
