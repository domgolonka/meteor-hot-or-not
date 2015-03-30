Template.files.events({
    'dropped #dropzone': function(e) {
        var user = Meteor.user();

        FS.Utility.eachFile(e, function(file) {
            var newFile = new FS.File(file);
            newFile.owner = Meteor.userId();
            newFile.score = 0;
            newFile.votes = 0;
            newFile.score2 = 0;
            newFile.votes2 =0;

            Collections.Images.insert(newFile, function (error, fileObj) {
                if (error) {
                    console.log(error);
                    toastr.error("Upload failed... please try again.");
                } else {
                    toastr.success('Upload succeeded!');
                }
            });
        });
    }
});

Template.files.helpers({
    uploadedImages: function() {
        return Collections.Images.find();
    }
});