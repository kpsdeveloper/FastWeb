var ctrl = new Meteoris.ProductsController();
Session.set('SUBSCRIBELISTPRO', '');
Session.set('TOTALPRODUCT', 0);
Template.mainLayout.events({
	'click .unlike': function(e) {
		e.preventDefault();
		console.log(FlowRouter.current().path);
	    var productid = $(e.currentTarget).attr('data-id');
	    $('#like' + productid).removeClass('nonelike');
	    $('#unlike' + productid).addClass('nonelike');
	    var userId = Meteor.userId();
	    var obj = { proId: productid, userId: userId }
	    if (userId) {
	        Meteor.call('Meteoris.Products.addToFavorite', obj, function(error) {
	            if (!error) {
	             	Meteoris.Flash.set("success", "This product has been added to your favorite list.");
	               
	            }
	        });
	    } else {
	        Session.set("REDIRECTURL", FlowRouter.current().path);
	        FlowRouter.go("/meteoris/user/login");
	    }
	},
	'click .like': function(e) {
	    e.preventDefault();
		
	    var productid = $(e.currentTarget).attr('data-id');
	    $('#unlike' + productid).removeClass('nonelike');
	    $('#like' + productid).addClass('nonelike');
	    var userId = Meteor.userId();
	    if (userId) {
	        Meteor.call('Meteoris.Products.removeFavorite', productid, userId, function(error) {
	            if (!error) {
	               Meteoris.Flash.set("success", "This product has been removed to your favorite list.");
	            } 
	        });
	    } else {
	        Session.set("REDIRECTURL", FlowRouter.current().path);
	        FlowRouter.go("/meteoris/user/login");
	    }
	},
    'click #addToCart': function(e, tpl){
        e.preventDefault();
        var title = unslugTitle(FlowRouter.getParam("title"));  
        var product = Meteoris.Products.findOne({title:title});
        
        
        var id_product = ( product )? product._id:$(e.currentTarget).parent().attr('id');
        var qty = (tpl.$("#qty").val())? tpl.$("#qty").val():$('#qty'+id_product).val();
        var attrid = $('.attrwrapper .active').attr('data-attr');
        var attribute = '';
        if( attrid )
             attribute = attrid;
        else{
            var pro = Meteoris.Products.findOne({_id:id_product});
            if( pro ){
                var attr = Meteoris.Attributes.find({product:pro.oldId}).fetch();
                if( attribute == '')
                    attribute = attr[0]._id;
            }
        }
        var userId = getSessionUserID();

        console.log('Id Product:', id_product);
        console.log('Id attribute:', attribute);
        console.log('Id userId:', userId);
        console.log('qty:', qty);
        var data = {id_product:id_product, attribute:attribute, userId:userId, qty:qty};
        Meteor.call('Meteoris.Products.addToCart', data);
        
    }
});
Template.registerHelper('getListProductsHelper', function( categoryId, thumb) {
	var limit = 16;
	var page = Session.get('PAGE');
	
	var List = ctrl.getListProducts(categoryId, page , limit);
	var html = '';
	if( List.count() > 0 ){
		List.forEach( function(data, index){
			html += listProductHtml(data, thumb);
		})
	}
	
	return html;
	
});
window.listProductHtml = function( data , thumb){
	var html = '';
	var src = getImgForProductCDNv2( data._id , thumb)
	html += '<div class="col-md-3 col-xs-12" id="'+data._id+'">';
	html += 	'<a href="/details/'+slugTitle(data.title)+'"><img src="'+src+'" style="width:201px;height:201px"></a>';
	html += 	'<a href="/details/'+slugTitle(data.title)+'"><h3 class="title">'+data.title+'</h3></a>';
    html +=     '<p>ریال  <span class="price">'+data.price+'</span></p>';
    html +=     '<label class="quantity" for="select">Quantity</label><select id="qty'+data._id+'" name="select" class="quantity" size="1"><option value="1">1</option></select>';
    html +=     '<button class="btn btn-addtocart" id="addToCart"><span class="cart pull-left"></span> ADD TO CART</button>';
    html += '</div>';
    return html;
}
Template.registerHelper('getCategories', function() {
   Meteoris.Categories.find();
});
Template.registerHelper('isUserLoggedIn', function() {
 	if( Meteor.userId() ) return true;
 	else return false;
});

