import express from "express";
import fs from "fs";

const names = JSON.parse(fs.readFileSync("./db/names.json", "utf-8"));
const products = JSON.parse(fs.readFileSync("./db/products.json", "utf-8"));

const startJSONServer = (): void => {
  const app = express();

  app.use(async (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  app.get("/names", async (req, res) => {
    try {
      res.json(names);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/products", async (req, res) => {
    try {
      res.json(products);
    } catch (e) {
      console.log(e);
    }
  });

  app.listen(5000);
};

startJSONServer();
