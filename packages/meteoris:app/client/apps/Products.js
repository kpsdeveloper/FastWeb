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
Template.searchproduct.helpers({
    searchResult:function(){
        //var keyword = unslugTitle(FlowRouter.current().params.slug);
       FlowRouter.subsReady('myProduct', function(){
            var keyword = Session.get('keyward');
            console.log('key:', keyword )
            var groupid = 1;
            if(keyword !=""){
                if (groupid == 1) {
                    var data = Meteoris.Products.find({ $or: [{ $and: [{ title: { $regex: new RegExp(keyword, "i") } }, { category: { $ne: 'tester' } }] }, { $and: [{ description: { $regex: new RegExp(keyword, "i") } }, { category: { $ne: 'tester' } }] }] },{fields:{_id:1, title:1,price:1,category:1, oldId:1,image:1}});
                    /*var attrId = data.map(function(p) { return p.oldId });
                    var imgId = data.map(function(n) { 
                        if (n.image instanceof Array)
                            return n.image[0];
                        else
                            return n.image;
                    });
                    var dataattr = Meteoris.Attributes.find({product: {$in: attrId}});
                    var dataimg = Meteoris.Images.find({_id: {$in: imgId}});
                    console.log('products:', data.count());
                    console.log('attributes::', dataattr.count());
                    console.log('Images:', dataimg.count());
                    //return [dataimg, data, dataattr];*/
                }
                var html = '';
                if( data.count() > 0 ){
                    data.forEach( function(da, index){
                        
                        html += listProductHtml(da, 'true');
                    })
                }
                console.log(html)
                return {html:html};
            }
        })
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
/**Seyha search function**/
Template.app_header.events({
    'click .kesearch':function(e){
        e.preventDefault();
        var search = $('#textToSearch').val();
        Session.set('keyward',search);
        FlowRouter.go('/searchproduct/'+search);
    }
});
