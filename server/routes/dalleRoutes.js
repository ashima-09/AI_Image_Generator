import express from 'express';
import * as dotenv from 'dotenv';
import { OpenAIApi,Configuration} from 'openai';

dotenv.config({path:'../.env'});

const router=express.Router();

const configuration=new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
})

const openai=new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    console.log('Helloooo from DALL-E!');
})

//async bcz it will take some time to get the response from the api
router.route('/').post(async(req,res)=>{
    try {
        const {prompt}=req.body; //will be coming from the frontend side

        const aiResponse=await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json',
        });
        const image=aiResponse.data.data[0].b64_json;

        res.status(200).json({photo:image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;