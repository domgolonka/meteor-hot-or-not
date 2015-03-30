//Images
function trueFunc() {return true;}
function falseFunc() {return false;}
Collections.Images.allow({
    insert: trueFunc,
    update: trueFunc,
    remove: trueFunc,
    download: trueFunc
});

Collections.Images.deny({
    insert: falseFunc,
    update: falseFunc,
    remove: falseFunc,
    download: falseFunc
});

Meteor.startup(function() {
    //ImageUploads.remove({});
    console.log("Images Uploads:", Collections.Images.find().count());

    Collections.Images.on('removed', function (fileObj) {
        console.log("Removed " + fileObj._id + " from Images collection.");
    });
});