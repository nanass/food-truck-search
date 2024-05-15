import { Router } from "express";

import { foodTruckRoutes } from "../routes";

const router = Router();

router.use("/food-truck", foodTruckRoutes);

export { router, foodTruckRoutes }

