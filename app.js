import express from "express";
import connectToDatabase from "./database/mongodb.js";
import { PORT } from "./env/env.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";



const app = express();

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/subscription',subscriptionRouter)
app.use('/api/v1/user',userRouter)

app.get('/', (req, res) => {
    res.send('Welcome to Subscription Management System API');
});
app.listen(PORT, async ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);

    await connectToDatabase();
})


export default app;
