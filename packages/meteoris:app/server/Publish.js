Meteor.publish('Products', function(categoryId, page , limit) {
	//var total = Meteoris.Products.find({category:categoryId},{fields:{_id:1}});
	//console.log('total:', total.count());
	var skip = (page<=1)? 0 : (page - 1) * limit;
    var data = Meteoris.Products.find({ category:categoryId},{ fields:{_id:1, title:1,price:1,category:1, oldId:1}, skip: skip, limit:limit});
    //var dataattr = publishAttributeProducts( data );
    var attrId = data.map(function(p) { return p.oldId });
    var dataattr = Meteoris.Attributes.find({product: {$in: attrId}})
    console.log('count attr:', dataattr.count());
    return [data, dataattr];
    
});
Meteor.publish('detailTitle', function(title) {
    var data = Meteoris.Products.find({"title":title});
    var oneCategory = data.fetch()[0];
    var categoryId = oneCategory.category;
    console.log("CatID:",categoryId);
    var dataCat = Meteoris.Categories.find({_id:'DfwSwoSezQetwuGYy'});
    console.log("dataCat:",dataCat);
    return data;
});
TAPi18n.publish('Categories', function() {
    var data = Meteoris.Categories.find({});
    return data;
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
Meteor.publish('editBanner', function(id) {
    var banner=Banners.find({_id:id});
    
    return banner;
});
