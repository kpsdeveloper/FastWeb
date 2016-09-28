Package.describe({
    name: 'meteoris:app',
    version: '0.0.5',
    summary: 'Admin Theme for any meteoris apps.',
    git: 'https://github.com/meteoris/meteoris/tree/master/packages/meteoris:app',
    documentation: 'README.md'
});

Package.onUse(function(api) {

    api.versionsFrom('1.2.0.2');

    api.use([
        'templating',
        'meteoris:flash@0.0.0',
        'mfactory:admin-lte@0.0.0',
        //'fortawesome:fontawesome@4.0.0',
    ], 'client');

    api.use([
        'meteoris:core@0.0.0',
        'meteoris:role@0.0.0',
//        'deps',
//        'session',
        'mongo',
        'kadira:flow-router@2.0.0',
        'kadira:blaze-layout@2.0.0',
        'zephraph:namespace@1.0.0',
        'aldeed:collection2@2.0.0',
        'aldeed:simple-schema@1.0.0',
        'rochal:slimscroll@1.0.0',
        'cfs:standard-packages@0.0.0',
        'tap:i18n@1.2.1'
    ], ['client', 'server']);

    api.addFiles([
        'lib/controllers/AppController.js',
        'lib/controllers/ProductsController.js',
        'lib/collections/ThemeAdmin.js',
        'lib/collections/Products.js',
        'lib/router.js',
    ], ['client', 'server']);

    api.addFiles([
        'server/ThemeAdminServer.js',
        'server/Products.js',
        'server/Publish.js'
    ], 'server');

    api.addFiles([
        /* assets */
        //'client/assets/adminlte-app.js',
        /* views */
        'client/views/main.html',
        'client/views/main.js',
        'client/views/index.html',
        'client/views/index.js',
        'client/views/header.html',
        'client/views/footer.html',
        'client/views/sidebar.html',
        'client/views/admin/products/index.html',
        'client/views/admin/products/insert.html',
        'client/views/detail.html',
        'client/views/category.html',
        'client/apps/Products.js',
        'client/assets/main.css',
        /*'client/views/login.html',
        'client/views/login.js',
        'client/views/register.html',
        'client/views/register.js',
        'client/views/header.html',
        'client/views/header.js',
        'client/views/sidebar.html',
        'client/views/control-sidebar.html',
        'client/views/footer.html',
        'client/views/footer.js',
        'client/views/setting.html',
        'client/views/setting.js',
        'client/views/setting-menu.html',
        'client/views/setting-menu.js',*/
    ], 'client');
    api.export([
        'UserController',
    ], 'client');

    api.export([
        'Role',
        'RoleGroup',
        'RoleCollection',
        'AppController',
        'ProductsController'
    ], ['client', 'server']);
});