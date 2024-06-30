const colors4 = ["red", "green", "blue", "yellow"];
const colors6 = ["red", "green", "blue", "yellow", "purple", "orange"];
const colors8 = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown"];
const colors10 = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown", "cyan", "lime"];
const ballsPerBox = 8;
const emptyBoxes = 2;
let selectedBall = null;

function createBall(color) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.backgroundColor = color;

    // Eventos táctiles para dispositivos móviles
    ball.addEventListener("touchstart", touchStart);
    ball.addEventListener("touchmove", touchMove);
    ball.addEventListener("touchend", touchEnd);

    return ball;
}

function touchStart(event) {
    selectedBall = event.target;
    event.target.style.opacity = '0.5'; // Reducir la opacidad mientras se arrastra en dispositivos móviles
}

function touchMove(event) {
    event.preventDefault();
    if (selectedBall) {
        const touch = event.touches[0];
        selectedBall.style.left = touch.pageX - selectedBall.offsetWidth / 2 + 'px';
        selectedBall.style.top = touch.pageY - selectedBall.offsetHeight / 2 + 'px';
    }
}

function touchEnd(event) {
    if (selectedBall) {
        const targetBox = event.target.closest(".box");
        if (targetBox && !targetBox.hasChildNodes()) {
            targetBox.appendChild(selectedBall);
        }
        selectedBall.style.opacity = '1'; // Restaurar la opacidad al soltar en dispositivos móviles
        selectedBall.style.left = '';
        selectedBall.style.top = '';
        selectedBall = null;
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function fillBoxes(colors) {
    const container = document.getElementById("container");
    container.innerHTML = ""; // Limpiar contenedor

    const totalBoxes = colors.length > 4 ? colors.length + emptyBoxes : colors.length;

    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        container.appendChild(box);
    }

    const boxes = document.querySelectorAll(".box");
    let balls = [];

    colors.forEach(color => {
        for (let i = 0; i < ballsPerBox; i++) {
            balls.push(createBall(color));
        }
    });

    balls = shuffle(balls);

    boxes.forEach((box, index) => {
        box.innerHTML = ""; // Limpiar caja
        if (index < colors.length) {
            balls.slice(index * (ballsPerBox - emptyBoxes), (index * (ballsPerBox - emptyBoxes)) + (ballsPerBox - emptyBoxes)).forEach(ball => {
                box.appendChild(ball);
            });
        }
    });

    // Agregar eventos de arrastre y soltado
    const allBalls = document.querySelectorAll('.ball');
    allBalls.forEach(ball => {
        ball.addEventListener("touchstart", touchStart);
        ball.addEventListener("touchmove", touchMove);
        ball.addEventListener("touchend", touchEnd);
    });

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            if (selectedBall && !box.hasChildNodes()) {
                box.appendChild(selectedBall);
                selectedBall = null;
            }
        });
    });
}

document.getElementById("startGame").addEventListener("click", () => {
    const colorCount = parseInt(document.getElementById("colorCount").value);
    let useColors = [];
    
    switch (colorCount) {
        case 4:
            useColors = colors4;
            break;
        case 6:
            useColors = colors6;
            break;
        case 8:
            useColors = colors8;
            break;
        case 10:
            useColors = colors10;
            break;
        default:
            useColors = colors6; // Default to 6 colors
    }
    
    fillBoxes(useColors);
});

document.addEventListener("DOMContentLoaded", () => {
    // Inicialmente comenzamos con 6 colores y 2 cajas vacías
    fillBoxes(colors6);
});






