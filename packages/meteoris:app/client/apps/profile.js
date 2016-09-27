var ctrl = new Meteoris.AppController();

Template.meteoris_profile.helpers({
   getProfileInfo:function(params) {
   		var data=ctrl.getProfileInfo(params);
   		return data;
   }

});

Template.meteoris_profile.events = {
    'click #btnUpdateProfile': function(e, t) {
    	e.preventDefault();
    	ctrl.updateProfileInfo(t);
    },
    'click #uploadImg': function(e, t) {
    	
		/*filepicker.pick({
            mimetype: 'image/*', 
            maxSize: 1024 * 1024 * 5, 
            imageMax: [1500, 1500],
            cropRatio: 1/1, 
            services: ['*'] 
        }, function(blob){
           
            var filename = blob.filename;
            var url = blob.url;
            var id = blob.id;
            var isWriteable = blob.isWriteable;
            var mimetype = blob.mimetype;
            var size = blob.size;

            console.log(blob)
            Meteor.call('updateImgProfile',url,function(err){
				if(err){
					Meteoris.Flash.set('danger', err.message);  
				}
			});
        });
        */
	}
};