import "reflect-metadata";
import dotenv from "dotenv";
import { server } from "./server";

dotenv.config({
  path: "./src/configurations/.env",
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`API running at port ${process.env.SERVER_PORT}`);
});