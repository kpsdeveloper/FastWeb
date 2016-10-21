Template.mainLayout.onRendered(function(){
	subscriptions: function(){
        	TAPi18n.subscribe('Categories');
    },
});
Template.registerHelper("capitalWord", function(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
});