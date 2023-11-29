import express from "express";
import http from "http";
import https from "https";
import fs from "fs";
import create from "./websocket.js";
import { PUBLIC_WS_ENV } from "$env/static/public";
import { PORT } from "$env/static/private";

const app = express();

if (PUBLIC_WS_ENV === "production") {
  // Load SSL/TLS certificate and key
  const serverOptions = {
    cert: fs.readFileSync("/ssl/justearn.gg.pem"),
    key: fs.readFileSync("/ssl/justearn.gg.key"),
  };
  const httpsServer = https.createServer(serverOptions, app);
  create(httpsServer);

  httpsServer.listen(PORT || 2053, () => {
    console.log(`Server started on port ${httpsServer.address().port} :)`);
  });
} else if (env.PUBLIC_WS_ENV === "staging") {
  // Load SSL/TLS certificate and key
  const serverOptions = {
    cert: fs.readFileSync("/ssl/justearn.gg.pem"),
    key: fs.readFileSync("/ssl/justearn.gg.key"),
  };
  const httpsServer = https.createServer(serverOptions, app);
  create(httpsServer);

  httpsServer.listen(PORT || 2083, () => {
    console.log(`Server started on port ${httpsServer.address().port} :)`);
  });
} else {
  const server = http.createServer(app);
  create(server);

  server.listen(PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
  });
}
