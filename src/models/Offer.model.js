import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const offer = new Schema({
  title: String,
  description: String,
  link: String,
  amount: Number, // amount of $
  tokens: Number, // number of tokens
  payout_currency: String,
  payout_type: String,
  category_name: String, // email_submit, pin_submit, app_install, trial, purchase, download, free, other, videos, surveys, subscription, quiz
  category_name_readable: String,
  traffic_type: String, // incentive, non-incentive
  campid: String,
  country: [String], // ISO 3166-1 country code: US, NL etc.
  rank: Number,
  epc: Number,
  ratio: Number,
  creative: String,
  preview: String,
  preview_url: String,
  mobile_app: Boolean,
  mobile_app_type: String, // android, ios, ipad
  mobile_app_id: String,
  mobile_app_minimum_version: String,
  mobile_app_icon_url: String,
  button_text: String,
  conversion: String, // When conversion confirmed
  added: {
    type: Date,
    default: Date.now,
  },
  v: Number,
  offerwall: String, // adscend, adgate, lootably
});

offer.plugin(paginate);

const Offer = mongoose.models.Offer || mongoose.model("Offer", offer);

export default Offer;
