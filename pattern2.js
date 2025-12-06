const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let patternColor = '#000000';
let bgColor = '#ffffffff';
let scale = 1.0;
let rotation = 0;
let patternRot = 0;
let densityX = 1.0;
let densityY = 1.0;
let moduleBoost = 1.0;

const BASE_TILE_WIDTH = 200;
const BASE_TILE_HEIGHT = 340;


// 캔버스 리사이즈
function resizeCanvas() {
    canvas.width = window.innerWidth - 260;
    canvas.height = window.innerHeight;
    drawPattern();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


// 타일 기본 모양
function drawTileBase() {
    ctx.fillRect(170, 5, 15, 15);
    ctx.fillRect(150, 20, 40, 15);
    ctx.fillRect(130, 30, 40, 20);
    ctx.fillRect(100, 50, 75, 15);
    ctx.fillRect(110, 65, 70, 10);
    ctx.fillRect(50, 75, 120, 30);
    ctx.fillRect(20, 105, 130, 20);
    ctx.fillRect(0, 125, 120, 20);
    ctx.fillRect(30, 145, 80, 20);
    ctx.fillRect(20, 165, 100, 20);
    ctx.fillRect(0, 185, 130, 20);
    ctx.fillRect(10, 205, 130, 10);
    ctx.fillRect(40, 215, 110, 10);
    ctx.fillRect(50, 225, 105, 20);
    ctx.fillRect(60, 245, 100, 10);
    ctx.fillRect(50, 255, 110, 20);
    ctx.fillRect(40, 275, 110, 20);
    ctx.fillRect(35, 295, 80, 15);
    ctx.fillRect(30, 310, 70, 15);
    ctx.fillRect(20, 325, 30, 15);
}


// 타일 렌더
function drawTile() {
    ctx.save();
    ctx.rotate(rotation);
    drawTileBase();
    ctx.restore();
}


// 전체 패턴 렌더
function drawPattern() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(patternRot);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.fillStyle = patternColor;

    const tileW = BASE_TILE_WIDTH * scale * densityX;
    const tileH = BASE_TILE_HEIGHT * scale * densityY;

    const boostedWidth = canvas.width * moduleBoost;
    const boostedHeight = canvas.height * moduleBoost;

    const cols = Math.ceil(boostedWidth / tileW) + 2;
    const rows = Math.ceil(boostedHeight / tileH) + 2;

    const offsetX = (canvas.width - boostedWidth) / 2;
    const offsetY = (canvas.height - boostedHeight) / 2;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            ctx.save();
            ctx.translate(offsetX + x * tileW, offsetY + y * tileH);
            ctx.scale(scale * densityX, scale * densityY);
            drawTile();
            ctx.restore();
        }
    }

    ctx.restore();
}


// 무작위 패턴 생성
function randomize() {
    scale = Math.random() * 1.7 + 0.3;
    rotation = Math.random() * Math.PI * 2;
    patternRot = Math.random() * Math.PI * 2;

    densityX = Math.random() * 1.5 + 0.5;
    densityY = Math.random() * 1.5 + 0.5;

    moduleBoost = Math.random() * 1.5 + 1.0;

    patternColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    bgColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    document.getElementById('scale').value = scale;
    document.getElementById('rotation').value = rotation;
    document.getElementById('patternRot').value = patternRot;
    document.getElementById('densityX').value = densityX;
    document.getElementById('densityY').value = densityY;
    document.getElementById('moduleBoost').value = moduleBoost;
    document.getElementById('patternColor').value = patternColor;
    document.getElementById('bgColor').value = bgColor;

    drawPattern();
}


// PNG/JPG 저장 기능
function saveAsPNG() {
    const link = document.createElement('a');
    link.download = 'pattern.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function saveAsJPG() {
    const link = document.createElement('a');
    link.download = 'pattern.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
}


// 이벤트 바인딩
document.getElementById('scale').oninput = e => { scale = Number(e.target.value); drawPattern(); };
document.getElementById('rotation').oninput = e => { rotation = Number(e.target.value); drawPattern(); };
document.getElementById('patternRot').oninput = e => { patternRot = Number(e.target.value); drawPattern(); };
document.getElementById('densityX').oninput = e => { densityX = Number(e.target.value); drawPattern(); };
document.getElementById('densityY').oninput = e => { densityY = Number(e.target.value); drawPattern(); };
document.getElementById('moduleBoost').oninput = e => { moduleBoost = Number(e.target.value); drawPattern(); };

document.getElementById('patternColor').oninput = e => { patternColor = e.target.value; drawPattern(); };
document.getElementById('bgColor').oninput = e => { bgColor = e.target.value; drawPattern(); };

document.getElementById('randomBtn').onclick = randomize;
document.getElementById('savePngBtn').onclick = saveAsPNG;
document.getElementById('saveJpgBtn').onclick = saveAsJPG;

drawPattern();

document.getElementById("back-link").addEventListener("click", function(e) {
        e.preventDefault(); // 링크 이동 막기
        
        // 부모 창(index.html)에 있는 closeSlider 함수 실행
        if (window.parent && window.parent.closeSlider) {
            window.parent.closeSlider();
        } else {
            // 만약 iframe이 아니라 그냥 열었을 경우를 대비한 예외처리
            window.location.href = "index.html";
        }
    });