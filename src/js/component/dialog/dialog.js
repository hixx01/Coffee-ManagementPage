define(function (require, exports, module) {
    var $dialog = null;
    var noop = function () {};

    function show (configObj) {
        configObj || (configObj = {});
        var dialogConfig = {};
        dialogConfig.title = configObj.title || '请设置标题'; // 设置标题
        dialogConfig.wrapCls = configObj.wrapCls || ''; // 设置文档包裹的类名
        dialogConfig.content = configObj.content || ''; // 弹窗内容
        dialogConfig.close = configObj.close || noop; // 关闭弹窗的回调
        dialogConfig.confirm = configObj.confirm || noop; // 确定的弹窗回调

        var tplStr = require('./dialog.tpl');
        var tpl = Handlebars.compile(tplStr);
        var htmlStr = tpl(dialogConfig);
        $dialog = $(htmlStr);
        $(document.body).append($dialog);

        $dialog.find('.dialog-confirm').on('click', function (e) {
            dialogConfig.confirm();
        });

        $dialog.find('.dialog-close').on('click', function (e) {
            dialogConfig.close();
        });
        $dialog.find('.dialog-cancel').on('click', function (e) {
            dialogConfig.close();
        })
    }

    function hide () {
        $dialog.remove();
    }

    exports.show = show;
    exports.hide = hide;
});
