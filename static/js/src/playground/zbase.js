class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`);

        this.hide();
        this.root.$ac_game.append(this.$playground);

        this.start();
    }

    get_random_color() {    // ai随机颜色
        let colors = ["blue", "green", "yellow", "red", "pink", "purple", "grey"];
        return colors[Math.floor(Math.random() * 7)];
    }


    start() {
        let outer = this;
        $(window).resize(function() {   // 当界面大小改变时，游戏界面相应改变大小
            outer.resize();
        });
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

        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);  // 生成地图

        this.mode = mode;   // 游戏模式 single or multi
        this.state = "waiting"; // 游戏状态 waiting -> fighting -> over
        this.notice_board = new NoticeBoard(this);  // 生成提示板
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
        this.$playground.hide();
    }
}

