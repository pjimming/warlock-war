class Settings {
    constructor(root) {
        if (window.location.host === "app1356.acapp.acwing.com.cn") {
                window.location.replace("https://pjmcode.top/");
        }
        this.root = root;
        this.platform = "WEB";
        if (this.root.acwingos) {
            this.platform = "ACAPP";
        }
        this.username = "";
        this.photo = "";

        this.$settings = $(`
<div class="ac-game-settings">
    <footer>
        <a class="beian-link" href="http://beian.miit.gov.cn/" target="_blank" title="工业和信息化部域名信息备案管理系统">
            浙ICP备2022005619号-1
        </a>
    </footer>
    <div class="ac-game-settings-login">
        <div class="ac-game-settings-title">
            登录
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="ac-game-settings-password">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>登录</button>
            </div>
        </div>
        <div class="ac-game-settings-error-message">
        </div>
        <div class="ac-game-settings-option">
            注册
        </div>
    </div>
    <div class="ac-game-settings-register">
        <div class="ac-game-settings-title">
            注册
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="ac-game-settings-password ac-game-settings-password-first">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="ac-game-settings-password ac-game-settings-password-second">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>注册</button>
            </div>
        </div>
        <div class="ac-game-settings-error-message">
        </div>
        <div class="ac-game-settings-option">
            登录
        </div>
    </div>
</div>
`);

        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login_username = this.$login.find(".ac-game-settings-username input");
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message");
        this.$login_register = this.$login.find(".ac-game-settings-option");

        this.$login.hide();

        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-second input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message");
        this.$register_login = this.$register.find(".ac-game-settings-option");

        this.$register.hide();


        this.root.$ac_game.append(this.$settings);

        this.start();
    }

    start() {
        if (this.platform === "ACAPP") {    // 从acapp上登录
            this.getinfo_acapp();
        } else {    // web端登录
            this.getinfo_web();
            this.add_listening_events();
        }
    }

    add_listening_events() {    // 响应操作
        let outer = this;
        this.add_listening_events_login();
        this.add_listening_events_register();
    }

    add_listening_events_login() {  // 响应登录面板操作
        let outer = this;

        this.$login_register.click(function() { // 转至注册界面
            outer.register();
        });

        this.$login_submit.click(function() {   // 向服务器发送登录信息
            outer.login_on_remote();
        });
    }

    add_listening_events_register() {   // 响应注册面板操作
        let outer = this;

        this.$register_login.click(function() { // 转至登录界面
            outer.login();
        });

        this.$register_submit.click(function() {    // 向服务器发送注册信息
            outer.register_on_remote();
        });
    }

    acwing_login() {    // acwing一键登录
        $.ajax({
            url: "https://pjmcode.top/settings/acwing/web/apply_code/",
            type: "GET",
            success: function(resp) {
                if (resp.result === "success") {
                    window.location.replace(resp.apply_code_url);
                    /*
                     * 用户如果同意授权重定向至redirect_uri
                     * 返回参数code和state
                     * 若拒绝授权，不会发生重定向
                     */
                }
            }
        });
    }

    login_on_remote() { // 在远程服务器上登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "https://pjmcode.top/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    logout_on_remote() {    // 在远程服务器上登出
        if (this.platform === "ACAPP") {
            this.root.acwingos.api.window.close();
        } else {
            $.ajax({
                url: "https://pjmcode.top/settings/logout/",
                type: "GET",
                success: function(resp) {
                    if (resp.result === "success") {
                        location.reload();
                    }
                }
            });
        }
    }

    register_on_remote() {  // 在远程服务器上注册
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();

        $.ajax({
            url: "https://pjmcode.top/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$register_error_message.html(resp.result);
                }
            }
        });
    }

    login() {   // 打开登录界面
        this.$register.hide();
        this.$login.show();
    }

    register() {    // 打开注册界面
        this.$login.hide();
        this.$register.show();
    }


    acapp_login(appid, redirect_uri, scope, state) {    // 从acapp上登录
        let outer = this;

        this.root.acwingos.api.oauth2.authorize(appid, redirect_uri, scope, state, function(resp) {
            if (resp.result === "success") {
                outer.username = resp.username;
                outer.photo = resp.photo;
                outer.hide();
                outer.root.menu = new AcGameMenu(outer.root);
                outer.root.menu.show();
                outer.root.menu.changelog.show();
            }
        });
    }

    getinfo_acapp() {   // 从acapp上获取用户信息
        let outer = this;

        $.ajax({
            url: "https://pjmcode.top/settings/acwing/acapp/apply_code/",
            type: "GET",
            success: function(resp) {
                if (resp.result === "success") {
                    outer.acapp_login(resp.appid, resp.redirect_uri, resp.scope, resp.state);
                }
            }
        });
    }



    getinfo_web() { // web端获取登录信息
        let outer = this;
        $.ajax({    // 向后端询问信息
            url: "https://pjmcode.top/settings/getinfo/",
            type: "GET",
            data: { // 返回所登录的端口
                platform: outer.platform,
            },
            success: function(resp) {
                if (resp.result === "success") {    // 已登录，返回登录用户信息
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu = new AcGameMenu(outer.root);
                    outer.root.menu.show();
                    outer.root.menu.changelog.show();
                } else {    // 未登录，跳转至登录界面
                    outer.login();
                }
            }
        });
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }

}


