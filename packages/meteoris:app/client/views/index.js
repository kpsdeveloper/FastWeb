var ctrl = new Meteoris.AppController();

Template.mainLayout.onCreated(function() {
    var self = this;
    console.log(ctrl.getId());
    self.autorun(function() {
        //self.subscribe('meteoris_themeAdmin', ctrl.getId());
        TAPi18n.subscribe('Categories');
    });    
});

Template.index.helpers({
    model: function(){
        var data = ctrl.main().model;
        console.log('data:', data);

    },
    test: function(){
    	var data = ctrl.test().model;
    	return {data:data}
    }    
});
Template.index.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('banner');
    });    
});
