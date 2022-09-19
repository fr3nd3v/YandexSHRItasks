// clientHeight


const rootNode = document.querySelector('.root');
const columnCount = 3;
const elementGap = 100;
// function renderWaterfall(rootNode, columnCount, elementGap) {
//     if(rootNode.children.length === 0 || rootNode === null) return;
  
//     let gap = (isNaN(parseInt(elementGap)) ? 0 : parseInt(elementGap));
//     let count = (isNaN(parseInt(columnCount)) || parseInt(columnCount) === 0 ? 1 : parseInt(columnCount));
//     let rootWidth = rootNode.offsetWidth;
//     let columnWidth = (rootWidth - gap * (count - 1)) / count;
  
//     let articles = [];
  
//     [...rootNode.children].forEach((node) => {
//         articles.push(node);
//     });
  
//     articles.reverse();
  
//     let container = document.createElement('div');
  
//     container.style.width = `100%`;
//     container.style.height = `100%`;
//     container.style.display = 'flex';
//     container.style.flexDirection = 'row';
//     container.style.flexWrap = 'nowrap';
//     container.style.justifyContent = 'space-between';
  
//     rootNode.append(container);
  
//     while (count) {
//       let div = document.createElement('div');
//       div.style.display = "flex";
//       div.style.flexDirection = 'column';
//       div.style.height = "fit-content";
//       div.style.width = `${columnWidth}px`;
  
//       container.append(div);
  
//       count--;
//     }
  
//     while(articles.length) {
//       let column = getShortestColumn([...container.children]);
  
//       let article = articles.pop();
//       container
//       article.style.marginBottom = `${gap}px`;
  
//       column.append(article);
  
//     }
  
//     [...container.children].forEach(column => {
//       if(column.children.length > 0)
//         column.lastChild.style.marginBottom = '0';
//     });
  
//     function getShortestColumn(columns) {
//       if(columns.length === 0) return;
  
//       let lastNodesValues = [];
  
//       //getting array of bottom side height of last article of each column
//       columns.forEach((column) => {
//         if(column.children.length === 0) {
//           lastNodesValues.push(0);
//         } else {
//           let r = column.getBoundingClientRect();
  
//           lastNodesValues.push(r.bottom);
//         }
//       });
  
//       let shortestColumnIndex = lastNodesValues.indexOf(Math.min(...lastNodesValues));
  
//       return columns[shortestColumnIndex];
//     }
  
//   }


function renderWaterfall(rootNode, columnCount, elementGap) {
    const adsArr = [...rootNode.children].reverse();
    const wrapRow = document.createElement('div');
    wrapRow.style.display = 'flex';
    wrapRow.style.flexDirection = 'row';
    wrapRow.style.justifyContent = 'space-between';
    rootNode.append(wrapRow);
    const columnWidth = (rootNode.offsetWidth - elementGap * (columnCount - 1)) / columnCount;
    for (let i = 0; i < columnCount; i++) {
        const wrapColumn = document.createElement('div');
        wrapColumn.style.display = "flex";
        wrapColumn.style.flexDirection = 'column';
        wrapColumn.style.height = "fit-content";
        wrapColumn.style.width = `${columnWidth}px`;
        wrapRow.append(wrapColumn);  
        console.log(i);
    }
    while(adsArr.length) {
      const column = minIndexColumns([...wrapRow.children]);
      const ad = adsArr.pop();
      ad.style.marginBottom = `${elementGap}px`;
      column.append(ad);
    }
    [...wrapRow.children]
    .map(el => el.querySelector(`.el:last-child`))
    .forEach((ad) => {
        ad.style.marginBottom = '0';
    })
    function minIndexColumns(columns) {
      const endNode = [];
      columns.forEach((column) => {
        column.children.length === 0 ? endNode.push(0) : endNode.push(column.getBoundingClientRect().bottom);
      });
      return columns[endNode.indexOf(Math.min(...endNode))];
    }
}















// function renderWaterfall(rootNode, columnCount, elementGap) {
// 	if (!columnCount || !rootNode) return;
//     // fn to find min column
//     const firstWidth = rootNode.offsetWidth
//     const getMinColumns = (columns) => {
//         const arrCLObj = [...columns].map((el, index) => ({index: index, heightOfAd: el.offsetHeight,}));
        
//         const minSize = Math.min(...arrCLObj.map(ad => ad.heightOfAd));

