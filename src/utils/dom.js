export function hasClass (dom, clsName) {
    const reg = new RegExp('(^ | \\s)' + clsName + '(\\s | $)');
    return reg.test(dom.className);
};

export function addClass (dom, clsName) {
    if (hasClass(dom, clsName)) return;
    const classArr = dom.className.split(' ');
    classArr.push(clsName);
    dom.className = classArr.join(' ');
};

export function removeClass (dom, clsName) {
    if (!hasClass(dom, clsName)) return;
    const classArr = dom.className.split(' ');
    const index = classArr.indexOf(clsName);
    classArr.splice(index, 1);
    dom.className = classArr.join(' ');
};

export function toggleClass (dom, clsName) {
    if (hasClass(dom, clsName)) {
        removeClass(dom, clsName);
    } else {
        addClass(dom, clsName);
    }
};
