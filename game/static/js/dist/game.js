class ChooseMode {
    constructor(root) {
        this.root = root;
        this.$choose_mode = $(`
<div class="choose-mode">
    <div class="choose-mode-single-mode" title="除了自己，都是敌人">
        <img class="choose-mode-single-mode-img" src="/static/image/choose_mode/3.png">
        <div class="choose-mode-single-mode-title">
            单机模式
        </div>
    </div>
    <div class="choose-mode-multi-mode" title="和真实玩家来一场1v1的勇者对决">
        <img class="choose-mode-multi-mode-img" src="/static/image/choose_mode/2.png">
        <div class="choose-mode-multi-mode-title">
            联网模式
        </div>
    </div>
    <div class="choose-mode-back">
        返回
    </div>
</div>
`);

        this.$choose_mode.hide();
        this.root.$ac_game.append(this.$choose_mode);

        this.$single_mode = this.$choose_mode.find('.choose-mode-single-mode');
        this.$multi_mode = this.$choose_mode.find('.choose-mode-multi-mode');
        this.$back = this.$choose_mode.find('.choose-mode-back');

        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
        let outer = this;

        this.$single_mode.click(function() {
            outer.hide();
            outer.root.playground.show("single mode");
        });
        this.$multi_mode.click(function() {
            outer.hide();
            outer.root.playground.show("multi mode");
        });
        this.$back.click(function() {
            outer.hide();
            outer.root.menu.show();
        });
    }

    show() {
        this.$choose_mode.show();
    }

    hide() {
        this.$choose_mode.hide();
    }
}
class Changelog {
    constructor(menu) {
        this.menu = menu;
        this.$changelog = $(`
<div class="ac-game-changelog">
    <div class="ac-game-changelog-logo"></div>
    <br>
    <div class="ac-game-changelog-author">
        AUTHOR: &ensp;潘江明-CN
        <br><br>
    </div>
    <div class="ac-game-changelog-close" title="关闭">
        ×
    </div>
    <div class="ac-game-changelog-text">
        2022.2.24<br>
        &emsp;<a class="russia-ukraine-war" href="https://m.weibo.cn/status/4740383357798999?sourceType=weixin&from=10C2095010&wm=9847_0002&featurecode=newtitle" target="_blank">俄乌局势最新进展</a><br>
        &emsp;修复：Warlock Chat同账号登录发送信息不会实时更新的bug<br>
        &emsp;修复：Warlock Chat再次登录同一账号会出现之前界面历史记录出现两次的bug
        <br>
        <br>
        2022.2.23<br>
        &emsp;优化：合并单机模式和联网模式，简洁菜单界面
        <br>
        <br>
        2022.2.22<br>
        &emsp;祝您在最有爱的日子里，有爱您的人相伴<br>
        &emsp;新增：菜单界面设置功能（可更换头像）
        <br>
        <br>
        2022.2.18<br>
        &emsp;修复：部分情况下，进入游戏后闪退的bug
        <br>
        <br>
        2022.2.17<br>
        &emsp;优化：局内聊天系统文本颜色优化<br>
        &emsp;优化：单机模式内 AI 皮肤颜色增加<br>
        &emsp;新增：菜单界面用户信息显示
        <br>
        <br>
        2022.2.16<br>
        &emsp;重磅：Warlock Chat 正式上线<br>
        &emsp;优化：游戏说明页面视觉优化<br>
        &emsp;优化：鼠标指针皮肤全面更新<br>
        &emsp;优化：游戏界面背景全面优化<br>
        &emsp;新增：Warlock War 上线天数显示
        <br>
        <br>
        2022.2.15<br>
        &emsp;元宵节快乐！<br>
        &emsp;优化：更换背景样式，使背景更贴合游戏主题氛围<br>
        &emsp;修复：在菜单模式中点击其他按钮后更新日志不会自动关闭的bug
        <br>
        <br>
        2022.2.14<br>
        &emsp;情人节快乐！<br>
        &emsp;优化：UI适配不同类型窗口<br>
        &emsp;优化：局内添加技能按键提示<br>
        &emsp;新增：火球到达最大距离后烟花爆炸效果（不造成伤害）<br>
        &emsp;新增：移动目的地的提示位置<br>
        &emsp;修复：某些情况下游戏结束后不能正常重新开始的bug
        <br>
        <br>
        2022.2.13<br>
        &emsp;Warlock War 1.0 正式上线
    </div>
</div>
`);

        this.$changelog.hide();
        this.menu.root.$ac_game.append(this.$changelog);
        this.$close = this.$changelog.find('.ac-game-changelog-close');
        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
        let outer = this;
        this.$close.click(function() {  // 关闭changelog
            outer.hide();
        });
    }

    show() {
        this.$changelog.show();
    }

    hide() {
        this.$changelog.hide();
    }
}
class GameHelper {
    constructor(menu) {
        this.menu = menu;
        this.$helper = $(`
<div class="ac-game-helper">
    <div class="ac-game-helper-text">
        AUTHOR: &emsp;潘江明-CN<br>
        <br>
        ===推荐PC端游玩===<br>
        移动：鼠标右键点击桌面即可移动至目标地点<br>
        攻击：按Q键 + 鼠标左键即可向目标处发射火球<br>
        闪现：按F键 + 鼠标左键即可瞬移至目标处<br>
        局内聊天(联网模式)：按ENTER键可呼唤出聊天框<br>
        若已输入内容，按ESC键可关闭聊天框，按ENTER键发送；<br>
        若未输入内容，按ENTER键可直接关闭聊天框
    </div>
    <br>
    <div class="ac-game-helper-back">
        返回
    </div>
</div>
`);

        this.$helper.hide();
        this.menu.root.$ac_game.append(this.$helper);
        this.$back = this.$helper.find('.ac-game-helper-back');

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$back.click(function() {   // 返回菜单页面
            outer.hide();
            outer.menu.show();
        });
    }

