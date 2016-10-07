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
    },
    getListProducts: function( categoryId, page, limit) {
    	var skip = (page<=1)? 0 : (page - 1) * limit;
    	var reloadpage = Session.get('RELOADCATEGORYPAGE');
    	//if(  reloadpage ===  1)
    		//var data =  Meteoris.Products.find({category:categoryId},{ fields:{_id:1, title:1,price:1}, limit:limit});
    	//else
        	var data =  Meteoris.Products.find({category:categoryId},{ fields:{_id:1, title:1,price:1}, limit:limit});
        
        return data;
    }
});