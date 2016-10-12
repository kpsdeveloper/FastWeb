var ctrl = new Meteoris.BannersController();

Template.meteoris_addbanner.onCreated(function() {
    Meteor.Loader.loadJs("//api.filestackapi.com/filestack.js");
});

Template.meteoris_addbanner.events = {
    'click #btnaddbanner': function(e, t) {
        e.preventDefault();
        var pagename=t.find('#pagename').value;
        var typebanner=t.find('#typebanner').value;
        var position=t.find('#position').value;
        var selorder=t.find('#selorder').value;
        var linkurl=t.find('#linkurl').value;
        var txtaddproduct=Session.get("PROID");
        var description=t.find('#description').value;
        var imageurl=Session.get("URLIMGBANNER");
        var obj={
            pagename:pagename,
            typebanner:typebanner,
            position:position,
            order:selorder,
            linkurl:linkurl,
            products:txtaddproduct,
            description:description,
            imageurl:imageurl
        }
        Meteor.call("insertBanner",obj,function(err){
            if(err){
                console.log(err.reason);
            }
        });
       
    },
    'change #pagename':function(e,t){
    	var pagename=t.find('#pagename').value;
    	//alert(pagename);
    	Session.set("PAGENAME",pagename);
    },
    'change #typebanner':function(e,t){
    	var typebanner=t.find('#typebanner').value;
    	var pagename=Session.get("PAGENAME");
    	alert(pagename);
    	if(typebanner=='slidebanner' && pagename=='category'){
    		console.log("hellohere");
    		$("#hideform").removeClass("hidden");
    	}
    },
    'keyup #txtaddproduct': function(e,t){
        var key = $(e.currentTarget).val();
        if( key.length > 3){
            var data = Meteoris.Products.find({ "title": { $regex: new RegExp(key, "i") } });
            console.log("DATA");
            console.log(data);
            var text = '';
            if( data.count() > 0){
                data.forEach( function(data, index){
                    text += '<li data-id="'+data._id+'" class="listpro">'+data.title+'</li>';
                })  
            }
            if( text!='')
                $('#result').html( '<div style="border:1px solid #ddd;padding:5px">'+text+'</div>' );
            else
                $('#result').html( '<li>No result.</li>' );
        }
    },
    'click .listpro': function(e,t){
        var title = $(e.currentTarget).html();
        var id = $(e.currentTarget).attr('data-id');
        $('#txtaddproduct').val(title);
        $('#txtaddproduct').attr('data-id', id);
        $('#result').html('');

    },
    'click #btnaddpro': function(e,t){
        e.preventDefault();
        var product = $('#txtaddproduct').attr('data-id');
        if( product != ''){
            var proid = [];
            if( Session.get('PROID') ){
                var data = Session.get('PROID');
                data.push(product);
                proid = data;
            }else{
                proid.push( product );
            }
            $('#txtaddproduct').removeAttr('data-id');
            $('#txtaddproduct').val('');
            Session.set('PROID', proid);
            console.log(proid);
        }else{
            Meteoris.Flash.set('danger', "Product is require!");  
        }
    },
    'click #fileimage': function(e, t) {
        e.preventDefault();
        filepicker.setKey("ACTP7A0fnQou2s5L4f9FBz");
        filepicker.pick({
            mimetype: 'image/*', /* Images only */
            maxSize: 1024 * 1024 * 5, /* 5mb */
            imageMax: [1500, 1500], /* 1500x1500px */
            cropRatio: 1/1, /* Perfect squares */
            services: ['*'] /* All available third-parties */
        }, function(blob){
           
            var filename = blob.filename;
            var url = blob.url;
            var id = blob.id;
            var isWriteable = blob.isWriteable;
            var mimetype = blob.mimetype;
            var size = blob.size;

            console.log(blob)
            Session.set("URLIMGBANNER",url);
           /* Meteor.call('addImgBanner',url,function(err){
                if(err){
                    Meteoris.Flash.set('danger', err.message);  
                }
            });*/
        });
        
    }
};

/*====================all Banner =======================*/
Template.meteoris_allbanner.helpers({
    getAllBanners:function(){
        return Banners.find({});
    }
});
Template.meteoris_allbanner.events = {
    'click #delete':function(e,t){
        var id=$(e.currentTarget).attr("data-id");
        if (confirm('Are you sure?')) {
             Meteor.call("removeBanner",id);
        }
    }
};

