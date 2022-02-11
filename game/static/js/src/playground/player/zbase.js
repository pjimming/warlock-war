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
            this.fireball_img.src = "https://cdn.acwing.com/media/article/image/2021/12/02/1_9340c86053-fireball.png";

            this.blink_coldtime = 3;
            this.blink_img = new Image();
            this.blink_img.src = "https://cdn.acwing.com/media/article/image/2021/12/02/1_daccabdc53-blink.png";
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

        this.playground.game_map.$canvas.keydown(function(e) { // 对键盘操作做出回应
            console.log(e.which);
            if (e.which === 13) {
                if (outer.playground.mode === "multi mode") {
                    outer.playground.chat_field.show_input();
                    return false;
                }
            } else if (e.which === 27) {
                if (outer.playground.mode === "multi mode") {
                    outer.playground.chat_field.hide_input();
                }
            }

            if (outer.playground.state !== "fighting") {
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

        if (this.playground.state === "fighting" && this.character === "me") {
            this.update_coldtime();
        }

        this.update_move();
        this.render();
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

        if (this.character === "me" && this.playground.state === "fighting") {
            this.render_skill_coldtime();
        }
    }

    render_skill_coldtime() {   // 绘制冷却时间图像
        let scale = this.playground.scale;
        let x = 1.5, y = 0.9, r = 0.04;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x * scale, y * scale, r * scale, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.fireball_img, (x - r) * scale, (y - r) * scale, r * 2 * scale, r * 2 * scale);
        this.ctx.restore();

        if (this.fireball_coldtime > 0) {   // 火球
            this.ctx.beginPath();
            this.ctx.moveTo(x * scale, y * scale);
            this.ctx.arc(x * scale, y * scale, r * scale, 0 - Math.PI / 2, Math.PI * 2 * (1 - this.fireball_coldtime / 1) - Math.PI / 2, true);
            this.ctx.lineTo(x * scale, y * scale);
            this.ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
            this.ctx.fill();
        }

        x = 1.62, y = 0.9, r = 0.04;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x * scale, y * scale, r * scale, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.blink_img, (x - r) * scale, (y - r) * scale, r * 2 * scale, r * 2 * scale);
        this.ctx.restore();

        if (this.blink_coldtime > 0) {  // 闪现
            this.ctx.beginPath();
            this.ctx.moveTo(x * scale, y * scale);
            this.ctx.arc(x * scale, y * scale, r * scale, 0 - Math.PI / 2, Math.PI * 2 * (1 - this.blink_coldtime / 3) - Math.PI / 2, true);
            this.ctx.lineTo(x * scale, y * scale);
            this.ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
            this.ctx.fill();
        }


    }

    on_destroy() {  // 销毁对象
        if (this.character === "me") {
            this.playground.state = "over";
            this.playground.notice_board.write("您已阵亡，游戏结束。");
        }

        for (let i = 0; i < this.playground.players.length; i++) {
            if (this.playground.players[i] === this) {
                this.playground.players.splice(i, 1);
                this.playground.player_count -= 1;
                break;
            }
        }

        if (this.playground.player_count === 1 && this.playground.state === "fighting") {
            this.playground.state = "over";
            this.playground.notice_board.write("恭喜，您赢了！！！");
        }
    }
}