    show() {
        this.$helper.show();
    }

    hide() {
        this.$helper.hide();
    }
}
class OnlineDays {
    constructor(menu) {
        this.menu = menu;

        this.$onlinedays = this.calc_days();

        this.$onlinedays.show();

        this.menu.$menu.append(this.$onlinedays);

        this.start();
    }

    start() {
    }

    calc_days() {   // 计算当天距离2022-2-13的天数
        let date1 = new Date(2022, 1, 13);
        let date2 = new Date();
        date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        const diff = date2.getTime() - date1.getTime();
        const diffDate = diff / (24 * 60 * 60 * 1000) + 1;
        return $(`<div class="onlinedays">Warlock War 已上线 ${diffDate} 天</div>`);
    }

    show() {
        this.$onlinedays.show();
    }

    hide() {
        this.$onlinedays.hide();
    }
}
class ReplacePhoto {
    constructor(menu) {
        this.menu = menu;

        this.username = this.menu.user_info.username;   // 当前用户名
        this.cur_photo = this.menu.user_info.photo;     // 当前头像地址
        this.$replace_photo = $(`
<div class="replace-photo">
    <div class="replace-photo-username">
        用户名：${this.username}
    </div>
    <img class="replace-photo-cur-photo-img" src="${this.cur_photo}" alt="当前头像">
    <div class="replace-photo-cur-photo-text">
        当前头像地址：
    </div>
    <div class="replace-photo-cur-photo-url">
        ${this.cur_photo}
    </div>
    <div class="replace-photo-close" title="关闭">
        ×
    </div>
    <div class="replace-photo-new-photo-text">
        修改头像：
    </div>
    <input type="text" class="replace-photo-new-photo-url" placeholder="请在bing中查找图片 前缀例如：https://tse1-mm.cn.bing.net/">
    <div class="replace-photo-new-photo-tip">
        &emsp;tips:鼠标右键单击图片，点击“在新标签页中打开图片”，复制图片链接即可。
    </div>
    <div class="replace-photo-new-photo-confirm" title="保存当前状态">
        保存
    </div>
    <div class="replace-photo-error-message"></div>
</div>
`);

        this.$replace_photo.hide();

        this.menu.$menu.append(this.$replace_photo);

        this.$close = this.$replace_photo.find('.replace-photo-close');                                 // 关闭
        this.$confirm = this.$replace_photo.find('.replace-photo-new-photo-confirm');                   // 保存
        this.$input = this.$replace_photo.find('.replace-photo-new-photo-url');                         // 输入框
        this.$replace_photo_error_message = this.$replace_photo.find('.replace-photo-error-message');   // 错误信息

        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
        let outer = this;
        this.$close.click(function() {      // 关闭
            outer.hide();
        });
        this.$confirm.click(function() {    // 保存
            outer.update_photo();
        });
        this.$input.keydown(function(e) {
            if (e.which === 13) {           // key-ENTER
                outer.update_photo();
            }
        });
    }

    update_photo() {
        let outer = this;
        let text = this.$input.val();
        this.$replace_photo_error_message.empty();

        $.ajax({
            url: "https://app1356.acapp.acwing.com.cn/menu/replace_photo/",
            type: "GET",
            data: {
                username: outer.username,
                photo: text,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$replace_photo_error_message.html(resp.result);
                }
            }
        });
    }

    show() {
        this.$replace_photo.show();
    }

    hide() {
        this.$replace_photo.hide();
    }
}
class WarlockChatSocket {
    constructor(menu) {
        this.menu = menu;
        this.uuid = this.menu.uuid;
        this.ws = new WebSocket("wss://app1356.acapp.acwing.com.cn/wss/warlockchat/");
        this.start();
    }

    start() {
        this.receive();
    }

    receive() {
        let outer = this;

        this.ws.onmessage = function(e) {   // 路由
            let data = JSON.parse(e.data);

            let event = data.event;
            if (event === "message") {
                outer.receive_message(data.uuid, data.username, data.time, data.text);
            } else if (event === "init") {
                outer.receive_init(data.details);
            }
        };
    }

    send_init(username) {   // 向后端发送初始化Warlock Chat的请求
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "init",
            'username': username,
            'uuid': outer.uuid,
        }));
    }

    receive_init(details) { // 接收初始化的请求
        for (let i = 0; i < details.length; i++) {
            let detail = details[i];
            let username = detail.username;
            let time = detail.time;
            let text = detail.text;
            this.menu.warlock_chat.add_message(username, time, text);
        }
    }

    send_message(username, time, text) {    // 向后端发送信息
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "message",
            'uuid': outer.uuid,
            'username': username,
            'time': time,
            'text': text,
        }));
    }

    receive_message(uuid, username, time, text) { // 接收其他人发送的信息
        if (uuid !== this.uuid) {
            this.menu.warlock_chat.add_message(username, time, text);
        }
    }
}
class UserInfo {
    constructor(menu) {
        this.menu = menu;

        this.photo = this.menu.root.settings.photo;
        this.username = this.menu.root.settings.username;
        this.$photo = $(`<img class="user-info-photo" src="${this.photo}" alt="您的头像">`);
        this.$username = $(`<div class="user-info-username">${this.username}</div>`);

        this.$photo.show();
        this.$username.show();

        this.menu.$menu.append(this.$photo);
        this.menu.$menu.append(this.$username);

        this.start();
    }

