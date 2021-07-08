import express from 'express';
import { MongoClient } from 'mongodb'
const morgan = require("morgan");

const app = express();
const PORT = 3000;
const dbURL = 'mongodb+srv://node-crash-course:4GHYbN9I1jc02YtC@cluster0.zamha.mongodb.net/marsPotTest?retryWrites=true&w=majority'
const client = new MongoClient(dbURL)
const dbName = 'marsPotTest'

client.connect().then(result => {
    console.log(result);

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})

app.get("/", async (req,res) => {
    const db = client.db(dbName)
    const collection = db.collection('documents')
    const findResult = await collection.find({}).toArray()
    res.send(findResult)
    console.log('Found documents =>', findResult)
})

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

