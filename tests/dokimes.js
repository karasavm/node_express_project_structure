var User = require('../models/users');


var u1 = new User({
    firstname: 'Manish',
    lastname: 'Prakash',
    created_at: new Date(),
    is_active: true
});
u1.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Done');
    }
});