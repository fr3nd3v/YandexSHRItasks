module.exports = function(html, css) {
    
    //  функция получение\определения селектора
    function getSelector(htmlObj, mainTag, selector) {
        const setSelector = selector.split(" ");
    
        let fineshedArrOfEl = [];
    
        if (setSelector.length === 1) {
            if (htmlObj.tag === setSelector[0])
            fineshedArrOfEl.push(htmlObj);
    
            if (htmlObj.children && htmlObj.children.length > 0) {
                for (let child of htmlObj.children)
                    fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(child, undefined, setSelector[0]));
            }
        }
        else {
            if (setSelector.length === 2) {
                let mainTags = getSelector(htmlObj, undefined, setSelector[0]);
                for (let tag of mainTags) {
                    for (let child of tag.children) {
                        fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(child, undefined, setSelector[1]));
                    }
                }
            }
            else {
                //tag1 > tag2
                // tag1 + tag2
                // tag1 ~ tag2
                switch (setSelector[1]) {
                    case '>':
                        if (mainTag === setSelector[0] && htmlObj.tag === setSelector[2]) {
                            fineshedArrOfEl.push(htmlObj);
                        }
                        if (htmlObj.children) {
                            for (let child of htmlObj.children) {
                                fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(child, htmlObj.tag, selector));
                            }
                        }
                        break;
                    case '+':
                        let pastEl = undefined;
                        for (let child of htmlObj.children) {
                            if (child.tag) {
                                if (pastEl === setSelector[0] && child.tag === setSelector[2]) {
                                    fineshedArrOfEl.push(child);
                                    break;
                                }
                                else {
                                    pastEl = child.tag;
                                }
                            }
                        }
                        for (let child of htmlObj.children) {
                            if (child.tag) {
                                fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(child, undefined, selector));
                            }
                        }
                        break;
                    case '~':
                        let past = undefined;
                        for (let child of htmlObj.children) {
                            if (child.tag) {
                                if (past === setSelector[0] && child.tag === setSelector[2]) {
                                    fineshedArrOfEl.push(child);
                                }
                                else {
                                    if (past === undefined) {
                                        past = child.tag;
                                    }
                                }
                            }
                        }
                        for (let child of htmlObj.children) {
                            if (child.tag) {
                                fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(child, undefined, selector));
                            }
                        }
                        break;
                }
            }
        }
        return fineshedArrOfEl;
    }
    function setCSS(copyiedHtml, styles) {
        if (copyiedHtml.styles) {
            for (let i of Object.keys(styles)) {
                copyiedHtml.styles[i] = styles[i];
            }
        }
        return copyiedHtml;
    }
    function сhildrenStyles(copyiedHtml, css) {
        copyiedHtml = setCSS(copyiedHtml, css);
        if (copyiedHtml.children && copyiedHtml.children.length > 0) {
            for (let i in copyiedHtml.children) {
                copyiedHtml.children[i] = сhildrenStyles(copyiedHtml.children[i], css);
            }
        }
        return copyiedHtml;
    }
    //  Копируем js объект костылем 
    const copyiedHtml = JSON.parse(JSON.stringify(html));

    сhildrenStyles(copyiedHtml, html.styles);

    let styleArr = [];
     // пребираем css, получаем элементы HTML, формируем массив стилей 
    for (let style of css) {
        let elementsObj = getSelector(copyiedHtml, copyiedHtml.tag, style.selector);
        for (let element of elementsObj) {
            let getChild = сhildrenStyles(element, style.declarations);
            styleArr.push(getChild);
        }
    }
    
    return copyiedHtml;
}
