
export function extend(target, source, flag) {
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
 * 
 * @param {*} o 
 */
export function objToArray(o) {
    var array = [];
    for (var key in o) {
        array.push(o[key]);
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