Meteor.methods({
	updateProfileInfo:function (_id,doc) {
		var id=Meteor.users.update(_id, {$set: doc});
		return {_id:_id};
	},
	updateImgProfile:function(imgurl){
		var id=Meteor.userId();
		return Meteor.users.update({_id:id},{$set:{"profile.imageurl":imgurl}});
	},
	checkPhoneExist:function(phone){
		if(phone){
            var user=Meteor.users.findOne({'profile.phone':phone});
            if(user) {
            	console.log("TRUE FOUND");
            	return true;
            }else {
            	console.log("FALSSS");
            	return false;
            }
        }
	}
});