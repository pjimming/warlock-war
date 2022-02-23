class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-helper" title="相关操作说明">
            游戏说明
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-choose-mode" title="准备好了吗，来选择模式吧！">
            进入游戏
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-changelog">
            更新日志
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings" title="修改头像">
            设置
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-logout" title="退出当前账号">
            退出
        </div>
    </div>
</div>
`);

        //this.$menu.hide();
        this.root.$ac_game.append(this.$menu);

        // 按钮相关
        this.$helper = this.$menu.find('.ac-game-menu-field-item-helper');              // 游戏说明
        this.$choose_mode = this.$menu.find('.ac-game-menu-field-item-choose-mode');    // 选择模式
        this.$changelog = this.$menu.find('.ac-game-menu-field-item-changelog');        // 更新日志
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');          // 设置
        this.$logout = this.$menu.find('.ac-game-menu-field-item-logout');              // 退出

        this.onlinedays = new OnlineDays(this);     // 创建上线天数相关
        this.game_helper = new GameHelper(this);    // 创建游戏说明相关
        this.changelog = new Changelog(this);       // 创建更新日志相关
        this.user_info = new UserInfo(this);        // 创建用户信息相关
        this.settings = new ReplacePhoto(this);     // 创建设置相关
        this.warlock_chat = new WarlockChat(this);  // 创建Warlock Chat
        this.wcs = new WarlockChatSocket(this);     // 创建Warlock Chat Socket

        let outer = this;
        this.wcs.ws.onopen = function() {   // 发送初始化Warlock Chat的请求
            outer.wcs.send_init(outer.root.settings.username);
        }

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        /*
         * 在function中调用this会直接使用function的this
         * 因此用outer保存外部的this，方便在function中调用
         */
        this.$helper.click(function() {         // 游戏说明
            outer.hide();
            outer.changelog.hide();
            outer.game_helper.show();
        });
        this.$choose_mode.click(function() {    // 选择模式
            outer.hide();
            outer.changelog.hide();
            outer.root.choose_mode.show();
        });
        this.$changelog.click(function() {      // 更新日志
            outer.settings.hide();
            outer.changelog.show();
        });
        this.$settings.click(function() {       // 设置
            outer.changelog.hide();
            outer.settings.show();
        });
        this.$logout.click(function() {         // 退出
            outer.changelog.hide();
            outer.root.settings.logout_on_remote();
        });
    }

    show() {    //显示menu界面
        //this.onlinedays.show();
        this.$menu.show();
    }

    hide() {    //关闭menu界面
        //this.onlinedays.hide();
        this.$menu.hide();
        this.settings.hide();
    }
}
