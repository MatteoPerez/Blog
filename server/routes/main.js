const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET - Home
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "Blog du Matt",
            description: "Blog créé avec NodeJs, MongoDb et Express."
        };
        let perPage = 5;
        let page = req.query.page || 1;
        const data = await Post.aggregate([{$sort:{createdAt:-1}}]).skip(perPage * page - perPage).limit(perPage).exec();
        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        res.render('index', { locals, data, current: page, nextPage: hasNextPage ? nextPage : null });
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
            title: data.title,
            description: "Blog créé avec NodeJs, MongoDb et Express."
        };
        res.render('post', { locals, data });
    } catch (error) {
        console.log(error);
    }
});

// POST - Post searchterm
router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Blog créé avec NodeJs, MongoDb et Express."
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialCharacter = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        const data = await Post.find({
            $or:[
                {title: {$regex: new RegExp(searchNoSpecialCharacter, 'i')}},
                {body: {$regex: new RegExp(searchNoSpecialCharacter, 'i')}}
            ]
        });
        res.render("search", {
            data,
            locals
        });
    } catch (error) {
        console.log(error);
    }
});

// router.get('', async (req, res) => {
//     const locals = {
//         title: "Blog du Matt",
//         description: "Blog créé avec NodeJs, MongoDb et Express."
//     } 
//     try {
//         const data = await Post.find();
//         res.render('index', { locals, data });
//     } catch (error) {
//         console.log(error);
//     }
// });

router.get('/about', (req, res) => {
    res.render('about');
});

// function insertPostData(){
//     Post.insertMany([
//         {
//             title: "Emile",
//             body: "Je suis prêt !! Tu m'accompagnes ?" 
//         },
//         {
//             title: "Jorge",
//             body: "Faites-que ça vaille le coup." 
//         },
//         {
//             title: "Carter",
//             body: "Ici Carter, terminé." 
//         },
//         {
//             title: "Kat",
//             body: "Première fois ? Moi aussi." 
//         },
//         {
//             title: "Jun",
//             body: "Ce fut un honneur." 
//         },
//         {
//             title: "Noble 6",
//             body: "Négatif, je suis armé. Bonne chance capitaine." 
//         }
//     ])
// }
// insertPostData();

module.exports = router;