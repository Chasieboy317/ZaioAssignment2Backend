export default class Driver {
  constructor() {
    this.MongoClient = require('mongodb').MongoClient;
    this.assert = require('assert');
    this.url = 'mongodb://capedigital:zaioproperty24@ds335648.mlab.com:35648/heroku_c7zhk9p8';
    this.dbName = 'heroku_c7zhk9p8';
  }

  static findProperty(id) {
    let r = [];
    this.MongoClient.connect(this.url, function(err, client) {
      this.assert.equal(null, err);
      console.log("Connected successfully to server");

      const db = client.db(this.dbName);
      return db.collection("properties").findOne({id: id}).toArray(function(err, result) {
        this.assert.equal(null, err);
        setTimeout(function() {}, 1000);
        r = result;
      });
      client.close();
    });
    return r;
  }

  selectAllPropertyData() {
    let r = [];
    this.MongoClient.connect(this.url, function(err, client) {
      this.assert.equal(null, err);
      console.log("Connected successfully to server");

      const db = client.db(this.dbName);
      return db.collection("properties").find({}).toArray(function(err, result) {
        this.assert.equal(null, err);
        setTimeout(function() {}, 3000);
        r = result;
      });
      client.close();
    });
    return r;
  }

  selectAllUserData() {
    let r = [];
    this.MongoClient.connect(this.url, function(err, client) {
      this.assert.equal(null, err);
      console.log("Connected successfully to server");

      const db = client.db(this.dbName);
      return db.collection("users").find({}).toArray(function(err, result) {
        this.assert.equal(null, err);
        setTimeout(function() {}, 3000);
        r = result;
      });
      client.close();
    });
    return r;
  }

};
