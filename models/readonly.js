module.exports = function readonlyPlugin (schema, options) {
  schema.statics.excludeFields = function(body){
    for (var i = 0; i < schema.readonlyFields.length; i++) 
      delete body[schema.readonlyFields[i]];
    };

  

}