//const express = require('express');
//const cors = require('cors');
import express from 'express'
import cors from 'cors'
//const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import  upload  from './storage.js';


//require ('dotenv').config();
const app=express();
const port=process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('upload'));


//LFloNDE3Cl7sOo6s
//TUITION-HUB


//const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TUITION-HUB:LFloNDE3Cl7sOo6s@cluster0.yxgvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//const uri = "mongodb+srv://TUITION-HUB:LFloNDE3Cl7sOo6s@cluster0.yxgvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.post('/user/logout', (req, res) => {
    // Assuming you are using express-session or similar
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).send({ message: 'Logout successful' });
    });
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const profileCollection = client.db("ProfileDB").collection('tuitionHub')

    app.get('/tuitionHub',async(req,res)=>{
        const cursor=profileCollection.find();
       
       
        const result=await cursor.toArray()
        console.log(result);
        res.send(result);
    })

   /**
    *  app.get('/tuitionHub/:id',async(req,res)=>{
        console.log("yes")
        const id=req.params.id;
        console.log(id);
        const query={_id: new ObjectId(id)}
        const result=await profileCollection.findOne(query)
        res.send(result);
    })
    */
    app.put('/tuitionHub/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedProfile = req.body;
    
        const profile = {
            $set: {
                fullName: updatedProfile.fullName,
                institution: updatedProfile.institution,
                age: updatedProfile.age,
                phone: updatedProfile.phone,
                email: updatedProfile.email,
                subjects: updatedProfile.subjects,
                availabilityDays: updatedProfile.availabilityDays,
                profileImage: updatedProfile.profileImage, // Corrected this line
            }
        };
    
        try {
            const result = await profileCollection.updateOne(filter, profile, options);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Failed to update the profile.' });
        }
    });
    






 // Express route to check if a teacher profile exists
app.get('/checkProfile/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log(userId)

    try {
        // Query your MongoDB database to check if a profile exists for this user
        const profile = await profileCollection.findOne({ uid:userId });
        console.log(profile)

        if (profile) {
            res.json({ exists: true,data:profile });
        } else {
            res.json({ exists: false,data:profile });
        }
    } catch (error) {
        console.error('Error checking profile:', error);
        res.status(500).json({ exists: false });
    }
});



    app.post('/tuitionHub',upload.single('profileImage'),async(req,res)=>{
        console.log(req.file.filename)
        const image=req.file?req.file.filename:null;
        const addProfile={
            fullName:req.body.fullName,
            institution:req.body.institution,
            age:req.body.age,
            phone:req.body.phone,
            email:req.body.email,
            subjects:req.body.subjects,
            availabilityDays:req.body.availabilityDays,
            image:image,
            uid:req.body.uid
        };
        const result=await profileCollection.insertOne(addProfile);
        console.log(result);
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('TUITION-HUB is running')
})

app.listen(port,()=>{
    console.log(`Coffee Server is running on port:${port}`)
})