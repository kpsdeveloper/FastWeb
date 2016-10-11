Template.tutonew.helpers({
    getStyleFa: function(){
        if (TAPi18n.getLanguage()=='fa'){
            return "pull-right";
        }else{
            return "";
        }
    },
    getTutoCategory: function() {
        return Meteoris.Categories.find({ "parent": " " });
    },
    getCategoryImg: function(id) {
        var p = Meteoris.Categories.findOne({ _id: id });
        if (p.image instanceof Array)
            return p.image[0];
        else
            return p.image;
    }
});