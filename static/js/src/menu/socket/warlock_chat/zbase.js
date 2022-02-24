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
