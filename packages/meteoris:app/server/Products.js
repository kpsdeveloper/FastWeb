/* create default setting collection */
/*
Meteor.startup(function() {
    var _id = "setting";
    if (!Meteoris.ThemeAdmin.findOne(_id)) {
        Meteoris.ThemeAdmin.insert({
            _id: "setting",
            logoLarge: "Set Logo Large from /meteoris/theme-admin/setting",
            logoMini: "Set Logo Mini from /meteoris/theme-admin/setting",
            skin: "blue",
            fixed: true,
            sidebarMini: true,
            footerText: "<strong>Copyright © 2015 <a href='http://yourcompany.com'>Your Company</a>.</strong><div class='pull-right hidden-xs'><b>Version</b> 1.0.0 </div>",
        });
    }
});
*/

/*
Meteor.methods({
    "Meteoris.ThemeAdmin.insert": function(doc) {
        var _id = Meteoris.ThemeAdmin.insert(doc);
        return {
            _id: _id,
        }
    },
    "Meteoris.ThemeAdmin.update": function(_id, doc) {
        var _id = Meteoris.ThemeAdmin.update(_id, {$set: doc});
        return {
            _id: _id,
        }
    },
    "Meteoris.ThemeAdmin.remove": function(doc) {
        Meteoris.ThemeAdmin.remove(doc);
    },
});*/