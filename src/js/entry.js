define(function (require, exports, module) {
    var frame = require('common/frame/frame.js'); // 页面骨架

    var activityModule = require('module/activity/activity.js');
    var brandModule = require('module/brand/brand.js');
    var lotteryModule = require('module/lottery/lottery.js');
    var exportExcelModule = require('module/exportExcel/exportExcel.js');
    var moduleManagerModule = require('module/manager/moduleManager/moduleManager.js');
    var brandManagerModule = require('module/manager/brandManager/brandManager.js');

    function runModule (moduleId) {
        moduleId = Number(moduleId);
        switch (moduleId) {
            case 11:
                activityModule();
                break;
            case 21:
                brandModule();
                break;
            case 31:
                lotteryModule();
                break;
            case 32:
                exportExcelModule();
                break;
            case 51:
                moduleManagerModule();
                break;
            case 52:
                brandManagerModule();
                break;
            default:
                alert('该模块正在开发中');
                break;
        }
    }

    // 回调函数配置
    frame.changeCb(function (id) {
        runModule(id);
    });
    frame.init();
});
