import cors from "cors";
import express from "express";

import { router } from './router';

export const App = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(router);
    return app;
 }