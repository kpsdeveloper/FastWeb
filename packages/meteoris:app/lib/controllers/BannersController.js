Namespace('Meteoris.BannersController');

Meteoris.BannersController = Meteoris.Controller.extend({  
	findProducts:function (e,t) {
		var key = $(e.currentTarget).val();
		if( key.length > 3){
            alert('22');
            var data = Meteoris.Products.find({ "title": { $regex: new RegExp(key, "i") } });
            console.log(data);
        }
	}

});