import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

import Post from '../mongodb/models/post.js';

dotenv.config();//to make sure that our environment variables are getting populated

import multer from 'multer';
const router=express.Router();
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POSTS
router.route('/').get(async(req,res)=>{
    try {
        const posts=await Post.find({});
        console.log(posts);
        res.status(200).json({success:true,data:posts});
    } catch (error) {
        res.status(500).send({success:false,message:error})
    }
});


//CREATE A POST
router.route('/').post(upload.single('photo'), async (req, res) => {
    console.log("entered post");
    try {
      // Body is of the formData 
      const { name, prompt } = req.body;
      const photo = req.file.path;

      const photoUrl = await cloudinary.uploader.upload(photo);
  
      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
      });
      
      console.log("new post: "+newPost);

      // Delete the photo from the server
      fs.unlinkSync(photo);
      res.status(201).json({ success: true});
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
  });

export default router;