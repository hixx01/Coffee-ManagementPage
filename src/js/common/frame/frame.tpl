<div class="doc">
    <header class="header">
        <span class="user-name">{{name}}</span>
    </header>
    <div class="content-wrap">
        <div class="vote-shadow hide">
            <div class="vote-dialog">
                <div class="vote-dialog-top">
                    <div class="prompt-message">提示信息</div>
                    <div class="top-close">
                        <input type="button" value="X" class="vote-dialog-close">
                    </div>
                </div>
                <div class="vote-dialog-center">确定要删除吗？</div>
                <div class="vote-dialog-footer">
                    <input type="button" value="确定" class="vote-confirm" />
                    <input type="button" value="取消" class="vote-cancel" />
                </div>
            </div>
        </div>
        <nav class="navigation">
            {{#each menuInfo}}
                <div class="nav-item" data-id="{{id}}">
                    <div class="nav-item-content">
                        <div class="nav-item-title">
                            <div class="icon-wrap">
                                <i class="iconfont {{className}}"></i>
                            </div>
                            <span>{{name}}</span>
                        </div>
                        <ul class="nav-item-sub-list">
                            {{#each subMenu}}
                                <li class="nav-item-sub-item" data-id="{{id}}">{{name}}</li>
                            {{/each}}
                        </ul>
                    </div>
                </div>
            {{/each}}
        </nav>
        <div class="content"></div>
    </div>
</div>
