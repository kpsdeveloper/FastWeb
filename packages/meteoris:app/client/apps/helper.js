Session.set('TOTALPRODUCT', 0);
Template.registerHelper('getCategories', function() {
   Meteoris.Categories.find();
});
Template.registerHelper('getCurrentCategory', function(  ) {
	var name = FlowRouter.current().params.name;
	var currentCate = getCurrentCategory( name );
	return currentCate;
});
Template.registerHelper('getCurrentCategorySlug', function(  ) {
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
	var categoryId = 'DYq5Z8GmZZ6wyMmWj';
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
	//return {name:name, prev:prev, next:next};
});

window.getCurrentCategory = function( name ){
	if (name != 'undefined' && name != null) {
        var l = categories.findOne({ title: name });
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
            
            var l = categories.findOne({ "i18n.en.title": title });
        }
        return l;
    }
}