let rectangleCount = 0;
const rectanglePush = document.getElementById('rectanglePush');
let RectangleWidth = 60;
let RectangleHeight = 60;
let fontSizeRec = null;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let saveLastLetter = null;
let flag = 0;
let lastRectangleLetter = null;
let clickCount = 0;
let firstSelectRectangle = null;
const rectangles = []; 
let unviewedRectangles = [];

rectanglePush.addEventListener('click', () => {
    createRectangles();
});

function swapLetters() {

    shuffle(unviewedRectangles);

    for (let i = 0; i < unviewedRectangles.length; i++) {

        if (!unviewedRectangles[i].viewed) {
            const nextRectangleIndex = (i + 1) % unviewedRectangles.length; 

            if (!unviewedRectangles[nextRectangleIndex].viewed) {
                const tempLetter = unviewedRectangles[i].innerText; 
                unviewedRectangles[i].innerText = unviewedRectangles[nextRectangleIndex].innerText;
                unviewedRectangles[nextRectangleIndex].innerText = tempLetter;
            }
        }
    }
}
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function createRectangles() {
    const rectangleContainer = document.getElementById('rectangleContainer');
    const sizeIncrement = 20;
    
    for (let i = 0; i < 3; i++) {
        const rectangle = document.createElement('div');
        rectangle.className = 'rectangleLayout3';

        rectangle.style.width = RectangleWidth + 'px';
        rectangle.style.height = RectangleHeight + 'px';

        RectangleWidth += sizeIncrement;
        RectangleHeight += sizeIncrement;

        rectangle.viewed = false;
        rectangle.opened = false;
        rectangle.paired = false;
        
        if(i==0) {
            if(flag==0){
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                rectangle.innerText = alphabet[randomIndex];
                lastRectangleLetter = rectangle.innerText;
                flag = 1
            }
            else{
                rectangle.innerText = saveLastLetter;
                flag=0;
            }
        }
        else if (i==1){
            if (flag == 0){
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                rectangle.innerText = alphabet[randomIndex];
                lastRectangleLetter = rectangle.innerText
            }
            else{
                rectangle.innerText = lastRectangleLetter
            }
        }
        else if (i==2){
            if (flag == 0){
                rectangle.innerText = lastRectangleLetter;
            }
            else{
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                rectangle.innerText = alphabet[randomIndex];
                saveLastLetter = rectangle.innerText;
            }
        }

        rectangleCount++;
        rectangle.addEventListener('click', handleClick);
        rectangleContainer.appendChild(rectangle);
        unviewedRectangles.push(rectangle);
        rectangles.push(rectangle);
        
    }
    swapLetters();
}

function handleClick(event) {
    const rectangle = event.target;

    if (clickCount >1) {
        return;
    }
    if (rectangle.paired) {
        return;
    }    
    if (rectangle.opened) {
        return;
    }
    rectangle.viewed = true;
    rectangle.opened = true;
    
    fontSizeRec = parseInt(rectangle.style.height);
    fontSizeRec /= 2;
    rectangle.style.fontSize = fontSizeRec + 'px';
    rectangle.style.backgroundColor = 'red';
    
    if (clickCount === 0) {
        firstSelectRectangle = rectangle;
        clickCount = 1;
    }

    else if (clickCount === 1) {

        if (rectangle.innerText === firstSelectRectangle.innerText) {

            rectangle.paired = true;
            firstSelectRectangle.paired = true;
            
            rectangle.style.backgroundColor = 'blue';
            firstSelectRectangle.style.backgroundColor = 'blue';
            
            clickCount = 0;
            firstSelectRectangle = null;
        } 
        else {
            setTimeout(() => {
        
            rectangle.style.fontSize = '0px';
            rectangle.style.backgroundColor = 'black';

            firstSelectRectangle.style.fontSize = '0px';
            firstSelectRectangle.style.backgroundColor = 'black';
            rectangle.opened = false;
            firstSelectRectangle.opened = false;
            firstSelectRectangle = null;
            clickCount = 0;
            
            }, 250);
        }
    }
}           