define(function (require, exports, module) {
    var frame = require('common/frame/frame.js'); // 页面骨架

    var activityModule = require('module/activity/activity.js'); // 活动
    var brandModule = require('module/brand/brand.js'); // 品牌管理
    var lotteryModule = require('module/lottery/lottery.js'); // 抽奖
    var exportExcelModule = require('module/exportExcel/exportExcel.js'); // 导出Excel
    var moduleManagerModule = require('module/manager/moduleManager/moduleManager.js'); // 设置模块管理员
    var brandManagerModule = require('module/manager/brandManager/brandManager.js'); // 设置品牌管理员

    function runModule (moduleId) {
        moduleId = Number(moduleId);
        switch (moduleId) {
            case 11: // 活动管理
                activityModule();
                break;
            case 21: // 品牌管理
                brandModule();
                break;
            case 31: // 品牌管理
                lotteryModule();
                break;
            case 32: // 品牌管理
                exportExcelModule();
                break;
            case 51: // 模块管理员
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
