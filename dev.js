import express from "express";
import http from "http";
import https from "https";
import fs from "fs";
import create from "./websocket.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

if (process.env.PUBLIC_WS_ENV === "production") {
  // Load SSL/TLS certificate and key
  const serverOptions = {
    cert: fs.readFileSync("/ssl/justearn.gg.pem"),
    key: fs.readFileSync("/ssl/justearn.gg.key"),
  };
  const httpsServer = https.createServer(serverOptions, app);
  create(httpsServer);

  httpsServer.listen(2053, () => {
    console.log(`Server started on port ${httpsServer.address().port} :)`);
  });
} else if (process.env.PUBLIC_WS_ENV === "staging") {
  // Load SSL/TLS certificate and key
  const serverOptions = {
    cert: fs.readFileSync("/ssl/justearn.gg.pem"),
    key: fs.readFileSync("/ssl/justearn.gg.key"),
  };
  const httpsServer = https.createServer(serverOptions, app);
  create(httpsServer);

  httpsServer.listen(2083, () => {
    console.log(`Server started on port ${httpsServer.address().port} :)`);
  });
} else {
  const server = http.createServer(app);
  create(server);

  server.listen(8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
  });
}
