<template>
    <div class="app-avatar">
        <div class="app-avatar-start" v-show="!src">
            <div class="app-avatar-title">选择本地照片，上传编辑自己的头像</div>
            <div class="app-avatar-desc">支持{{accept}}格式的图片</div>
        </div>
        <div class="app-avatar-end" v-show="src">
            <div class="clearfix">
                <div class="app-avatar-box pull-left" ref="box">
                    <div class="app-avatar-crop" ref="crop" @mousedown.stop="resetBox">
                        <canvas ref="canvas"></canvas>
                        <div class="app-crop-shade-top" ref="shadetop" v-show="showDraw" @mousedown.stop="resetBox"></div>
                        <div class="app-crop-shade-right" ref="shaderight" v-show="showDraw" @mousedown.stop="resetBox"></div>
                        <div class="app-crop-shade-bottom" ref="shadebottom" v-show="showDraw" @mousedown.stop="resetBox"></div>
                        <div class="app-crop-shade-left" ref="shadeleft" v-show="showDraw" @mousedown.stop="resetBox"></div>
                        <div class="app-crop-selection" ref="selection" v-show="showDraw">
                            <div class="app-crop-box" @mousedown.stop="startBox"></div>
                            <div class="app-crop-box-top" @mousedown.stop="startBar"></div>
                            <div class="app-crop-box-right" @mousedown.stop="startBar"></div>
                            <div class="app-crop-box-bottom" @mousedown.stop="startBar"></div>
                            <div class="app-crop-box-left" @mousedown.stop="startBar"></div>
                            <div class="app-crop-box-top-right" @mousedown.stop="startAngle"></div>
                            <div class="app-crop-box-right-bottom" @mousedown.stop="startAngle"></div>
                            <div class="app-crop-box-bottom-left" @mousedown.stop="startAngle"></div>
                            <div class="app-crop-box-left-top" @mousedown.stop="startAngle"></div>
                        </div>
                    </div>
                </div>
                <div class="app-avatar-preview b-l m-l-xl p-l-xl pull-left">
                    <p class="app-avatar-preview-title">头像预览</p>
                    <p class="app-avatar-preview-img m-t-l" :style="{width: width + 'px', height: height + 'px'}">
                        <img :src="src" ref="preview" v-show="showDraw" />
                    </p>
                    <p class="m-t-s">头像{{width}}*{{height}}</p>
                </div>
            </div>
        </div>
        <div class="app-avatar-btns">
            <div class="app-avatar-file" @change="hander">
                <input type="file" name="file" v-if="fileReset" :accept="fileAccept">
                <span>选择图片</span>
            </div>
            <el-button class="m-l-xs" @click="empty" v-show="src">清除选择</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /* 允许接受的图片类型 */
        accept: {
            type: String,
            default: 'jpg, jpeg, gif, png, bmp'
        },
        /* 是否在加载图片后自动截取 */
        cut: {
            type: Boolean,
            default: false
        },
        /* 头像固定宽高比 */
        ratio: {
            type: [Number, String]
        },
        /* 头像宽度 */
        width: {
            type: [Number, String],
            default: 100
        },
        /* 头像高度 */
        height: {
            type: [Number, String],
            default: 100
        }
    },
    data() {
        return {
            fileReset: true,
            src: '',
            showDraw: this.cut
        };
    },
    methods: {
        hander(e) {
            var file = e.target.files;
            file = file[file.length - 1];
            if (file) {
                this.showDraw = this.cut;
                this.fileToImage(file);
                /* 重置file 上传同一张图片也触发事件 */
                this.fileReset = false;
                this.$nextTick(() => this.fileReset = true);
            }
        },
        empty(e) {
            this.src = '';
        },
        fileToImage(file) {
            var me = this,
                reader = new FileReader();
            /* image转base64 加载图片 */
            reader.readAsDataURL(file);
            /* 存储file属性 */
            me.file = {};
            me.file.name = file.name.replace(/\.([^.]+)$/, str => {
                me.file.type = str.slice(1, str.length);
                return '';
            });
            me.file.size = file.size;
            reader.onload = function(event) {
                var image = new Image();
                me.src = image.src = event.target.result;
                image.onload = function() {
                    var canvas = me.$refs.canvas,
                        ctx = canvas.getContext('2d');
                    me.initCrop(this.width, this.height);
                    canvas.width = me.box.width;
                    canvas.height = me.box.height;
                    ctx.drawImage(image, 0, 0, me.box.width, me.box.height);
                    me.initBox();
                };
            };
        },
        initCrop(width, height) {
            var $box = this.$refs.box,
                $crop = this.$refs.crop,
                w = $box.offsetWidth,
                h = $box.offsetHeight,
                box = {};
            /* 计算crop宽高 */
            if (width > w || height > h) {
                /* 图片宽高超过容器宽高 按容器宽高进行缩放 保持不失真 */
                if ((width / w) > (height / h)) {
                    /* 宽度超过比例高于高度 图片以宽度为准 高度按比例缩放 */
                    box.width = w;
                    box.height = parseInt(height / width * w);
                } else {
                    /* 高度超过比例高于宽度 图片以高度为准 宽度按比例缩放 */
                    box.height = h;
                    box.width = parseInt(width / height * h);
                }
            } else {
                /* 图片宽高不超过容器宽高 以图片实际宽高为准 */
                box.width = width;
                box.height = height;
            }
            /* crop居中对齐 */
            box.left = parseInt((w - box.width) / 2);
            box.top = parseInt((h - box.height) / 2);
            this.box = box;
            $crop.style.width = box.width + 'px';
            $crop.style.height = box.height + 'px';
            $crop.style.left = box.left + 'px';
            $crop.style.top = box.top + 'px';
        },
        initBox() {
            var sw,
                sh,
                bx = this.box.width,
                bh = this.box.height,
                selection = {};
            sw = Math.min(this.width, bx);
            if (this.ratio) {
                sh = parseInt(sw / this.ratio);
                if (sh > bh) {
                    sh = bh;
                    sw = parseInt(sh * this.ratio);
                }
            } else {
                sw = Math.min(sw, bh);
                sh = sw;
            }
            selection.width = sw;
            selection.height = sh;
            selection.left = parseInt((bx - sw) / 2);
            selection.top = parseInt((bh - sh) / 2);
            this.selection = selection;
            this.drawSelection();
        },
        resetBox(e) {
            var offset = this.offset(this.$refs.crop),
                selection = this.selection;
            selection.left = Math.max(parseInt(e.pageX - offset.left - 4), 0);
            selection.top = Math.max(parseInt(e.pageY - offset.top - 4), 0);
            selection.width = 8;
            selection.height = 8;
            this.showDraw = true;
            this.startAngle(e, 'app-crop-box-left-top');
        },
        startBox(e) {
            var selection = this.selection;
            this.drawing = true;
            this.type = 'moveBox';
            this.diffX = e.pageX - selection.left;
            this.diffY = e.pageY - selection.top;
            this.maxLeft = this.box.width - selection.width;
            this.maxTop = this.box.height - selection.height;
        },
        moveBox(x, y) {
            var selection = this.selection;
            x = x - this.diffX;
            y = y - this.diffY;
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x > this.maxLeft) x = this.maxLeft;
            if (y > this.maxTop) y = this.maxTop;
            selection.left = x;
            selection.top = y;
            this.drawSelection();
        },
        startBar(e) {
            var selection = this.selection,
                type = e.target.className;
            this.drawing = true;
            switch(type) {
                case 'app-crop-box-top':
                    this.type = 'moveTopBottom';
                    this.pointY = selection.top + selection.height;
                    this.diffY = e.pageY - selection.top;
                    break;
                case 'app-crop-box-bottom':
                    this.type = 'moveTopBottom';
                    this.pointY = selection.top;
                    this.diffY = e.pageY - selection.top - selection.height;
                    break;
                case 'app-crop-box-left':
                    this.type = 'moveRightLeft';
                    this.pointX = selection.left + selection.width;
                    this.diffX = e.pageX - selection.left;
                    break;
                case 'app-crop-box-right':
                    this.type = 'moveRightLeft';
                    this.pointX = selection.left;
                    this.diffX = e.pageX - selection.left - selection.width;
                    break;
            }
        },
        moveTopBottom(x, y) {
            var selection = this.selection,
                height,
                width = this.box.width - selection.left;
            y = y - this.diffY;
            if (y < 0) y = 0;
            if (y > this.box.height) y = this.box.height;
            if (y < this.pointY) {
                height = this.pointY - y;
                selection.top = y;
                if (this.ratio) {
                    if (height > parseInt(width / this.ratio)) {
                        height = parseInt(width / this.ratio);
                        selection.top = this.pointY - height;
                        selection.width = width;
                    } else {
                        selection.width = parseInt(height * this.ratio);
                    }
                }
            } else {
                selection.top = this.pointY;
                height = y - this.pointY;
                if (this.ratio) {
                    if (height > parseInt(width / this.ratio)) {
                        height = parseInt(width / this.ratio);
                        selection.width = width;
                    } else {
                        selection.width = parseInt(height * this.ratio);
                    }
                }
            }
            selection.height = height;
            this.drawSelection();
        },
        moveRightLeft(x) {
            var selection = this.selection,
                width,
                height = this.box.height - selection.top;
            x = x - this.diffX;
            if (x < 0) x = 0;
            if (x > this.box.width) x = this.box.width;
            if (x < this.pointX) {
                width = this.pointX - x;
                selection.left = x;
                if (this.ratio) {
                    if (height < parseInt(width / this.ratio)) {
                        width = parseInt(height * this.ratio);
                        selection.left = this.pointX - width;
                        selection.height = height;
                    } else {
                        selection.height = parseInt(width / this.ratio);
                    }
                }
            } else {
                selection.left = this.pointX;
                width = x - this.pointX;
                if (this.ratio) {
                    if (height < parseInt(width / this.ratio)) {
                        width = parseInt(height * this.ratio);
                        selection.height = height;
                    } else {
                        selection.height = parseInt(width / this.ratio);
                    }
                }
            }
            selection.width = width;
            this.drawSelection();
        },
        startAngle(e, type) {
            var selection = this.selection;
            if (!type) type = e.target.className;
            this.drawing = true;
            this.type = 'moveAngle';
            switch(type) {
                case 'app-crop-box-left-top':
                    this.pointY = selection.top + selection.height;
                    this.diffY = e.pageY - selection.top;
                    this.pointX = selection.left + selection.width;
                    this.diffX = e.pageX - selection.left;
                    break;
                case 'app-crop-box-top-right':
                    this.pointY = selection.top + selection.height;
                    this.diffY = e.pageY - selection.top;
                    this.pointX = selection.left;
                    this.diffX = e.pageX - selection.left - selection.width;
                    break;
                case 'app-crop-box-right-bottom':
                    this.pointY = selection.top;
                    this.diffY = e.pageY - selection.top - selection.height;
                    this.pointX = selection.left;
                    this.diffX = e.pageX - selection.left - selection.width;
                    break;
                case 'app-crop-box-bottom-left':
                    this.pointY = selection.top;
                    this.diffY = e.pageY - selection.top - selection.height;
                    this.pointX = selection.left + selection.width;
                    this.diffX = e.pageX - selection.left;
                    break;
            }
        },
        moveAngle(x, y) {
            var selection = this.selection,
                width,
                height,
                left,
                top;
            x = x - this.diffX;
            y = y - this.diffY;
            if (x < 0) x = 0;
            if (x > this.box.width) x = this.box.width;
            if (y < 0) y = 0;
            if (y > this.box.height) y = this.box.height;
            if (x < this.pointX) {
                width = this.pointX - x;
                left = x;
                if (y < this.pointY) {
                    height = this.pointY - y;
                    top = y;
                    if (this.ratio) {
                        if (height > (width / this.ratio)) {
                            height = width / this.ratio;
                            top = this.pointY - height;
                        } else {
                            width = height * this.ratio;
                            left = this.pointX - width;
                        }
                    }
                } else {
                    top = this.pointY;
                    height = y - this.pointY;
                    if (this.ratio) {
                        if (height > (width / this.ratio)) {
                            height = width / this.ratio;
                        } else {
                            width = height * this.ratio;
                            left = this.pointX - width;
                        }
                    }
                }
            } else {
                left = this.pointX;
                width = x - this.pointX;
                if (y < this.pointY) {
                    height = this.pointY - y;
                    top = y;
                    if (this.ratio) {
                        if (height > (width / this.ratio)) {
                            height = width / this.ratio;
                            top = this.pointY - height;
                        } else {
                            width = height * this.ratio;
                        }
                    }
                } else {
                    top = this.pointY;
                    height = y - this.pointY;
                    if (this.ratio) {
                        if (height > (width / this.ratio)) {
                            height = width / this.ratio;
                        } else {
                            width = height * this.ratio;
                        }
                    }
                }
            }
            selection.width = width;
            selection.height = height;
            selection.left = left;
            selection.top = top;
            this.drawSelection();
        },
        drawSelection() {
            var $refs = this.$refs,
                selection = this.selection;
            /* 渲染selection */
            $refs.shadetop.style.height = selection.top + 'px';
            $refs.shaderight.style.top = selection.top + 'px';
            $refs.shaderight.style.left = (selection.left + selection.width) + 'px';
            $refs.shaderight.style.height = selection.height + 'px';
            $refs.shadebottom.style.top = (selection.top + selection.height) + 'px';
            $refs.shadeleft.style.top = selection.top + 'px';
            $refs.shadeleft.style.width = selection.left + 'px';
            $refs.shadeleft.style.height = selection.height + 'px';
            $refs.selection.style.top = selection.top + 'px';
            $refs.selection.style.left = selection.left + 'px';
            $refs.selection.style.width = selection.width + 'px';
            $refs.selection.style.height = selection.height + 'px';
            this.drawPreview();
        },
        drawPreview() {
            var $preview = this.$refs.preview,
                box = this.box,
                selection = this.selection,
                preview = {};
            preview.width = box.width / selection.width * this.width;
            preview.height = box.height / selection.height * this.height;
            preview.left = selection.left / selection.width * this.width;
            preview.top = selection.top / selection.height * this.height;
            this.preview = preview;
            $preview.style.width = preview.width + 'px';
            $preview.style.height = preview.height + 'px';
            $preview.style.marginLeft = -preview.left + 'px';
            $preview.style.marginTop = -preview.top + 'px';
        },
        getBase64Image() {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                image = this.$refs.preview,
                type,
                preview = this.preview;
            if (!this.src || !this.showDraw) {
                return false;
            }
            canvas.width = preview.width;
            canvas.height = preview.height;
            type = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
            ctx.drawImage(image, 0, 0, preview.width, preview.height);
            image = ctx.getImageData(preview.left, preview.top, this.width, this.height);
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            canvas.width = this.width;
            canvas.height = this.height;
            ctx.putImageData(image, 0, 0);
            return canvas.toDataURL('image/' + type);
        },
        getBlobImage() {
            var src = this.getBase64Image(),
                arr,
                mime,
                bstr,
                k,
                u8arr;
            if (!src) {
                return false;
            }
            arr = src.split(',');
            mime = arr[0].match(/:(.*?);/)[1];
            bstr = atob(arr[1]);
            k = bstr.length;
            u8arr = new Uint8Array(k);
            while (k--) {
                u8arr[k] = bstr.charCodeAt(k);
            }
            return new Blob([u8arr], { type: mime });
        },
        offset(el, type) {
            var win,
                left = 0,
                top = 0;
            if (el.getClientRects().length) {
                win = el.ownerDocument.defaultView;
                el = el.getBoundingClientRect();
                left = el.left + win.pageXOffset;
                top = el.top + win.pageYOffset;
            }
            return type === 'left' ? left : type === 'top' ? top : { left: left, top: top };
        }
    },
    watch: {
        ratio: 'initBox',
        width: 'drawPreview',
        height: 'drawPreview'
    },
    computed: {
        fileAccept() {
            return this.accept.split(', ').map(key => 'image/' + key).join(', ');
        }
    },
    mounted() {
        var me = this;
        function mousemove(e) {
            if (!me.drawing) return;
            if (typeof me[me.type] === 'function') {
                me[me.type](e.pageX, e.pageY);
            }
        }
        function mouseup() {
            me.drawing = false;
        }
        window.addEventListener('mouseup', mouseup);
        window.addEventListener('mousemove', mousemove);
    }
};
</script>

