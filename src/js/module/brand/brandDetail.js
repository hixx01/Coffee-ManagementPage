define(function(require, exports, module) {
    module.exports = function(activityId,brandId, detailSave) {
        var tplStr = require('./brandDetail.tpl');
        var tpl = Handlebars.compile(tplStr);
        var util = require('../../util.js');//引进封装的ajax

        var htmlStr = tpl();
        var $content = $('.content');
        $content.append(htmlStr);
        
        //返回键
        $('.brand-detail .return').on('click', function() {
            $('.brand-detail').remove();
        });
        
        //获取表单内容url
        var getFormUrl = 'http://192.168.1.114:8080/platform/brandManage/brandInfo';
        //投票量统计url
        var getVoteNumUrl = 'http://192.168.1.114:8080/platform/brandManage/ticketsInfo';
        //图片修改url
        var changeImgUrl = 'http://192.168.1.114:8080//platform/brandManage/imgServer';
        //更新表单url
        var updateFormUrl = 'http://192.168.1.114:8080/platform/brandManage/updateBrandInfo';
                
        //获取表单内容
        util.ajax({
            type: 'get',
            url: getFormUrl+'?brandId='+ brandId +'&activityId='+activityId,
            success: function(formmessage) {
                console.log(formmessage);
                if(formmessage.success) {
                    var formmsg = formmessage.data;
                    //商品名
                    $('.brand-Name').val(formmsg.brandName);
                    //logo获取
                    $('.brand-logo').attr('src', formmsg.brandLogo);

                    $('.brand-classify-select').val(formmsg.brandClassify);
                    //获取下拉框下拉的值
                    formmsg.classificationAll.forEach(function(item, index, array) {
                        $classifyOption = $('<option></option>');
                        $('.brand-classify-select').append($classifyOption);
                        $classifyOption.html(array[index].classifyName);
                        $classifyOption.attr('value', array[index].classificationId);
                    })
                    //获取下拉框选中的值
                    var classificationId = formmsg.classificationId;
                    $('.brand-classify-select').children().each(function(i, n) {
                        var obj = $(n);
                        if(obj.val() == classificationId) {
                            obj.attr('selected', 'selected');
                        }
                    });
                    //权值        	                	        
                    $('.brand-weight').val(formmsg.brandWeight);
                    //品牌概述
                    $('.brand-sumarize-textarea').html(formmsg.brandSummarize);
                    //品牌详情
                    $('.brand-details-textarea').html(formmsg.brandDetails);
                    //判断是否可修改
                    if (!formmsg.updateFlag) {
                        updata();
                    }
                }
            }
        });
                
        //投票量统计
        util.ajax({
            type: 'get',
            url: getVoteNumUrl + '?brandId=' + brandId +'&activityId='+ activityId,
            success: function(message) {
                if(message.success) {
                    var msg = message.data;
                    $('.vote-num-day').html(msg.dayVote);
                    $('.vote-num-week').html(msg.weekVote);
                    $('.vote-num-mouth').html(msg.monthVote);
                }
            }
        });
                              
        //图片修改
        $('.modifity').on('change', function() {
            var fileUp = document.getElementById('brand-form');
            console.log(fileUp);
            var sendForm = new FormData(fileUp);
            var xhr = new XMLHttpRequest();
            xhr.open("POST",changeImgUrl, true);
            xhr.send(sendForm);
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.success) {
                        $('.brand-logo').attr('src', obj.data[0]);
                    }
                }
            }
        })
        
        //更新表单
        $('.modification').on('click', function() {
            var obj = {
                brandId: 1,
                brandName: $('.brand-Name').val(),
                brandLogo: $('.brand-logo').attr('src'),
                brandClassify: $('.brand-classify-select option:checked').html(),
                classificationId: $('.brand-classify-select option:checked').val(),
                brandWeight: $('.brand-weight').val(),
                brandSummarize: $('.brand-sumarize-textarea').val(),
                brandDetails: $('.brand-details-textarea').val()
            };
            $.ajax({
                type:'POST',
                url: updateFormUrl,
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success:function(){
                    alert('添加成功');
                    $('.brand-detail').remove();
                }
            });
        })
        
        //品牌名称字数限制              
        $('.brand-Name').bind('input',function(){
            brandNameNum();
        })
        //品牌概述字数限制
        $('.brand-sumarize-textarea').bind('input',function(){            
           brandsumarizeNum();
        })
        //品牌详情字数限制
        $('.brand-details-textarea').bind('input',function(){            
           branddetailsNum();
        })
        
        //品牌名称字数限制      
        function brandNameNum () {
            if ($('.brand-Name').val().length > 5 ) {
                $('.error').css('display','block');
                $('.error').html('品牌名称不能超过五个字');
                $('.modification').css('background-color','lightgray');
            } else {
                $('.error').css('display','none');
                $('.modification').css('background-color','#44b549');
            }
        }
        
        //品牌概述字数限制
        function brandsumarizeNum () {
            //$('.word').html(($('.brand-sumarize-textarea').val().length) + '/50');
            if ($('.brand-sumarize-textarea').val().length > 50 ) {
                $('.error').css('display','block');
                $('.error').html('品牌概述字数超出限制');
                $('.modification').css('disabled','disabled');
                $('.modification').css('background-color','lightgray');
            } else {
                $('.error').css('display','none');
                $('.modification').removeAttr('disabled');
                $('.modification').css('background-color','#44b549');
            }
        }
        
        //品牌详情字数限制
        function branddetailsNum () {
            //$('.word2').html(($('.brand-details-textarea').val().length) + '/150');
            if ($('.brand-details-textarea').val().length > 150 ) {
                $('.error').css('display','block');
                $('.error').html('品牌概述字数超出限制');
                $('.modification').css('disabled','disabled');
                $('.modification').css('background-color','lightgray');               
            } else {
                $('.error').css('display','none');     
                $('.modification').removeAttr('disabled');
                $('.modification').css('background-color','#44b549');                
            }
        }
        
        //禁止表单修改
        function updata (){
            //确认修改按钮制灰禁点
            var $modify = $('.modification');
            $modify.prop({'disabled': true});
            $modify.css('background-color','lightgray');
            //品牌名称输入框禁用
            $('.brand-Name').prop({'disabled': true});
            //上传图片禁点
            $('.modifity').prop({'disabled': true});
            //分类禁选
            $('.brand-classify-select').prop({'disabled': true});
            //权值禁点
            $('.brand-weight').prop({'disabled': true});
            //品牌概述
            $('.brand-sumarize-textarea').prop({'disabled': true});
            //品牌详情
            $('.brand-details-textarea').prop({'disabled': true});
        }
    };
});