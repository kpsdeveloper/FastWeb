Meteor.publish('Products', function(categoryId, limit) {
    var data = Meteoris.Products.find({category:categoryId},{limit:limit});
    console.log('count product:',data.count());
    return data;
});
Meteor.publish('Categories', function(categoryId, limit) {
    var data = Meteoris.Categories.find({});
    console.log('count category:',data.count());
    return data;
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

