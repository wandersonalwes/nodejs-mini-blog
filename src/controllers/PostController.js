const connection = require('../database/connection');
const path = require('path');
const fs = require('fs');

module.exports = {
    async show(req, res) {
        const posts = await connection('posts').select('*');
        res.render('pages/posts.njk', { posts });
    },
    create(req, res) {
        res.render('pages/add.njk');
    },
    async store(req, res) {
        const { title, description } = req.body;

        const { key } = req.file;

        const post = await connection('posts').insert({
            title,
            description,
            img_profile: `${process.env.APP_URL}/files/${key}`,
            key,
        });

        res.redirect('/posts');
    },
    edit(req, res) {},
    update(req, res) {},
    async destroy(req, res) {
        const { id } = req.params;

        const post = await connection('posts').where({ id }).first();

        if (post) {
            await connection('posts').where({ id }).delete();

            fs.unlink(
                `${path.resolve(
                    __dirname,
                    '..',
                    '..',
                    'tmp',
                    'uploads',
                    post.key
                )}`,
                (err) => {
                    if (err) throw err;
                }
            );

            res.redirect('/posts');
        }

        res.send('Post not found');
    },
};
