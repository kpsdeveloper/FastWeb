Template.app_header.helpers({
    getParent: function() {
        var menu = Meteoris.Categories.find({ "$or": [{ "parent": "0" }, { "parent": " " }] }).map(function(document, index) {
            document.index = index + 1;
            return document;
        });
        Session.set('NUMMENU', menu.length);
        return menu;
    },
    getChildren: function(parent) {
        var children = Meteoris.Categories.find({ "parent": parent }).map(function(document, index) {
            document.index = index + 1;
            return document;
        });
        return children;
    },
    haveBaby: function(id) {
        var babies = Meteoris.Categories.find({ parent: id }).count();
        if (babies == 0)
            return false;
        else
            return true;
    },
});