import { Hono } from "hono";
import { createAccountRoutes } from "./createAccount.js";
import { loginRoutes } from "./login.js";
import { logoutRoutes } from "./logout.js";
import { refreshRoutes } from "./refresh.js";

const authRoutes = new Hono();

authRoutes.route("/", createAccountRoutes);
authRoutes.route("/", loginRoutes);
authRoutes.route("/", logoutRoutes);
authRoutes.route("/", refreshRoutes);

export default authRoutes;
