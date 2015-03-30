Meteor.publish("images", function () {
    return Collections.Images.find();
});


Meteor.methods({
    randomImage: function() {
        //var total = Collections.Images.find().count();
        //var randomNumber = Math.floor((Math.random() * total) + 1);
        //console.log("THE RANDOM NUMERB IS "+ randomNumber);
        //console.log();
        //return ;
    }
});