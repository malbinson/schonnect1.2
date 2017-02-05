cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-datepicker.DatePicker",
        "file": "plugins/cordova-plugin-datepicker/www/ios/DatePicker.js",
        "pluginId": "cordova-plugin-datepicker",
        "clobbers": [
            "datePicker"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Core",
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-core.js",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "clobbers": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Util",
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-util.js",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "merges": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "id": "org.apache.cordova.console.console",
        "file": "plugins/org.apache.cordova.console/www/console-via-logger.js",
        "pluginId": "org.apache.cordova.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "id": "org.apache.cordova.console.logger",
        "file": "plugins/org.apache.cordova.console/www/logger.js",
        "pluginId": "org.apache.cordova.console",
        "clobbers": [
            "cordova.logger"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-app-event": "1.2.0",
    "cordova-plugin-datepicker": "0.8.6",
    "cordova-plugin-device": "1.0.2-dev",
    "cordova-plugin-network-information": "1.3.0",
    "cordova-plugin-splashscreen": "3.2.2",
    "cordova-plugin-whitelist": "1.2.2",
    "de.appplant.cordova.plugin.local-notification": "0.8.4",
    "org.apache.cordova.console": "0.2.13"
};
// BOTTOM OF METADATA
});