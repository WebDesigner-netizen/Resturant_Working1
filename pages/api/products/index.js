import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
import mongoose from 'mongoose';

const mongoURL = "mongodb+srv://sayak:sayak1234@cluster0.veijnzi.mongodb.net/pizza?retryWrites=true&w=majority"

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

//   dbConnect().then((res) => console.log(res));
mongoose.connect(mongoURL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }) 
        .then(() => { 
            console.log('MongoDB connected'); 
        }) 
        .catch(err => { 
            console.log(err); 
        })

  if(method === "GET") {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
  }

  if(method === "POST") {
    // if(!token || token !== process.env.token){
    //   return res.status(401).json("Not authenticated!")
    // }
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch(err) {
        res.status(500).json(err);
    }
  }
}
