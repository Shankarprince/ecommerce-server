import express from "express";
import { client } from "../index.js";
import { ObjectID } from "mongodb";

const router = express.Router();

router.route("/").get(async (request, response) => {
    const getBrands = await client.db("b28wd").collection("brands").find({}).toArray();
    response.send(getBrands);
})

router.route("/").post(async (request, response) => {
    const data = request.body;
    const addBrand = await client.db("b28wd").collection("brands").insertOne(data);
    response.send({ message: "Added successfully" });
})

router.route("/:id").get(async (request, response) => {
    const { id } = request.params;
    const getBrand = await client.db("b28wd").collection("brands").findOne({ _id: new ObjectID(id) });
    response.send(getBrand);
})

router.route("/:id").put(async (request, response) => {
    const { id } = request.params;
    const data = request.body;
    const updateBrand = await client.db("b28wd").collection("brands").updateOne({ _id: new ObjectID(id) }, { $set: data })
    const updatedBrand = await client.db("b28wd").collection("brands").findOne({ _id: new ObjectID(id) });
    response.send(updatedBrand);
})

router.route("/:id").delete(async (request, response) => {
    const { id } = request.params;
    const deleteBrand = await client.db("b28wd").collection("brands").deleteOne({ _id: new ObjectID(id) });
    response.send(deleteBrand);
})

router.route("/").get(async (request, response) => {
    
})

export const brandsRouter = router;