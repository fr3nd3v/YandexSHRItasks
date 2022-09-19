


export default function(html, css) {
    //  Копируем js объект костылем 
    const copyiedHtml = JSON.parse(JSON.stringify(html));

    //  функция получение\определения селектора
    const getSelector = (htmlObj, selector, mainTag) => {
        let setSelector = selector.split(" ");

        let fineshedArrOfEl = [];

        if (setSelector.length === 1) {

            if (htmlObj.tag === setSelector[0])
            fineshedArrOfEl.push(htmlObj);

            if (htmlObj.children && htmlObj.children.length > 0) {
                for (let htmlELParent of htmlObj.children) {
                    fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(htmlELParent, setSelector[0], null));}
            }
        }
        else {
            if (setSelector.length === 2) {
                let roots = getSelector(htmlObj,setSelector[0], null);
                for (let htmlElChild of roots) {
                    for (let child of htmlElChild.children) {
                        fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(child, setSelector[1], null));
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
                                for (let htmlElChild of htmlObj.children) {
                                    fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(htmlElChild, selector, htmlObj.tag));
                                }
                            }
                            break;  
                    case '~':
                        let pastEl = null;
                        for (let htmlElChild of htmlObj.children) {
                            if (htmlElChild.tag) {
                                if (pastEl === setSelector[0] && htmlElChild.tag === setSelector[2]) {
                                    fineshedArrOfEl.push(htmlElChild);
                                }
                                else {
                                    if (pastEl === null) {
                                        pastEl = htmlElChild.tag;
                                    }
                                }
                            }
                        }
                        for (let htmlElChild of htmlObj.children) {
                            if (htmlElChild.tag) {
                                fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(htmlElChild,  selector, null));
                            }
                        }
                        break;

                    case '+':
                        let pastElTwo = null;
                        for (let htmlElChild of htmlObj.children) {
                            if (i.tag) {
                                if (pastElTwo === setSelector[0] && htmlElChild.tag === setSelector[2]) {
                                    fineshedArrOfEl.push(htmlElChild);
                                    break;
                                }
                                else {
                                    pastElTwo = htmlElChild.tag;
                                }
                            }
                        }
                        for (let htmlElChild of htmlObj.children) {
                            if (htmlElChild.tag) {
                                fineshedArrOfEl = fineshedArrOfEl.concat(getSelector(htmlElChild, selector, null));
                            }
                        }
                        break;     
                }
            }
        }
        return fineshedArrOfEl;
    }
    сhildrenStyles(copyiedHtml, copyiedHtml.styles);

    const stylesArr = [];

    // пребираем css, получаем элементы HTML, формируем массив стилей 
    for (let style of css) {
        const elementsObj = getSelector(copyiedHtml,  style.selector, copyiedHtml.tag);
        for (let element of elementsObj) {
            let getChild = сhildrenStyles(element, style.declarations);
            stylesArr.push(getChild);
        }
    }
    return copyiedHtml;
}

// ставим родителям стиль
function parentStyles(copyiedHtml, styles) {
    if (copyiedHtml.styles) {
        for (let values of Object.keys(styles)) {
            copyiedHtml.styles[values] = styles[values];
        }
    }
    return copyiedHtml;
}

// ставим детям стиль
function сhildrenStyles(copyiedHtml, css) {
    copyiedHtml = parentStyles(copyiedHtml, css);
    if (copyiedHtml.children && copyiedHtml.children.length > 0) {
        for (let i in copyiedHtml.children) {
            copyiedHtml.children[i] = сhildrenStyles(copyiedHtml.children[i], css);
        }
    }
    return copyiedHtml;
}





// 111111111111111111111111111

function(html, css) {
    
    //  функция получение\определения селектора, + рекусивно вызывающийся 
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
module.exports = main;



// 111111111111111111111111111

function findBySelector(node, rootTag, selector) {
    const sel = selector.split(" ");
    let result = [];
    if (sel.length === 1) {
        if (node.tag === sel[0])
            result.push(node);
        if (node.children && node.children.length > 0) {
            for (let i of node.children)
                result = result.concat(findBySelector(i, undefined, sel[0]));
        }
    }
    else {
        if (sel.length === 2) {
            let roots = findBySelector(node, undefined, sel[0]);
            for (let i of roots) {
                for (let j of i.children) {
                    result = result.concat(findBySelector(j, undefined, sel[1]));
                }
            }
        }
        else {
            switch (sel[1]) {
                case '>':
                    if (rootTag === sel[0] && node.tag === sel[2]) {
                        result.push(node);
                    }
                    if (node.children) {
                        for (let i of node.children) {
                            result = result.concat(findBySelector(i, node.tag, selector));
                        }
                    }
                    break;
                case '+':
                    let last = undefined;
                    for (let i of node.children) {
                        if (i.tag) {
                            if (last === sel[0] && i.tag === sel[2]) {
                                result.push(i);
                                break;
                            }
                            else {
                                last = i.tag;
                            }
                        }
                    }
                    for (let i of node.children) {
                        if (i.tag) {
                            result = result.concat(findBySelector(i, undefined, selector));
                        }
                    }
                    break;
                case '~':
                    let last2 = undefined;
                    for (let i of node.children) {
                        if (i.tag) {
                            if (last2 === sel[0] && i.tag === sel[2]) {
                                result.push(i);
                            }
                            else {
                                if (last2 === undefined) {
                                    last2 = i.tag;
                                }
                            }
                        }
                    }
                    for (let i of node.children) {
                        if (i.tag) {
                            result = result.concat(findBySelector(i, undefined, selector));
                        }
                    }
                    break;
            }
        }
    }
    return result;
}
function setStyles(buffNode, styles) {
    if (buffNode.styles) {
        for (let i of Object.keys(styles)) {
            buffNode.styles[i] = styles[i];
        }
    }
    return buffNode;
}
function setStylesToChildren(buffNode, css) {
    buffNode = setStyles(buffNode, css);
    if (buffNode.children && buffNode.children.length > 0) {
        for (let i in buffNode.children) {
            buffNode.children[i] = setStylesToChildren(buffNode.children[i], css);
        }
    }
    return buffNode;
}
function main(html, css) {
    const buffHtml = JSON.parse(JSON.stringify(html));
    setStylesToChildren(buffHtml, html.styles);
    let finalStyles = [];
    for (let i of css) {
        let node = findBySelector(buffHtml, buffHtml.tag, i.selector);
        for (let j of node) {
            let k = setStylesToChildren(j, i.declarations);
            finalStyles.push(k);
        }
    }
    
    return buffHtml;
}
module.exports = main;