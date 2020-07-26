/* eslint-disable */
/* jshint esversion: 6 */
import ElementUI from 'element-ui';

window.ElementUI = ElementUI;

var RENDEREXT = /{[^}]+}/g;

var ESCAPEEXT = /[&<>"'\/\\]/g;

var initElementUI = function() {
    /* Dialog默认配置 */
    ElementUI.Dialog.props.closeOnClickModal.default = false;
    ElementUI.Dialog.props.closeOnPressEscape.default = false;
    /* el-table 组件 */
    /* 新增delSltRow方法 删除选中行 */
    ElementUI.Table.methods.delSltRow = function() {
        var k = 0,
            item,
            items = this.data,
            len = items.length,
            data = this.selection;
        while (k < len) {
            item = items[k];
            if (data.indexOf(item) !== -1) {
                items.splice(k, 1);
                continue;
            }
            k++;
        }
    };
    ElementUI.Table.props.clickToSelect = {
        type: Boolean
    };
    ElementUI.Table.props.singleSelect = {
        type: Boolean
    };
    // ElementUI.Table.components.TableBody.inheritAttrs = false;
    // ElementUI.Table.components.TableBody.props.clickToSelect = {
    //     type: Boolean,
    //     default: false
    // }
    // ElementUI.Table.components.TableBody.props.singleSelect = {
    //     type: Boolean,
    //     default: false
    // }
    ElementUI.Table.mounted = function mounted() {
        var _this2 = this;
        this.bindEvents();
        this.store.toggleRowSelection = function(row, selected) {
            var emitChange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true,
                changed,
                newSelection;
            if (this.table.singleSelect) {
                this.states.isAllSelected = false;
                if (this.states.selection.length) {
                    this.states.selection = [];
                }
                changed = toggleRowStatus(this.states.selection, row, true);
            } else {
                changed = toggleRowStatus(this.states.selection, row, selected);
            }
            if (changed) {
                newSelection = (this.states.selection || []).slice();
                // 调用 API 修改选中值，不触发 select 事件
                if (emitChange) {
                    this.table.$emit('select', newSelection, row);
                }
                this.table.$emit('selection-change', newSelection);
            }
        };
        this.store.updateColumns();
        this.doLayout();
        this.resizeState = {
            width: this.$el.offsetWidth,
            height: this.$el.offsetHeight
        };
        this.store.states.columns.forEach(function (column) {
            if (column.filteredValue && column.filteredValue.length) {
                _this2.store.commit('filterChange', {
                    column: column,
                    values: column.filteredValue,
                    silent: true
                });
            }
        });
        this.$ready = true;
    };
    ElementUI.Table.components.TableBody.methods.handleClick = function(event, row) {
        this.store.commit('setCurrentRow', row);
        this.handleEvent(event, row, 'click');
        if (this.$parent.clickToSelect) {
            this.$parent.toggleRowSelection(row);
        }
    };
    function toggleRowStatus(items, row, selected) {
        var changed = false,
            index = items.indexOf(row);
        if (typeof selected === 'boolean') {
            if (selected && index === -1) {
                items.push(row);
                changed = true;
            } else if (!selected && index !== -1) {
                items.splice(index, 1);
                changed = true;
            }
        } else {
            if (index === -1) {
                items.push(row);
                changed = true;
            } else {
                items.splice(index, 1);
                changed = true;
            }
        }
        return changed;
    }
    // element pickerdate
    helper.initPickerDate = function() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start.getTime(), end.getTime()];
    };
    helper.initPickerOptions = function() {
        return {
            shortcuts: [{
                text: app.$t('gpm.finalWeek'),
                onClick: function(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: app.$t('gpm.finalOneMonth'),
                onClick: function(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: app.$t('gpm.finalThreeMonth'),
                onClick: function(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }]
        };
    };
    helper.disabledNode = function(nodes, disabled, children) {
        if (!Array.isArray(nodes)) return nodes;
        if (!children) children = 'children';
        nodes.map((node) => {
            node.disabled = disabled;
            if (Array.isArray(node[children]) && node[children].length > 0) {
                helper.disabledNode(node[children], disabled);
            }
        });
        return nodes;
    };
};

var helper = {
    init: function() {
        helper.SYS_PARAM = {};
        initElementUI();
        initAnimate();
        ininSelect();
    },
    /* 合并对象 */
    extend: function() {
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
                        target[name] = this.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    },
    /* 替换对象 */
    replace: function() {
        var target = arguments[0] || {},
            i = 1,
            options,
            name,
            item,
            copy,
            length = arguments.length,
            deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            i++;
        }
        if (i === length) {
            return target;
        }
        while (i < length) {
            options = arguments[i];
            if (options !== null && options !== undefined) {
                for (name in target) {
                    item = target[name];
                    copy = options[name];
                    if (target === copy) continue;
                    if (deep && item && typeof item === 'object' && !Array.isArray(item)) {
                        target[name] = this.replace(deep, item, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
            i++;
        }
        return target;
    },
    resetForm: function(data) {
        var arg = Array.prototype.slice.call(arguments, 1);
        Object.keys(data).map(function(key) {
            if (!arg.length || arg.indexOf(key) === -1) {
                data[key] = '';
            }
        });
    },
    resetTableForm: function() {
        this.resetForm.apply(this, Array.prototype.push.call(arguments, 'pagenumber', 'pagesize'));
    },
    exportTableForm: function(data) {
        var items = {};
        Object.keys(data).map(key => {
            if (key !== 'pagenumber' && key !== 'pagesize' && data[key]) {
                items[key] = data[key];
            }
        });
        return items;
    },
    /* 是否数字 */
    isNumeric: function(obj) {
        var realStringObj = obj && obj.toString();
        return !Array.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
    },
    /**
     * 判断是否是整数
     * num 匹配值 minus 是否可以为负数 zero是否可以为0 默认可以
     */
    isInteger: function(num, minus, zero) {
        var reg = minus ? /^-?[1-9]\d*$/g : /^[1-9]\d*$/g;
        if (typeof num !== 'string') num = String(num);
        return num.match(reg) !== null || (zero !== false && num === '0');
    },
    /**
     * 判断是否是金额
     * num 匹配值 minus 是否可以为负数 max 最大值 min 最小值
     */
    isAmount: function(num, options) {
        var reg;
        options = helper.extend({ min: 0, point: 2 }, options);
        if (!options.max) {
            if (options.point === 1) {
                options.max = 999999999999.9;
            }
            if (options.point === 2) {
                options.max = 999999999999.99;
            }
            if (options.point === 3) {
                options.max = 999999999999.999;
            }
        }
        reg = new RegExp('^-?(([1-9]([0-9]+)|[0-9])?(\.[0-9]{1,point})?$)'.replace('point', options.point));
        if (typeof num !== 'string') num = String(num);
        return num.match(reg) !== null && num <= options.max && num >= options.min ? true : false;
    },
    isTyshxydm: function(str) {
        var code = str.toUpperCase(),
            firstarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            firstkeys = [3, 7, 9, 10, 5, 8, 4, 2],
            secondarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y'],
            secondkeys = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28],
            reg,
            calc = function(code, array1, array2, b) {
                var count = 0
                for (var i = 0; i < array2.length; i++) {
                    var a = code[i]
                    count += array2[i] * array1.indexOf(a)
                }
                return b - (count % b)
            };
        /**
         * 统一代码由十八位的阿拉伯数字或大写英文字母（不使用I、O、Z、S、V）组成。
         * 第1位：登记管理部门代码（共一位字符）
         * 第2位：机构类别代码（共一位字符）
         * 第3位~第8位：登记管理机关行政区划码（共六位阿拉伯数字）
         * 第9位~第17位：主体标识码（组织机构代码）（共九位字符）
         * 第18位：校验码​（共一位字符）
         */
        if (code.length != 18) return false;
        reg = /^\w\w\d{6}\w{9}\w$/;
        if (!reg.test(code)) return false;
        /**
         * 登记管理部门代码：使用阿拉伯数字或大写英文字母表示。​
         * 机构编制：1​
         * 民政：5​
         * 工商：9​
         * 其他：Y
         */
        reg = /^[1,5,9,Y]\w\d{6}\w{9}\w$/;
        if (!reg.test(code)) return false;
        /**
         * 机构类别代码：使用阿拉伯数字或大写英文字母表示。​
         *
         * 机构编制机关：11打头​​
         * 机构编制事业单位：12打头​
         * 机构编制中央编办直接管理机构编制的群众团体：13打头​​
         * 机构编制其他：19打头​
         *
         * 民政社会团体：51打头​
         * 民政民办非企业单位：52打头​
         * 民政基金会：53打头​
         * 民政其他：59打头​
         *
         * 工商企业：91打头​
         * 工商个体工商户：92打头​
         * 工商农民专业合作社：93打头​
         *
         * 其他：Y1打头​
         */
        reg = /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/;
        if (!reg.test(code)) return false;
        /**
         * 登记管理机关行政区划码：只能使用阿拉伯数字表示。按照GB/T 2260编码。​
         * 例如：四川省成都市本级就是510100；四川省自贡市自流井区就是510302。​
         */
        reg = /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/;
        if (!reg.test(code)) return false;
        /**
         * 主体标识码（组织机构代码）：使用阿拉伯数字或英文大写字母表示。按照GB 11714编码。
         *
         * 在实行统一社会信用代码之前，以前的组织机构代码证上的组织机构代码由九位字符组成。
         * 格式为XXXXXXXX-Y。前面八位被称为“本体代码”；最后一位被称为“校验码”。校验码和本
         * 体代码由一个连字号（-）连接起来。以便让人很容易的看出校验码。但是三证合一后，组
         * 织机构的九位字符全部被纳入统一社会信用代码的第9位至第17位，其原有组织机构代码
         * 上的连字号不带入统一社会信用代码。
         *
         * 原有组织机构代码上的“校验码”的计算规则是：​
         * 例如：某公司的组织机构代码是：59467239-9。那其最后一位的组织机构代码校验码9是如何计算出来的呢？
         *
         * 第一步：取组织机构代码的前八位本体代码为基数。5 9 4 6 7 2 3 9
         * 提示：如果本体代码中含有英文大写字母。则A的基数是10，B的基数是11，C的基数是12，依此类推，直到Z的基数是35。
         * 第二步：​​取加权因子数值。因为组织机构代码的本体代码一共是八位字符。则这八位的加权因子数值从左到右分别是：3、7、9、10、5、8、4、2。​
         * 第三步：本体代码基数与对应位数的因子数值相乘。​
         * 5×3＝15，9×7＝63，4×9＝36，6×10＝60，7×5＝35，2×8＝16，3×4=12，9×2＝18​​
         * 第四步：将乘积求和相加。​
         * 15+63+36+60+35+16+12+18=255
         * 第五步：​将和数除以11，求余数。​​
         * 255÷11=33，余数是2。​​
         * 第六步：用阿拉伯数字11减去余数，得求校验码的数值。当校验码的数值为10时，校验码用英文大写字母X来表示；当校验码的数值为11时，
         * 校验码用0来表示；其余求出的校验码数值就用其本身的阿拉伯数字来表示。​
         * 11-2＝9，因此此公司完整的组织机构代码为 59467239-9。​​
         */
        var firstkey = calc(code.substr(8), firstarray, firstkeys, 11);
        var firstword;
        if (firstkey < 10) {
            firstword = firstkey;
        }
        if (firstkey == 10) {
            firstword = 'X';
        } else if (firstkey == 11) {
            firstword = '0';
        }
        if (firstword != code.substr(16, 1)) {
            return false;
        }
        /**
         * 校验码：使用阿拉伯数字或大写英文字母来表示。校验码的计算方法参照 GB/T 17710。
         * 例如：某公司的统一社会信用代码为91512081MA62K0260E，那其最后一位的校验码E是如何计算出来的呢？
         * 第一步：取统一社会信用代码的前十七位为基数。9 1 5 1 2 0 8 1 21 10 6 2 19 0 2 6 0
         * 提示：如果前十七位统一社会信用代码含有英文大写字母（不使用I、O、Z、S、V这五个英文字母）。
         * 则英文字母对应的基数分别为：A=10、B=11、C=12、D=13、E=14、F=15、G=16、H=17、J=18、K=19、L=20、M=21、N=22、P=23、Q=24、R=25、T=26、U=27、W=28、X=29、Y=30​
         * 第二步：​​取加权因子数值。因为统一社会信用代码前面前面有十七位字符。
         * 则这十七位的加权因子数值从左到右分别是：1、3、9、27、19、26、16、17、20、29、25、13、8、24、10、30、2​8
         * 第三步：基数与对应位数的因子数值相乘。​
         * 9×1=9，1×3=3，5×9=45，1×27=27，2×19=38，0×26=0，8×16=128​，1×17=17，21×20=420，10×29=290，6×25=150，2×13=26，19×8=152​，0×23=0，2×10=20，6×30=180，0×28=0
         * 第四步：将乘积求和相加。​9+3+45+27+38+0+128+17+420+290+150+26+152+0+20+180+0=1495
         * 第五步：​将和数除以31，求余数。​​
         * 1495÷31=48，余数是17。​​
         * 第六步：用阿拉伯数字31减去余数，得求校验码的数值。当校验码的数值为0~9时，就直接用该校验码的数值作为最终的统一社会信用代码的校验码；
         * 如果校验码的数值是10~30，则校验码转换为对应的大写英文字母。对应关系为：A=10、B=11、C=12、D=13、E=14、F=15、G=16、H=17、J=18、K=19、L=20、M=21、N=22、P=23、Q=24、R=25、T=26、U=27、W=28、X=29、Y=30
         * 因为，31-17＝14，所以该公司完整的统一社会信用代码为 91512081MA62K0260E。​​
         */
        var secondkey = calc(code, secondarray, secondkeys, 31);
        var secondword = secondarray[secondkey];
        if (!secondword || secondword != code.substr(17, 1)) {
            return false;
        }
        return code == code.substr(0, 16) + firstword + secondword ? true : false;
    },
    /**
     * @Author    hyj
     * @DateTime  2017-10-27
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[integer]}    integer [正整数]
     * @return    {[string]}             [返回值为正整数转换后的汉字]
     */
    suzidaxie: function(integer) {
        var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            chnUnitSection = ['', '万', '亿', '万亿', '亿亿'],
            chnUnitChar = ['', '十', '百', '千'],
            strIns = '',
            chnStr = '',
            unitPos = 0,
            zero = true,
            v;
        while (integer > 0) {
            v = integer % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                if (strIns === '一十') {
                    strIns = '十';
                }
                chnStr = strIns + chnStr
                if (chnStr === '零') {
                    chnStr = '';
                }
            }
            unitPos++;
            integer = Math.floor(integer / 10);
        }
        return chnStr
        // if (typeof integer === 'number') integer = String(integer);
        // if (!integer) return zh.charAt(0);
        // if (integer.length === 1) return zh.charAt(integer.charAt(0));
        // len = integer.length;
        // unit = unit.substr(unit.length - len + 1);
        // while (i < len) {
        //  str += zh.charAt(integer.charAt(i)) + unit.charAt(i);
        //  i++;
        // };
        // return str;
    },
    /**
     * @Author    hyj
     * @DateTime  2017-10-27
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[number]}    value [输入值为正数,可带小数点]
     * @return    {[string]}          [返回数字转换的汉字金额]
     */
    daxie: function(value) {
        var k,
            i,
            p,
            len,
            minus,
            str = '',
            unit1 = ['元', '万', '亿'],
            unit2 = ['', '拾', '佰', '仟'],
            digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
        if (!helper.isNumeric(value)) return '';
        if (typeof value !== 'number') value = parseFloat(value);
        minus = value < 0 ? '欠' : '';
        value = String(Math.abs(value)).split('.');
        if ((k = value[1])) {
            i = k.charAt(0);
            if (i && i !== '0') str += digit[i] + '角';
            i = k.charAt(1);
            if (i && i !== '0') str += digit[i] + '分';
        }
        if (!str) str = '整';
        value = Math.floor(value[0]);
        k = 0;
        while (k < 3 && value > 0) {
            p = '';
            i = 0;
            while (i < 4 && value > 0) {
                p = digit[value % 10] + unit2[i] + p;
                value = Math.floor(value / 10);
                i++;
            }
            str = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit1[k] + str;
            k++;
        }
        return minus + str.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },
    param: function(data) {
        let k,
            item = [];
        function add(key, value) {
            if (typeof value === 'function') {
                value = value();
            } else if (value === null || value === undefined || helper.isNaN(value)) {
                value = '';
            }
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            item[item.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }
        if (Array.isArray(data)) {
            data.map(item => {
                add(item.name, item.value);
            });
        } else {
            for (k in data) {
                add(k, data[k]);
            }
        }
        return item.join('&').replace(/%20/g, '+');
    },
    objTrim: function(items) {
        let data = {};
        if (typeof items === 'object') {
            Object.keys(items).map(key => {
                let value = items[key];
                if (value !== null && value !== undefined && value !== '' && !helper.isNaN(value)) {
                    data[key] = value;
                }
            });
        }
        return data;
    },
    isNaN: function(number) {
        return typeof number === 'number' ? isNaN(number) : false;
    },
    /**
     * @Author    hyj
     * @DateTime  2018-11-26
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}    url [description]
     * @return    {[type]}        [description]
     */
    getRequestParam: function(url) {
        var data = {},
            index,
            len,
            param;
        url = decodeURI(url || location.href);
        index = url.indexOf('?');
        if (index === -1) return data;
        url = url.substr(index + 1);
        index = url.indexOf('redirectUrl');
        if (index !== -1) {
            data.redirectUrl = url.substr(index + 12);
            url = url.substr(0, index);
        }
        index = url.indexOf('#');
        if (index !== -1) url = url.slice(0, index);
        url = url.split('&');
        index = 0;
        len = url.length;
        while (index < len) {
            param = url[index].split('=');
            if (param.length > 0) {
                data[param[0]] = param[1];
            }
            index++;
        }
        return data;
    },
    getOrigin: function() {
        return location.origin ? location.origin : location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    },
    go: function(url) {
        var router = window.router;
        if (router && router.mode === 'history') {
            /* 历史模式 */
            /* 实例化后用push方法 */
            if (router.app) {
                router.push(url).catch(error => error);
            } else if (location.pathname !== url) {
                /* 未实例化前直接修改url */
                location.href = this.getOrigin() + url;
            }
        } else {
            /* 路由模式直接改href */
            location.href = '#' + url;
        }
    },
    setTicket: function(url) {
        var ticket = window.store && window.store.state.token || '';
        if (typeof url === 'string') {
            return url.replace(/^(http:\/\/|https:\/\/)?[^/\+]+\//g, function(origin) {
                return origin + '?ticket=' + ticket;
            });
        }
        if (typeof url === 'object') {
            ticket = url.origin + '?ticket=' + ticket + url.url;
            delete url.origin;
            delete url.url;
            url = helper.param(url);
            return url ? ticket + '?' + url : ticket;
        }
    },
    dateFormat: function(date, format) {
        var time;
        if (typeof date === 'number') {
            time = date;
            date = new Date();
            date.setTime(time);
        }
        if (typeof format !== 'string') return '';
        return date instanceof Date ? date.format(format) : '';
    },
    escapeHTML: function(text) {
        var match = {
            '\\': '&#92;',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#47;'
        };
        return typeof text === 'string' ? text.replace(ESCAPEEXT, function(key) {
            return match[key];
        }) : text;
    },
    /**
     * @Author    hyj
     * @DateTime  2018-11-26
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}    TPL      [description]
     * @param     {[type]}    data    [description]
     * @param     {Function}  callback [description]
     * @return    {[type]}             [description]
     * 模板函数
     */
    renderText: function(temp, data, callback) {
        var me = this,
            str = typeof temp === 'string' ? temp.match(RENDEREXT) : [];
        if (typeof callback !== 'function') {
            callback = function() {
                return true;
            };
        }
        if (str && str.length > 0) {
            str.map(function(value) {
                var expre = value.replace('{', '').replace('}', ''),
                    field = me.getForJSON(expre, data);
                if (callback.call(data, field, expre) !== false) {
                    temp = temp.replace(new RegExp(value), field);
                }
            });
        }
        return temp;
    },
    /**
     * @Author    hyj
     * @DateTime  2018-11-26
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}    expre [description]
     * @param     {[type]}    data  [description]
     * @return    {[type]}          [description]
     * 通过string查json对应值
     */
    getForJSON: function(expre, data) {
        var len,
            i = 0;
        expre = expre.split(/\./);
        len = expre.length;
        while (i < len) {
            data = data[expre[i]];
            if (data === null || data === undefined) return '';
            i++;
        }
        return data;
    },
    /**
     * @Author    hyj
     * @DateTime  2017-12-06
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[Array]}    data     [description]
     * @param     {[string]}    key      [description]
     * @param     {Boolean||function}   isfilter [description]
     * @return    {[Array]}             [返回对象数组里某个key的所有值]
     */
    getArrayKeys: function(data, key, callback) {
        var k = 0,
            len = data.length,
            item,
            value,
            res,
            arr = [];
        if (Array.isArray(data) && typeof key === 'string') {
            len = data.length;
            while (k < len) {
                item = data[k];
                value = item[key];
                if (callback === true && value !== null && value !== undefined && value !== '') {
                    arr.push(value);
                } else if (typeof callback === 'function') {
                    res = callback.call(item, value, k);
                    if (res === false) return arr;
                    arr.push(res || value);
                } else {
                    arr.push(value);
                }
                k++;
            }
        }
        return arr;
    },
    trim: function(str) {
        return typeof str === 'string' ? str.replace(/null/g, '').replace(/undefined/g, '') : typeof str === 'number' && !isNaN(str) ? str : '';
    },
    /*
     * 加减乘除运算
     * 解决js计算时的bug
     */
    //加
    jia: function(arg1, arg2) {
        var r1, r2, m, c;
        if (arg1 === null || arg1 === undefined) arg1 = '';
        if (arg2 === null || arg2 === undefined) arg2 = '';
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace('.', ''));
                arg2 = Number(arg2.toString().replace('.', '')) * cm;
            } else {
                arg1 = Number(arg1.toString().replace('.', '')) * cm;
                arg2 = Number(arg2.toString().replace('.', ''));
            }
        } else {
            arg1 = Number(arg1.toString().replace('.', ''));
            arg2 = Number(arg2.toString().replace('.', ''));
        }
        return (arg1 + arg2) / m;
    },
    //减
    jian: function(arg1, arg2) {
        var r1, r2, m, n;
        if (arg1 === null || arg1 === undefined) arg1 = '';
        if (arg2 === null || arg2 === undefined) arg2 = '';
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = r1 >= r2 ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    //乘
    cheng: function(f, s) {
        var m = 0;
        if (f === null || f === undefined) f = '';
        if (f === null || f === undefined) f = '';
        f = f.toString();
        s = s.toString();
        try {
            m += f.split('.')[1].length;
        } catch (e) {}
        try {
            m += s.split('.')[1].length;
        } catch (e) {}
        return Number(f.replace('.', '')) * Number(s.replace('.', '')) / Math.pow(10, m);
    },
    //除
    chu: function(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1,
            r2;
        try {
            t1 = arg1.toString().split('.')[1].length;
        } catch (e) {}
        try {
            t2 = arg2.toString().split('.')[1].length;
        } catch (e) {}
        r1 = Number(arg1.toString().replace('.', ''));
        r2 = Number(arg2.toString().replace('.', ''));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    /**
     * 判断日期大小
     */
    dateGreat: function(max, min) {
        if (typeof max === 'string') {
            max = Date.parse(max);
        } else if (max instanceof Date) {
            max = max.getTime();
        }
        if (typeof min === 'string') {
            min = Date.parse(min);
        } else if (min instanceof Date) {
            min = min.getTime();
        }
        return max > min;
    },
    dateLess: function(min, max) {
        if (typeof max === 'string') {
            max = Date.parse(max);
        } else if (max instanceof Date) {
            max = max.getTime();
        }
        if (typeof min === 'string') {
            min = Date.parse(min);
        } else if (min instanceof Date) {
            min = min.getTime();
        }
        return min < max;
    },
    getWeek: function(data) {
        var me = this,
            days = 86400000,
            date = data ? new Date(data) : new Date(),
            time = date.getTime(),
            week = date.getDay() - 1,
            start,
            end,
            res = {};
        start = time - week * days;
        end = time + (6 - week) * days;
        res.nowWeek = {};
        res.nowWeek.start = me.dateFormat(start, 'yyyy-MM-dd');
        res.nowWeek.end = me.dateFormat(end, 'yyyy-MM-dd');
        res.lastWeek = {};
        res.lastWeek.start = me.dateFormat(start - 7 * days, 'yyyy-MM-dd');
        res.lastWeek.end = me.dateFormat(start - 1 * days, 'yyyy-MM-dd');
        res.nextWeek = {};
        res.nextWeek.start = me.dateFormat(end + 1 * days, 'yyyy-MM-dd');
        res.nextWeek.end = me.dateFormat(end + 7 * days, 'yyyy-MM-dd');
        return res;
    },
    dateForNow: function(time, type) {
        var date,
            week,
            day = ['日', '一', '二', '三', '四', '五', '六'];
        date = new Date(new Date(new Date().toLocaleDateString()));
        if (time >= date.getTime()) {
            return helper.dateFormat(time, 'hh:mm');
        }
        if (time >= date.getTime() - 1000 * 60 * 60 * 24) {
            return type === 1 ? '昨天 ' + helper.dateFormat(time, 'hh:mm') : '昨天';
        }
        week = date.getDay();
        week = week ? week - 1 : 6;
        date.setDate(date.getDate() - week);
        if (time >= date.getTime()) {
            return '星期' + day[new Date(time).getDay()] + (type === 1 ? ' ' + helper.dateFormat(time, 'hh:mm') : '');
        }
        return type === 1 ? helper.dateFormat(time, 'yyyy年MM月dd日 hh:mm') : helper.dateFormat(time, 'yyyy/MM/dd');
    },
    zoomDetect: function() {
        var ratio, screen;
        if (window.devicePixelRatio !== undefined) {
            return window.devicePixelRatio;
        }
        if ((screen = window.screen)) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                return screen.deviceXDPI / screen.logicalXDPI;
            }
        }
        if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            return window.outerWidth / window.innerWidth;
        }
        return ratio;
    },
    /**
     * 数字转千分位
     * num 需要转换的数字 fixed 小数点保留几位
     */
    thousands: function(num, fixed) {
        if (!fixed) fixed = 2;
        if (typeof num !== 'number') num = Number(num);
        if (isNaN(num)) return '';
        num = num.toFixed(fixed).split('.');
        return [num[0].replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,'), num[1]].join('.');
    },
    /**
     * 数字转金额
     */
    amount: function(amount) {
        return this.isNumeric(amount) ? parseFloat(amount).toFixed(2) : '';
    },
    phone: function(tel) {
        if (typeof tel === 'number') {
            tel = String(tel);
        }
        if (!tel) return '';
        if (tel.length === 11) {
            return tel.slice(0, 3) + ' ' + tel.slice(3, 7) + ' ' + tel.slice(7, 11);
        }
    },
    export: function(url, data, open) {
        var me = this;
        if (typeof url !== 'string') return false;
        if (typeof data === 'boolean') {
            open = data;
        } else if (typeof data === 'object') {
            url += '?' + me.param(data);
        }
        open === true ? (window.location.href = url) : window.open(url, '_blank');
    },
    exportPost: function(url, data) {
        var me = this,
            html = [],
            form;
        if (typeof url !== 'string') return false;
        form = document.createElement('form');
        form.id = 'app_export_form';
        form.method = 'post';
        form.action = url;
        form.target = '_blank';
        for (var k in data) {
            if (data[k]) {
                html.push('<input type="hidden" name="', k, '" value="', data[k], '" />');
            }
        }
        form.innerHTML = html.join('');
        document.body.appendChild(form);
        form.submit();
        document.getElementById('app_export_form').remove();
    },
    getStyle: function(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr];
    },
    /**
     * @Author    hyj
     * @DateTime  2019-05-24
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[Array]}    items    [树节点数据对象]
     * @param     {[type]}     id       [要找的节点对应属性]
     * @param     {[String]}   key      [节点对应属性key值]
     * @param     {[String]}   children [孩子节点key值]
     * @return    {[node]}              [找到的节点]
     * 传入树结构数据查询所有节点下对应key值是id的第一个节点
     */
    getTreeNode(items, id, key, children) {
        var me = this,
            k,
            len,
            item;
        if (!Array.isArray(items)) items = [items];
        if (!children) children = 'children';
        k = 0;
        len = items.length;
        while (k < len) {
            item = items[k];
            if (item) {
                if (item[key] === id) return item;
                if (item[children]) {
                    item = me.getTreeNode(item[children], id, key, children);
                    if (item) return item;
                }
            }
            k++;
        }
        return null;
    },
    /**
     * @Author    hyj
     * @DateTime  2019-05-24
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[Array]}    items    [树节点数据对象]
     * @param     {[String]}   children [孩子节点key值]
     * @param     {[Array]}    arr      [节点数组]
     * @return    {[Array]}             [节点数组]
     * 获取树节点下所有子节点
     */
    getLastNode(items, children, arr) {
        var me = this;
        if (!Array.isArray(items)) items = [items]
        if (!children) children = 'children'
        if (!arr) arr = []
        items.map(function(item) {
            var data = item[children]
            if (data && data.length > 0) {
                me.getLastNode(data, children, arr)
            } else {
                arr.push(item)
            }
        })
        return arr;
    },
    fullScreen(screen) {
        /* 全屏展示收起 */
        if (screen === undefined) {
            screen = !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement;
        }
        if (screen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    },
    addClass: function(elems, value) {
        var me = this,
            elem,
            cur,
            classes,
            i,
            k = 0;
        if (!value || !elems) return this;
        if (!Array.isArray(elems)) elems = [elems];
        value = value.match(/\S+/g) || [];
        while (elem = elems[k++]) {
            classes = elem.className.match(/\S+/g) || [];
            i = 0;
            while (cur = value[i++]) {
                if (classes.indexOf(cur) === -1) {
                    classes.push(cur);
                }
            }
            elem.className = classes.join(' ');
        }
    },
    removeClass: function(elems, value) {
        var me = this,
            elem,
            classes,
            i,
            len,
            k = 0;
        if (!value || !elems) return this;
        if (!Array.isArray(elems)) elems = [elems];
        value = value.match(/\S+/g) || [];
        while (elem = elems[k++]) {
            classes = elem.className.match(/\S+/g) || [];
            i = 0;
            len = classes.length;
            while (i < len) {
                if (value.indexOf(classes[i]) !== -1) {
                    classes.splice(i, 1);
                    continue;
                }
                i++;
            }
            elem.className = classes.join(' ');
        }
    },
    getBase64Image: function(image) {
        var me = this,
            canvas,
            ctx;
        if (typeof image === 'string') {
            return new Promise(function(resolve, reject) {
                var img = new Image();
                img.src = image;
                img.onload = function() {
                    resolve(me.getBase64Image(img));
                };
                img.onerror = function() {
                    reject('图片加载失败');
                };
            });
        }
        canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height);
        return canvas.toDataURL('image/' + image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase());
    },
    offset: function(el, type) {
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
};

