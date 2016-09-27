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
    'change #file': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				Session.set('ADDIMAGEID', fileObj._id);
			});
		}
	}
};