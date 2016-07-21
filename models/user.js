var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var allowedTypes = ['Level1','Level2','Level3'];
var readonly = require('./readonly');
var userSchema = Schema({
    name: {type: String},
    is_active: Boolean,
    password: {type: String, select: false, required: true},
    meta: {
        friends: Number,
        likes: {type: Number},
        votes: Number,
        dislikes: Number
    },
    comments: [{body: String, date: Date}],
    age: {type: Number, min: 5, max: 40},
    type: {type: String, enum: allowedTypes},
    username: {type: String, lowercase: true, required: true, trim: true, unique: true},
    internal_name: {type: String, match: /int_/},
    // last_payment_date: {select: false, type: Date, default: Date.now, expires: 60 * 60 * 31},
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
}, {timestamps: true});


//Set ReadOnly Fields
userSchema.readonlyFields = ["updatedAt", "createdAt"];

userSchema.methods.isLevelAllowed = function (cb) {
    var age = this.age;
    var type = this.type;
    var model = this.model;
    console.log("************************");
    // console.log(model);
    //can perform any database operation on the model as well
    // model.find(function(err, data){
    //     console.log(data);
    // })
    if (age == 10 && (type == 'Level2' || type == 'Level3')) {
        cb(false, false);
    } else {
        cb(false, true);
    }
};

userSchema.statics.findAllByAge = function (age, cb) {
    this.find({
        age: age
    }, function (err, result) {
        cb(err, result);
    });
};



userSchema.pre('findOneAndUpdate', function (next,done) {
  console.log(this);
  console.log("save pre");
  // console.log(this)
  
  next();

  // asyncOperation(done); // need true after 'save'
});

userSchema.plugin(readonly);

module.exports = mongoose.model('User', userSchema);
