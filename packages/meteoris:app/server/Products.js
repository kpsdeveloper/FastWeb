/* create default setting collection */
Meteor.startup(function() {
    //Kadira.connect('D4a9doAABnffBDdkK', '760b6ada-3f01-47d6-9e84-8e9b69a15aab');
})


Meteor.methods({
    "Meteoris.Count.Products": function( categoryId ) {
        var total = Meteoris.Products.find({category:categoryId},{fields:{_id:1}});
        return total.count();
    },
});