Meteor.publishComposite('meteoris_user', function(doc) {
    console.log('subscribing some Users');
    return {
        find: function() {
            return Meteor.users.find(doc);
        },
        children: [
        ],
    }
});

Meteor.startup(function() {
    //process.env.MAIL_URL="smtp://houttyty7%40gmail.com:tytyhout7@smtp.gmail.com:465/";
    process.env.MAIL_URL = "smtp://contact%40safirperfumery.com:Senegal95@smtp.domain.com:465/";
});
Meteor.methods({
    'Meteoris.User.isExist': function() {
        var user = Meteor.users.findOne({});
        if(user){
            ServerSession.set('Meteoris.User.isExist', true);
            return true;
        }
        ServerSession.set('Meteoris.User.isExist', false);
        return false;
    },
    'Meteoris.User.insert': function(doc) {
        validateParams(doc);
        Accounts.createUser(doc);
        return true;
    },
    'Meteoris.User.getServices': function(service) {
        var configurations = Accounts.loginServiceConfiguration.findOne({
            service: service
        });

        return configurations;
    },
    'Meteoris.User.saveServices': function(service, doc) {
        ServiceConfiguration.configurations.upsert({
            service: service
        }, {
            $set: doc
        });
    },
    codeforgotpassword:function(email,code){
        var oneuser=Meteor.users.findOne({"emails.0.address":email});
        if(oneuser){
            Meteor.users.update({"emails.0.address":email},{$set:{"profile.verifycode":code}});
            var content="Here is your code to verify"+code;
                Email.send({
                  to: email,
                  from: "contact@safirperfumery.com",
                  subject: "FORGOT PASSWORD",
                  text: content
                });
        }
    },
    confirmcode:function(email,code){
        var oneuser=Meteor.users.findOne({"emails.0.address":email});
        if(oneuser){
            var usercode=oneuser.profile.verifycode;
            if(usercode==code){
                return usercode;
            }else{
                throw new Meteor.Error('Please Enter Code to verify');
            }
        }
    },
    resetNewPwd: function(email){
        var result=Meteor.users.findOne({"emails.0.address":email});
        if( result ){
            var token=result.services.password.reset.token;
            if(token){
                return token;
            }else{
                return result.services.resume.loginTokens[Meteor.user().services.resume.loginTokens.length-1].hashedToken;
            }
            
        }else return null; 
      
    },
    loginwithPhone:function(email){
        var oneuser=Meteor.users.findOne({"profile.phone":email});
        if(oneuser){
            email=oneuser.emails[0].address;
            console.log("EAILSERVER"+email);
            return email;
        }else{
            throw new Meteor.Error('Phone Number not found ');
        }
    },
    sendTextMessage: function(phone,code){
        var findphone=Meteor.users.findOne({"profile.phone":phone});
        plivo = Plivo.RestAPI({
           authId: 'MANGIXNDBLYZQWMDLHZM',
           authToken: 'NDAyZjcxZDhmZTI4OTEyNzAxNGE2MjlmMmQ5MmIx',
        });
        var text='Your Code for verifing is '+code;
        var params = {
             'src': '+855974861527', // Caller Id
             'dst' : phone, // User Number to Call
             'text' : text,
             'type' : "sms",
         };
        if(findphone){
            var email=findphone.emails[0].address;
            plivo.send_message(params,Meteor.bindEnvironment(function (status, response) {
                console.log('Status: ', status);
                console.log('API Response:\n', response);
                Meteor.users.update({"emails.0.address":email},{$set:{"profile.verifycode":code}});
                
            }));
        }else{
            throw new Meteor.Error('we cannot find your phone number');
        }
        return email;
        
    }
});


function validateParams(params) {
    for (var key in params) {
        if (key == "profile") {
            for (var keyProfile in params[key]) {
                value = params[key][keyProfile];
//                console.log("UsersServer.js " + value);
                if (value == "") {
                    throw new Meteor.Error('Please enter your ' + keyProfile, keyProfile);
                }
            }
        } else if (key == "email") {
            value = params[key];
            if (!validateEmail(value))
                throw new Meteor.Error('Please format email ' + key, key);

        } else {
            value = params[key];
//            console.log("UsersServer.js " + value);
            if (value == "")
                throw new Meteor.Error('Please enter your ' + key, key);
        }
    }

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function get_visitor_ip(uid) {
    var k, ret, s, ss, _ref, _ref1, _ref2, _ref3;
    ret = {};
    if (uid != null) {
        _ref = Meteor.default_server.sessions;
        for (k in _ref) {
            ss = _ref[k];
            if (ss.userId === uid) {
                s = ss;
            }
        }
        if (s) {
            ret.forwardedFor = (_ref1 = s.socket) != null ? (_ref2 = _ref1.headers) != null ? _ref2['x-forwarded-for'] :
                    void 0 :
                    void 0;
            ret.remoteAddress = (_ref3 = s.socket) != null ? _ref3.remoteAddress :
                    void 0;
        }
    }
    return ret.forwardedFor ? ret.forwardedFor : ret.remoteAddress;
}