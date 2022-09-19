function solution(n, width, height){
    const column = Math.ceil(Math.sqrt(n));
    const widthOfPhoto = width / column;
    const heightOfPhoto = height / n;
    const centerOfPhoto = widthOfPhoto / 2;
    const rows = n / column;
    const arr = [];
    const xCorOneRow = []
    const yCorRows = []
    const firstRowIsTypical = n % column;

    for (let i = 0; i < n; i++) {
        arr.push({
            width: Math.round(widthOfPhoto),
            height: Math.round(heightOfPhoto),
            x: null,
            y: null
        });
    }
    
    for (let i = 0; i < column; i++) {
        let xCor = Math.round(widthOfPhoto * i + centerOfPhoto);
        xCorOneRow.push(xCor)
       
    }
    const xCorArr = []
    for(let i = 0; i < column; i++){
        xCorArr.push(...xCorOneRow)
        
    }

    let counterX = 0

    for (let index = 0 + firstRowIsTypical; index < arr.length; index++) {
        arr[index].x = xCorArr[counterX]
        counterX++
    }

   
    for(let i = 0; i < rows; i++){
        let yCor = Math.round(heightOfPhoto * i + heightOfPhoto);
        for(let j = 0; j < column; j++){
            yCorRows.push(yCor)
        }  
    }
    let  counterY = 0;
    for (let index = 0 + firstRowIsTypical; index < arr.length; index++) {
        arr[index].y = yCorRows[counterY]
        counterY++
    }
    if(firstRowIsTypical){
       let offsetOfFirstRow = (widthOfPhoto * (column - firstRowIsTypical)) / 2;
       for(let i = 0; i < column; i++){
        arr[i].x = Math.round(offsetOfFirstRow + ((widthOfPhoto * i) + (widthOfPhoto / 2)));
        arr[i].y = 0; 
       }
    }
    return arr;
}
