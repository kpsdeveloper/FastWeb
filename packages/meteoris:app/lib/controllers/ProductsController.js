Namespace('Meteoris.ProductsController');

Meteoris.ProductsController = Meteoris.Controller.extend({
    
    getListProducts: function( categoryId, limit) {
        return Meteoris.Products.find({category:categoryId},{limit:limit});
    }
});