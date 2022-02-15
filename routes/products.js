import { ObjectID } from "bson";
import express from "express";
import { client } from "../index.js";

const router = express.Router();

router.route("/").get(async (request, response) => {
    const brand = request.query;
    const getProducts = await client.db("b28wd").collection("products").find(brand).toArray();
    response.send(getProducts);
})

router.route("/").post(async (request, response) => {
    const data = request.body;
    const addProduct = await client.db("b28wd").collection("products").insertOne(data);
    response.send(addProduct);
})

router.route("/:id").delete(async (request, response) => {
    const { id } = request.params;
    const deleteProduct = await client.db("b28wd").collection("products").deleteOne({ _id: new ObjectID(id) });
    response.send(deleteProduct);
})

router.route("/:id").get(async (request, response) => {
    const { id } = request.params;
    const getProduct = await client.db("b28wd").collection("products").findOne({ _id: new ObjectID(id) });
    response.send(getProduct);
})

router.route("/:id").put(async (request, response) => {
    const { id } = request.params;
    const data = request.body;
    const updateProduct = await client.db("b28wd").collection("products").updateOne({ _id: new ObjectID(id) }, { $set: data })
    response.send(updateProduct);
})

export const productsRouter = router;