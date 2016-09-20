var ctrl = new Meteoris.ThemeAdminController();

Template.mainLayout.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('meteoris_themeAdmin', ctrl.getId());
    });    
});

Template.mainLayout.helpers({
    model: function(){
        return ctrl.main().model;
    },    
});