var ctrl = new Meteoris.UserController();

Template.meteoris_userForgetPassword.events = {
    'click #btnForgetPassword': function(e, t){
        e.preventDefault();         
        ctrl.forgetPassword(t);
    },  
    'change #rdverify' :function(e,t){
        var rdvalue=t.find("input:radio[name=ver]:checked").value;
        if(rdvalue=="byphone"){
            $("#formphone").removeClass("hidden");
            $("#formeamil").addClass("hidden");
        }else{
            $("#formphone").addClass("hidden");
            $("#formeamil").removeClass("hidden");
        }
    },
    'click #btnverifyByPhone':function(e,t){
        e.preventDefault();         
        ctrl.forgetPasswordByPhone(t);
    }   
};

Template.meteoris_confirmcode.events = {
    'click #btnconfirmcode': function(e, t){
        e.preventDefault();         
        ctrl.confirmcode(t);
    },        
};

Template.meteoris_resetpwd.events = {
    'click #btnresetPwd': function(e, t){
        e.preventDefault();         
        ctrl.resetnewPwd(t);
    },        
};