/*==================Edit Banner =================================*/
Template.meteoris_editbanner.onCreated(function() {
    Meteor.subscribe("allproducts");
    Meteor.Loader.loadJs("//api.filestackapi.com/filestack.js");
});
Template.meteoris_editbanner.helpers({
    editBanner:function(){
        var id = FlowRouter.current().params.id;
        return Banners.findOne({_id:id});
    },
    displayTitle:function(id){
        var title='';
        var pro=Meteoris.Products.findOne({_id:id});
        if(pro){
            title=pro.title;
        }
        return title;
    }
});
Template.meteoris_editbanner.events = {
    'click #removePro':function(e){
        var indexId=$(e.currentTarget).attr("data-id");
        var id=FlowRouter.current().params.id;
        if (confirm('Are you sure to remove ?')) {
            Meteor.call("removeProductIndex",id,indexId,function(err){
                if(!err){
                    Meteoris.Flash.set('success', "success remove product from list ");  
                }
            })
        }
    },
    'keyup #txtaddproduct': function(e,t){
        var key = $(e.currentTarget).val();
        if( key.length > 3){
            var data = Meteoris.Products.find({ "title": { $regex: new RegExp(key, "i") } });
            console.log("DATA");
            console.log(data);
            var text = '';
            if( data.count() > 0){
                data.forEach( function(data, index){
                    text += '<li data-id="'+data._id+'" class="listpro">'+data.title+'</li>';
                })  
            }
            if( text!='')
                $('#result').html( '<div style="border:1px solid #ddd;padding:5px">'+text+'</div>' );
            else
                $('#result').html( '<li>No result.</li>' );
        }
    },
    'click .listpro': function(e,t){
        var title = $(e.currentTarget).html();
        var id = $(e.currentTarget).attr('data-id');
        $('#txtaddproduct').val(title);
        $('#txtaddproduct').attr('data-id', id);
        $('#result').html('');

    },
    'click #btnaddpro': function(e,t){
        e.preventDefault();
        var product = $('#txtaddproduct').attr('data-id');
        if( product != ''){
            var proid = [];
            if( Session.get('UPPROID') ){
                var data = Session.get('UPPROID');
                data.push(product);
                proid = data;
            }else{
                proid.push( product );
            }
            $('#txtaddproduct').removeAttr('data-id');
            $('#txtaddproduct').val('');
            Session.set('UPPROID', proid);
            console.log(proid);
        }else{
            Meteoris.Flash.set('danger', "Product is require!");  
        }
    },
    'click #fileimage': function(e, t) {
        e.preventDefault();
        filepicker.setKey("ACTP7A0fnQou2s5L4f9FBz");
        filepicker.pick({
            mimetype: 'image/*', /* Images only */
            maxSize: 1024 * 1024 * 5, /* 5mb */
            imageMax: [1500, 1500], /* 1500x1500px */
            cropRatio: 1/1, /* Perfect squares */
            services: ['*'] /* All available third-parties */
        }, function(blob){
           
            var filename = blob.filename;
            var url = blob.url;
            var id = blob.id;
            var isWriteable = blob.isWriteable;
            var mimetype = blob.mimetype;
            var size = blob.size;

            console.log(blob)
            Session.set("UPDATEIMGBANNER",url);
        });
        
    },
    'click #btnupdatebanner': function(e, t) {
        e.preventDefault();
         var id=FlowRouter.current().params.id;
        var pagename=t.find('#pagename').value;
        var typebanner=t.find('#typebanner').value;
        var position=t.find('#position').value;
        var selorder=t.find('#selorder').value;
        var linkurl=t.find('#linkurl').value;
        var txtaddproduct=Session.get("UPPROID");
        var description=t.find('#description').value;
        var imageurl=Session.get("UPDATEIMGBANNER");
        var obj={
            pagename:pagename,
            typebanner:typebanner,
            position:position,
            order:selorder,
            linkurl:linkurl,
            products:txtaddproduct,
            description:description,
            imageurl:imageurl
        }
        Meteor.call("updateBanner",id,obj,function(err){
            if(err){
                Meteoris.Flash.set('danger', err.message);
            }else{
                //Meteoris.Flash.set('success', "update success !!!");
                FlowRouter.go("/banner/all");
            }
        });
       
    }

};


/*===================Vieww Banner ==============================*/
Template.meteoris_viewbanner.helpers({
    displayBanner:function(){
        console.log(Meteoris.Images.find({}).count())
        return Banners.findOne({pagename:'webzine',typebanner:'webzine'});
    },
    displayBannerSlide:function(){
        return Banners.findOne({pagename:'favorite',typebanner:'slidebanner'});
    },
    displayProduct:function(listIdpro){
        return Meteoris.Products.find({ _id: { $in: listIdpro }});
    }

});