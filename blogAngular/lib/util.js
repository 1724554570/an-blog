export function extend(target, source, flag) {
    source = source || {};
    for (var key in source) {
        let HOP = source.hasOwnProperty(key);
        if (HOP) {
            flag ? (target[key] = source[key]) : (target[key] === void 0 && (target[key] = source[key]));
        }
    }
    return target;
}

export function trim(string) {
    string = string || "";
    return string.replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, "");
}

export function replaceSymbol(string, all) {
    if (all && all !== '|') {
        return string.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, '');
    }
    if (all && all === '|') {
        return string.replace(/[\`|\^|\\|\"|\'|\/|]/g, '|');
    }
    return string;
}

/**
 * 过滤空对象 Key => Value
 * @param {*} o Object
 */
export function trimField(o) {
    let n = {}, k;
    for (k in o) {
        o[k] ? (n[k] = o[k]) : '';
    }
    return n;
}

/**
 * 
 * @param {*} o 
 */
export function objToArray(o) {
    let array = [];
    for (let k in o) {
        let v = o[k];
        if (v) {
            array.push(v);
        }
    }
    return array;
}

export function isType(o) {
    return ({}).toString.call(o);
}

export function toJson(o) {
    if (!o || isType(o) === '[object Array]' && o.length < 1) {
        return null;
    }
    o = JSON.stringify(o);
    o = JSON.parse(o);
    return o;
}

/**
 * 获取UUID值
 * @param {*} replaceSymbol 是否返回带 - 的值
 */
export function SymbolUuid(replaceSymbol) {
    var b = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (f) {
        var e = Math.random() * 16 | 0,
            d = (f === "x") ? e : (e & 3 | 8);
        return d.toString(16)
    });
    return (replaceSymbol) ? (b).replace(/[\-]/g, "") : b;
}

/**
 * 格式化SQL
 */
export const toSql = {
    insert: function (table, field, value) {
        'INSERT INTO ' + table + ' (' + field + ') VALUES (' + value + ')';
    },
    update: function (table, field, condition) {
        return 'UPDATE ' + table + ' SET ' + field + ' WHERE ' + condition;
    }
}