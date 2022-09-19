
// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.

import { resolveModuleName } from "../node_modules/typescript/lib/typescript";
export default function main(game, start) {
    const mySet = new Set();
    const result = {x: null, y: null};
    // сюда будем записовать все пройденые кординаты
    // узнаем возможность прохода в какую-либо сторону
    const mayMove = async (x,y) => {
        mySet.add(`${x} ${y}`)
        
        
        return game.state(x, y);
    }
    // ходим вверх и вызываем функцию digger
    const moveUp = (x,y) => {
        console.log('up');
        switch (result.x != null) {
            case true:
                return
            default:
                // ложим в массив x y, мол мы уже были на этих кординаиах
                
                return game.up(x, y)
                .then(() => digger(x, y - 1))
        }
    }
    // ходим влево и вызываем функцию digger
    const  moveLeft = async (x,y) => {
        switch (result.x != null) {
            case true:
                return
            default:
                return game.left(x, y)
                .then(() => digger(x - 1, y))
        }
    }
    // ходим вправо и вызываем функцию digger
    const moveRhight = async (x,y) => {
        switch (result.x != null) {
            case true:
                return;
            default:
                return game.right(x, y)
                .then(() => digger(x + 1, y))
        }
        
    }
    // ходим вниз и вызываем функцию digger
    const moveDown = async (x,y) => {
        switch (result.x != null) {
            case true:
                break;
            default:  
                return game.down(x, y)
                .then(() => digger(x, y + 1))      
        }
    }
    // digger будет осматриватся по сторонам и ходить в те стороны где нет стены 
    const digger = async (x,y) =>{
        const mayMoveObj = await mayMove(x,y);
        // если x, y === finish
        switch (mayMoveObj.finish) {
            case true:
                result.x = x
                result.y = y   
            default:
                break;
        }
        mayMoveObj.right && !mySet.has(`${x + 1} ${y}`) ?  moveRhight(x, y) : false;

        mayMoveObj.bottom && !mySet.has(`${x} ${y + 1}`) ?  moveDown(x, y) : false;
            
        mayMoveObj.left && !mySet.has(`${x - 1} ${y}`) ?  moveLeft(x, y) : false;
        
        mayMoveObj.top && !mySet.has(`${x} ${y - 1}`) ? moveUp(x, y ) : false
    }
    const statusOfResult = () => new Promise((resolve, reject) => {
        switch (true) {
            case result.x != null:
              
                resolve(result);
                break;
            default:
                finalyTime += 100;
                console.log(finalyTime);
                // console.log(finalytime);
                setTimeout(() => {     
                    // строим цепочку промисов
                    statusOfResult().then(resolve)
                }, 100);
                break;
                
        }
    });
    let finalyTime = 0
    // костыль какой-то... 
    const getResult = async () => {
     
        const waitResult = await statusOfResult(); //Если результат не приходит с первого раза, то код ниже не выполняется
        switch (waitResult) {
            case waitResult:
                return waitResult;
        }
    }
    return digger(start.x, start.y)
    .then(() => digger2(start.x, start.y))
    .then(() => digger3(start.x, start.y))
    .then(() => getResult() ) 
    
}


