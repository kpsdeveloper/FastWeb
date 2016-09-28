
Meteor.methods({
   baseUrl: function(){
    basePath = Meteor.absoluteUrl.defaultOptions.rootUrl;
    return basePath;
   },
   basePath: function(){
    var base_path = Meteor.npmRequire('fs').realpathSync( process.cwd() + '../../' );
    base_path = base_path.split('\\').join('/');
    baseDir = base_path.replace(/\/\.meteor.*$/, '');
    return baseDir;
   },
});

