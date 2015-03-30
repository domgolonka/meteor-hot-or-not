FS.debug = true;
Stores = {};

Stores.images = new FS.Store.GridFS("images");
Stores.thumbs = new FS.Store.GridFS("thumbs", {
    beforeWrite: function(fileObj) {
        // We return an object, which will change the
        // filename extension and type for this store only.
        return {
            extension: 'png',
            type: 'image/png'
        };
    },
    transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a 60px x 60px PNG thumbnail
        gm(readStream).resize(290).stream('PNG').pipe(writeStream);
        // The new file size will be automatically detected and set for this store
    }
});

Stores.any = new FS.Store.GridFS("any");