Template.registerHelper('getCategoryIdChildren', function() {
	var name = FlowRouter.current().params.name;
	var list = getCategoryIdChildren( name );
	return {list:list};
});
Template.registerHelper('getCurrentCategorySlug', function() {
	var name = FlowRouter.current().params.name;
	var page = Session.get('PAGE');
	var prev = parseInt(page) - 1;
	var next = parseInt(page) + 1;
	var prevStatus = (page<=1)? false:true;
	var limit = 16;
	var total = Session.get('TOTALPRODUCT') / limit;
	var numpage = Math.ceil(total);
	var nextStatus = (page>=numpage)? false:true;
	return {name:name, prev:prev, next:next, prevstatus:prevStatus, nextstatus: nextStatus };
});
Template.registerHelper('getNumPage', function(  ) {
	var name = FlowRouter.current().params.name;
	//var page = Session.get('PAGE');
    var categoryId = getCategoryIdChildren( name );
	var limit = 16;
	Meteor.call('Meteoris.Count.Products', categoryId, function(err, count){
		if(!err){
			Session.set('TOTALPRODUCT', count);
		}
	})
	var total = Session.get('TOTALPRODUCT') / limit;
	var numpage = Math.ceil(total);
	var totalpage = [];
	if( numpage > 0 ){
		for(i=1; i <= numpage; i++){
			totalpage.push({num:i});
		}
	}
	return totalpage;
	
	/*var total = Math.ceil(Session.get('TOTALPRODUCT') / limit);
	var per_page = 10;
	var current_page = 1;//Session.get('PAGE');
	var adjacent_links = 4;
	
	//echo ' <p>Page: '.$current_page.' / Total: '.$total.'</p>';
	var p = Pagination(total, per_page, current_page, adjacent_links);
	console.log('page show:', p );
	*/
	//return {name:name, prev:prev, next:next};
});
function Pagination(data, limit, current, adjacents )
{
	var result = [];
	
	result = range(1, Math.ceil(data / limit));
	
    if (current && adjacents )
    {
    	//console.log('adjacents:', Math.floor( adjacents ) * 2 +1);
        if ((adjacents = Math.floor( adjacents ) * 2 +1) >= 1)
        {
            result = result.slice(Math.max(0, Math.min(result.length - adjacents, current - Math.ceil(adjacents / 2))), adjacents);
        	
        }
    }
    
    return result;
}
function range(start, stop){
	var arr = [];
	while(start <= stop){
	   arr.push(start++);
	}
	return arr;
};
/*
function Pagination(data, limit = null, current = null, adjacents = null)
{
    var result = [];

    //if (data && limit)
    //{
        result = Math.ceil(data / limit);

        if (current && adjacents )
        {
            if ((adjacents = Math.floor(adjacents) * 2 + 1) >= 1)
            {
                //result = result.slice(Math.max(0, Math.min(count(result) - adjacents, parseInt(current) - Math.ceil(adjacents / 2))), adjacents);
            }
        }
    //}

    return result;
}*/
function addChildren(source, identifier, dest) {
  source.filter(function(val) {
    return val.parent == identifier;
  }).forEach(function(val) {
    dest.push(val._id);
    addChildren(source, val._id, dest);
  });
}
function buildTree(source, parentId) {
  var dest = [];
  addChildren(source, parentId , dest);
  return dest;
}