/* myers算法 */
helper.myers = function(stra, strb) {
    var n = stra.length,
        m = strb.length,
        max = n + m,
        v = { '1': 0 },
        vs = { '0': { '1': 0 } },
        d = 0,
        k,
        snakes,
        columns = ['d', 'k', 'down', 'kPrev', 'xStart', 'yStart', 'xMid', 'yMid', 'xEnd', 'yEnd'],
        items = [];
    for (; d <= max; d++) {
        var tmp = {};
        for (k = -d; k <= d; k += 2) {
            var down = k == -d || k != d && v[k + 1] > v[k - 1];
            var kPrev = down ? k + 1 : k - 1;
            var xStart = v[kPrev];
            var yStart = xStart - kPrev;
            var xMid = down ? xStart : xStart + 1;
            var yMid = xMid - k;
            var xEnd = xMid;
            var yEnd = yMid;
            while(xEnd < n && yEnd < m && stra[xEnd] === strb[yEnd]) {
                xEnd++;
                yEnd++;
            }
            items.push({d, k, down, kPrev, xStart, yStart, xMid, yMid, xEnd, yEnd});
            v[k] = xEnd;
            tmp[k] = xEnd;
            if (xEnd == n && yEnd == m) {
                console.table(items, columns);
                vs[d] = tmp;
                console.log(vs);
                snakes = helper.solution(vs, n, m, d);
                console.log(snakes);
                helper.printRes(snakes, stra, strb);
                return snakes;
            }
        }
        vs[d] = tmp;
    }
};

