import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration,OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration  = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

})

const openai = new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    res.send('Hello from dalie');
})
router.route('/').post(async (req,res)=>{
   try {
    //console.log(req.body,'0');
    const {prompt} = req.body;
    //console.log(prompt,'1');
    const aiResponse = await openai.createImage({
        prompt,
        n:1,
        size: '1024x1024',
        response_format: 'b64_json',


    })
   // console.log(aiResponse,'2');
    const image = aiResponse.data.data[0].b64_json;
    //console.log(image,'3');
    res.status(200).json({photo:image});

   } catch (error) {
    console.log("OU NOU");
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
        
   }


})
export default router;