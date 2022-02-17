import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import { brandsRouter } from "./routes/brands.js";
import { productsRouter } from "./routes/products.js";
// import { auth } from "./middleware/auth.js";

// setup express

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log("Port Connected at " + port);
});

//setup mongodb

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Client Connected");
    return client;
}

export const client = await createConnection();

app.get("/", (request, response) => {
    response.send("Hi");
})

// setup routes

app.use("/brands", brandsRouter);
app.use("/products", productsRouter);
