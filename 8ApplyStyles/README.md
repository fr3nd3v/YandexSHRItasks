
# Подстановка стилей (Яндекс ШРИ)

## Запуск
1. Установить зависимости `npm i`
2. Запустить компилятор TS с наблюдением `npm run watch`
3. Запустить "Live Server"

Дан набор CSS-правил и HTML-дерево, требуется применить CSS и выдать итоговый HTML.

Нужно написать и экспортировать функцию, которая установит в свойства styles HTML-элементов финальные значения и вернёт это дерево.

Описание функции и параметров дано на Typescript, но функцию нужно написать на JS. Важно использовать именно module.exports = для экспорта функции.

```javascript
module.exports = function(html: HtmlNode, css: Array<CssRule>): HtmlNode {
    
}
```

## Формат данных
```javascript
export type TextNode = {
    type: 'TEXT';
    text: string;
}
export type ElementNode = {
    type: 'ELEMENT'
    styles: Record<string, string>;
    tag: string;
    children: Array<ElementNode | TextNode>;
}
export type HtmlNode = ElementNode | TextNode;
export type CssRule = {
  selector: string;
  declarations: Record<string, string>;
}
```

## Ограничения:
- Селекторы содержат только теги.
- Максимальное количество тегов в одном селекторе — два (если есть комбинатор).
- Селекторы, которые содержат только один тег, идут раньше других селекторов, т.е. сначала будут идти правила вида tag1 и tag2, а уже потом – tag1 tag2.
- Есть следующие комбинаторы, с правилами как в CSS:
  - tag1 tag2
  - tag1 > tag2
  - tag1 + tag2
  - tag1 ~ tag2
- CSS содержит правила только на наследуемые свойства, такие как color, font-size и т.д. (https://developer.mozilla.org/ru/docs/Web/CSS/inheritance#inherited_properties). Это значит, что если, к примеру, у родителя задан цвет, то его надо выставить и у детей.
- Для корневого элемента HTML в стилях заданы все возможные свойства потомков (не значения, а именно свойства, такие как color и т.д.). Т.е. если какой-то из потомков задаёт цвет, то для корневого элемента цвет будет тоже задан.
  - Цвета будут заданы в формате rgb(0, 255, 0).
  - В CSS не будет сокращенных свойств, таких как background, font.
  - Правила не содержат такие значения как inherit, unset и т.д.
  - Поле styles изначально пустое ({}) для всех элементов

## Входные данные
Пусть HTML и CSS имели следующий вид:

```html
<html>
<head>
  <style>
    parent {
      color: rgb(0, 255, 0);
    }
  
    tag {
      color: rgb(0, 255, 0);
    }
  </style>
</head>
<body>
  <parent>
    <tag>text</tag>
  </parent>
</body>
</html>
```

Тогда функция-решение будет вызвана со следующими параметрами:
```javascript
const html = {
  "type": "ELEMENT",
  "tag": "parent",
  "styles": {},
  "children": [
    {
      "type": "TEXT",
      "text": "\n    "
    },
    {
      "type": "ELEMENT",
      "tag": "tag",
      "styles": {},
      "children": [
        {
          "type": "TEXT",
          "text": "text"
        }
      ]
    },
    {
      "type": "TEXT",
      "text": "\n"
    }
  ]
};
const css = [
  {
    "selector": "parent",
    "declarations": {
      "color": "rgb(0, 255, 0)"
    }
  },
  {
    "selector": "tag",
    "declarations": {
      "color": "rgb(0, 255, 0)"
    }
  }
];
const result = solution(html, css);
```



# html-node-values

Для запуска `npm install && npm start`. После этого открыть http://localhost:5000/.
<!-- npm install -and npm start -->
<!-- (--location=global install) -and (--location=global start) -->
Решение можно писать в файле `src/main.js` (HMR не доступен, необходимо обновлять страницу вручную).
