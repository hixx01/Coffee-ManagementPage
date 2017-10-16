define(function (require, exports, module) {
    module.exports = function () {
        var urlRequestPrefix = 'http://115.28.156.235:9876/mng/exportExcel';
        // var urlRequestPrefix = 'http://localhost:9876/mng/exportExcel';
        // var urlRequestPrefix = 'http://lalala0.ngrok.cc';

        var util = require('util.js');
        var Toast = require('component/toast/toast.js');
        var Dialog = require('component/dialog/dialog.js');

        // 渲染内容到页面中的 content
        var tplStr = require('./exportExcel.tpl');
        var tpl = Handlebars.compile(tplStr);
        var $htmlStr = $(tpl());
        $('.content').html($htmlStr);

        // 数据模型
        var Model = {
            canGet: false,
            startTime: null,
            endTime: null,
            email: null,
            selectedTime: null
        };

        // 显示弹窗和弹窗初始化工作
        function showDialog(defaultEmail) {
            var dialogInnerTplStr = require('./dialogInner.tpl');
            var dialogInnerTpl = Handlebars.compile(dialogInnerTplStr);
            var dialogHtmlStr = dialogInnerTpl({defaultEmail: defaultEmail} || {});

            Dialog.show({
                title: '导出Excel',
                close: function () {
                    Dialog.hide();
                },
                confirm: function () {
                    var $dialogInput = $('.export-excel-dialog .send-email-input');
                    var val = $dialogInput.val(); // 暂时不同步数据到Model
                    // 记得表单检查
                    util.ajax({
                        url: urlRequestPrefix + '/findExcelByDate',
                        method: 'post',
                        data: {
                            email: val,
                            time: Model.selectedTime
                        },
                        success: function (res) {
                            if ( res.success === false ) {
                                Toast.show(res.error);
                            } else {
                                Toast.show('邮件导出成功，稍后会发送给您。');
                            }
                        },
                        error: function (err) {
                            Toast.show(err);
                        }
                    });
                    Dialog.hide();
                    var $btn = $htmlStr.find('.export-excel-btn');
                    Model.canGet = false;
                    $btn.addClass('disabled');
                },
                content: dialogHtmlStr
            });
        }

        //
        util.ajax({
            url: urlRequestPrefix + '/showExcelByDate',
            method: 'get',
            data: '',
            success: function (res) {
                var resData = res.data;

                if ( res.success === true ) {
                    Model.canGet = resData.canGet;
                    Model.startTime = resData.startTime;

                    // 结束时间计算
                    var endTime = null;
                    var nowTime = new Date().getTime();
                    var netEndTime = new Date(resData.endTime).getTime();
                    if ( netEndTime - 24*60*60*1000*2 <= nowTime ) {
                        endTime = netEndTime;
                    } else {
                        endTime = nowTime - 24*60*60*1000;
                    }
                    Model.endTime = moment(new Date(endTime)).format('YYYY-MM-DD');
                    Model.selectedTime = moment(new Date(endTime)).format('YYYY-MM-DD');

                    Model.email = resData.email;
                    initDatePicker(); // 初始化日历
                    bindBtnClick(); // 初始化确定按钮绑定的事件
                } else {
                    Toast.show(res.error);
                }
            },
            error: function (err) {
                Toast.show(err);
            }
        });

        // 初始化确定按钮绑定的事件
        function bindBtnClick () {
            var $btn = $htmlStr.find('.export-excel-btn');
            $btn.on('click', function (e) {
                if ( Model.canGet ) {
                    showDialog(Model.email);
                } else {
                    $btn.addClass('disabled');
                    Toast.show('后台正在生成Excel，暂时不能再次生成，请稍等五分钟再试');
                }
            });
        }

        // 初始化日历
        function initDatePicker () {
            var $dateInput = $('.export-excel .form-date .form-input');
            $dateInput.daterangepicker({
                "singleDatePicker": true,
                "locale": {
                    "format": "YYYY-MM-DD",
                    "separator": " - ",
                    "applyLabel": "确定",
                    "cancelLabel": "取消",
                    "fromLabel": "From",
                    "toLabel": "To",
                    "customRangeLabel": "Custom",
                    "weekLabel": "W",
                    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六" ],
                    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    "firstDay": 1
                },
                startDate: moment().subtract(1, 'days'),
                minDate: moment(new Date(Model.startTime)), //最小时间
                maxDate : moment(new Date(Model.endTime)) //最大时间
            }, function(start, end, label) {
                console.log(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
                Model.selectedTime = start.format('YYYY-MM-DD');
                // console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
            });
        }
    };
});
