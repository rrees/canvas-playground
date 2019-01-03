const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const heatLevels = [
	'white',
	'yellow',
	'orange',
	'red',
	'black',
];

function drawFire() {
	console.log('Draw fire triggered');
	console.log('Pulse', pulse);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.fillStyle = heatLevels[pulse];
	ctx.fillRect(10, 10, 50, 50);
	pulse++;

	if(pulse >= heatLevels.length) {
		pulse = 0;
	}
}

function tick() {
	//console.log('Tick triggered');
	const now = new Date();
	//console.log(now - lastDraw);
	if((now - lastDraw) >  (2 * 1000)) {
		drawFire();
		lastDraw = now;
	}

	window.requestAnimationFrame(tick);
}


let pulse = 0;
let lastDraw = new Date();

drawFire();
tick();
