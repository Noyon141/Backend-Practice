import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send("GET all subscriptions");
});

subscriptionRouter.get("/:id", (req, res) => {
    res.send("GET subscription details");
});

subscriptionRouter.post("/", (req, res) => {
    res.send("CREATE a subscription");
});

subscriptionRouter.put("/:id", (req, res) => {
    res.send("UPDATE user subscription");
});

subscriptionRouter.delete("/:id", (req, res) => {
    res.send("DELETE a subscription");
});

subscriptionRouter.get("/user/:id", (req, res) => {
    res.send("GET user subscription details");
});

subscriptionRouter.post("/user/:id", (req, res) => {
    res.send("CREATE user subscription");
});

export default subscriptionRouter;