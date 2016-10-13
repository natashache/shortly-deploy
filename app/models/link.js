var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
var urlSchema = db.urlSchema;

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });
urlSchema.pre('save', function(next) {
  var url = this;
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  // console.log('url.code: ', this.code);
  next();
});


module.exports = mongoose.model('Link', urlSchema);
