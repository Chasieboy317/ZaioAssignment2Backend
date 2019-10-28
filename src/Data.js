// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const Properties = new Schema(
  {
    id: Number,
    price: Number,
    type: Number,
    area: String,
    address: String,
    description: String,
    size: Number,
    agency: String,
    lat: Number,
    long: Number
  },
  { timestamps: true, collection: 'properties' }
);

const Users = new Schema(
  {
    email: String,
    password: String,
    firstname: String,
    lastname: String
  },
  { timestamps: true, collection: 'users' }
);
// export the new Schema so we could modify it using Node.js
module.exports = {
  Users: mongoose.model("Users", Users),
  Properties: mongoose.model("Properties", Properties)
};
