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
        $(window).resize(function() {
            outer.resize();
        });
    }

    resize() {
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        let unit = Math.min(this.width / 16, this.height / 9);
        this.width = unit * 16;
        this.height = unit * 9;
        this.scale = this.height;

        if (this.game_map) {
            this.game_map.resize();
        }
    }

    show() {    //打开playground界面
        this.$playground.show();

        this.resize();

        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);  // 生成地图
        this.players = [];  // 存储所有存活的游戏对象
        this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, "white", 0.2, true)); // 生成user对象
        // 为什么游戏对象的y属性是0.5呢？因为scale === height
        for (let i = 0; i < 7; i++) {   // 生成ai对象
            this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, this.get_random_color(), 0.2, false));
        }
    }

    hide() {    //关闭playground界面
        this.$playground.hide();
    }
}

