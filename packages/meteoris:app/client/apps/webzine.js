Template.webzinelisting.onCreated( function(){
    Meteor.subscribe('webzineTopContent');
});
Template.webzinedetails.onCreated( function(){
    var title = Session.get('WEBZINEDETAIL');
    Meteor.subscribe('webzineDetails',title);
})
Template.webzinedetails.helpers({
    getContentDetail: function() {
        var title = Session.get('WEBZINEDETAIL');
        console.log("Title: ",title);
        var con = Meteoris.Contents.find({ "title": title});
        console.log("Result:", con.fetch());
        //var myData = Meteoris.Contents.find({ typeid: con.typeid, category: con.category });
        var result = con.map( function(val){
            if (val.image instanceof Array)
                var imgid = val.image[0];
            else
                var imgid = val.image;

            val.src = getImgCDNv2(imgid, 'true');
            return val;
        })
        return result;
    }
});

Template.webzinelisting.helpers({
    getnewaticle:function(){
        var type = Meteoris.ContentType.findOne({ "type": "Webzine" });
        var typid=type._id; 
        var result = Meteoris.Contents.find({'typeid':typid},{sort:{date:-1}});
        var resultOne = result.fetch();
        return resultOne[0];
    },
    getWebzinByCatId:function(id){
        var result = '';
        var type = Meteoris.ContentType.findOne({ "type": "Webzine" });
        var typid=type._id;
        var curCate = Meteoris.Categories.findOne({_id:id});
        if(curCate){
            var subCate = getListCategoryByParent(curCate);
            result = Meteoris.Contents.find({$and:[{"typeid":typid},{"category":{$in:subCate}}]});

            var data = result.map( function(val){
                if (val.image instanceof Array)
                    var imgid = val.image[0];
                else
                    var imgid = val.image;

                val.src = getImgCDNv2(imgid, 'true');
               return val;
            })
        }

        return data;

    }
});
Template.registerHelper('getParentCatgories',function(){
    return getParentCatgories();
});
var getParentCatgories = function(){
        return Meteoris.Categories.find({parent:" "});
}
