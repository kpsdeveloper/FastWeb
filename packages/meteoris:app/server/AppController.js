Meteor.methods({
	updateProfileInfo:function (_id,doc) {
		var id=Meteor.users.update(_id, {$set: doc});
		return {_id:_id};
	}
});