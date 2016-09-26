var ctrl = new Meteoris.AppController();

Template.mainLayout.onCreated(function() {
    var self = this;
    console.log(ctrl.getId());
    self.autorun(function() {
        self.subscribe('meteoris_themeAdmin', ctrl.getId());
    });    
});

Template.index.helpers({
    model: function(){
        var data = ctrl.main().model;
        console.log('data:', data);

    },    
});