class ReplacePhoto {
    constructor(menu) {
        this.menu = menu;

        this.username = this.menu.user_info.username;
        this.cur_photo = this.menu.user_info.photo;
        this.$replace_photo = $(`
<div class="replace-photo">
    <div class="replace-photo-username">
        用户名：${this.username}
    </div>
    <img class="replace-photo-cur-photo-img" src="${this.cur_photo}" alt="当前头像">
    <div class="replace-photo-cur-photo-text">
        当前头像地址：
    </div>
    <div class="replace-photo-cur-photo-url">
        ${this.cur_photo}
    </div>
    <div class="replace-photo-close">
        ×
    </div>
    <div class="replace-photo-new-photo-text">
        修改头像：
    </div>
    <input type="text" class="replace-photo-new-photo-url" placeholder="请在bing中查找图片 前缀例如：https://tse1-mm.cn.bing.net/">
    <div class="replace-photo-new-photo-tip">
        &emsp;tips:鼠标右键单击图片，点击“在新标签页中打开图片”，复制图片链接即可。
    </div>
    <div class="replace-photo-new-photo-confirm">
        保存
    </div>
    <div class="replace-photo-error-message"></div>
</div>
`);

        this.$replace_photo.hide();

        this.menu.$menu.append(this.$replace_photo);

        this.$close = this.$replace_photo.find('.replace-photo-close');
        this.$confirm = this.$replace_photo.find('.replace-photo-new-photo-confirm');
        this.$input = this.$replace_photo.find('.replace-photo-new-photo-url');
        this.$replace_photo_error_message = this.$replace_photo.find('.replace-photo-error-message');

        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
        let outer = this;
        this.$close.click(function() {
            outer.hide();
        });
        this.$confirm.click(function() {
            outer.update_photo();
        });
        this.$input.keydown(function(e) {
            if (e.which === 13) {   // key-ENTER
                outer.update_photo();
            }
        });
    }

    update_photo() {
        let outer = this;
        let text = this.$input.val();
        this.$replace_photo_error_message.empty();

        $.ajax({
            url: "https://app1356.acapp.acwing.com.cn/menu/replace_photo/",
            type: "GET",
            data: {
                username: outer.username,
                photo: text,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$replace_photo_error_message.html(resp.result);
                }
            }
        });
    }

    show() {
        this.$replace_photo.show();
    }

    hide() {
        this.$replace_photo.hide();
    }
}
