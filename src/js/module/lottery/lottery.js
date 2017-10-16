define(function (require, exports, module) {
    module.exports = function () {
        var tplStr = require('./lottery.tpl');
        var tpl = Handlebars.compile(tplStr);

        var html = tpl();
        var $content = $('.content');
        $content.html(tpl());

        var obj = {
            activityId: 1
        };
        // 页面加载时自动渲染表格数据
        $.ajax({
            type: 'POST',
            url: 'http://mattchenvip.viphk.ngrok.org/voteManager/awardManager/getAwardList?activityId=' + obj.activityId,
            dataType: 'json',
            success: function(result){
                if(result.success){
                    var awarsList = result.data;
                    var oTr = '';
                    for(var attr in awarsList){
                        oTr += '<tr class="tr-list"><td class="order-num">'+ (parseInt(attr)+1) +'</td><td class="award-content" awardId='+ awarsList[attr].awardId +'>'+ awarsList[attr].awardContent +'</td><td><input type="input" value="'+ awarsList[attr].probability +'%" disabled="true" class="probability-list" /></td><td>'+ awarsList[attr].totalNumber +'</td><td>'+ awarsList[attr].currentNumber +'</td><td class="awards-supplier" supplyId=' + awarsList[attr].supplierId + '>'+ awarsList[attr].supplier +'</td><td class="vote-table-delete"><div class="inner"><input type="button" value="删除" class="bg hide" /></div></td></tr>';
                    }
                    $('.tbody').append(oTr);
                }else{
                    showToast(result.error);
                }
            },
            error: function(){
                console.log('数据异常，请重新操作!');
            }
        });

        // 点击编辑模块
        $('.vote-table-editor').on('click',function(){

            for(var i = 0;i < $('.bg').length;i++){
                $('.bg').removeClass('hide');
                $('.probability-list').attr('disabled',false);
            }

            $(this).addClass('hide').siblings().removeClass('hide');

            // 点击删除模块
            $('.bg').on('click',function(){
                $(this).parent().parent().parent().attr('delete',true);
                // 跳出弹框
                $('.vote-shadow').removeClass('hide');

                // 点击 “确定” 按钮关闭弹窗
                $('.vote-confirm').on('click',function(){

                    $('.vote-shadow').addClass('hide');

                    for(var j = 0;j < $('.tr-list').length;j++){
                        if($('.tr-list').eq(j).attr('delete')){
                            $('.tr-list').eq(j).remove();
                        }
                    }
                    // 表格重新排序
                    for(var i = 0;i <= $('.order-num').length;i++){
                        $('.order-num').eq(i-1).html(i);
                    }

                });

                // 点击 “取消” 按钮关闭弹窗
                $('.vote-cancel').on('click',function(){
                    $('.vote-shadow').addClass('hide');
                });

                // 点击 “X” 按钮关闭弹窗
                $('.vote-dialog-close').on('click',function(){
                    $('.vote-shadow').addClass('hide');
                });
            });

        });

        // 点击保存模块
        $('.vote-table-save').on('click',function(){
            for(var i = 0;i < $('.bg').length;i++){
                var addTotalProbability = 0;
                addTotalProbability += parseInt($('.probability-list').eq(i).val());
                $('.bg').addClass('hide');
                $('.probability').attr('disabled',true);
            }
            if(addTotalProbability >= 100){
                showToast('占比总和不能大于100%!');
            }
            $(this).addClass('hide').siblings().removeClass('hide');
        });

        // 点击添加谢谢惠顾
        $('.add-think').on('click',function(){

            if($('.awards-cnt')[0].value){
                return false;
            }else{
                // 截取字符串，将‘添加谢谢惠顾’截取为‘谢谢惠顾’
                var cntValue = $(this)[0].value.substring(2,6);
            }
            $('.awards-cnt').attr('value',cntValue);
            $('.awards-cnt').attr('disabled',false);
            $('.total-num').attr('disabled',false);
            $('.total-num').attr('value','∞');
            $('.awards-provide').attr('value','系统');
            $('.awards-provide').attr('disabled',false);

        });
        // 持续3000ms的警示框
        var toastTimer = null;
        function showToast (text) {
            clearTimeout(toastTimer);
            $('.toast-wrap').show();
            $('.toast-wrap .toast-text').html(text);
            toastTimer = setTimeout(function () {
                $('.toast-wrap .toast-text').html('');
                $('.toast-wrap').hide();
            }, 3000);
        }

        // 占比输入校验
        $('.proportion').on('input',function(){
            var totalProbability = 0;
            for(var i = 0;i < $('.probability-list').length;i++){
                totalProbability += parseInt($('.probability-list').eq(i).val());
            }
            if(totalProbability >= 100){
                showToast('占比总和不能大于100%!');
            }
        });

        // 获取奖品提供方的数据
        var data = {
            activityId: 1,
            brandName: $('.awards-provide').val()
        };

        // 点击“确认添加”按钮
        $('.confirm-add').on('click',function(){
            if($('.tr-list').length >= 10){

                showToast('奖品不能超过十项，请删除后再添加!');
                return false;

            }else if($('.awards-cnt').val() == '谢谢参与'){

                var trList = '';
                trList = '<tr class="tr-list"><td class="order-num">'+ ($('.order-num').length+1) +'</td><td class="award-content" awardId="11">'+ $('.awards-cnt').val() +'</td><td><input type="input" value="'+ $('.proportion').val() +'%" disabled="true" class="probability-list" /></td><td>'+ $('.total-num').val() +'</td><td>'+ $('.total-num').val() +'</td><td class="awards-supplier" supplyId="0">'+ $('.awards-provide').val() +'</td><td class="vote-table-delete"><div class="inner"><input type="button" value="删除" class="bg hide" /></div></td></tr>';
                $('.tbody').append(trList);
                $('.awards-cnt').attr('value','');
                $('.awards-cnt').attr('disableds',false);
                $('.total-num').attr('value','');
                $('.total-num').attr('disableds',false);
                $('.awards-provide').attr('value','');
                $('.awards-provide').attr('disableds',false);

            }else{

                var data = {
                    'activityId': 1,
                    'brandName': $('.awards-provide').val()
                };

                $.ajax({
                    type: 'POST',
                    url: 'http://mattchenvip.viphk.ngrok.org/voteManager/awardManager/findSupplier?activityId=' + data.activityId + '&brandName=' + data.brandName,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function(result){
                        if(result.success){
                            var oTr = '';
                            oTr = '<tr class="tr-list"><td class="order-num">'+ ($('.order-num').length+1) +'</td><td class="award-content" awardId="null">'+ $('.awards-cnt').val() +'</td><td><input type="input" value="'+ $('.proportion').val() +'%" disabled="true" class="probability-list" /></td><td>'+ $('.total-num').val() +'</td><td>'+ $('.total-num').val() +'</td><td class="awards-supplier" supplyId=' + result.data.brandId + '>'+ $('.awards-provide').val() +'</td><td class="vote-table-delete"><div class="inner"><input type="button" value="删除" class="bg hide" /></div></td></tr>';
                            $('.tbody').append(oTr);
                            $('.awards-cnt').attr('value','');
                            $('.awards-cnt').attr('disableds',false);
                            $('.proportion').attr('value','');
                            $('.total-num').attr('value','');
                            $('.total-num').attr('disableds',false);
                            $('.awards-provide').attr('value','');
                            $('.awards-provide').attr('disableds',false);
                        }else{
                            showToast(result.error);
                        }
                    },
                    error: function(){
                        console.log('数据异常，请重新操作!');
                    }
                });
            }
            showTotalProbability();
        });

        // 显示当前占比总和
        function showTotalProbability(){
            var totalProbability = 0;
            for(var i = 0;i < $('.probability-list').length;i++){
                totalProbability += parseInt($('.probability-list').eq(i).val());
            }
            showToast('当前占比总和:'+ totalProbability + '%');
        }

        // 点击“提交”按钮，提交整个表格数据到后台
        $('.last-btn').on('click',function(){
            // 存放各个属性数组的数组
            var arrays = new Array();

            // 存放奖品内容的数组
            var cntArray = new Array();

            // 存放奖品 ID 的数组
            var cntIdArray = new Array();

            // 存放占比的数组
            var proportionArray = new Array();

            // 存放数量的数组
            var totalNumArray = new Array();

            // 存放剩余量的数组
            var currentNumArray = new Array();

            // 存放提供方的数组
            var awardsProvideArray = new Array();

            // 存放提供方 ID 的数组
            var awardsProvideIdArray = new Array();

            //表格的列数
            var cellNums = $('#vote-table')[0].rows[0].cells.length-1;
            //表格的行数
            var rowNums = $('#vote-table')[0].rows.length;

            // 把所有的奖品内容添加到cntArray数组中
            for(var m = 1;m < rowNums;m++){
                cntArray[m-1] = $('#vote-table')[0].rows[m].cells[1].innerHTML;
            }

            // 把所有的奖品 ID 添加到cntIdArray数组中
            for(var i = 0;i < $('.award-content').length;i++){
                cntIdArray[i] = $('.award-content').eq(i).attr('awardId');
            }

            // 把所有的占比添加到proportionArray数组中
            for(var m = 1;m < rowNums;m++){
                proportionArray[m-1] = parseInt($('#vote-table')[0].rows[m].cells[2].getElementsByTagName('input')[0].value);
            }

            // 把所有的数量添加到totalNumArray数组中
            for(var m = 1;m < rowNums;m++){
                totalNumArray[m-1] = $('#vote-table')[0].rows[m].cells[3].innerHTML;
            }

            // 把所有的剩余量添加到currentNumArray数组中
            for(var m = 1;m < rowNums;m++){
                currentNumArray[m-1] = $('#vote-table')[0].rows[m].cells[4].innerHTML;
            }

            // 把所有的奖品提供方添加到awardsProvideArray数组中
            for(var m = 1;m < rowNums;m++){
                awardsProvideArray[m-1] = $('#vote-table')[0].rows[m].cells[5].innerHTML;
            }

            // 把所有的奖品提供方 ID 添加到awardsProvideIdArray数组中
            for(var i = 0;i < $('.awards-supplier').length;i++){
                awardsProvideIdArray[i] = $('.awards-supplier').eq(i).attr('supplyId');
            }

            // 将数组中的数据放到json对象中
            var jsonObj = {};
            jsonObj.activityId = 1;
            jsonObj.awardVOList = [];
            var tatalProbability = 0;
            for(var i = 0;i < cntArray.length;i++){

                jsonObj.awardVOList.push({'awardContent':cntArray[i],
                    'currentNumber':currentNumArray[i],
                    'probability':proportionArray[i],
                    'totalNumber':totalNumArray[i],
                    'supplier':awardsProvideArray[i],
                    'supplierId':awardsProvideIdArray[i],
                    'awardId':cntIdArray[i],
                });

                tatalProbability += proportionArray[i];
            }

            if(tatalProbability != 100){
                showToast('占比不等于100%，无法提交');
                return false;
            }
            $.ajax({
                type: 'POST',
                url: 'http://mattchenvip.viphk.ngrok.org/voteManager/awardManager/updateAwardMessage',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(jsonObj),
                dataType: 'json',
                success:function(result){
                    if(result.success){
                        showToast(result.data);
                    }else{
                        showToast(result.error);
                    }
                },
                error:function(){
                    console.log('数据异常，请重新操作!');
                }
            });
        });
    };
});
