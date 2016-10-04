var groupRoutes = FlowRouter.group({
    prefix: '/meteoris',
    name: 'meteoris',
    triggersEnter: [authenticating]
});

/* router level validation, only allow user with group "admin" to access this page */
function authenticating() {    
    console.log(Meteoris.Role.userIsInGroup("admin"));
    if (!Meteoris.Role.userIsInGroup("admin")){
        Meteoris.Flash.set("danger", "403 Unauthenticated");
        FlowRouter.go("/");
    }
}
FlowRouter.route('/searchproduct/:slug', {
    template: 'searchproduct',
    action: function() {
        BlazeLayout.render('mainLayout', {content: "detail"});
    }
});
groupRoutes.route('/products/list', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: "meteoris_productIndex"});
    },
});
groupRoutes.route('/products/add', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: "meteoris_productAdd"});
    },
});
FlowRouter.route('/category/:name/:page', {
    subscriptions: function(){
       
        TAPi18n.subscribe('Categories');
    },
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "category"});
    }

});

FlowRouter.route('/details/:title', {
    subscriptions: function(){
        //Meteor.Loader.loadJs("http://localhost:3000/js/jquery-1.8.3.min.js");
        Meteor.Loader.loadJs("/js/jquery.elevateZoom-3.0.8.min.js");
        TAPi18n.subscribe('Categories');
    },
    action: function() {
        BlazeLayout.render('mainLayout', {content: "detail"});
    },   
});

FlowRouter.route('/profile', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: "meteoris_profile"});
    },   
});
FlowRouter.route('/changepassword', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: "meteoris_changepassword"});
    },   
});