    start() {
    }
}
class WarlockChat {
    constructor(menu) {
        this.menu = menu;

        this.$title = $(`<div class="message-board-title">Warlock Chat</div>`);
        this.$history = $(`<div class="message-board-history"></div>`);
        this.$input = $(`<input type="text" class="message-board-input" placeholder="留下你的足迹">`);

        this.$title.show();
        this.$history.show();
        this.$input.show();

        this.menu.$menu.append(this.$title);
        this.menu.$menu.append(this.$history);
        this.menu.$menu.append(this.$input);

        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
        let outer = this;

        this.$input.keydown(function(e) {
            if (e.which === 13) {   // key-ENTER
                let username = outer.menu.root.settings.username;
                let text = outer.$input.val();
                if (text) {
                    outer.$input.val("");
                    Date.prototype.format = function (fmt) {
                        var o = {
                            "M+": this.getMonth() + 1,                      //月份
                            "d+": this.getDate(),                           //日
                            "h+": this.getHours(),                          //小时
                            "m+": this.getMinutes(),                        //分
                            "s+": this.getSeconds(),                        //秒
                            "q+": Math.floor((this.getMonth() + 3) / 3),    //季度
                            "S": this.getMilliseconds()                     //毫秒
                        };
                        if (/(y+)/.test(fmt)) {
                            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                        }
                        for (var k in o) {
                            if (new RegExp("(" + k + ")").test(fmt)) {
                                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                            }
                        }
                        return fmt;
                    }
                    let time = new Date().format("yyyy-MM-dd hh:mm:ss");
                    outer.add_message(username, time, text);    // 自己界面显示
                    outer.menu.wcs.send_message(username, time, text);  // 调用wcs，向后端发送信息，广播给其他人
                }

                return false;
            }
        });
    }

    add_message(username, time, text) { // 添加message
        let message = `[${username}][${time}]<br>${text}`;
        let color = "black";
        if (username === this.menu.root.settings.username) {
            color = "green";
        }
        this.$history.append(this.render_message(message, color));
        this.$history.scrollTop(this.$history[0].scrollHeight);
    }

