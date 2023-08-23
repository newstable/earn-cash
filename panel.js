import * as dotenv from 'dotenv'
dotenv.config()

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import * as AdminJSMongoose from '@adminjs/mongoose'
import mongoose from "mongoose";

import Featured from "./src/models/Featured.model.js";
import Offer from "./src/models/Offer.model.js";
import OfferDone from "./src/models/OfferDone.model.js";
import PayoutMethod from "./src/models/PayoutMethod.model.js";
import Reward from "./src/models/Reward.model.js";
import User from "./src/models/User.model.js";
import WallBan from "./src/models/WallBan.model.js";
import FeaturedOffer from './src/models/FeaturedOffer.model.js';
import validation from './src/lib/validation.js';
import { checkPassword } from './src/lib/server/passwords.js';
import FeaturedOfferHandler from './admin/FeaturedOfferHandler.js';
import { Components, componentLoader } from './admin/components.js';
// import FeaturedOfferComponent from './admin/FeaturedOfferComponent.jsx';

const PORT = 3000

const authenticate = async(email, password) => {
    if (!validation.email(email)) {
        return null;
    }

    const user = await User.findOne({ email: email.toLowerCase(), rank: 3 });
    if (!user) {
        return null;
    }

    const passwordResult = await checkPassword(user.password, password);
    if (!passwordResult) {
        return;
    }

    return Promise.resolve({
        email,
        password,
        username: user.username
    })
}

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})

const start = async() => {
    await mongoose.connect(process.env.MONGODB_CONNECTION);

    const app = express();

    const FeaturedOfferResource = {
        resource: FeaturedOffer,
        options: {
            actions: {
                addAnother: {
                    actionType: 'resource',
                    component: Components.FeaturedOfferComponent,
                    handler: false
                }
            }
        }
    }

    const admin = new AdminJS({
        resources: [
            Featured,
            Offer,
            OfferDone,
            PayoutMethod,
            Reward,
            User,
            WallBan,
            FeaturedOfferResource
        ],
        componentLoader
    });

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin, {
            authenticate,
            cookieName: 'adminCookie',
            cookiePassword: 'THISISSOFIRCKINGSECRETYOUDONTEVENKNOW',
        },
        null, {
            resave: true,
            saveUninitialized: true,
            secret: 'THISISSOFIRCKINGSECRETYOUDONTEVENKNOW',
            cookie: {
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
            },
            name: 'adminCookie',
        }
    );

    admin.watch();

    app.use(admin.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
    });
}

start()