helper.solution = function(vs, n, m, d) {
    let snakes = [];
    let p = { x: n, y: m };
    for (; d > 0; d--) {
        let v = vs[d];
        let vPrev = vs[d-1];
        let k = p.x - p.y;
        let xEnd = v[k];
        let yEnd = xEnd - k;
        let down = k == -d || k != d && vPrev[k + 1] > vPrev[k - 1];
        let kPrev = down ? k + 1 : k - 1;
        let xStart = vPrev[kPrev];
        let yStart = xStart - kPrev;
        let xMid = down ? xStart : xStart + 1;
        let yMid = xMid - k;
        snakes.unshift([xStart, xMid, xEnd]);
        p.x = xStart;
        p.y = yStart;
    }
    return snakes;
};
   
helper.printRes = function(snakes, arr1, arr2) {
    var defColor = 'color: gray',
        delColor = 'color: red',
        addColor = 'color: green',
        colors = [],
        yOffset = 0,
        consoleStr = '';
    snakes.map(function(snake, index) {
        var s = snake[0],
            m = snake[1],
            e = snake[2],
            large = s,
            i;
        // 处理第一个不变
        if (index === 0 && s !== 0) {
            for (i = 0; i < s; i++) {
                consoleStr += `%c${arr1[i]}\n`;
                colors.push(defColor);
                yOffset++;
            }
        }
        if (m - s == 1) {
            // 删除
            consoleStr += `%c-${arr1[s]}\n`;
            colors.push(delColor);
            large = m;
        } else {
            // 添加
            consoleStr += `%c+${arr2[yOffset]}\n`;
            colors.push(addColor);
            yOffset++;
        }
        // 不变
        for (i = 0; i < e - large; i++) {
            consoleStr += `%c${arr1[large + i]}\n`;
            colors.push(defColor);
            yOffset++;
        }
    });
    console.log(consoleStr, ...colors);
};
   
