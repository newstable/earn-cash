import mongoose, { Schema } from "mongoose";

const user = new Schema({
    username: String,
    usernameLowercase: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    lastPaidSurvey: Date,
    paidSurveyCount: {
        type: Number,
        default: 0
    },
    paidSurveyVisited: {
        type: Number,
        default: 0
    },
    rank: { // 0 = new, 1 = email verified, 2 = mod, 3 = admin
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Number,
        default: 0
    },
    joinDate: {
        type: Date,
        default: new Date()
    },
    lastActive: {
        type: Date,
        default: new Date()
    },
    registerIp: String,
    registerCountry: String,
    ip: String,
    country: String,
    verificationIp: String,
    points: {
        type: Number,
        default: 0
    },
    cashedOut: {
        type: Number,
        default: 0
    },
    removedPoints: {
        type: Number,
        default: 0
    },
    addedPoints: {
        type: Number,
        default: 0
    },
    pointsByRef: {
        type: Number,
        default: 0
    },
    discordId: Number,
    isStatusEarning: {
        type: Number,
        default: 0
    },
    overrideStatusEarn: {
        type: Number,
        default: -1
    },
    refBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    earnedForRef: {
        type: Number,
        default: 0
    },
    __v: {
        type: Number,
        default: 0
    },
    RobloxID: {
        type: Number,
        default: 0
    },
    HasRobuxWithdrawn: {
        type: Number,
        default: 0
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    customReferralCode: String,
    OAuthProvider: String,
    OAuthUID: String,
    picture: {
        type: String,
        default: "https://eu.ui-avatars.com/api/"
    },
    RPKey: String,
    ActivationKey: String,
    customCommissionRate: {
        type: Number,
        default: 0
    }
});

const User = mongoose.models.User || mongoose.model("User", user);

export default User;