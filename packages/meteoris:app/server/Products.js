/* create default setting collection */
Meteor.startup(function() {
    //Kadira.connect('D4a9doAABnffBDdkK', '760b6ada-3f01-47d6-9e84-8e9b69a15aab');
})


Meteor.methods({
    "Meteoris.Count.Products": function( categoryId ) {
        var total = Meteoris.Products.find({category:{$in:categoryId}},{fields:{_id:1}});
        return total.count();
    },
    "Meteoris.Products.addReview": function( productId, obj){
        var product = Meteoris.Products.findOne({_id:productId});
        if( product ){
            var oldreview = [];
             oldreview.push(obj);
            if( product.hasOwnProperty('review')){
                if( product.review.length > 0 ){
                    product.review.forEach( function(val){
                        oldreview.push(val);
                    });   
                }
            }
           
            Meteoris.Products.update({_id:productId}, {$set:{review:oldreview}});
        }
    },
    "Meteoris.Products.addToFavorite": function(attr) {
        Meteoris.Favorites.insert(attr);
    },
    "Meteoris.Products.removeFavorite": function(productId, userId) {
        Meteoris.Favorites.remove({ proId: productId, userId: userId });
    },
    'getRemoteAddress':function(){
        clientIP = Meteor.absoluteUrl();
        console.log('IP:', clientIP);
    }
});