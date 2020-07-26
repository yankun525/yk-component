var watermark = {
    create: function(options) {
        return new Watermark(options);
    }
};

function extend() {
    var src,
        copyIsArray,
        copy,
        name,
        options,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    if (i === length) {
        return target;
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (deep && copy && (copyIsArray = Array.isArray(copy))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src || {};
                    }
                    target[name] = extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}

var DEFAULTS = {
    body: null,
    message: [],
    zIndex: 9999,
    style: 'width:100%;height:100%;top:0;left:0;pointer-events:none;position:absolute;',
    width: 200,
    height: 120
}


function Watermark(options) {
    this.initOptions(options);
    this.removeAll();
    this.create();
}

Watermark.prototype = {
    initOptions: function(options) {
        this.options = extend(true, {}, DEFAULTS, options);
        if (!this.options.body) {
           this.options.body = document.body;
        }
    },
    create: function() {
        var div = document.createElement('div'),
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            message = this.options.message,
            width = this.options.width,
            height = this.options.height;
        canvas.width = width;
        canvas.height = height;
        height = (height - 30 * message.length) / 2 + 20;
        width = width / 2;
        ctx.translate(0, canvas.height / 4);
        ctx.rotate(-25 * Math.PI / 180);
        ctx.font = '16px Microsoft';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'Middle';
        message.map(function(msg, index) {
            ctx.fillText(msg, width / 1.25, 30 * index + height);
        });
        // this.options.body.prepend(canvas);
        // ctx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
        div.setAttribute('type', 'watermark');
        div.setAttribute('style', this.options.style);
        div.style.zIndex = this.options.zIndex;
        div.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')';
        this.options.body.appendChild(div);
    },
    remove: function() {
        var item,
            items = document.body.children,
            len = items.length;
        while (len--) {
            item = items[len];
            if (item.getAttribute('type') === 'watermark') {
                item.remove();
            }
        }
    },
    removeAll: function(body) {
        var item,
            items,
            len;
        if (!body) body = document.body;
        items = body.children;
        len = items.length;
        while (len--) {
            item = items[len];
            if (item.getAttribute('type') === 'watermark') {
                item.remove();
            } else {
                this.removeAll(item);
            }
        }
    }
};

export default watermark;
