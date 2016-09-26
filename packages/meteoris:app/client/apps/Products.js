var ctrl = new Meteoris.ProductsController();

Template.category.onCreated(function() {
    var self = this;
    var categoryId = 'DYq5Z8GmZZ6wyMmWj';
    var limit = 16;
    self.autorun(function() {
        self.subscribe('Products', categoryId, limit);
    });    
});
Template.category.helpers({
    getListProducts: function(){
    	var categoryId = 'DYq5Z8GmZZ6wyMmWj';
    	var limit = 16;
    	var List = ctrl.getListProducts(categoryId, limit);
    	return List;
    }
});
