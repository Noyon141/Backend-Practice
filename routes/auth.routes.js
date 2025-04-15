import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-in', (req, res) => {
    // Handle sign-in logic here
    res.send('Sign-in endpoint');
});

authRouter.post('/sign-up', (req, res) => {
    // Handle sign-up logic here
    res.send('Sign-up endpoint');
});

authRouter.post('/sign-out', (req, res) => {
    // Handle sign-out logic here
    res.send('Sign-out endpoint');
});

export default authRouter;