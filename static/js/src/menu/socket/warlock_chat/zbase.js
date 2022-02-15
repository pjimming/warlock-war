class WarlockChatSocket {
    constructor(menu) {
        this.menu = menu;
        this.ws = new WebSocket("wss://app1356.acapp.acwing.com.cn/wss/warlockchat/");
        this.start();
    }

    start() {
        this.receive();
    }

    receive() {
        let outer = this;

        this.ws.onmessage = function(e) {
            let data = JSON.parse(e.data);

            let event = data.event;
            if (event === "message") {
                outer.receive_message(data.username, data.time, data.text);
            } else if (event === "init") {
                outer.receive_init(data.details);
            }
        };
    }

    send_init(username) {
        this.ws.send(JSON.stringify({
            'event': "init",
            'username': username,
        }));
    }

    receive_init(details) {
        for (let i = 0; i < details.length; i++) {
            let detail = details[i];
            let username = detail.username;
            let time = detail.time;
            let text = detail.text;
            this.menu.warlock_chat.add_message(username, time, text);
        }
    }

    send_message(username, time, text) {
        this.ws.send(JSON.stringify({
            'event': "message",
            'username': username,
            'time': time,
            'text': text,
        }));
    }

    receive_message(username, time, text) {
        if (username !== this.menu.root.settings.username) {
            this.menu.warlock_chat.add_message(username, time, text);
        }
    }
}
