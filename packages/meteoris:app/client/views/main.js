var ctrl = new Meteoris.AppController();

Template.mainLayout.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('meteoris_themeAdmin', ctrl.getId());
    });    
});

Template.mainLayout.helpers({
    model: function(){
        //return ctrl.main().model;
    },    
});