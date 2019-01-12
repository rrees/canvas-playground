const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const heatLevels = [
	'white',
	'yellow',
	'orange',
	'red',
	'black',
];

const fireGridSize = 30;
const firePixelSize = 5;

const fireMap = Array(fireGridSize * fireGridSize);
fireMap.fill(heatLevels.length - 1, 0, fireGridSize * fireGridSize);
fireMap.fill(0, fireMap.length - fireGridSize);

//console.log(fireMap);

const fireGridCanvas = document.getElementById('fire-grid');

function calculateFireGrid(fireMap) {
	for (let row = fireGridSize - 1;
		row > 0;
		row--) {
		for (let i = fireMap.length - ((row + 1) * fireGridSize);
			i < (fireMap.length - (row * fireGridSize));
			i++) {
			if(fireMap[i] == 1) {
				fireMap[i] = 2;
			} else {
				fireMap[i] = 1;
			}
		}
	}

	return fireMap;
}

function drawFireGrid() {
	const ctx = fireGridCanvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let x = 0;
	let y = 0;

	calculateFireGrid(fireMap);

	fireMap.forEach((heatValue, idx) => {
		//console.log(heatValue, idx);
		ctx.fillStyle = heatLevels[heatValue];
		const x = (idx % fireGridSize) * firePixelSize;
		const y = Math.floor(idx / fireGridSize) * firePixelSize;
		ctx.fillRect(x, y, firePixelSize, firePixelSize);
	});

}

function drawFire(pulse) {
	//console.log('Draw fire triggered');
	//console.log('Pulse', pulse);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.fillStyle = heatLevels[pulse];
	ctx.fillRect(0, canvas.height - (pulse * 2 * firePixelSize), canvas.width, firePixelSize);
}

function tick() {
	//console.log('Tick triggered');
	const now = new Date();
	//console.log(now - lastDraw);
	if((now - lastDraw) >  (2 * 1000)) {

		drawFire(pulse);
		lastDraw = now;
		pulse++;

		if(pulse >= heatLevels.length) {
			pulse = 0;
		}

		drawFireGrid();
	}

	window.requestAnimationFrame(tick);
}


let pulse = 0;
let lastDraw = new Date();

drawFire();
tick();

drawFireGrid();
