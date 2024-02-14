const Encore = require('@symfony/webpack-encore');
const path = require("path");

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or subdirectory deploy
    //.setManifestKeyPrefix('build/')

    .addAliases({
        '@publicFolder': path.resolve(__dirname, './public'),
        '@commonFolder': path.resolve(__dirname, './assets/common/js'),
        '@commonComponents': path.resolve(__dirname, './assets/common/js/components'),
        '@commonFunctions': path.resolve(__dirname, './assets/common/js/functions'),
        '@commonHooks': path.resolve(__dirname, './assets/common/js/hooks'),
        '@appFolder': path.resolve(__dirname, './assets/app/js'),
        '@adminPages': path.resolve(__dirname, './assets/admin/js/pages/components'),
        '@nodeModulesFolder': path.resolve(__dirname, './node_modules'),
    })

    .copyFiles({
        from: './assets/app/images',
        to: 'app/images/[path][name].[ext]',
    })
    .copyFiles({
        from: './assets/app/fonts',
        to: 'app/fonts/[path][name].[ext]',
    })
    .copyFiles({
        from: './assets/admin/fonts',
        to: 'admin/fonts/[path][name].[ext]',
    })
    .copyFiles({
        from: './assets/admin/images',
        to: 'admin/images/[path][name].[ext]',
    })
    .copyFiles({
        from: './assets/user/fonts',
        to: 'user/fonts/[path][name].[ext]',
    })
    .copyFiles({
        from: './assets/user/images',
        to: 'user/images/[path][name].[ext]',
    })

    .configureFilenames({
        css: !Encore.isProduction() ? 'css/[name].css' : 'css/[name].[fullhash:8].css',
        js: !Encore.isProduction() ? 'js/[name].js' : 'js/[name].[fullhash:8].js'
    })

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('common_app', './assets/common/js/app.js')

    .addEntry('app_app', './assets/app/js/app.js')
    .addEntry('app_homepage', './assets/app/js/pages/homepage.js')
    .addEntry('app_security', './assets/app/js/pages/security.js')
    .addEntry('app_legales', './assets/app/js/pages/legales.js')
    .addEntry('app_website', './assets/app/js/pages/website.js')
    .addEntry('app_application', './assets/app/js/pages/application.js')
    .addEntry('app_society', './assets/app/js/pages/society.js')
    .addEntry('app_software', './assets/app/js/pages/software.js')
    .addEntry('app_prestation', './assets/app/js/pages/prestation.js')
    .addEntry('app_webservice', './assets/app/js/pages/webservice.js')
    .addEntry('app_support', './assets/app/js/pages/support.js')

    .addEntry('admin_app', './assets/admin/js/app.js')
    .addEntry('admin_homepage', './assets/admin/js/pages/homepage.js')
    .addEntry('admin_settings', './assets/admin/js/pages/settings.js')
    .addEntry('admin_users', './assets/admin/js/pages/users.js')
    .addEntry('admin_societies', './assets/admin/js/pages/societies.js')
    .addEntry('admin_changelogs', './assets/admin/js/pages/changelogs.js')
    .addEntry('admin_contacts', './assets/admin/js/pages/contacts.js')
    .addEntry('admin_agenda', './assets/admin/js/pages/agenda.js')
    .addEntry('admin_help', './assets/admin/js/pages/help.js')
    .addEntry('admin_storage', './assets/admin/js/pages/storage.js')
    .addEntry('admin_styleguide', './assets/admin/js/pages/styleguide.js')
    .addEntry('admin_mails', './assets/admin/js/pages/mails.js')

    .addEntry('user_app', './assets/user/js/app.js')
    .addEntry('user_homepage', './assets/user/js/pages/homepage.js')

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    // enables Sass/SCSS support
    .enableSassLoader()
    .enablePostCssLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    .enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
