import { Hono } from "hono";
import { uploadImageRoute } from "./uploadImage.js";
import { physiqueRoute } from "./physique.js";

const scanRoutes = new Hono();

scanRoutes.route("/", uploadImageRoute);
scanRoutes.route("/", physiqueRoute);

export default scanRoutes;