    render_message(message, color) {    // 渲染message颜色， me->green, others->black
        return $(`<div style="color:${color}">${message}</div>`);
    }
}
class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.uuid = this.create_uuid();
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

    create_uuid() {
        let res = "";
        for (let i = 0; i < 8; i++) {
            let x = parseInt(Math.floor(Math.random() * 10));
            res += x;
        }
        return res;
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
let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);  //把这个类加入到存储元素的全局数组内

        this.has_called_start = false;
        this.timedelta = 0;
        this.uuid = this.create_uuid();
    }

    create_uuid() { // 创建用户的uuid用于唯一标识
        let res = "";
        for (let i = 0; i < 8; i++) {
            let x = parseInt(Math.floor(Math.random() * 10));
            res += x;
        }
        return res;
    }

    start() {   //只在第一帧执行
    }

    update() {  //每一帧都会执行
    }

    late_update() { //在每一帧的最后执行一次
    }

    on_destroy() {  //被销毁前执行一次
    }

    destroy() { //销毁该物体
        this.on_destroy();

        for (let i = 0; i < AC_GAME_OBJECTS.length; i++) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);   //从数组中删除元素的函数splice()
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp) {
    for (let i = 0; i < AC_GAME_OBJECTS.length; i++) {  // 对每个对象进行操作
        let obj = AC_GAME_OBJECTS[i];

        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    for (let i = 0; i < AC_GAME_OBJECTS.length; i++) {  // 最后渲染一遍，使图像在页面最上方
        let obj = AC_GAME_OBJECTS[i];
        obj.late_update();
    }

    last_timestamp = timestamp;

    requestAnimationFrame(AC_GAME_ANIMATION);   // 递归调用此函数
}

requestAnimationFrame(AC_GAME_ANIMATION);   //HTML5的API，可以调用1帧的函数
class ChatField {
    constructor(playground) {
        this.playground = playground;

        this.$history = $(`<div class="ac-game-chat-field-history">历史记录</div>`);
        this.$input = $(`<input type="text" class="ac-game-chat-field-input" placeholder="发送一句友好的问候见证当下"></input>`);

        this.$history.hide();
        this.$input.hide();

        this.func_id = null;

        this.playground.$playground.append(this.$history);
        this.playground.$playground.append(this.$input);

        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
        let outer = this;
        this.$history.on("contextmenu", function() {    // 右键不打开菜单
            return false;
        });

        this.$input.keydown(function(e) {
            if (e.which === 27) {   // key-ESC
                outer.hide_input(); // 隐藏输入框
                return false;
            } else if (e.which === 13) {    // key-ENTER
                let username = outer.playground.root.settings.username;
                let text = outer.$input.val();  // 获取输入框内容
                if (text) {     // 若消息非空，发送信息
                    outer.$input.val("");   // 重置输入框
                    outer.add_message(username, text);  // 自己页面显示
                    outer.playground.mps.send_message(username, text);  // 向后端发送广播信息
                } else {        // 若消息为空，隐藏输入框
                    outer.hide_input();
                }

                return false;
            }
        });
    }

    render_message(message, color) {   // 渲染message，加入到history里面。me->green  other->white
        return $(`<div style="color:${color}">${message}</div>`);
    }

    add_message(username, text) {   // 向history里面加入信息
        this.show_history();
        let message = `[${username}]:${text}`;
        let color = "white";
        if (username === this.playground.root.settings.username) {  // 如果是自己的消息，颜色为绿
            color = "lime";
        }
        this.$history.append(this.render_message(message, color));
        this.$history.scrollTop(this.$history[0].scrollHeight);
    }

    show_history() {    // 展示历史记录
        let outer = this;

        this.$history.fadeIn(); // 淡入

        if (this.func_id) { // 给函数一个id，每次打开文本框重新展示history 3秒钟
            clearTimeout(this.func_id);
        }

        this.func_id = setTimeout(function() {  // 若无ENTER操作，3秒后历史记录淡出
            outer.$history.fadeOut();
            outer.func_id = null;
        }, 3000);
    }

    show_input() {  // 展示文本框
        this.show_history();

        this.$input.show();
        this.$input.focus();
    }

    hide_input() {  // 隐藏文本框
        this.$input.hide();
        this.playground.game_map.$canvas.focus();
    }
}
class FinallBoard extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;

        this.state = null;  // win or lose

        this.win_img = new Image();
        this.win_img.src = "https://cdn.acwing.com/media/article/image/2022/02/12/106788_3c4e02858c-win.png";

        this.lose_img = new Image();
        this.lose_img.src = "https://cdn.acwing.com/media/article/image/2022/02/12/106788_3546c3128c-lose.png";
    }

    start() {
    }

    win() {
        this.state = "win";

        let outer = this;
        setTimeout(function() { // 2s后自动返回菜单界面
            outer.playground.hide();
            outer.playground.root.choose_mode.show();
        }, 2000);
    }

    lose() {
        this.state = "lose";

        let outer = this;
        setTimeout(function() { // 2s后自动返回菜单界面
            outer.playground.hide();
            outer.playground.root.choose_mode.show();
        }, 2000);
    }

    late_update() { // 最后渲染一遍，保证在画布最上面
        this.render();
    }

    render() {  // 渲染
        let height = this.playground.height / 2;
        let width = this.playground.width / 2;
        if (this.state === "win") {
            this.ctx.drawImage(this.win_img, this.playground.width / 2 - width / 2, this.playground.height / 2 - height / 2, width, height);
        } else if (this.state === "lose") {
            this.ctx.drawImage(this.lose_img, this.playground.width / 2 - width / 2, this.playground.height / 2 - height / 2, width, height);
        }
    }
}
class GameMap extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas tabindex=0></canvas>`);  //canvas是画布
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);   // 把地图加入到acanvas里面

        this.background_img = new Image();
        // 游戏地图选择
        if (this.playground.mode === "single mode") {
            this.background_img.src = "https://cdn.acwing.com/media/article/image/2022/02/16/106788_4d7828ed8f-single.jpg";
        } else if (this.playground.mode === "multi mode") {
            this.background_img.src = "https://cdn.acwing.com/media/article/image/2022/02/16/106788_7f79857a8f-multi.jpg";
        }
    }

    start() {
        this.$canvas.focus();
    }

    resize() {  // 更改界面大小
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.drawImage(this.background_img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    update() {
        this.render();
    }

    render() {  // 画图
        this.ctx.globalAlpha = 0.28;    // 设置透明度，拖尾效果
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.drawImage(this.background_img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 1;
    }
}
class NoticeBoard extends AcGameObject {
    constructor(playground) {
        super();

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.text = "已就绪：0人";
    }

    start() {
    }

    write(text) {   // 更改notice_board的内容
        this.text = text;
    }

    update() {
        this.render();
    }

    render() {  // 渲染
        this.ctx.font = "20px serif";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text, this.playground.width / 2, 20);
    }
}
class Particle extends AcGameObject {   // 被击打时的粒子效果
    constructor(playground, x, y, radius, vx, vy, color, speed, move_length) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.friction = 0.9;
        this.eps = 0.01;
    }

    start() {
    }

    update() {
        if (this.move_length < this.eps || this.speed < this.eps) { // 销毁粒子
            this.destroy();
            return false;
        }

        // move
        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.speed *= this.friction;
        this.move_length -= moved;
        this.render();
    }

    render() {  // 绘制图像
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

class Player extends AcGameObject { // 游戏对象
    constructor(playground, x, y, radius, color, speed, character, username, photo) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;

        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.character = character;
        this.username = username;
        this.photo = photo;
        this.move_length = 0;
        this.cur_skill = null;
        this.friction = 0.9;
        this.spent_time = 0;
        this.damage_x = 0;
        this.damage_y = 0;
        this.damage_speed = 0;
        this.fireballs = [];

        this.eps = 0.01;

        if (this.character !== "robot") {   // 绘制头像
            this.img = new Image();
            this.img.src = this.photo;
        }

        if (this.character === "me") {  // 绘制技能图标
            this.fireball_coldtime = 1;
            this.fireball_img = new Image();
            this.fireball_img.src = "https://cdn.acwing.com/media/article/image/2022/02/13/106788_b4ad44c18c-fireball.png";

            this.blink_coldtime = 3;
            this.blink_img = new Image();
            this.blink_img.src = "https://cdn.acwing.com/media/article/image/2022/02/13/106788_b212e4278c-blink-f.png";
        }
    }

    start() {   // 开始
        this.playground.player_count += 1;  // 每进入一名玩家，人数加一
        this.playground.notice_board.write("已就绪：" + this.playground.player_count + "人");   // 更改notice_board内容

        if (this.playground.player_count >= 2) {    // 房间内人数≥2，开始游戏
            this.playground.state = "fighting";
            this.playground.notice_board.write("开始战斗！！！");
        }

        if (this.character === "me") {   // 玩家操作
            this.add_listening_events();
        } else if (this.character === "robot") {    // ai随机移动
            let tx = Math.random() * this.playground.width / this.playground.scale;
            let ty = Math.random() * this.playground.height / this.playground.scale;
            this.move_to(tx, ty);
        }
    }

    add_listening_events() {    // 监听键鼠动作
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function() { // 取消单击右键弹出菜单
            return false;
        });
        this.playground.game_map.$canvas.mousedown(function(e) {    // 对鼠标操作做出回应
            if (outer.playground.state !== "fighting") {    // 非战斗状态不响应鼠标操作
                return true;
            }

            const rect = outer.ctx.canvas.getBoundingClientRect();
            if (e.which === 3) {    // 鼠标右键
                let tx = (e.clientX - rect.left) / outer.playground.scale;
                let ty = (e.clientY - rect.top) / outer.playground.scale;
                for (let i = 0; i < 4; i++) {
                    let x = tx;
                    let y = ty;
                    let radius = 0.0025;
                    let angle = Math.PI * 2 * (i / 4 + 0.125);
                    let vx = Math.cos(angle);
                    let vy = Math.sin(angle);
                    let color = "white";
                    let speed = 0.3;
                    let move_length = 0.02;
                    new Particle(outer.playground, x, y, radius, vx, vy, color, speed, move_length);
                }

                outer.move_to(tx, ty);

                if (outer.playground.mode === "multi mode") {   // 多人模式发送给服务器
                    outer.playground.mps.send_move_to(tx, ty);
                }
            } else if (e.which === 1) { // 鼠标左键
                let tx = (e.clientX - rect.left) / outer.playground.scale;
                let ty = (e.clientY - rect.top) / outer.playground.scale;

                if (outer.cur_skill === "fireball") {   // 火球
                    if (outer.fireball_coldtime > outer.eps) {  // 冷却时间内不响应
                        return false;
                    }

                    let fireball = outer.shoot_fireball(tx, ty);

                    if (outer.playground.mode === "multi mode") {   // 多人
                        outer.playground.mps.send_shoot_fireball(tx, ty, fireball.uuid);
                    }
                } else if (outer.cur_skill === "blink") {   // 闪现
                    if (outer.blink_coldtime > outer.eps) { // 冷却时间不响应
                        return false;
                    }

                    outer.blink(tx, ty);

                    if (outer.playground.mode === "multi mode") {   // 多人
                        outer.playground.mps.send_blink(tx, ty);
                    }
                }

                outer.cur_skill = null;
            }
        });

        this.playground.game_map.$canvas.keydown(function(e) {  // 对键盘操作做出回应
            if (e.which === 13) {
                if (outer.playground.mode === "multi mode") {   // 打开对话框
                    outer.playground.chat_field.show_input();
                    return false;
                }
            } else if (e.which === 27) {
                if (outer.playground.mode === "multi mode") {   // 关闭对话框
                    outer.playground.chat_field.hide_input();
                }
            }

            if (outer.playground.state !== "fighting") {    // 非战斗状态不能移动
                return true;
            }

            if (e.which === 81) {   // key-q
                if (outer.fireball_coldtime > outer.eps) {
                    return true;
                }

                outer.cur_skill = "fireball";
                return false;
            } else if (e.which === 70) {    // key-f
                if (outer.blink_coldtime > outer.eps) {
                    return true;
                }

                outer.cur_skill = "blink";
                return false;
            }
        });
    }

    blink(tx, ty) { // 闪现
        let dist = this.get_dist(this.x, this.y, tx, ty);
        dist = Math.min(dist, 0.8);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.x += dist * Math.cos(angle);
        this.y += dist * Math.sin(angle);

        this.blink_coldtime = 3;
        this.move_length = 0;
    }

    shoot_fireball(tx, ty) {    // 发射火球
        let x = this.x;
        let y = this.y;
        let radius = 0.01;
        let angle = Math.atan2(ty - y, tx - x);
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);
        let color = "orange";
        if (this.playground.mode === "multi mode") {
            color = "red";
        }
        let speed = 0.6;
        let move_length = 1;
        let fireball = new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length, 0.01);
        this.fireballs.push(fireball);

        this.fireball_coldtime = 1;

        return fireball;
    }

    destroy_fireball(uuid) {    // 销毁火球
        for (let i = 0; i < this.fireballs.length; i++) {
            let fireball = this.fireballs[i];
            if (fireball.uuid === uuid) {
                fireball.destroy();
                break;
            }
        }
    }

    is_attacked(angle, damage) {    // 被攻击
        for (let i = 0; i < 20 + Math.random() * 10; i++) { // 粒子效果
            let x = this.x;
            let y = this.y;
            let radius = this.radius * Math.random() * 0.1;
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle);
            let vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed * 10;
            let move_length = this.radius * Math.random() * 5;
            new Particle(this.playground, x, y, radius, vx, vy, color, speed, move_length);
        }
        this.radius -= damage;
        if (this.radius < this.eps) { // 若半径小于10，销毁该对象
            this.destroy();
            return false;
        }

        // 击退效果
        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed = damage * 100;
        this.speed *= 1.1;
    }

    receive_attack(x, y, angle, damage, ball_uuid, attacker) {  // 接收被攻击的信息
        attacker.destroy_fireball(ball_uuid);
        this.x = x;
        this.y = y;
        this.is_attacked(angle, damage);
    }

    get_dist(x1, y1, x2, y2) {  // 计算两个坐标之间的欧几里得距离
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    move_to(tx, ty) {   // 确定移动方向和距离
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    update() {  // 每秒更新六十次画布
        this.spent_time += this.timedelta / 1000;

        this.update_win();

        if (this.playground.state === "fighting" && this.character === "me") {
            this.update_coldtime();
        }

        this.update_move();
        this.render();
    }

    update_win() {  // 查看当前是否胜利
        if (this.playground.player_count === 1 && this.playground.state === "fighting" && this.character === "me") {
            this.playground.state = "over";
            this.playground.notice_board.write("恭喜，您赢了！！！");
            this.playground.finall_board.win();
        }
    }

    update_coldtime() { // 更新冷却时间
        this.fireball_coldtime -= this.timedelta / 1000;
        this.fireball_coldtime = Math.max(this.fireball_coldtime, 0);

        this.blink_coldtime -= this.timedelta / 1000;
        this.blink_coldtime = Math.max(this.blink_coldtime, 0);
    }

    update_move() { // 更新移动
        if (this.character === "robot" && this.spent_time > 4 && Math.random() < 1 / 180.0) {  // ai对随机对象进行射击
            let player = this.playground.players[Math.floor(Math.random() * this.playground.players.length)];
            if (this !== player) {
                let tx = player.x + player.speed * player.vx * (0.3 + Math.random() * 0.5);
                let ty = player.y + player.speed * player.vy * (0.3 + Math.random() * 0.5);
                this.shoot_fireball(tx, ty);
            }
        }

        if (this.damage_speed > this.eps) {   // 被击中时的后退效果
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damage_x * this.damage_speed * this.timedelta / 1000;
            this.y += this.damage_y * this.damage_speed * this.timedelta / 1000;
            this.damage_speed *= this.friction;
        } else {    // 若没被击中
            if (this.move_length < this.eps) {  // 移动到目的地停止移动
                this.move_length = 0;
                this.vx = this.vy = 0;
                if (this.character === "robot") {  // ai
                    let tx = Math.random() * this.playground.width / this.playground.scale;
                    let ty = Math.random() * this.playground.height / this.playground.scale;
                    this.move_to(tx, ty);
                }
            } else {    // move
                let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000); //timedelta单位是毫秒，除以1000转化为秒
                this.x += this.vx * moved;
                this.y += this.vy * moved;
                this.move_length -= moved;
            }
        }

    }

    render() {  // 绘制图像
        let scale = this.playground.scale;
        if (this.character !== "robot") {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, (this.x - this.radius) * scale, (this.y - this.radius) * scale, this.radius * 2 * scale, this.radius * 2 * scale);
            this.ctx.restore();
        } else {
            this.ctx.beginPath();
            this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }

        if (this.character === "me" && this.playground.state === "fighting") {  // 绘制冷却
            this.render_skill_coldtime();
        }
    }

    render_skill_coldtime() {   // 绘制冷却时间图像
        let scale = this.playground.scale;

        // fireball
        let x = 1.5, y = 0.9, r = 0.04;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x * scale, y * scale, r * scale, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.fireball_img, (x - r) * scale, (y - r) * scale, r * 2 * scale, r * 2 * scale);
        this.ctx.restore();

        if (this.fireball_coldtime > 0) {   // fireball-coldtime
            this.ctx.beginPath();
            this.ctx.moveTo(x * scale, y * scale);
            this.ctx.arc(x * scale, y * scale, r * scale, 0 - Math.PI / 2, Math.PI * 2 * (1 - this.fireball_coldtime / 1) - Math.PI / 2, true);
            this.ctx.lineTo(x * scale, y * scale);
            this.ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
            this.ctx.fill();
        }

        // blink
        x = 1.62, y = 0.9, r = 0.04;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x * scale, y * scale, r * scale, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.blink_img, (x - r) * scale, (y - r) * scale, r * 2 * scale, r * 2 * scale);
        this.ctx.restore();

        if (this.blink_coldtime > 0) {  // blink-coldtime
            this.ctx.beginPath();
            this.ctx.moveTo(x * scale, y * scale);
            this.ctx.arc(x * scale, y * scale, r * scale, 0 - Math.PI / 2, Math.PI * 2 * (1 - this.blink_coldtime / 3) - Math.PI / 2, true);
            this.ctx.lineTo(x * scale, y * scale);
            this.ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
            this.ctx.fill();
        }


    }

    on_destroy() {  // 销毁对象
        if (this.character === "me" && this.playground.state === "fighting") {  // 检查是否失败
            this.playground.state = "lose";
            this.playground.notice_board.write("您已阵亡，游戏结束。");
        }

        for (let i = 0; i < this.playground.players.length; i++) {
            if (this.playground.players[i] === this) {
                this.playground.players.splice(i, 1);
                this.playground.player_count -= 1;
                break;
            }
        }

        if (this.playground.player_count <= 1 && this.playground.state === "lose") {
            this.playground.state = "waiting";
            this.playground.finall_board.lose();
        }
    }
}


class FireBall extends AcGameObject {   // skill:fireball 火球 可击退，造成伤害
    constructor(playground, player, x, y, radius, vx, vy, color, speed, move_length, damage) {
        super();
        this.playground = playground;
        this.player = player;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.damage = damage;

        this.eps = 0.01;
    }

    start() {
    }

    update() {
        if (this.move_length < this.eps) {  // 有移动距离的限制
            for (let i = 0; i < 20 + Math.random() * 10; i++) { // 烟花效果
                let x = this.x;
                let y = this.y;
                let radius = 0.005;
                let angle = Math.PI * 2 * Math.random();
                let vx = Math.cos(angle);
                let vy = Math.sin(angle);
                let color = this.color;
                let speed = 1;
                let move_length = 0.2;
                new Particle(this.playground, x, y, radius, vx, vy, color, speed, move_length);
            }
            this.destroy();
            return false;
        }

        this.update_move();

        if (this.player.character !== "enemy") {
            this.update_attack();
        }

        this.render();
    }

    update_move() { // move
        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_length -= moved;
    }

    update_attack() {
        for (let i = 0; i < this.playground.players.length; i++) {  // 检测是否与其他目标进行碰撞
            let player = this.playground.players[i];
            if (this.player !== player && this.is_collision(player)) {
                this.attack(player);
                break;
            }
        }
    }

    attack(player) {    // 发生碰撞后，计算击退方向并销毁该火球
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage);

        if (this.playground.mode === "multi mode") {
            this.playground.mps.send_attack(player.uuid, player.x, player.y, angle, this.damage, this.uuid);
        }

        this.destroy();
    }

    is_collision(player) {  // 计算是否发生碰撞
        let distance = this.get_dist(this.x, this.y, player.x, player.y);
        return distance < this.radius + player.radius;
    }

    get_dist(x1, y1, x2, y2) {  // 计算欧几里得距离
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    render() {  // 绘制图像
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    on_destroy() {  // 销毁火球前，将player里面存储的fireballs对应的火球删除
        let fireballs = this.player.fireballs;
        for (let i = 0; i < fireballs.length; i++) {
            if (fireballs[i] === this) {
                fireballs.splice(i, 1);
                break;
            }
        }
    }
}


class MultiPlayerSocket {   // 多人服务器接口
    constructor(playground) {
        this.playground = playground;

        this.ws = new WebSocket("wss://app1356.acapp.acwing.com.cn/wss/multiplayer/");

        this.start();
    }

    start() {
        this.receive();
    }

    /*
     * send向服务器发送用户的操作信息
     * receive从服务器接收其他用户的操作信息
     */

    receive() { // 接收服务器发过来的信息
        let outer = this;

        this.ws.onmessage = function(e) {
            let data = JSON.parse(e.data);
            let uuid = data.uuid;
            if (uuid === outer.uuid) {  // 忽略自己发送的信息
                return false;
            }

            // 路由
            let event = data.event;
            if (event === "create_player") {
                outer.receive_create_player(uuid, data.username, data.photo);
            } else if (event === "move_to") {
                outer.receive_move_to(uuid, data.tx, data.ty);
            } else if (event === "shoot_fireball") {
                outer.receive_shoot_fireball(uuid, data.tx, data.ty, data.ball_uuid);
            } else if (event === "attack") {
                outer.receive_attack(uuid, data.attackee_uuid, data.x, data.y, data.angle, data.damage, data.ball_uuid);
            } else if (event === "blink") {
                outer.receive_blink(uuid, data.tx, data.ty);
            } else if (event === "message") {
                outer.receive_message(uuid, data.username, data.text);
            }
        };
    }

    get_player(uuid) {  // 通过uuid找到对应的用户
        let players = this.playground.players;
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            if (player.uuid === uuid) {
                return player;
            }
        }

        return null;
    }

    send_create_player(username, photo) {   // 发送创建用户的信息
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "create_player",
            'uuid': outer.uuid,
            'username': username,
            'photo': photo,
        }));
    }

    receive_create_player(uuid, username, photo) {  // 接收其他用户被创建的信息
        let player = new Player(
            this.playground,
            this.playground.width / 2 / this.playground.scale,
            0.5,
            0.05,
            "white",
            0.2,
            "enemy",
            username,
            photo,
        );

        player.uuid = uuid;
        this.playground.players.push(player);
    }

    send_move_to(tx, ty) {  // 向服务器发送移动信息
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "move_to",
            'uuid': outer.uuid,
            'tx': tx,
            'ty': ty,
        }));
    }

    receive_move_to(uuid, tx, ty) { // 接收其他用户移动信息
        let player = this.get_player(uuid);

        if (player) {
            player.move_to(tx, ty);
        }
    }

    send_shoot_fireball(tx, ty, ball_uuid) {    // 发射火球
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "shoot_fireball",
            'uuid': outer.uuid,
            'tx': tx,
            'ty': ty,
            'ball_uuid': ball_uuid,
        }));
    }

    receive_shoot_fireball(uuid, tx, ty, ball_uuid) {   // 接收发射火球
        let player = this.get_player(uuid);
        if (player) {
            let fireball = player.shoot_fireball(tx, ty);
            fireball.uuid = ball_uuid;
        }
    }

    send_attack(attackee_uuid, x, y, angle, damage, ball_uuid) {    // 向服务器发送用户被击中的信息
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "attack",
            'uuid': outer.uuid,
            'attackee_uuid': attackee_uuid,
            'x': x,
            'y': y,
            'angle': angle,
            'damage': damage,
            'ball_uuid': ball_uuid,
        }));
    }

    receive_attack(uuid, attackee_uuid, x, y, angle, damage, ball_uuid) {   // 接收某用户被击中的信息
        let attacker = this.get_player(uuid);
        let attackee = this.get_player(attackee_uuid);
        if (attacker && attackee) {
            attackee.receive_attack(x, y, angle, damage, ball_uuid, attacker);
        }
    }

    send_blink(tx, ty) {    // 闪现
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "blink",
            'uuid': outer.uuid,
            'tx': tx,
            'ty': ty,
        }));
    }

    receive_blink(uuid, tx, ty) {   // 接收闪现
        let player = this.get_player(uuid);
        if (player) {
            player.blink(tx, ty);
        }
    }

    send_message(username, text) {  // 发送信息
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "message",
            'uuid': outer.uuid,
            'username': username,
            'text': text,
        }));
    }

    receive_message(uuid, username, text) { // 接收信息
        this.playground.chat_field.add_message(username, text);
    }
}
class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`);

        this.hide();
        this.root.$ac_game.append(this.$playground);

        this.start();
    }

    get_random_color() {    // ai随机颜色
        let colors = ["blue", "green", "yellow", "red", "pink", "purple", "grey", "aqua", "skyblue", "greenyellow", "gold", "peachpuff", "plum", "lightpink", "wheat"];
        return colors[Math.floor(Math.random() * 15)];
    }

    create_uuid() {
        let res = "";
        for (let i = 0; i < 8; i ++ ) {
            let x = parseInt(Math.floor(Math.random() * 10));  // 返回[0, 10)之间的数
            res += x;
        }
        return res;
    }


    start() {
        let outer = this;
        let uuid = this.create_uuid();
        $(window).on(`resize.${uuid}`, function() {   // 当界面大小改变时，游戏界面相应改变大小
            outer.resize();
        });

        if (this.root.acwingos) {
            this.root.acwingos.api.window.on_close(function() {
                $(window).off(`resize.${uuid}`);
            });
        }
    }

    resize() {  // 改变游戏界面大小 16:9
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        let unit = Math.min(this.width / 16, this.height / 9);
        this.width = unit * 16;
        this.height = unit * 9;
        this.scale = this.height;

        if (this.game_map) {    // 如果有地图，更改地图大小
            this.game_map.resize();
        }
    }

    show(mode) {    //打开playground界面
        let outer = this;
        this.$playground.show();
        this.mode = mode;   // 游戏模式 single or multi

        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);  // 生成地图
        this.state = "waiting"; // 游戏状态 waiting -> fighting -> over
        this.notice_board = new NoticeBoard(this);  // 生成提示板
        this.finall_board = new FinallBoard(this);  // 最终界面
        this.player_count = 0;  // 游戏玩家人数

        this.resize();

        this.players = [];  // 存储所有存活的游戏对象
        this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, "white", 0.2, "me", this.root.settings.username, this.root.settings.photo)); // 生成user对象
        // 为什么游戏对象的y属性是0.5呢？因为scale === height

        if (mode === "single mode") {
            for (let i = 0; i < 7; i++) {   // 生成ai对象
                this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, this.get_random_color(), 0.2, "robot"));
            }
        } else if (mode === "multi mode") {
            this.chat_field = new ChatField(this);
            this.mps = new MultiPlayerSocket(this); // 用websocket协议进行通信
            this.mps.uuid = this.players[0].uuid;

            this.mps.ws.onopen = function() {   // 向后端发送创建用户的请求
                outer.mps.send_create_player(outer.root.settings.username, outer.root.settings.photo);
            };
        }
    }

    hide() {    //关闭playground界面
        while (this.players && this.players.length > 0) {   // 删除player
            let player = this.players[0];
            while (player.fireballs && player.fireballs.length > 0) {   // 删除fireball
                player.fireballs[0].destroy();
            }
            this.players[0].destroy();
        }

        if (this.game_map) {    // 删除game_map
            this.game_map.destroy();
            this.game_map = null;
        }

        if (this.notice_board) {    // 删除notice_board
            this.notice_board.destroy();
            this.notice_board = null;
        }

        if (this.finall_board) {    // 删除finall_board
            this.finall_board.destroy();
            this.finall_board = null;
        }

        this.$playground.empty();   // 清空HTML元素

        this.$playground.hide();
    }
}

