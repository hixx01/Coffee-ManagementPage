define(function (require, exports, module) {
    var tplStr = require('./toast.tpl');
    var tpl = Handlebars.compile(tplStr);

    var $toast = null;
    var toastTimer = null;

    function show (text) {
        clearTimeout(toastTimer);

        $toast = $(tpl());
        $(document.body).append($toast);

        $toast.show();
        $toastText = $toast.find('.toast-text');
        $toastText.html(text);

        setTimeout(function () {
            // debugger
            hide()
        }, 3000);
    }

    function hide () {
        $toast.remove();
    }

    exports.show = show;
    exports.hide = hide;
});
