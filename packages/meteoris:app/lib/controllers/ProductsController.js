Namespace('Meteoris.ProductsController');

Meteoris.ProductsController = Meteoris.Controller.extend({
    
    getListProducts: function( categoryId, limit) {
        return Meteoris.Products.find({category:categoryId},{limit:limit});
    },
    getTitleInDetail: function( title ){
    	return Meteoris.Products.findOne({title:title});
    },
    getCategoryName: function(categoryid) { //Get categoryname from categories collection by category in product collection
        if (categoryid != null){
        	console.log("ID:",categoryid);
            var obj = Meteoris.Categories.findOne({_id: categoryid }).title;
            console.log("MyOBJ",obj);
            return obj;
        }else return;
    }
});