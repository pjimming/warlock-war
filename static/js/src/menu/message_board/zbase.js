class MessageBoard {
    constructor(menu) {
        this.menu = menu;

        this.$history = $(`<div class="message-board-history"></div>`);
        this.$input = $(`<input type="text" class="message-board-input" placeholder="留下你的足迹">`);

        this.$history.show();
        this.$input.show();

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
                            "M+": this.getMonth() + 1,                 //月份
                            "d+": this.getDate(),                    //日
                            "h+": this.getHours(),                   //小时
                            "m+": this.getMinutes(),                 //分
                            "s+": this.getSeconds(),                 //秒
                            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                            "S": this.getMilliseconds()             //毫秒
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
                    outer.add_message(username, time, text);
                    //outer.menu.mms.send_message(username, time, text);
                }

                return false;
            }
        });
    }

    add_message(username, time, text) {
        let message = `[${username}][${time}]<br>${text}`;
        let color = "black";
        if (username === this.menu.root.settings.username) {
            color = "green";
        }
        this.$history.append(this.render_message(message, color));
        this.$history.scrollTop(this.$history[0].scrollHeight);
    }

    render_message(message, color) {
        return $(`<div style="color:${color}">${message}</div>`);
    }
}
