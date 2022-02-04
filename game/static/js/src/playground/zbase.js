class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`);

        this.hide();

        this.start();
    }

    get_random_color() {    // ai随机颜色
        let colors = ["blue", "green", "yellow", "red", "pink", "purple", "grey"];
        return colors[Math.floor(Math.random() * 7)];
    }


    start() {
    }

    show() {    //打开playground界面
        this.$playground.show();
        this.root.$ac_game.append(this.$playground);

        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);  // 生成地图
        this.players = [];  // 存储所有存活的游戏对象
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.2, true)); // 生成user对象

        for (let i = 0; i < 7; i++) {   // 生成ai对象
            this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, this.get_random_color(), this.height * 0.2, false));
        }
    }

    hide() {    //关闭playground界面
        this.$playground.hide();
    }
}

