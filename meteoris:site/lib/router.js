/**
create the main router called site, and use BlazeLayout render "meteoris_themeAdminMain" from metoris:theme-admin package, and accessing template called "radiegtya_siteIndex"
*/
FlowRouter.route('/admin', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "meteoris_siteIndex"});
    },   
});
FlowRouter.route('/', {
	subscriptions: function(){
        return [TAPi18n.subscribe('Categories'), Meteor.subscribe('Carts', getSessionUserID())];
    },
    action: function() {
        BlazeLayout.render('mainLayout', {content: "index"});
    },   
});