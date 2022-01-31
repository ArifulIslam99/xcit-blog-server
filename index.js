

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
app.use(cors())

const fileUpload = require('express-fileupload');
const { query } = require('express');
app.use(fileUpload())

const uri = "mongodb+srv://xcit_education:DXtdUlkqCMJs64NB@cluster0.xbjez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){

    try{


            await client.connect()
            const database = client.db('Xcit_Education');
            const blogCollection = database.collection('blogCollection');

            app.get('/blogs', async(req, res)=>{
                const blogs =  blogCollection.find({});
                const result = await blogs.toArray();
                res.json(result)
            })


            app.post('/blogs', async(req, res )=>{
                const title = req.body.title;
                const author = req.body.author;
                const description = req.body.description;
                const catagory = req.body.catagory;
                const status = req.body.status;
                const date = req.body.date
                const pic = req.files.image;
                const picData = pic.data;
                const encodedPic = picData.toString('base64')
                const image = Buffer.from(encodedPic, 'base64');
                
                 const blogs = {
                   
                    title, date,catagory, description, author, status, image,
                 }

                 
      
                 const result  = await blogCollection.insertOne(blogs)
                 res.json(result)
              }) 


              app.get('/blogs/technology', async (req, res)=>{

                   const filter = { catagory: 'technology'};
                    const query =  blogCollection.find(filter)
                    const result = await query.toArray()

                res.json(result)
              })

              app.get('/blogs/science', async (req, res)=>{

                   const filter = { catagory: 'science'};
                    const query =  blogCollection.find(filter)
                    const result = await query.toArray()

                res.json(result)
              })
      
              app.get('/blogs/programming', async (req, res)=>{

                   const filter = { catagory: 'programming'};
                    const query =  blogCollection.find(filter)
                    const result = await query.toArray()

                res.json(result)
              })
      


    }
    finally{

    }

}

run().catch(console.dir)

app.get('/', (req, res)=>{
    res.send('Xcit Running')
})

app.listen(port, ()=>{
    console.log('Running port', port)
})