//         const minColumn = arrCLObj.find(ad => ad.heightOfAd === minSize).index;
//         console.log(minColumn);
//         return minColumn && minColumn >= 0 ? minColumn : 0;
//     }
 
//     // Style for rootNode
//     rootNode.style.width = `100%`;
//     rootNode.style.height = `100%`;
//     rootNode.style.display = "flex";
//     rootNode.style.alignItems = "flex-start";
//     rootNode.style.justifyContent = "space-between";

    
//         rootNode.style.flexDirection = 'row';
//         rootNode.style.flexWrap = 'nowrap';
//     const rootChildren = [...rootNode.children];
//     // clear all rootNode Children
//     rootChildren.forEach(child => {
//         child.remove()
//     });
//     // create column for Ads
//     for (let i = 0; i < columnCount; i++) {
//         const columnForAd = document.createElement("div");
//         columnForAd.style.flex = `0 1 calc((100% - ${(columnCount - 1) * elementGap}px) / ${columnCount})`;
        
//         rootNode.append(columnForAd);
//     }
//     const adColumns = rootNode.children; 
//     // create the bottom margin for each ad
//     [...rootChildren].forEach(ad => {
//         ad.style.marginBottom = elementGap + 'px';
     
//         adColumns[getMinColumns(adColumns)].append(ad);
//     });
//     // remove the bottom margin of the last elements of the column 
//     rootNode.style.boxSizing = 'border-box';
//     [...adColumns]
//     .map(el => el.querySelector(`.el:last-child`))
//     .forEach((ad) => {
//         ad.style.marginBottom = '0';
//     })
// }





// function renderWaterfall(rootNode, columnCount, elementGap) {
//     const elements = rootNode.children;
//     const columnWidth = findColumnWidth();

//     const columns = new Array(columnCount);
//     const columnHeights = new Array(columnCount).fill(0);

//     for (let i = 0; i < columns.length; i++) {
//         columns[i] = [];
//     }

//     rootNode.style.width = columnWidth + 'px';

//     for (let element of elements) {
//         const index = findIndexOfMinHeight();

//         columns[index].push(element);
//         columnHeights[index] += element.clientHeight + elementGap;
//     }

//     console.log('columns: ', columns);
//     console.log('columnHeights: ', columnHeights);

//     for (let i = 0; i < columns.length; i++) {
//         const columnDiv = createColumnDiv(columns[i]);
//         columnDiv.style.width = columnWidth + 'px';

//         if (i < columns.length - 1) {
//             columnDiv.style.marginInlineEnd = elementGap + 'px';
//         }

//         rootNode.appendChild(columnDiv);
//     }

//     rootNode.style.display = 'flex';
//     rootNode.style.width = '100%';

//     function findColumnWidth() {
//         const rootWidth = rootNode.clientWidth;
//         const sumGaps = (columnCount - 1) * elementGap;

//         return (rootWidth - sumGaps) / columnCount;
//     }

//     function findIndexOfMinHeight() {
//         const minHeight = Math.min(...columnHeights);
//         return columnHeights.indexOf(minHeight);
//     }

//     function createColumnDiv(column) {
//         const columnDiv = document.createElement('div');

//         for (let i = 0; i < column.length; i++) {
//             if (i < column.length - 1) {
//                 column[i].style.marginBlockEnd = elementGap + 'px';
//             }
//             columnDiv.appendChild(column[i]);
//         }
        
//         return columnDiv;
//     }
// }

  renderWaterfall(rootNode, columnCount, elementGap)


// const [root] = document.getElementsByClassName('root')

// function renderWaterfall(rootNode, columnCount, elementGap) {
//   //
//   //variables
//   //
//   const rootNodeWidth = rootNode.getBoundingClientRect().width
//   const rootNodeChildren = [...rootNode.children]
//   const rootTopBorderWidth = parseFloat(window.getComputedStyle(rootNode, null)["border-top-width"])
//   const rootLeftBorderWidth = parseFloat(window.getComputedStyle(rootNode, null)["border-left-width"])
//   //elementWidth = (container width - gaps) / columns count
//   const elementWidth = Math.floor((rootNodeWidth - ((columnCount - 1) * elementGap)) / columnCount)
//   let RootNodeHeight //num
//   let ColumnsHeightMap = []

//   rootNode.style.position = "relative"

