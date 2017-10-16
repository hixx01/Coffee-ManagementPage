;(function () {
    var Model = {
        name: '', // 品牌名称
        companyFullName: '', // 公司全名
        companyShortName: '', // 公司简称
        companyCategory: '', // 公司类别
        establishYear: '', // 公司成立年份
        headquartersCity: '', // 公司城市
        headquartersAddress: '', // 公司地址
        companyPost: '', // 公司邮编
        companyTelephone: '', // 公司电话
        companyFax: '', // 公司传真
        logoImgUrl: '', // 公司logo
        introduction: '', // 公司简述
        detail: '', // 公司描述
        brandEmail: '' // 导出Excel邮箱
    };

    var urlRequestPrefix = 'http://elechen.viphk.ngrok.org/cnfia/voteManager/brand';
    // var urlRequestPrefix = 'http://115.28.156.235:9876/mng';
    var canEdit = true;

    // toast 方法
    var toastTimer = null;

    function showToast(text) {
        clearTimeout(toastTimer);
        $('.toast-wrap').show();
        $('.toast-wrap .toast-text').html(text);
        toastTimer = setTimeout(function () {
            $('.toast-wrap .toast-text').html('');
            $('.toast-wrap').hide();
        }, 3000);
    }

    function hideToash() {
        $('.toast-wrap .toast-text').html('');
        $('.toast-wrap').hide();
    }

    // 品牌名称
    var $brandName = $('.form-brand-name');
    var $brandNameInput = $brandName.find('.form-input');
    $brandNameInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.name = val;

        if (val.length > 20) {
            $(this).addClass('error');
            showToast('品牌名称不能超过20个字');
        } else {
            hideToash();
            $(this).removeClass('error');
        }
    });

    // 公司全称
    var $companyName = $('.form-company-name');
    var $companyNameInput = $companyName.find('.form-input');
    $companyNameInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.companyFullName = val;
        //debugger
        if (val.length > 20) {
            $(this).addClass('error');
            showToast('公司全称不能超过20个字');
        } else {
            hideToash();
            $(this).removeClass('error');
        }
    });

    // 公司简称
    var $companyShortName = $('.form-company-short-name');
    var $companyShortNameInput = $companyShortName.find('.form-input');
    $companyShortNameInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.companyShortName = val;

        if (val.length > 20) {
            $(this).addClass('error');
            showToast('公司全称不能超过20个字');
        } else {
            hideToash();
            $(this).removeClass('error');
        }
    });

     // 公司类别
    var $companyCategory = $('.form-company-category');
    var $companyCategorySel = $companyCategory.find('.sel');
    var $companyCategoryInput = $companyCategory.find('.form-input');
    var selMap = {
        0: '请选择',
        1: '互联网',
        2: '其他'
    };
    $companyCategorySel.on('change', function (e) {
        var selVal = e.target.value;
        $companyCategoryInput.val(selMap[selVal]);
        Model.companyCategory = selVal;
        if ( selVal == '2' ) {
            $companyCategoryInput.removeClass('disabled').prop({'disabled': false}).val('');
        } else {
            $companyCategoryInput.addClass('disabled').prop({'disabled': true});
        }
    });
    $companyCategoryInput.on('change', function (e) {
        Model.companyCategory = $(e.target).val();
    });

    // 成立年份
    var $companyYear = $('.form-company-year');
    var $companyYearInput = $companyYear.find('.form-input');
    $companyYearInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val().trim();
        Model.establishYear = val;
        var yearReg = /^\d{4}$/ig;

        if (val.length >= 4) {
            if (yearReg.test(val)) {
                hideToash();
                $(this).removeClass('error');
            } else {
                $(this).addClass('error');
                showToast('年份只能输入4位数字');
            }
        } else {
            hideToash();
            $(this).removeClass('error');
        }
    });

    // 总部所在城市
    var $companyCity = $('.form-company-city');
    var $companyCityInput = $companyCity.find('.form-input');
    $companyCityInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.headquartersCity = val;
        if (val.length > 10) {
            $(this).addClass('error');
            showToast('总部所在城市不能超过10个字');
        } else {
            hideToash();
            $(this).removeClass('error');
        }
    });

    // 总部地址
    var $companyAddress = $('.form-company-address');
    var $companyAddressInput = $companyAddress.find('.form-input');
    $companyAddressInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.headquartersAddress = val;
        if (val.length > 50) {
            $(this).addClass('error');
            showToast('总部地址不能超过50个字');
        } else {
            hideToash();
            $(this).removeClass('error');
        }
    });

    // 邮编
    var $companyPost = $('.form-company-post');
    var $companyPostInput = $companyPost.find('.form-input');
   /* $companyPostInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val().trim();
        Model.companyPost = val;
        var yearReg = /^[1-9]\d{5}$/ig;

        if (val.length >= 6) {
            if (yearReg.test(val)) {
                hideToash();
                $(this).removeClass('error');
            } else {
                $(this).addClass('error');
                showToast('邮编只能输入6位数字');
            }
        } else {
            hideToash();
            $(this).removeClass('error');
        }
    });*/
   //邮编验证(我新加的)
    $companyPostInput.on('blur', function (e) {
        var $tar = $(e.target);
        var val = $tar.val().trim();
        Model.companyPost = val;
        var yearReg =  /^[1-9][0-9]{5}$/;
        if( yearReg.test(val) ) {
            hideToash();
            $(this).removeClass('error');
            Model.companyPost = val;
        } else {
            $(this).addClass('error');
            showToast('请输入正确的邮编');
        }
    });

    // 公司电话
    var $companyPhone = $('.form-company-phone');
    var $companyPhoneInput = $companyPhone.find('.form-input');
    /*$companyPhoneInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.companyTelephone = val;

        if (val.length > 15) {
            $(this).addClass('error');
            showToast('请输入正确的电话');
        } else {
            hideToash();
            $(this).removeClass('error');
        }
    });*/

    // 公司传真
    var $companyFax = $('.form-company-fax');
    var $companyFaxInput = $companyFax.find('.form-input');
    $companyFaxInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.companyFax = val;

        if (val.length > 15) {
            $(this).addClass('error');
            showToast('请输入正确的传真');
        } else {
            hideToash();
            $(this).removeClass('error');
        }
    });

    // 接受中奖数据邮箱
    var $companyEmail = $('.form-export-email');
    var $companyEmailInput = $companyEmail.find('.form-input');
    $companyEmailInput.on('blur', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.brandEmail = val;

        var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (emailReg.test(val)) {
            hideToash();
            $(this).removeClass('error');
        } else {
            $(this).addClass('error');
            showToast('请输入正确的邮箱');
        }
    });

    function sendFile(file, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', urlRequestPrefix + '/upload', true);
        var fd = new FormData();
        fd.append('file', file, file.name);
        xhr.send(fd);
        xhr.onload = function (e) {
            success && success(e.target.response);
        };

        xhr.onerror = error || function () {
            };
    }

    // logo上传
    var $logoWrap = $('.logo-upload-wrap');
    var $logoInput = $logoWrap.find('.update-input');
    var $noUpdate = $logoWrap.find('.no-update');
    var $imgShow = $logoWrap.find('.img-show');
    var $logoImg = $logoWrap.find('.img-show img');
    $logoInput.on('change', function (e) {
        var file = this.files[0];
        sendFile(file, function (res) {
            // debugger
            var resObj = JSON.parse(res);
            if (!resObj.error) {
                $noUpdate.hide();
                $imgShow.show();
                $logoImg.attr('src', resObj.data);
                Model.logoImgUrl = resObj.data;
            } else {
                alert(resObj.error)
            }
        }, function (err) {

        })
    });

    // 产品摘要
    var $summary = $('.form-company-summary');
    var $summaryText = $summary.find('.cur-text');
    var $summaryInput = $summary.find('.form-textarea');
    $summaryInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.introduction = val;

        var $wordBlock = $summary.find('.word-cnt-block');
        $summaryText.html(val.length);
        if (val.length > 50) {
            $wordBlock.addClass('error');
            $(this).addClass('error');
            showToast('产品摘要不能超过50个字符');
        } else {
            hideToash();
            $wordBlock.removeClass('error');
            $(this).removeClass('error');
        }
    });

    // 产品详情
    var $detail = $('.form-company-detail');
    var $detailText = $detail.find('.cur-text');
    var $detailInput = $detail.find('.form-textarea');
    $detailInput.on('input', function (e) {
        var $tar = $(e.target);
        var val = $tar.val();
        Model.detail = val;

        var $wordBlock = $detail.find('.word-cnt-block');
        $detailText.html(val.length);
        if (val.length > 500) {
            $wordBlock.addClass('error');
            $(this).addClass('error');
            showToast('产品详情不能超过500个字符');
        } else {
            hideToash();
            $wordBlock.removeClass('error');
            $(this).removeClass('error');
        }
    });

    // 提交检测
    function checkForm() {
        if (Model.name.length === 0 || Model.name.length > 20) {
            $brandNameInput.addClass('error');
            showToast('品牌名称需在0~20字');
            return false;
        }
        if (Model.companyFullName.length === 0 || Model.companyFullName.length > 20) {
            $companyNameInput.addClass('error');
            showToast('公司全称需在0~20字');
            return false;
        }
        if (Model.companyShortName.length === 0 || Model.companyShortName.length > 10) {
            $companyShortNameInput.addClass('error');
            showToast('公司简称需在0~10字');
            return false;
        }
        if (Model.companyCategory === '请选择') {
            $companyCategoryInput.addClass('error');
            showToast('请输入公司类别');
            return false;
        }
        if (Model.companyCategory.length === 0 || Model.companyCategory.length > 10) {
            $companyCategoryInput.addClass('error');
            showToast('公司类别需在0~10字');
            return false;
        }
        if (!/^\d{4}$/ig.exec(Model.establishYear)) {
            $companyYearInput.addClass('error');
            showToast('年份只能输入4位数字');
            return false;
        }
        if (Model.headquartersCity.length === 0 || Model.headquartersCity.length > 10) {
            $companyCityInput.addClass('error');
            showToast('总部所在城市需在0~10字');
            return false;
        }
        if (Model.headquartersAddress.length === 0 || Model.headquartersAddress.length > 50) {
            $companyAddressInput.addClass('error');
            showToast('总部地址需在0~50字');
            return false;
        }
        if(Model.companyPost.length === 0){
            $companyPostInput.addClass('error');
            showToast('请填入正确的邮编');
            return false;
        }
        if (/^[1-9][0-9]{5}$/.test(Model.companyPost)) {
            $companyPostInput.addClass('error');
            showToast('邮编只能输入6位数字');
            return false;
        }
        if (Model.companyTelephone.length === 0 || Model.companyTelephone.length > 15) {
            $companyPhoneInput.addClass('error');
            showToast('请输入正确的电话');
            return false;
        }
        if (Model.companyFax.length === 0 || Model.companyFax.length > 15) {
            $companyFaxInput.addClass('error');
            showToast('请输入正确的传真');
            return false;
        }
        if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.exec(Model.brandEmail)) {
            $companyEmailInput.addClass('error');
            showToast('请输入正确的邮箱');
            return false;
        }
        if (Model.logoImgUrl.length === 0) {
            showToast('请上传logo');
            return false;
        }
        if (Model.introduction.length === 0 || Model.introduction.length > 50) {
            $summaryInput.addClass('error');
            showToast('产品摘要需在0~50字');
            return false;
        }
        if (Model.detail.length === 0 || Model.detail.length > 500) {
            $detailInput.addClass('error');
            showToast('产品详情需在0~500字');
            return false;
        }

        return true;
    }

    // 提交按钮
    $('.submit-wrap .btn').on('click', function (e) {
        if (canEdit === false) {
            showToast('您已经提交过了，不能再次提交了。');
            return null;
        }
        if (checkForm() === false) {
            return null;
        }
        $.ajax({
            url: urlRequestPrefix + '/updateBrand',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(Model),
            success: function (res) {
                alert('提交成功')
            },
            error: function (err) {

            }
        })
    });


    // 页面初始化操作
    $mask = $('.mask');

    function init(userName, password) {
        $.ajax({
            url: urlRequestPrefix + '/brandLogin',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                user: userName,
                pass: password
            }),
            success: function (data) {
                if (data.success === true) {
                    var brandData = data.data.brand;
                    brandData && setFormData(brandData);

                    if (data.data.canEdit === false) {
                        canEdit = false;
                        setFormDisabled();
                    }
                    showToast('登陆成功');
                    $mask.hide();
                } else {
                    showToast(data.error);
                    $mask.show();
                }
            },
            error: function (err) {
                //debugger
            }
        })
    }

    // 禁止表单填写
    function setFormDisabled() {
        $brandNameInput.prop({'disabled': true});
        $companyNameInput.prop({'disabled': true});
        $companyShortNameInput.prop({'disabled': true});
        $companyCategorySel.prop({'disabled': true});
        $companyCategoryInput.prop({'disabled': true});
        $companyYearInput.prop({'disabled': true});
        $companyCityInput.prop({'disabled': true});
        $companyAddressInput.prop({'disabled': true});
        $companyPostInput.prop({'disabled': true});
        $companyPhoneInput.prop({'disabled': true});
        $companyFaxInput.prop({'disabled': true});
        $companyEmailInput.prop({'disabled': true});
        $logoInput.prop({'disabled': true});
        $summaryInput.prop({'disabled': true});
        $detailInput.prop({'disabled': true});
    }

    // 设置表单数据
    function setFormData(brandData) {
        $brandNameInput.val(brandData.name);
        $companyNameInput.val(brandData.companyFullName);
        $companyShortNameInput.val(brandData.companyShortName);
        $companyCategoryInput.val(brandData.companyCategory);
        $companyYearInput.val(brandData.establishYear);
        $companyCityInput.val(brandData.headquartersCity);
        $companyAddressInput.val(brandData.headquartersAddress);
        $companyPostInput.val(brandData.companyPost);
        $companyPhoneInput.val(brandData.companyTelephone);
        $companyFaxInput.val(brandData.companyFax);
        $companyEmailInput.val(brandData.brandEmail);
        $noUpdate.hide();
        $imgShow.show();
        $logoImg.attr('src', brandData.logoImgUrl);
        $summaryInput.val(brandData.introduction);
        $detailInput.val(brandData.detail);
    }

    $('.login-btn-wrap .btn').on('click', function () {
        var userName = $('.user-name-input').val();
        var password = $('.password-input').val();
        init(userName, password);
    });

})();
