var ctrl = new Meteoris.ProductsController();

//Session.set('PAGE', 1);
Session.set('SUBSCRIBELISTPRO', '');

Template.category.onCreated(function() {
	Session.set('PAGE', FlowRouter.current().params.page);
	Session.set('RELOADCATEGORYPAGE',1);
    var self = this;
    var name = FlowRouter.current().params.name;
    var categoryId = getCategoryIdChildren( name );
    var limit = 16;
    var page = Session.get('PAGE');
    self.autorun(function() {
        itemSub = self.subscribe('Products', categoryId, page, limit,function(){
        	Session.set('SUBSCRIBELISTPRO', 1);
        })
    });  
    Meteor.call('getRemoteAddress');
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
Template.detail.onCreated(function() {
    var title = unslugTitle(FlowRouter.current().params.title);
    var self = this;
    self.autorun(function() {
        self.subscribe('detailTitle',title, Meteor.userId());
    }); 

});

Template.detail.helpers({
    getTitleInDetail: function(){
        var title = unslugTitle(FlowRouter.current().params.title);
        var objTitle = ctrl.getTitleInDetail(title);
        return objTitle;
    },
    getCategoryName: function(categoryid){
        var objCategory = ctrl.getCategoryName(categoryid);
        return objCategory;
    },
    getRecommendProducts: function( recommended ){
    	return ctrl.getRecommendProducts( recommended );
    }
});
Template.detail.events({
	'click .attribute': function(e){
		e.preventDefault();
		var price = $(e.currentTarget).attr('data-price');
		$('.attribute').removeClass('active');
		$(e.currentTarget).addClass('active');
		$('.price').text(price);
	},
	'submit .add-review': function(e, t){
		e.preventDefault(); 
		var title = unslugTitle(FlowRouter.current().params.title);     
        ctrl.addReview(t, title);
	},
	'click .rating i.rateStar': function(e) {
        $(e.currentTarget).addClass('yellow-star star_active');
        $(e.currentTarget).parent().prevAll('div').children('i').addClass('yellow-star star_active');
        $(e.currentTarget).parent().nextAll('div').children('i').removeClass('yellow-star');
    },
})
var itemSub;
Template.category.events({
	'click .pager': function(e){
		//e.preventDefault();
		var page = parseInt($(e.currentTarget).attr('data-page'));
		Session.set('RELOADCATEGORYPAGE', 0);
		Session.set('PAGE', page);
		var self = this;
	    var name = FlowRouter.current().params.name;
    	var categoryId = getCategoryIdChildren( name );
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
