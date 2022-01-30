class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            单机模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            联网模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
            设置
        </div>
    </div>
</div>
`);
        this.root.$ac_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.ac-game-menu-field-item-multi-mode');
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');

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
        this.$single_mode.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function(){
            console.log("click multi mode");
        });
        this.$settings.click(function(){
            console.log("click settings");
        });
    }

    show() {    //显示menu界面
        this.$menu.show();
    }

    hide() {    //关闭menu界面
        this.$menu.hide();
    }
}
let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);  //把这个类加入到存储元素的全局数组内

        this.has_called_start = false;
        this.timedelta = 0;
    }

    start() {   //只在第一帧执行
    }

    update() {  //每一帧都会执行
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
    for (let i = 0; i < AC_GAME_OBJECTS.length; i++) {
        let obj = AC_GAME_OBJECTS[i];

        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;

    requestAnimationFrame(AC_GAME_ANIMATION);
}

requestAnimationFrame(AC_GAME_ANIMATION);   //HTML5的API，可以调用1帧的函数
class GameMap extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);  //canvas是画布
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);   // 把地图加入到acanvas里面
    }

    start() {
    }

    update() {
        this.render();
    }

    render() {  // 画图
        this.ctx.fillStyle = "rgba(0,0,0, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
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
        this.eps = 1;
    }

    start() {
    }

    update() {
        if (this.move_length < this.eps || this.speed < this.eps) {
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.speed *= this.friction;
        this.move_length -= moved;
        this.render();
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

class Player extends AcGameObject { // 游戏对象
    constructor(playground, x, y, radius, color, speed, is_me) {
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
        this.is_me = is_me;
        this.move_length = 0;
        this.cur_skill = null;
        this.friction = 0.9;
        this.spent_time = 0;

        this.eps = 0.1;
    }

    start() {
        if (this.is_me) {
            this.add_listening_events();
        } else {    // ai随机移动
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;
            this.move_to(tx, ty);
        }
    }

    add_listening_events() {    // 监听键鼠动作
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function() {
            return false;
        });
        this.playground.game_map.$canvas.mousedown(function(e) {
            if (e.which === 3) {    // 鼠标右键
                outer.move_to(e.clientX, e.clientY);
            } else if (e.which === 1) { // 鼠标左键
                if (outer.cur_skill === "fireball") {
                    outer.shoot_fireball(e.clientX, e.clientY);
                }

                outer.cur_skill = null;
            }
        });

        $(window).keydown(function(e) {
            if (e.which === 81) {   // key-q
                outer.cur_skill = "fireball";
                return false;
            }
        });
    }

    shoot_fireball(tx, ty) {    // 发射火球
        let x = this.x;
        let y = this.y;
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - y, tx - x);
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);
        let color = "orange";
        let speed = this.playground.height * 0.6;
        let move_length = this.playground.height * 1;
        new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length, this.playground.height * 0.01);

        console.log(this.playground.players.length);
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
        if (this.radius < 10) { // 若半径小于10，销毁该对象
            this.destroy();
            return false;
        }

        // 击退效果
        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed = damage * 100;
        this.speed *= 1.1;
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
        if (!this.is_me && this.spent_time > 4 && Math.random() < 1 / 180.0) {  // ai对随机对象进行射击
            let player = this.playground.players[Math.floor(Math.random() * this.playground.players.length)];
            if (this !== player) {
                let tx = player.x + player.speed * player.vx * (0.3 + Math.random() * 0.5);
                let ty = player.y + player.speed * player.vy * (0.3 + Math.random() * 0.5);
                this.shoot_fireball(tx, ty);
            }
        }

        if (this.damage_speed > 10) {   // 被击中时的后退效果
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damage_x * this.damage_speed * this.timedelta / 1000;
            this.y += this.damage_y * this.damage_speed * this.timedelta / 1000;
            this.damage_speed *= this.friction;
        } else {
            if (this.move_length < this.eps) {
                this.move_length = 0;
                this.vx = this.vy = 0;
                if (!this.is_me) {  // ai
                    let tx = Math.random() * this.playground.width;
                    let ty = Math.random() * this.playground.height;
                    this.move_to(tx, ty);
                }
            } else {
                let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000); //timedelta单位是毫秒，除以1000转化为秒
                this.x += this.vx * moved;
                this.y += this.vy * moved;
                this.move_length -= moved;
            }
        }

        this.render();
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    on_destroy() {  // 销毁对象
        for (let i = 0; i < this.playground.players.length; i++) {
            if (this.playground.players[i] === this) {
                this.playground.players.splice(i, 1);
            }
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

        this.eps = 0.1;
    }

    start() {
    }

    update() {
        if (this.move_length < this.eps) {  // 有移动距离的限制
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_length -= moved;

        for (let i = 0; i < this.playground.players.length; i++) {  // 检测是否与其他目标进行碰撞
            let player = this.playground.players[i];
            if (this.player !== player && this.is_collision(player)) {
                this.attack(player);
            }
        }


        this.render();
    }

    attack(player) {    // 发生碰撞后，计算击退方向并销毁该火球
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage);
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

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}


class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`);

        // this.hide();
        this.root.$ac_game.append(this.$playground);

        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);  // 生成地图
        this.players = [];  // 存储所有存活的游戏对象
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.2, true)); // 生成user对象

        for (let i = 0; i < 5; i++) {   // 生成ai对象
            this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, this.get_random_color(), this.height * 0.2, false));
        }

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
    }

    hide() {    //关闭playground界面
        this.$playground.hide();
    }
}

export class AcGame {
    constructor (id) {
        this.id = id;
        this.$ac_game = $('#' + id);
        // this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);

        this.start();
    }

    start() {
    }
}