window.getCategoryIdChildren = function( name ){
	var list = [];
	if (name != 'undefined' && name != null) {
        var l = Meteoris.Categories.findOne({ title: name });
        if (l == 'undefined' || l == null) {
            var title = name;
            title = title.replace(/\(percentag\)/g, "%");
            title = title.replace(/\(plush\)/g, "+");
            title = title.replace(/\(ocir\)/g, "ô");
            title = title.replace(/\(minus\)/g, "-");
            title = title.replace(/\(copyright\)/g, "®");
            title = title.replace(/\(number\)/g, "°");
            title = title.replace(/\(bigocir\)/g, "Ô");
            title = title.replace(/\(square\)/g, "²");
            title = title.replace(/\(accentaigu\)/g, "`");
            title = title.replace(/\(eaccentaigu\)/g, "é");
            title = title.replace(/\(bigeaccentaigu\)/g, "É");
            title = title.replace(/\(and\)/g, "&");
            title = title.replace(/\(slash\)/g, "/");
            title = title.replace(/\(apostrophe\)/g, "’");
            title = title.replace(/\(quote\)/g, "'");
            title = title.replace(/\(warning\)/g, "!");
            title = title.replace(/\(question\)/g, "?");
            title = title.replace(/\(dolla\)/g, "$");
            title = title.replace(/\(eaccentgrave\)/g, "è");
            title = title.replace(/\(hyphen\)/g, "–");
            
            var l = Meteoris.Categories.findOne({ "i18n.en.title": title });
        }
        if( l ){
	        var categories = Meteoris.Categories.find().fetch();
	        var parentId = l._id;
			var list = buildTree(categories, parentId);
			list.push(l._id);
			
    	}
    	
    }
    return list;
}
window.getOriginalSize = function( src ){
	return src.replace('/small','');
}

