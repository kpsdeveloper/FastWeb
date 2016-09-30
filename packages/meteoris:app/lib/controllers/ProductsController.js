Namespace('Meteoris.ProductsController');

Meteoris.ProductsController = Meteoris.Controller.extend({
    /*getListProducts: function( categoryId, limit) {
        return Meteoris.Products.find({category:categoryId},{limit:limit});
    },*/
    getTitleInDetail: function( title ){
    	var product = Meteoris.Products.findOne({title:title});
    	if( product ){
    		var attr = Meteoris.Attributes.find({product:product.oldId});
    		var firstAttribute = attr.fetch()[0];
    		product.priceAttr = (attr.count() > 0 )? firstAttribute.price:product.price;
    		var attribute = [];
    		if( attr.count() > 0 ){
    			var active = '';
    			attr.forEach( function(val, index){
    				active = ( index == 0) ? 'active':'';
    				val.active = active;
    				attribute.push(val);
    			})
    		}
    		//display reviews
    		var reviews = (product.hasOwnProperty('review'))? product.review:[];
    		var datareviews = [];
    		if( reviews.length > 0 ){
    			reviews.forEach( function(re, index){
    				if(re.hasOwnProperty('status') ){ 
	    				if( re.status == 1)
	    					datareviews.push(re);
	    				else{
	    					if(Meteor.userId() == re.userId)
	    						datareviews.push(re);
	    				}
	    			}else
	    				datareviews.push(re);
	    			
    			})
    		}
    		product.reviews = datareviews;
    		//Recommended Products
    		var recommended = (product.hasOwnProperty('recommended'))? product.recommended:[];
    		product.recommended = recommended;
    		return {product:product, attribute: attribute}
    	}
    },
    getCategoryName: function(categoryid) { //Get categoryname from categories collection by category in product collection
        if (categoryid != null){
            var obj = Meteoris.Categories.findOne({_id: categoryid }).title;
            return obj;
        }else return;
    },
    getListProducts: function( categoryId, page, limit) {
    	var skip = (page<=1)? 0 : (page - 1) * limit;
    	var reloadpage = Session.get('RELOADCATEGORYPAGE');
    	//if(  reloadpage ===  1)
    		//var data =  Meteoris.Products.find({category:categoryId},{ fields:{_id:1, title:1,price:1}, limit:limit});
    	//else
        var data =  Meteoris.Products.find({category:{$in:categoryId}},{ fields:{_id:1, title:1,price:1, category:1, oldId:1}, limit:limit});
        return data;
    },
    addReview: function(t, product_title){
    	var title = t.$('#review-title').val();
        var comment = t.$('#comment').val();
        var grade = 0;
        t.$('.star_active').each( function(){ grade = grade + 1});
        var product = Meteoris.Products.findOne({title:product_title});
        console.log('Product title:', product_title);
        var errMessage = '';
        if (title == "" || comment == "" || grade == "" ) {
        	if( title == "" )
            	errMessage += 'Please input title of your review';
            else if( comment == "" )
            	errMessage += 'Please input some description of your review';
            else if( grade == "" )
            	errMessage += 'Please rate this review';
            else if( product == "" )
            	errMessage += 'Your riew can not add.';

            Meteoris.Flash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        } else{
        	if( product ){
	        	var obj = {
	        			title: title,
	        			description: comment,
	        			grade: grade,
	        			userId: Meteor.userId(),
	        			status:0,
	        			date: getTimestamp()
	        	}
	        	
	            Meteor.call("Meteoris.Products.addReview", product._id, obj, function(err, result) {
	                if (err) {
	                    Meteoris.Flash.set("danger", err.message);
	                    throw new Meteor.Error(err)
	                } else {
	                	t.$('#review-title').val('');
        				t.$('#comment').val('');
        				t.$('.star_active').removeClass('yellow-star star_active');
	                    Meteoris.Flash.set("success", "Success add review.")
	                }
	            })
	        }
        }
    },
    getRecommendProducts: function( recommended ){
    	if( recommended.length ){
    		var html = '';
    		var data = Meteoris.Products.find({_id:{$in:recommended}});
    		if( data.count() > 0 ){
	    		data.forEach( function(data){
	    			html += listProductHtml(data, 'true');
	    		})
	    	}
	    	return html;
    	}
    }
});