// let s1 = 'ABCABBA';
// let s2 = 'CBABAC';
// helper.myers(s1, s2);

function initAnimate() {
    var EASE = ['swing', 'linear'];

    function Tween(value, prop, animate, easing) {
        this.el = animate.el;
        this.prop = prop;
        this.easing = EASE.indexOf(easing) !== -1 ? easing : EASE[0];
        this.options = animate.options;
        this.start = this.now = this.get();
        this.end = value;
        this.unit = 'px';
    };

    Tween.prototype = {
        getStyles: function(el) {
            return el.ownerDocument.defaultView.getComputedStyle(el, null);
        },
        get: function() {
            var ret = null,
                computed;
            if (this.prop === 'scrollLeft' || this.prop === 'scrollTop') {
                ret = this.el[this.prop];
            } else {
                computed = this.getStyles(this.el);
                ret = computed.getPropertyValue(this.prop) || computed[this.prop];
            }
            return parseFloat(ret || 0);
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        linear: function(p) {
            return p;
        },
        run: function(percent) {
            var eased = this[this.easing](percent);
            this.pos = eased;
            this.now = (this.end - this.start) * eased + this.start;
            if (this.prop === 'opacity') {
                try {
                    if (this.el.filters) {
                        this.el.filters('alpha').opacity = this.now * 100;
                    } else {
                        this.el.style.opacity = this.now;
                    }
                } catch (e) {}
            } else if (this.prop === 'scrollLeft' || this.prop === 'scrollTop') {
                this.el[this.prop] = this.now;
            } else {
                this.el.style[this.prop] = this.now + this.unit;
            }
            return this;
        }
    };

    var Animate = {
        timers: [],
        getNow: function() {
            setTimeout(function() {
                Animate.now = undefined;
            });
            return (Animate.now = Date.now());
        },
        timer: function(timer, callback, tween) {
            Animate.timers.push({
                timer: timer,
                tween: tween,
                callback: callback
            });
            timer() ? Animate.start() : Animate.timers.pop();
        },
        start: function() {
            if (!Animate.timerId) {
                Animate.timerId = setInterval(Animate.tick, 13);
            }
        },
        stop: function() {
            clearInterval(Animate.timerId);
            Animate.timerId = null;
        },
        tick: function() {
            var timer,
                timers = Animate.timers;
            Animate.now = Date.now();
            for (var i in timers) {
                timer = timers[i];
                if (!timer.timer()) {
                    timers.splice(i--, 1);
                    if (typeof timer.callback === 'function') {
                        timer.callback();
                    }
                }
            }
            !timers.length && Animate.stop();
            Animate.now = undefined;
        }
    };
    /**
     * @Author    hyj
     * @DateTime  2018-11-23
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}    elem     [dom节点或数组]
     * @param     {Object}    prop     [{right: 100}]
     * @param     {Number}    speed    [动画花费时间]
     * @param     {String}    easing   [动画过度效果]
     * @param     {Function}  callback [动画完成回调]
     * @return    {Object}             [helper对象]
     */
    helper.animate = function(elem, prop, speed, easing, callback) {
        if (!Array.isArray(elem)) elem = [elem];
        Array.prototype.slice.call(arguments, 2).map(function(param) {
            switch (typeof param) {
                case 'number':
                    speed = param;
                    break;
                case 'string':
                    easing = param;
                    break;
                case 'function':
                    callback = param;
                    break;
            }
        });
        if (typeof speed !== 'number') speed = 300;
        elem.map(function(el) {
            var stopped,
                animation = {},
                tick = function() {
                    var remaining, percent, len, index
                    if (stopped) return false
                    remaining = Math.max(
                        0,
                        animation.startTime + animation.speed - Animate.now
                    )
                    percent = 1 - (remaining / animation.speed || 0)
                    index = 0
                    len = animation.tweens.length
                    while (index < len) {
                        animation.tweens[index].run(percent)
                        index++
                    }
                    return (percent <= 1 && len && remaining) || false
                };
            animation.el = el;
            animation.speed = speed;
            animation.startTime = Animate.now || Animate.getNow();
            animation.tweens = [];
            for (var k in prop) {
                animation.tweens.push(new Tween(prop[k], k, animation, easing));
            }
            Animate.timer(tick, callback, animation);
        });
        return this;
    };
    helper.stop = function(elem) {
        if (!elem) return false;
        if (!Array.isArray(elem)) elem = [elem];
        elem.map(function(el) {
            var k = 0,
                timers = Animate.timers;
            while (k < timers.length) {
                if (timers[k].tween.el == el) {
                    timers.splice(k, 1);
                } else {
                    k++;
                }
            }
        });
    };
};

Date.prototype.format = function(fmt) {
    let o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};

function ininSelect() {
    function appSelect(options) {
        this.initOptions(options);
    };
    
    appSelect.default = {
        keys: {},
        data: null,
        keysField: 'code',
        nameField: 'name',
        childrenField: 'sunlist',
        valueField: 'sunvalue',
        textField: 'sunname',
        tagField: 'suntag'
    };
    
    appSelect.prototype = {
        initOptions: function(options) {
            this.options = helper.extend({}, appSelect.default, options);
            this.init();
        },
        init: function() {
            var me = this,
                k,
                len,
                key,
                items,
                item,
                data,
                option = me.options,
                valueField = option.valueField,
                textField = option.textField,
                tagField = option.tagField;
            if (!Array.isArray(option.data)) option.data = [];
            me.map = {};
            k = 0;
            items = option.data;
            len = items.length;
            while (k < len) {
                item = items[k];
                key = item[option.keysField];
                if ((key = option.keys[key])) {
                    data = {};
                    data.name = item[option.nameField];
                    data.items = [];
                    item[option.childrenField].map(child => {
                        data.items.push({
                            value: child[valueField],
                            text: child[textField],
                            tag: child[tagField]
                        });
                    });
                    me.map[key] = data;
                }
                k++;
            }
        },
        name: function(type) {
            var data = this.map[type];
            return data ? data.name : '';
        },
        data(type, key) {
            var items = [],
                data = this.map[type];
            if (!data) return items;
            if (key === 'number') {
                data.items.map(item => {
                    items.push({
                        text: item.text,
                        tag: item.tag,
                        value: parseFloat(item.value) || item.value
                    });
                });
                return items;
            } else {
                return JSON.parse(JSON.stringify(data.items));
            }
        },
        text(type, value) {
            let arr = [],
                data = this.data(type);
            if (value !== null && value !== undefined) {
                value = value.toString();
            }
            if (typeof value === 'string') {
                value = value.split(',');
            }
            if (!Array.isArray(value)) {
                value = [value];
            }
            value.map(key => {
                let res = this.getTextByKey(data, key);
                if (res !== undefined) arr.push(res);
            });
            return arr.length == 1 ? arr[0] : arr.join(',');
        },
        getTextByKey(data, value) {
            var k = 0,
                len = data.length;
            while (k < len) {
                if (data[k].value === value) {
                    return data[k].text;
                }
                k++;
            }
        }
    };

    helper.select = new appSelect();
};

export default helper;