Template.registerHelper('getImgForProductCDN', function(id, thumb) {
   return getImgForProductCDNv2(id, thumb);
});
window.getImgCDNv2 = function(id, thumb) {
    if (id.indexOf('http') > -1) {
        return id;
    } else {
        var img = Meteoris.Images.findOne({ _id: id });
        //var currentdomain = Session.get('ABSOLUTEURL');
        
        //var localcdn = currentdomain;
        var cdnurl = 'http://54.71.1.92/'; //(currentdomain.indexOf('localhost') > -1 )? 'http://54.171.217.142/':localcdn;
        if (img){
        	if( thumb == 'true')
            	return cdnurl+ "upload/small/" + img.copies.images.key;
        	else
        	   return cdnurl + "upload/" + img.copies.images.key;
        
        }else 
            return id;
        
    }

}
window.getImgForProductCDNv2 = function(id_product, thumb) {
    var prod = Meteoris.Products.findOne({ _id: id_product });
    if (prod) {
        if (!prod.image || prod.image.length == 0) {

            var attr = Meteoris.Attributes.findOne({ product: prod.oldId });
            if (!attr) {
                return id_product;
            } else {
                return getImgCDNv2(attr.productImage, thumb);
            }
        } else {
            if (!prod.image[0]) {
                return id_product;
            } else
                return getImgCDNv2(prod.image[0], thumb);
        }
    } else {
        return id_product;
    }
}
Template.registerHelper('slugTitle', function( title ) {
   return slugTitle( title );
});
window.slugTitle = function(title) {
    if (!title)
        return;
    title = title.replace(/\-/g, "(minus)");
    title = title.replace(/\s/g, "-");
    title = title.replace(/\%/g, "(percentag)");
    title = title.replace(/\+/g, "(plush)");
    title = title.replace(/\ô/g, "(ocir)");
    title = title.replace(/\®/g, "(copyright)");
    title = title.replace(/\°/g, "(number)");
    title = title.replace(/\Ô/g, "(bigocir)");
    title = title.replace(/\²/g, "(square)");
    title = title.replace(/\`/g, "(accentaigu)");
    title = title.replace(/\é/g, "(eaccentaigu)");
    title = title.replace(/\É/g, "(bigeaccentaigu)");
    title = title.replace(/\&/g, "(and)");
    title = title.replace(/\//g, "(slash)");
    title = title.replace(/\’/g, "(apostrophe)");
    title = title.replace(/\'/g, "(quote)");
    title = title.replace(/\!/g, "(warning)");
    title = title.replace(/\?/g, "(question)");
    title = title.replace(/\$/g, "(dolla)");
    title = title.replace(/\è/g, "(eaccentgrave)");
    title = title.replace(/\–/g, "(hyphen)");
    //title = title.toLowerCase();
    return title;
}
window.unslugTitle = function(title) {
	if (!title)
        return;
    title = title.replace(/\-/g, " ");
    title = title.replace(/\(percentag\)/g, "%");
    title = title.replace(/\(plush\)/g, "+");
    title = title.replace(/\(ocir\)/g, "ô");
    title = title.replace(/\(minus\)/g, "-");
    title = title.replace(/\(copyright\)/g, "®");
    title = title.replace(/\(number\)/g, "°");
    title = title.replace(/\(bigocir\)/g, "Ô");
    title = title.replace(/\(square\)/g, "²");
    title = title.replace(/\(accentaigu\)/g, "`");
    title = title.replace(/\(eaccentaigu\)/g, "é");
    title = title.replace(/\(bigeaccentaigu\)/g, "É");
    title = title.replace(/\(and\)/g, "&");
    title = title.replace(/\(slash\)/g, "/");
    title = title.replace(/\(apostrophe\)/g, "’");
    title = title.replace(/\(quote\)/g, "'");
    title = title.replace(/\(warning\)/g, "!");
    title = title.replace(/\(question\)/g, "?");
    title = title.replace(/\(dolla\)/g, "$");
    title = title.replace(/\(eaccentgrave\)/g, "è");
    title = title.replace(/\(hyphen\)/g, "–");
    return title;
}
window.getTimestamp = function(){
	var date = new Date();
   	var timestamp = date.getTime() / 1000;
   	return timestamp;
}
Template.registerHelper('getHumanDate', function( timestamp ) {
   return getHumanDate( timestamp );
});
window.getHumanDate = function( timestamp ){
  var d = new Date(timestamp * 1000),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        hour = d.getHours();
        minx = d.getMinutes();
        min  = (minx.length <= 1)? '0'+minx: minx;
        secx =  d.getSeconds();
        sec  = (secx.length <= 1)? '0'+secx: secx;

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-')+' '+hour+':'+min+':'+sec;
}
Template.registerHelper('getButtonAddToFavorite', function( id_product ) {
   return getButtonAddToFavorite( id_product );
});
window.getButtonAddToFavorite = function(id_product){
    var userid = Meteor.userId();
    var fav = Meteoris.Favorites.findOne({ proId: id_product, userId: userid });
    if (fav) {
        var heartempty = 'nonelike';
        var heartfull = '';
    } else {
        var heartempty = '';
        var heartfull = 'nonelike';
    }
    var html = '';
    if (TAPi18n.getLanguage() == 'fa') {
        html += '<a href="#" data-id="' + id_product + '" class="heart ' + heartempty + ' unlike unlike' + id_product + '"><span class="fa fa-heart-o btn-unlike">&nbsp;&nbsp;<span>افزودن به فهرست علاقه‌مندی‌ها</span></span></a>';
        html += '<a href="#" data-id="' + id_product + '" class="heart ' + heartfull + ' like like' + id_product + '"><span class="fa fa-heart fa-heart-full btn-like" style="">&nbsp;&nbsp;<span>حذف از فهرست علاقه‌مندی‌ها</span></span></a>';

    } else {
        html += '<a href="#" data-id="' + id_product + '" class="heart ' + heartempty + ' unlike unlike' + id_product + '"><span class="fa fa-heart-o btn-unlike">&nbsp;&nbsp;<span>ADD TO FAVORITE</span></span></a>';
        html += '<a href="#" data-id="' + id_product + '" class="heart ' + heartfull + ' like like' + id_product + '"><span class="fa fa-heart fa-heart-full btn-like">&nbsp;&nbsp;<span>REMOVE FAVORITE</span></span></a>';

    }
    return html;
}
window.getSessionUserID = function(){
    var currentUserID = Meteor.userId();
    if( currentUserID ){
        return currentUserID;
    }else{
        var SessionID = Session.get('userId');
        if( SessionID )
            return SessionID;
        else{
            Session.setPersistent('userId', Random.id());
            return Session.get('userId');
        }
    }
}