Template.tutonew.helpers({
    getTutoCategory: function() {
        var parentCat = Meteoris.Categories.find({ "parent": " " });
        var data = parentCat.map( function(val){
            if (val.image instanceof Array)
                var imgid = val.image[0];
            else
                var imgid = val.image;

            val.src = getImgCDNv2(imgid, 'true');
           return val;
        })
         return data;

    }
});
Template.tutolisting.onCreated( function(){
    var catId = Session.get('TUTOCATEGORYNAME');
    Meteor.subscribe('TutoContent',catId);
})
Template.tutodetails.onCreated( function(){
    var title = Session.get('TUTODETAILID');
    Meteor.subscribe('listTutoDetails',title);
})
Template.tutodetails.helpers({
    getContentListing: function() {
        var title = Session.get('TUTODETAILID');
        //console.log("This is: ",title);
        var con = Meteoris.Contents.findOne({ "title": title});
        var myData = Meteoris.Contents.find({ typeid: con.typeid, category: con.category });
        var newData = myData.map( function(d){
            if( d._id == con._id )
                d.current = true;
            else 
                d.current = false;
            return d;
        })
        var data = newData.map( function(val){
            if (val.image instanceof Array)
                var imgid = val.image[0];
            else
                var imgid = val.image;

            val.src = getImgCDNv2(imgid, 'true');
           return val;
        })
        return data;
    }
});
Template.tutolisting.helpers({
    getContent: function() {
        var type = Meteoris.ContentType.findOne({ type: "Tuto" });
        var categoryid = Session.get('TUTOCATEGORYNAME');
        
        var myData =  Meteoris.Contents.find({ category: {$in:categoryid} ,typeid: type._id },{sort: {_id:-1}});
        
        var data = myData.map( function(val){
            if (val.image instanceof Array)
                var imgid = val.image[0];
            else
                var imgid = val.image;

            val.src = getImgCDNv2(imgid, 'true');
           return val;
        })
        return data;
    }
});
