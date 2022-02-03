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

        // move
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

    render() {  // 绘制图像
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

