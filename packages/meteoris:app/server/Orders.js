Meteor.methods({
	"Meteoris.Order.addAddress": function (obj, shipping_method, deliverytime) {
		if( obj.isShippingDefault == true)
			Meteoris.Accounts.update({userId:obj.userId},{$set:{isShippingDefault:false}}, { multi: true});

		var addressId = Meteoris.Accounts.insert(obj);

		var option = shipping_method.split('+');

		var mydatetime = deliverytime.split('+');
		var day = mydatetime[1];
		var myarrtime = mydatetime[0].split('-');
		var databuying = {};
		databuying.addressBook = {addressId:addressId};
		databuying.shippingMethod = {option:{title:option[0], price:option[1]}, datetime:{starttime:myarrtime[0], endtime:myarrtime[1], day:day}};

		Meteoris.Carts.update({userId:obj.userId},{$set:databuying});
	},
	'Meteoris.Order.chooseAddress': function( userId, addressId, shipping_method, deliverytime){

		Meteoris.Accounts.update({userId:userId},{$set:{isShippingDefault:false}},{ multi: true});
		Meteoris.Accounts.update({_id:addressId},{$set:{isShippingDefault:true}})

		var option = shipping_method.split('+');
		var mydatetime = deliverytime.split('+');
		var day = mydatetime[1];
		var myarrtime = mydatetime[0].split('-');
		var databuying = {};
		
		databuying.addressBook = {addressId:addressId};
		databuying.shippingMethod = {option:{title:option[0], price:option[1]}, datetime:{starttime:myarrtime[0], endtime:myarrtime[1], day:day}};
		Meteoris.Carts.update({userId:userId},{$set:databuying});
	},
	'Meteoris.Order.addPaymentMethod': function(paymentmethod, userId){
		var databuying = {};
		databuying.paymentMethod = paymentmethod;
		Meteoris.Carts.update({userId:userId},{$set:databuying});
	}
});