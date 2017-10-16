define(function (require, exports, module) {
    var noop = function () {};

    exports.ajax = function (params) {
        $.ajax({
            url: params.url,
            method: params.method,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(params.data || null),
            dataType: 'JSON',
            async: params.async,
            // type: params.type,
            success: params.success || noop,
            error: params.error || noop
        });
    };
});
