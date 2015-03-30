Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Collections.Images = new FS.Collection("images", {
    stores: [
        Stores.images,
        Stores.thumbs
    ],
    filter: {
        maxSize: 20 * 1024 * 1024, //in bytes
        allow: {
            contentTypes: ['image/*']
        },
        onInvalid: function(message) {
            Meteor.isClient && alert(message);
            Meteor.isClient && toastr.error(message);
        }
    }
});

