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
