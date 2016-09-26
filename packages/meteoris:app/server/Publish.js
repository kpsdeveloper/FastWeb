Meteor.publish('Products', function(categoryId, limit) {
    var data = Meteoris.Products.find({category:categoryId},{limit:limit});
    console.log('count product:',data.count());
    return data;
});
Meteor.publish('Categories', function(categoryId, limit) {
    var data = Meteoris.Categories.i18nFind({});
    console.log('count category:',data.count());
    return data;
});
