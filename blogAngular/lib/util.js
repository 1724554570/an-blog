
export function extend(target, source, flag) {
    for (var key in source) {
        if (source.hasOwnProperty(key))
            flag ? (target[key] = source[key]) : (target[key] === void 0 && (target[key] = source[key]));
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