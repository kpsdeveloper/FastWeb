Meteor.publish('Products', function(categoryId, page , limit) {
	//var total = Meteoris.Products.find({category:categoryId},{fields:{_id:1}});
	//console.log('total:', total.count());
	var skip = (page<=1)? 0 : (page - 1) * limit;
    var data = Meteoris.Products.find({ category:{$in:categoryId}},{ fields:{_id:1, title:1,price:1,category:1, oldId:1,image:1}, sort:{price:1},skip: skip, limit:limit});
    //var dataattr = publishAttributeProducts( data );
    var attrId = data.map(function(p) { return p.oldId });
    var imgId = data.map(function(n) { 
    	if (n.image instanceof Array)
        	return n.image[0];
    	else
        	return n.image;
    });
    var dataattr = Meteoris.Attributes.find({product: {$in: attrId}});
    var dataimg = Meteoris.Images.find({_id: {$in: imgId}})
    return [dataimg, data, dataattr];
    
});
Meteor.publish('detailTitle', function(title, userId) {
    var currentPro = Meteoris.Products.findOne({"title":title},{fields:{_id:1,recommended:1}});
    
    if( currentPro ){
    	var id_product = [];
    	
    	if( currentPro.hasOwnProperty('recommended') ){
    		if(currentPro.recommended.length > 0) id_product = currentPro.recommended;
    	}
    	id_product.push(currentPro._id);
    	var data = Meteoris.Products.find({_id:{$in:id_product}});
    	console.log('product:', data.count());
	    var attrId = data.map(function(p) { return p.oldId });
	    var imgId = data.map(function(n) { 
	    	if (n.image instanceof Array)
	        	return n.image[0];
	    	else
	        	return n.image;
	    });
	    var datafav = Meteoris.Favorites.find({proId:currentPro._id, userId:userId});
	    var dataattr = Meteoris.Attributes.find({product: {$in: attrId}});
    	var dataimg = Meteoris.Images.find({_id: {$in: imgId}});
	    return [dataimg, data, dataattr, datafav];
	} else return []

});
Meteor.publish('Carts', function( userId ) {
    var data = Meteoris.Carts.find({userId:userId});

    if( data.count() > 0 ){
        var id_product = [];
        cart = data.fetch()[0];
        cart.items.forEach( function(item){
            id_product.push(item.id_product);
        })
        var product = Meteoris.Products.find({_id:{$in:id_product}});
        var imgId = product.map(function(n) { 
            if (n.image instanceof Array)
                return n.image[0];
            else
                return n.image;
        });
        var image = Meteoris.Images.find({_id: {$in: imgId}})
        console.log('cart:', data.count());
        console.log('product:', product.count());
        console.log('image:', image.count());

        return [data, image, product];
    }
    else return [];
    
});
TAPi18n.publish('Categories', function() {
    var data = Meteoris.Categories.find({});
    return data;
});
Meteor.publish('Provinces', function() {
    return Meteoris.Provinces.find({});
});
Meteor.publish('Cities', function( provinceId ) {
    return Meteoris.Cities.find({provinceId: provinceId});
});
Meteor.publish('Accounts', function( userId ) {
    return Meteoris.Accounts.find({userId: userId});
});

publishAttributeProducts = function(allpro) {
    var attrlist = [];
    if (allpro.count() > 0) {
        //allpro.forEach(function(data, index) {
        var fetchdata = allpro.fetch();
        for(k=0; k < fetchdata.length; k++){
            var attr = Meteoris.Attributes.find({ product: fetchdata[k].oldId });
            if (attr.count() > 0) {
                attrlist.push(attr.fetch()[0]._id); 
            }
        }
        //})
    }
    var allattr = Meteoris.Attributes.find({ _id: { $in: attrlist } });
    return allattr;
}
