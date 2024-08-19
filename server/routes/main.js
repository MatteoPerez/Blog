const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

let db, bucket;

// GET - Access home page
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "Accueil",
            description: "Blog créé avec NodeJs, MongoDb et Express."
        };
        let perPage = 5;
        let page = req.query.page || 1;
        const data = await Post.aggregate([{$sort:{createdAt:-1}}]).skip(perPage * page - perPage).limit(perPage).exec();
        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        res.render('home', {locals, data, current: page, nextPage: hasNextPage ? nextPage : null, currentRoute: '/'});
    } catch (error) {
        console.log(error);
    }
});

// GET- Access about page
router.get('/about', (req, res) => {
    const locals = {title: "À propos"};
    res.render('about', {locals, currentRoute: '/about'});
});


// GET - Access sign in page
router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Se connecter"
        };
        res.render('sign_in', {locals, currentRoute: '/sign_in'});
    } catch (error) {
        console.log(error);
    }
});

// GET - Access manage member page
router.get('/files', async (req, res) => {
    try {
        const locals = {
            title: "Fichiers"
        };
        res.render('files', {locals, currentRoute: '/files'});
    } catch (error) {
        console.log(error);
    }
});

// GET - Post :id
router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({_id: slug});
        const locals = {
            title: data.title
        };
        res.render('post', {locals, data, currentRoute: `/post/${slug}`});
    } catch (error) {
        console.log(error);
    }
});

// POST - Post searchterm
router.post('/search', async (req, res) => {
    try {
        const locals = {title: "Résultats"}
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialCharacter = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        const data = await Post.find({
            $or:[
                {title: {$regex: new RegExp(searchNoSpecialCharacter, 'i')}},
                {body: {$regex: new RegExp(searchNoSpecialCharacter, 'i')}}
            ]
        });
        res.render("search", {data, locals, currentRoute: '/'});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;