//   //init ColumnsHeightMap
//   for (let i = 0; i < columnCount; i++) {
//     ColumnsHeightMap.push(0)
//   }


//   //
//   //adjusting elements
//   //
//   for (let i = 0; i < rootNodeChildren.length; i++) {
    
//     const [elX, elY, idx] = findNextCoords()
//     const el = rootNodeChildren[i];
//     el.style.position = "absolute";
//     el.style.left = `${elX}px`
//     el.style.top = `${elY}px`
//     el.style.width = `${elementWidth}px`

//     const elHeight = el.getBoundingClientRect().height
//     ColumnsHeightMap[idx] += elHeight + elementGap
//   }

//   //adjust root node height
//   RootNodeHeight = Math.max(...ColumnsHeightMap) - elementGap
//   rootNode.style.height = `${Math.ceil(RootNodeHeight)}px`

//   //
//   //functions
//   //
//   function findNextCoords() {
//     let minY = ColumnsHeightMap[0]
//     let idx = 0

//     ColumnsHeightMap.forEach((el, i) => {
//       if (el < minY) {
//         minY = el
//         idx = i
//       }
//     })

//     let x = idx * (elementWidth + elementGap) - rootLeftBorderWidth
//     let y = minY - rootTopBorderWidth

//     return [x, y, idx]
//   }
// }




// function renderWaterfall(rootNode, columnCount, elementGap) {
//     // fn to find min column
//     const getMinColumns = (columns) => {
//         const arrCLObj = [...columns].map((el, index) => ({index: index, heightOfAd: el.clientHeight,}));
        
//         const minSize = Math.min(...arrCLObj.map(ad => ad.heightOfAd));

//         const minColumn = arrCLObj.find(ad => ad.heightOfAd === minSize).index;
//         return minColumn
//     }
 
//     // Style for rootNode
//     rootNode.style.display = "flex";
//     rootNode.style.alignItems = "flex-start";
//     rootNode.style.justifyContent = "space-between";
//     const rootChildren = [...rootNode.children];
//     // clear all rootNode Children
//     rootChildren.forEach(child => {
//         child.remove()
//     });
//     // create column for Ads
//     for (let i = 0; i < columnCount; i++) {
//         const columnForAd = document.createElement("div");
//         columnForAd.style.flex = `0 1 calc((100% - ${(columnCount - 1) * elementGap}px) / ${columnCount})`;
//         rootNode.append(columnForAd);
//     }
//     const adColumns = rootNode.children; 
//     // create the bottom margin for each ad
//     [...rootChildren].forEach(ad => {
//         ad.style.marginBottom = elementGap + 'px';
     
//         adColumns[getMinColumns(adColumns)].append(ad);
//     });
//     // remove the bottom margin of the last elements of the column 
//     [...adColumns]
//     .map(el => el.querySelector(`.el:last-child`))
//     .forEach((ad) => {
//         ad.style.marginBottom = '0';
//     })
// }





// сомнительно

// function renderWaterfall(rootNode, columnCount, elementGap) {
//     let columnsContainer = document.createElement("section");
//     document.body.append(columnsContainer);
  
//     let columns = creatColumns(columnCount);
//     columnsContainer.append(...columns);
  
//     Array.from(rootNode.getElementsByClassName("el")).forEach((el) =>
//       getShortestColumn(columns).append(el)
//     );
  
//     columnsContainer.style.display = "flex";
//     setGap(elementGap, columnsContainer, ...columns);
//   }
  
//   function creatColumns(columnCount) {
//     let columns = [];
//     for (let i = 0; i < columnCount; i++) {
//       columns.push(creatColumn());
//     }
//     return columns;
//   }
  
//   function creatColumn() {
//     let column = document.createElement("div");
//     column.style.display = "flex";
//     column.style.flexDirection = "column";
//     return column;
//   }
  
//   function getShortestColumn(columns) {
//     let indexOfShortest = 0;
//     let minHeight = columns[0].offsetHeight;
  
//     for (let i = 0; i < columns.length; i++) {
//       if (columns[i].offsetHeight < minHeight) {
//         minHeight = columns[i].offsetHeight;
//         indexOfShortest = i;
//       }
//     }
  
//     return columns[indexOfShortest];
//   }
  
//   function setGap(elementGap, ...tags) {
//     tags.forEach((tag) => (tag.style.gap = elementGap + "px"));
//   }
  
//   renderWaterfall(document.querySelector("div.root"), 4, 20);