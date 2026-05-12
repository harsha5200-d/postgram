const express = require('express');
const app = express();
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const upload = multer({storage: multer.memoryStorage()});

app.get('/ping', (req, res) => {
    res.json({ message: "pong" });
});

app.post('/create-posts', upload.single('image'), async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const result = await uploadFile(req.file.buffer);
        
        const post = await postModel.create({
            image : result.url,
            caption : req.body.caption
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
        const posts = await postModel.find()
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
