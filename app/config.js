var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');
mongoose.connect('mongodb://127.0.0.1:27017/shortly');
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);
var db = mongoose.connection;
db.on('error', function(err) {
  console.log('connection error', err);
});
db.once('open', function() {
  console.log('connection to database successful');
});

var urlSchema = new Schema ({
  // id: Schema.Types.ObjectId,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamp: { type: Date, default: Date.now }
});


var userSchema = new Schema ({
  // id: Schema.Types.ObjectId,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  timestamp: { type: Date, default: Date.now }

});

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = {
  urlSchema: urlSchema,
  userSchema: userSchema
};