<style lang="css">
.app-avatar {
    padding: 0px;
}
.app-avatar-start {
    width: 440px;
    position: relative;
}
.app-avatar-title {
    font-size: 14px;
    height: 32px;
    line-height: 32px;
}
.app-avatar-desc {
    color: #999;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
}
.app-avatar-box {
    width: 400px;
    height: 300px;
    background: #e2e2e2;
    line-height: 300px;
    text-align: center;
    overflow: hidden;
    position: relative;
}
.app-avatar-crop {
    vertical-align: middle;
    max-height: 300px;
    max-width: 400px;
    position: relative;
    user-select: none;
}
.app-avatar-crop > canvas {
    float: left;
}
.app-crop-selection {
    position: absolute;
}
.app-crop-selection:before {
    content: '';
}
.app-crop-box {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: move;
    display: block;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-size: 0;
}
.app-crop-box-top,
.app-crop-box-bottom {
    width: 100%;
    height: 9px;
    font-size: 0;
    position: absolute;
    cursor: n-resize;
}
.app-crop-box-right,
.app-crop-box-left {
    width: 9px;
    height: 100%;
    font-size: 0;
    position: absolute;
    cursor: e-resize;
}
.app-crop-box-top {
    top: -5px;
    left: 0;
}
.app-crop-box-right {
    right: -5px;
    top: 0;
}
.app-crop-box-bottom {
    bottom: -5px;
    left: 0;
}
.app-crop-box-left {
    left: -5px;
    top: 0;
}
.app-crop-box-top:before,
.app-crop-box-top-right,
.app-crop-box-right:before,
.app-crop-box-right-bottom,
.app-crop-box-bottom:before,
.app-crop-box-bottom-left,
.app-crop-box-left:before,
.app-crop-box-left-top {
    background-color: rgba(49, 28, 28, 0.58);
    border: 1px #eeeeee solid;
    width: 9px;
    height: 9px;
    font-size: 0;
    position: absolute;
    opacity: 0.8 !important;
}
.app-crop-box-top:before,
.app-crop-box-right:before,
.app-crop-box-bottom:before,
.app-crop-box-left:before {
    content: '';
}
.app-crop-box-top:before {
    left: 50%;
    top: 0;
    margin-left: -5px;
}
.app-crop-box-top-right {
    right: -5px;
    top: -5px;
    cursor: ne-resize;
    z-index: 4;
}
.app-crop-box-right:before {
    top: 50%;
    right: 0;
    margin-top: -5px;
}
.app-crop-box-right-bottom {
    bottom: -5px;
    right: -5px;
    cursor: nw-resize;
    z-index: 4;
}
.app-crop-box-bottom:before {
    left: 50%;
    bottom: 0;
    margin-left: -5px;
}
.app-crop-box-bottom-left {
    left: -5px;
    bottom: -5px;
    cursor: ne-resize;
    z-index: 4;
}
.app-crop-box-left:before {
    top: 50%;
    left: 0;
    margin-top: -5px;
}
.app-crop-box-left-top {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
    z-index: 4;
}
.app-crop-box-top:after,
.app-crop-box-right:after,
.app-crop-box-bottom:after,
.app-crop-box-left:after {
    content: '';
    background: repeating-linear-gradient(135deg, #fff, #fff 4px, #000 4px, #000 8px);
    animation: move 1s infinite linear;
    position: absolute;
    font-size: 0;
}
@keyframes move {
    0% {
        background-position: -1px -1px;
    }
    100% {
        background-position: -12px -12px;
    }
}
.app-crop-box-top:after,
.app-crop-box-bottom:after {
    height: 1px;
    width: 100%;
    left: 0;
}
.app-crop-box-right:after,
.app-crop-box-left:after {
    height: 100%;
    width: 1px;
    top: 0;
}
.app-crop-box-top:after {
    top: 4px;
}
.app-crop-box-right:after {
    right: 4px;
}
.app-crop-box-bottom:after {
    bottom: 4px;
}
.app-crop-box-left:after {
    left: 4px;
}
.app-crop-shade-top,
.app-crop-shade-right,
.app-crop-shade-bottom,
.app-crop-shade-left {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: crosshair;
}
.app-crop-shade-top {
    top: 0;
    right: 0;
    left: 0;
}
.app-crop-shade-right {
    right: 0;
}
.app-crop-shade-bottom {
    right: 0;
    bottom: 0;
    left: 0;
}
.app-crop-shade-left {
    left: 0;
}
.app-avatar-btns {
    margin-top: 24px;
    position: relative;
}
.app-avatar-file {
    position: relative;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    border-radius: 2px;
    padding: 9px 18px;
}
.app-avatar-file input[type=file] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
.app-avatar-preview {
    height: 300px;
}
.app-avatar-preview-title {
    font-size: 16px;
}
.app-avatar-preview-img {
    overflow: hidden;
}
</style>
