var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',

  //add hashing function on here!!!! Woot woot!
  setPassword: function(clearPassword){
    //Returns a promise
    var that = this;
    var resolver = Promise.pending();
    bcrypt.hash(clearPassword, null, null, function(error, hashedPassword){
      if (error) {
        resolver.reject(error);
      }
      that.set('password', hashedPassword);
      resolver.resolve();
    });
    return resolver.promise;
  },

  checkPassword: function(clearPassword){
    //Returns a promise
    var resolver = Promise.pending();
    bcrypt.compare(clearPassword, this.get('password'), function(error, compareResult){
      if (error) {
        resolver.reject(error);
      }
      resolver.resolve(compareResult);
    });
    return resolver.promise;
  }
});

module.exports = User;
