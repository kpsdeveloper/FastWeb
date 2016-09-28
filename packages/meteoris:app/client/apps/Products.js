var ctrl = new Meteoris.ProductsController();

Template.category.onCreated(function() {
    var self = this;
    var categoryId = 'DYq5Z8GmZZ6wyMmWj';
    var limit = 16;
    self.autorun(function() {
        self.subscribe('Products', categoryId, limit);
    });    
});
Template.detail.onCreated(function() {
    var title = FlowRouter.current().params.title;
    var self = this;
    self.autorun(function() {
        self.subscribe('detailTitle',title);
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
Template.detail.helpers({
    getTitleInDetail: function(){
        var title = FlowRouter.current().params.title;
        var objTitle = ctrl.getTitleInDetail(title);
        return objTitle;
    },
    getCategoryName: function(categoryid){
        console.log("CaID",categoryid);
        var objCategory = ctrl.getCategoryName(categoryid);
        console.log("CategoryName:",objCategory);
        return objCategory;
    }
});
