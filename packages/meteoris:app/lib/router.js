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
    subscriptions: function(){
        TAPi18n.subscribe('Categories');
        var keyword = Session.get('keyward');
        var groupId = $('.search-option .active a').attr('data-group');
        console.log('search:', keyword);
        console.log('group:', groupId);
        if( keyword )
            this.register('myProduct', Meteor.subscribe('searchproduct', keyword, groupId));
    },
    action: function() {
        BlazeLayout.render('mainLayout', {content: "searchproduct"});
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
        //Meteor.subscribe('Carts', getSessionUserID());
    },
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "category"});
    }

});
FlowRouter.route('/checkout', {
    subscriptions: function(){
        TAPi18n.subscribe('Categories');
    },
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "showCart"});
    }
});
FlowRouter.route('/chooseAddress', {
    subscriptions: function(){
        Meteor.subscribe('Accounts', Meteor.userId());
    },
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "chooseAddress"});
    }
});
FlowRouter.route('/addnewAddress', {
    subscriptions: function(){
        //this.register('myCart', Meteor.subscribe('Carts', getSessionUserID()) );
        Meteor.subscribe('Accounts', Meteor.userId() );

    },
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "addressDetails"});
    }
});
FlowRouter.route('/editaddress/:id', {
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "editAddress"});
    }
});

FlowRouter.route('/orderReview', {
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "orderReview"});
    }
});
FlowRouter.route('/payment', {
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "paymentDetails"});
    }
});
FlowRouter.route('/saman', {
    subscriptions: function(){
        Meteor.call('Meteoris.Order.completedOrder', Meteor.userId());
    },
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "completedOrder"});
    }
});
FlowRouter.route('/ordersuccess', {
    subscriptions: function(){
        Meteor.subscribe('Orders', getSessionUserID());
    },
    action: function( params ) {
        BlazeLayout.render('mainLayout', {content: "completedOrder"});
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

