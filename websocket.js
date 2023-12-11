import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import WebSocket, { WebSocketServer } from "ws";
import chatTypes from "./src/lib/chatTypes.js";
import { verify } from "./src/lib/server/jwt.js";
import User from "./src/models/User.model.js";
import OfferDone from "./src/models/OfferDone.model.js";

const create = (server) => {
  mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
    console.log("Database connected!");
  });

  const wss = new WebSocketServer({ noServer: true });

  var chatHistories = chatTypes.map(() => []);

  const broadcast = (msg) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  };

  const broadcastOnlineCount = () => {
    const onlineCount = wss.clients.size;

    const msg = JSON.stringify({
      type: "online",
      online: onlineCount,
    });

    wss.clients.forEach((client) => {
      if (
        onlineCount === wss.clients.size &&
        client.readyState === WebSocket.OPEN
      ) {
        client.send(msg);
      }
    });
  };

  const getUser = async (ws) => {
    if (ws.user) {
      return ws.user;
    }

    const user = await User.findById(ws.id);
    if (user) {
      ws.user = user;
      return user;
    }

    return false;
  };

  const isAllowed = async (ws, chatI) => {
    const user = await getUser(ws);
    if (typeof chatI === "undefined") return false;
    const chatType = chatTypes[chatI];

    if (user.level < chatType.minimumLevel) {
      ws.send(
        JSON.stringify({
          type: "notallowed",
          msg: "You're not high enough level to access this chat.",
        })
      );
      return false;
    }

    return true;
  };

  const sendChatHistory = async (ws, chatI) => {
    ws.send(
      JSON.stringify({
        type: "chatHistory",
        data: chatHistories[chatI],
      })
    );
  };

  const addChat = async (ws, msg) => {
    if (ws.chat === null) return;

    const user = await getUser(ws);
    const chatType = chatTypes[ws.chat];

    if (
      user.level < chatType.minimumLevel ||
      user.points < chatType.minimumEarned
    ) {
      return ws.send(
        JSON.stringify({
          type: "notallowed",
          msg: "You haven't earned enough points to send messages in this chat",
        })
      );
    }

    const msgObj = {
      username: user.username,
      level: user.level,
      picture: user.picture,
      message: msg,
      time: Date.now() / 1000,
      userid: user._id,
    };

    chatHistories[ws.chat].push(msgObj);
    while (chatHistories[ws.chat].length > 100) {
      chatHistories[ws.chat].shift();
    }

    broadcast(
      JSON.stringify({
        type: "msg",
        msg: msgObj,
      })
    );
  };

  wss.on("connection", (ws) => {
    ws.isAlive = true;
    ws.user = false;
    ws.chat = null;

    ws.on("message", async (message) => {
      message = message?.toString();

      if (message?.startsWith("{")) {
        const data = JSON.parse(message);

        if (data.type === "pong") {
          return (ws.isAlive = true);
        }

        if (data.type === "authenticate") {
          const token = verify(data.token);
          if (!token.success) {
            return ws.terminate();
          }

          if (typeof token.data.body.uid !== "undefined") {
            ws.authenticated = true;
            ws.id = token.data.body.uid;
            ws.user = false;

            if (ws.chat !== null) {
              if (!(await isAllowed(ws, data.i))) {
                return;
              }

              sendChatHistory(ws, data.i);
            }
          }

          return;
        }

        if (data.type === "joinChat") {
          if (data.i === ws.chat) return;

          if (data.i < 0 || data.i >= chatTypes.length) {
            return ws.send(
              JSON.stringif({
                type: "notallowed",
                msg: "Invalid chat",
              })
            );
          }

          if (ws.authenticated && !(await isAllowed(ws, data.i))) {
            return;
          }

          ws.chat = data.i;
          sendChatHistory(ws, data.i);
        }

        if (data.type === "sendChat") {
          if (ws.chat === null) return;

          addChat(ws, data.msg);
        }
      }
    });

    ws.on("close", broadcastOnlineCount);

    ws.authenticated = false;
    ws.id = null;

    broadcastOnlineCount();
  });

  setInterval(() => {
    wss.clients.forEach((client) => {
      if (!client.isAlive) return client.terminate();

      client.isAlive = false;
      client.send(JSON.stringify({ type: "ping" }));
    });
  }, 10000);

  (async () => {
    var prev = (await OfferDone.find().sort({ _id: -1 }).limit(1))[0];

    // * this
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const offers = await OfferDone.find({ date: { $gt: prev?.date } }).sort({
        _id: -1,
      });

      if (offers.length > 0) {
        prev = offers[0];

        var returnAble = [];
        for (var i = 0; i < offers.length; i++) {
          const offer = offers[i];

          const wall = [
            "",
            "ayet studios",
            "",
            "offertoro",
            "adgem",
            "Revenue Universe",
            "adgate",
            "",
            "",
            "bitlabs",
            "inbrain",
            "",
            "",
            "",
          ][offer.wall];

          const user = await User.findById(offer.user);

          returnAble.push({
            tokens: offer.tokens,
            wall,
            username: user.username,
            picture: user.picture,
            userid: user._id,
          });
        }

        wss.clients.forEach((client) => {
          client.send(
            JSON.stringify({ type: "newOfferDone", newOfferDone: returnAble })
          );
        });
      }
    }
  })();

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
};

export default create;
