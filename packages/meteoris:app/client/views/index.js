var ctrl = new Meteoris.AppController();

Template.mainLayout.onCreated(function() {
    var self = this;
  
    self.autorun(function() {
        //self.subscribe('meteoris_themeAdmin', ctrl.getId());
        TAPi18n.subscribe('Categories');
    });    
    //filepicker.setKey("ACTP7A0fnQou2s5L4f9FBz");
});

Template.index.helpers({
    model: function(){
        console.log('Djinn');

    },
    test: function(){
    	var data = ctrl.test().model;
    	return {data:data}
    }    
});

Template.index.events({
    'click #upload': function(e,tpl){
        console.log('upload');
        /*filepicker.pick({
            mimetype: 'image/*', 
            maxSize: 1024 * 1024 * 5, 
            imageMax: [1500, 1500], 
            cropRatio: 1/1, 
            services: ['*'] 
        }, function(blob){
            // Returned Stuff
            var filename = blob.filename;
            var url = blob.url;
            var id = blob.id;
            var isWriteable = blob.isWriteable;
            var mimetype = blob.mimetype;
            var size = blob.size;

            console.log(blob)
        });*/
    }  
});
Template.index.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('banner');
    });    
});
