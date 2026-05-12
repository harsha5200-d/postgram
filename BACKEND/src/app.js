const express = require('express');
const app = express();
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const upload = multer({storage: multer.memoryStorage()});
const authController = require('./controllers/auth.controller');

app.get('/ping', (req, res) => {
    res.json({ message: "pong" });
});

// Auth Routes
app.post('/register', authController.register);
app.post('/login', authController.login);

const authMiddleware = require('./middlewares/auth.middleware');

app.post('/create-posts', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const result = await uploadFile(req.file.buffer);
        
        const post = await postModel.create({
            image : result.url,
            caption : req.body.caption,
            author: req.userData.id
        })

        return res.status(201).json({
            message:"post created",
            post 
        })
    } catch (error) {
        console.error("Backend Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

app.get("/posts" , async(req,res) =>{
    try {
        const posts = await postModel.find().populate('author', 'username profileImage').sort({ createdAt: -1 });
        return res.status(200).json({
            message  :"posts fetched successfully",
            posts
        })
    } catch (error) {
        console.error("Fetch Error:", error);
        return res.status(500).json({ message: "Error fetching posts" });
    }
})

module.exports = app;