class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.root.acwingos) {
            this.platform = "ACAPP";
        }
        this.username = "";
        this.photo = "";

        this.$settings = $(`
<div class="ac-game-settings">
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
            url: "https://app1356.acapp.acwing.com.cn/settings/acwing/web/apply_code/",
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
            url: "https://app1356.acapp.acwing.com.cn/settings/login/",
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
                url: "https://app1356.acapp.acwing.com.cn/settings/logout/",
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
            url: "https://app1356.acapp.acwing.com.cn/settings/register/",
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
            url: "https://app1356.acapp.acwing.com.cn/settings/acwing/acapp/apply_code/",
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
            url: "https://app1356.acapp.acwing.com.cn/settings/getinfo/",
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


export class AcGame {
    constructor (id, acwingos) {
        this.id = id;
        this.$ac_game = $('#' + id);

        // 这个AcWingOS是额外的一个参数，这个参数是你自己自定义的。比如现在我们加了acwingos，当我们在acwing app中打开应用，它在实例化AcGame这个类的时候就会加上AcWingOS这个参数（里面是acwing云端app的一些接口）。那么如果你自己把AcGame部署到了小程序或者哪里，你也可以再添加AcGame的实例化的参数，来表明来自哪个前端。
        this.acwingos = acwingos;

        this.settings = new Settings(this);             // 注册登录界面
        // this.menu = new AcGameMenu(this);            // 菜单界面
        this.choose_mode = new ChooseMode(this);        // 选择模式界面
        this.playground = new AcGamePlayground(this);   // 游戏界面

        this.start();
    }

    start() {
    }
}
