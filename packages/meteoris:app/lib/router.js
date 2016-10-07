var groupRoutes = FlowRouter.group({
    prefix: '/meteoris',
    name: 'meteoris',
    triggersEnter: [authenticating]
});

/* router level validation, only allow user with group "admin" to access this page */
function authenticating() {    
    console.log(Meteoris.Role.userIsInGroup("admin"));
    if (!Meteoris.Role.userIsInGroup("admin")){
        FlowRouter.go("/");
        Meteoris.Flash.set("danger", "403 Unauthenticated");
    }
}

function checkIsLogin(){
    if (!Meteor.userId()){
        FlowRouter.go("/");
        Meteoris.Flash.set("danger", "403 Unauthenticated");
    }
}

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
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "category"});
    },   
});

FlowRouter.route('/detail/:title', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: "detail"});
    },   
});

/*Start Profile*/
FlowRouter.route('/profile', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: "meteoris_profile"});

    },   
    triggersEnter: [function(context, redirect) {
        checkIsLogin();
    }]
});
FlowRouter.route('/changepassword', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: "meteoris_changepassword"});
    },   
    triggersEnter: [function(context, redirect) {
        checkIsLogin();
    }]
});
/*EOF profile*/

/*Start banner admin*/
var groupBannerRoutes = FlowRouter.group({
    prefix: '/banner',
    name: 'banner',
    //triggersEnter: [authenticating]
});

groupBannerRoutes.route('/add', {
    subscriptions:function(){
        Meteor.subscribe("allproducts");
    },
    action: function() {
        BlazeLayout.render('mainLayout', {content: "meteoris_addbanner"});
    },
});
groupBannerRoutes.route('/all', {
    subscriptions:function(){
        Meteor.subscribe("allBanner");
    },
    action: function() {
        BlazeLayout.render('mainLayout', {content: "meteoris_allbanner"});
    },
});
groupBannerRoutes.route('/edit/:id', {
    subscriptions:function(params){
        Meteor.subscribe("editBanner",params.id);
    },
    action: function() {
        BlazeLayout.render('mainLayout', {content: "meteoris_editbanner"});
    },
});
/*End banner admin*/