Meteor.publish('Products', function(categoryId, page , limit) {
	//var total = Meteoris.Products.find({category:categoryId},{fields:{_id:1}});
	//console.log('total:', total.count());
	var skip = (page<=1)? 0 : (page - 1) * limit;

	console.log('skip:', skip);
    var data = Meteoris.Products.find({ category:categoryId},{ fields:{_id:1, title:1,price:1,category:1}, skip: skip, limit:limit});
    console.log('count:', data.fetch().length);
    return data;
});
TAPi18n.publish('Categories', function() {
    var data = Meteoris.Categories.find({});
    return data;
});
