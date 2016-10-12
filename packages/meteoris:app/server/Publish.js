Meteor.publish('Products', function(categoryId, page , limit) {
	//var total = Meteoris.Products.find({category:categoryId},{fields:{_id:1}});
	//console.log('total:', total.count());
	var skip = (page<=1)? 0 : (page - 1) * limit;
    var data = Meteoris.Products.find({ category:{$in:categoryId}},{ fields:{_id:1, title:1,price:1,category:1, oldId:1,image:1,description:1}, sort:{price:1},skip: skip, limit:limit});
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
        var attrId = product.map(function(p) { return p.oldId });

        var proimgId = product.map(function(n) { 
            if (n.image instanceof Array)
                return n.image[0];
            else
                return n.image;
        });
        var dataattr = Meteoris.Attributes.find({product: {$in: attrId}});
        var imgattrId = dataattr.map(function(p) { return p.productImage });
        var imgId = proimgId.concat(imgattrId);
        var image = Meteoris.Images.find({_id: {$in: imgId}})
        console.log('cart:', data.count());
        console.log('product:', product.count());
        console.log('attribute:', dataattr.count());
        console.log('image:', image.count());

        return [data, image, product, dataattr];
    }
    else return [];
    
});

Meteor.publish('Orders', function(userId) {
    var data = Meteoris.Carts.find({userId:userId});
    return data;
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
Meteor.publish('Accounts', function( userId, addressId ) {
    if( addressId )
        return Meteoris.Accounts.find({_id: addressId});
    else
        return Meteoris.Accounts.find({userId: userId});
});
Meteor.publish('ParentAttribute', function( ) {
    return Meteoris.ParentAttributes.find({});
});

Meteor.publish('searchproduct', function(keyword, groupid, limit) {

    if (keyword != "") {
        if (groupid == 1) {
            var data = Meteoris.Products.find({ $or: [{ $and: [{ title: { $regex: new RegExp(keyword, "i") } }, { category: { $ne: 'tester' } }] }, { $and: [{ description: { $regex: new RegExp(keyword, "i") } }, { category: { $ne: 'tester' } }] }] },{fields:{_id:1, title:1,price:1,category:1, oldId:1,image:1,description:1}, limit:limit});
            var attrId = data.map(function(p) { return p.oldId });
            var imgId = data.map(function(n) { 
                if (n.image instanceof Array)
                    return n.image[0];
                else
                    return n.image;
            });
            //var datafav = Meteoris.Favorites.find({proId:currentPro._id, userId:userId});
            var dataattr = Meteoris.Attributes.find({product: {$in: attrId}});
            var dataimg = Meteoris.Images.find({_id: {$in: imgId}});
            
            return [dataimg, data, dataattr];
        } else if (groupid == 2) {
            var webzine = Meteoris.ContentType.findOne({ type: "Webzine" });
            var data = Meteoris.Contents.find({ title: { $regex: new RegExp(keyword, "i") }, category: { $ne: 'tester' } ,typeid: webzine._id }, {limit:limit});
            var imgId = data.map(function(n) { 
                if (n.image instanceof Array)
                    return n.image[0];
                else
                    return n.image;
            });
            var dataimg = Meteoris.Images.find({_id: {$in: imgId}});
            return [dataimg, data, Meteoris.ContentType.find()];
        } else if (groupid == 3) {
            var tuto = Meteoris.ContentType.findOne({ type: "Tuto" });
            var data = Meteoris.Contents.find({ title: { $regex: new RegExp(keyword, "i") }, category: { $ne: 'tester' } ,typeid:tuto._id}, {limit:limit});
            var imgId = data.map(function(n) { 
                if (n.image instanceof Array)
                    return n.image[0];
                else
                    return n.image;
            });
            var dataimg = Meteoris.Images.find({_id: {$in: imgId}});
            return [dataimg, data, Meteoris.ContentType.find()];
        }else{
            var list = Meteoris.Products.find({ $or: [{ $and: [{ title: { $regex: new RegExp(keyword, "i") } }, { category: { $ne: 'tester' } }] }, { $and: [{ description: { $regex: new RegExp(keyword, "i") } }, { category: { $ne: 'tester' } }] }] }, {fields:{_id:1, title:1,price:1,category:1, oldId:1,image:1,description:1}, limit:limit});
            var content = Meteoris.Contents.find({ title: { $regex: new RegExp(keyword, "i") }, category: { $ne: 'tester' }},{limit:limit});
            if( list.count() > 0 || content.count() > 0){
                var attrId = list.map(function(p) { return p.oldId });
                var imgIdPro = list.map(function(n) { 
                    if (n.image instanceof Array)
                        return n.image[0];
                    else
                        return n.image;
                });
                var imgIdCont = content.map(function(n) { 
                    if (n.image instanceof Array)
                        return n.image[0];
                    else
                        return n.image;
                });
                var imgId = imgIdPro.concat( imgIdCont );
        
                var dataattr = Meteoris.Attributes.find({product: {$in: attrId}});
                var dataimg = Meteoris.Images.find({_id: {$in: imgId}});
                return [Meteoris.ContentType.find(), dataimg, list, content, dataattr];

            }else return []
        }
       
    } else return this.ready();
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
Meteor.publish('allproducts', function(limit) {

    if (limit != -1) {
        return Meteoris.Products.find({}, { limit: limit });
    } else {
        return Meteoris.Products.find({});
    }
});
Meteor.publish('allBanner', function(limit) {

    if (limit != -1) {
        return Banners.find({}, { limit: limit });
    } else {
        return Banners.find({});
    }
});

Meteor.publish('bannerBypage', function(pname) {
    var pagename=pname.split("/");
    var banner=Banners.find({pagename:{$in: pagename}});
    return banner;
});

Meteor.publish('productInbanner', function(pname) {
    var pagename=pname.split("/");
    var productsId=[];
    var allbanner=Banners.find({pagename:{$in: pagename}});
    allbanner.forEach(function(banner){
        var prod=banner.products;
        if(prod){
            productsId=productsId.concat(prod);
            /*for(var i=0;i<prod.length;i++){
                productsId.push(prod[i]);
            }*/
        }
    });
    var data=Meteoris.Products.find({_id:{$in: productsId}});
    var dataimg= publishImage(data);
    return [data,dataimg];
});
Meteor.publish('editBanner', function(id) {
    var banner=Banners.find({_id:id});
    
    return banner;
});


publishImage = function(listobjPro){
    var checkAtrr=[];
    var dataimgattr=[];
    var imgId = listobjPro.map(function(n) { 
        if (n.image instanceof Array){
            return n.image[0];
        }
        else if (n.image){
            return n.image;
        }else{
            checkAtrr.push(n.oldId)
            //return n.oldId;
        }
    });
    if(checkAtrr.length > 0){
        console.log("Satrtasadasd");
        checkAtrr.forEach(function(da){
            var atrr=Meteoris.Attributes.find({product:da});
            if(attr){
                var firstattr=attr[0];
                if(firstattr.productImage){
                    imgId.push(firstattr.productImage);
                }
            }
        });
    }
    var dataimg = Meteoris.Images.find({_id: {$in: imgId}})
    console.log("countImg"+dataimg.count());
    return dataimg;
}
