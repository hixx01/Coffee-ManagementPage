<div class="brand-detail">
    <div class="error"></div>
    <div class="title">全平台管理</div>
    <div class="titletwo">
        <button class="return">返回</button>
    </div>
    <div class="brand-detail-input">
        <div class="input-left">
            <div class="brand-Name-div">
                <span class="brand-Name-span">品牌名称:</span>
                <input type="text" class="brand-Name"/>
            </div>
            <div class="brand-logo-div">
                <span class="brand-logo-text">品牌logo:</span>  
                <img class="brand-logo" alt="未加载">
                <form id="brand-form"  enctype="multipart/form-data">                   
                    <input name="uploadImgs" type="file" class="modifity" multiple />
                </form>      
                <span class="modifitytwo">修改</span>              
            </div>
            <div class="brand-classify-div">
                <span class="brand-classify-text">所属分类:</span>   
                <select class="brand-classify-select"></select>
            </div>
            <div class="brand-weight-div">
                <span class="brand-weight-text">品牌权值:</span>
                <input type="text" class="brand-weight" value="" />
            </div>
        </div>
        <div class="input-right">
            <div class="brand-sumarize">
                <span class="brand-sumarize-span">品牌概述:</span>
                <textarea class="brand-sumarize-textarea"></textarea>
                
                <span class="word">1/50</span>
            </div>
            <div class="brand-details">
                <span class="brand-details-span">品牌详情:</span>
                <textarea class="brand-details-textarea"></textarea>
                <span class="word2">1/150</span>
            </div>
        </div>
    </div>    
    <div class="submit">
        <input type="button" value="确认修改" class="modification"/>
    </div>
    <div class="vote">
        <p class="vote-num-title">投票量统计</p>
        <ul>
            <li>
                <span class="vote-name">日投票:</span>
                <span class="vote-num-day"></span>
            </li>
            <li>
                <span class="vote-name">周投票:</span>
                <span class="vote-num-week"></span>
            </li>
            <li>
                <span class="vote-name">月投票:</span>
                <span class="vote-num-mouth"></span>
            </li>
        </ul>
    </div>
</div>
