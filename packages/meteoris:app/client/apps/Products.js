var ctrl = new Meteoris.ProductsController();

//Session.set('PAGE', 1);
Session.set('SUBSCRIBELISTPRO', '');

Template.category.onCreated(function() {
	Session.set('PAGE', FlowRouter.current().params.page);
	Session.set('RELOADCATEGORYPAGE',1);
    var self = this;
    var categoryId = 'DYq5Z8GmZZ6wyMmWj';
    var limit = 16;
    var page = Session.get('PAGE');
    self.autorun(function() {
        itemSub = self.subscribe('Products', categoryId, page, limit,function(){
        	Session.set('SUBSCRIBELISTPRO', 1);
        })
    });  
});

Template.detail.onCreated(function() {
    var title = FlowRouter.current().params.title;
    var self = this;
    self.autorun(function() {
        self.subscribe('detailTitle',title);
    });    
});
/*
Template.category.helpers({
    getListProducts: function(){
    	var categoryId = 'DYq5Z8GmZZ6wyMmWj';
    	var limit = 16;
    	var page = Session.get('PAGE');
    	if( Session.get('SUBSCRIBELISTPRO') === 1 ){
    		var List = ctrl.getListProducts(categoryId, page , limit);
    		return List;
    	}
    }
});*/
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
var itemSub;
Template.category.events({
	'click .pager': function(e){
		//e.preventDefault();
		var page = parseInt($(e.currentTarget).attr('data-page'));
		Session.set('RELOADCATEGORYPAGE', 0);
		Session.set('PAGE', page);
		var self = this;
	    var categoryId = 'DYq5Z8GmZZ6wyMmWj';
	    var limit = 16;
	    //var page = Session.get('PAGE');
	    Meteor.autorun(function() {
	    	if( itemSub) {
	    		itemSub.stop();
	    	}
	        itemSub = Meteor.subscribe('Products', categoryId, page, limit);
	    });    
	}
});
