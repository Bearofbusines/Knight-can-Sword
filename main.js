//import kaboom from "kaboom"
//import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

// initialize context

kaboom({
	global: true,
	fullscreen: true,
	scale: 1,
	debug: true,
  })
debug.inspect = true;
// load assets
loadRoot("assets/")
loadSprite("Plr", "/sprites/Player.png")
loadSprite("Sword", "/sprites/Swordr.png")
loadSprite("Emy", "/sprites/Enemy.png")

// add a character to screen
const Player = add([
	// list of components
	sprite("Plr"),
	origin("center"),
	circle(16),
	pos(100, 100),
	area({ scale: 0.85 }),
	rotate(90),
	move(0, 0),
	scale(.15),
	,
	"player's",
	{
		mot: vec2(0, 0),
	}
])

const PSword = add([
	// list of components
	sprite("Sword"),
	origin("center"),
	pos(200, 200),
	rotate(0),
	move(0, 0),
	area(),
	scale(.40),
	solid(),
	"player's",
	{
	mot: vec2(0, 0),
	}
])

const Enemy = add([
	// list of components
	sprite("Emy"),
	origin("center"),
	circle(16),
	pos(500, 500),
	area({ scale: 0.85 }),
	rotate(90),
	move(0, 0),
	scale(.15),
	"enemy's",
	{
		mot: vec2(0, 0),
	}
])

const ESword = add([
	// list of components
	sprite("Sword"),
	origin("center"),
	pos(200, 200),
	rotate(0),
	move(0, 0),
	area(),
	scale(.40),
	solid(),
	"player's",
	{
	mot: vec2(0, 0),
	}
])

// add a kaboom on mouse click
onClick(() => {
	addKaboom(mousePos())
})

Player.onCollide("Swordr", () => {
	destroy(Player)
})
Enemy.onCollide("Swordr", () => {
	destroy(Enemy)
})


//movement events
var accel = 200
onKeyDown("w", () => {
	Player.mot = vec2(Player.mot).add(vec2(0,-accel));
		
})
onKeyDown("s", () => {
	Player.mot = vec2(Player.mot).add(vec2(0,accel));
		
})
onKeyDown("a", () => {
	Player.mot = vec2(Player.mot).add(vec2(-accel,0));
		
})
onKeyDown("d", () => {
	Player.mot = vec2(Player.mot).add(vec2(accel,0));
		
})

// burp on "b"
//onKeyPress("b", burp)
// var looky;
// var lookx;
// var lookd;
// var swordpx;
// var swordpy;
// var lookagl;

var topSpeed = 500;
var deccel = 100;

loop(0.1, () => {
	
	
	//prevents you from over acceleration
	if(vec2(Player.mot).y < -topSpeed){
		Player.mot = vec2(vec2(Player.mot).x, -topSpeed);
	}else if(vec2(Player.mot).y > topSpeed){
		Player.mot = vec2(vec2(Player.mot).x, topSpeed);
	}
	if(vec2(Player.mot).x < -topSpeed){
		Player.mot = vec2(-topSpeed, vec2(Player.mot).y);
	}else if(vec2(Player.mot).x > topSpeed){
		Player.mot = vec2(topSpeed, vec2(Player.mot).y);
	}
	
	//slows down the player
	if(!(isKeyDown("w")||(isKeyDown("s")))){
		if(vec2(Player.mot).y>0){
			Player.mot = vec2(Player.mot).sub(0,deccel);
		}else if(vec2(Player.mot).y<0){
			Player.mot = vec2(Player.mot).sub(0,-deccel);
		}
	}
	if(!((isKeyDown("a"))||(isKeyDown("d")))){
		if(vec2(Player.mot).x>0){
			Player.mot = vec2(Player.mot).sub(deccel,0);
		}else if(vec2(Player.mot).x<0){
			Player.mot = vec2(Player.mot).sub(-deccel,0);
		}
	}

	// looky = (vec2(mousePos()).y-vec2(Player.pos).y);
	// lookx = (vec2(mousePos()).x-vec2(Player.pos).x);
	// lookd = Math.sqrt(looky * looky + lookx * lookx);
	// swordpx = lookx / lookd;
	// swordpy = looky / lookd;

	// Player.move(Player.mot);


	// //debug.log(Player.mot);
	// if(vec2(mousePos()).x > vec2(Player.pos).x){
	// 	lookagl = (Math.atan(looky / lookx) * (180 / Math.PI)) + 90;
	// }else{
	// 	lookagl = 180 - ((Math.atan(looky / lookx) * (180 / Math.PI)) + 90) * -1;
	// }
	// debug.log(lookagl);
	// Player.angle = lookagl;
	// PSword.angle = lookagl;
	// PSword.moveTo((swordpx * 100 + vec2(Player.pos).x), (swordpy * 100 + vec2(Player.pos).y));
	var mousepos = mousePos();
	swordphy(Player, mousepos, PSword)
	var Playerpos = vec2(Player.pos);
	swordphy(Enemy, Playerpos, ESword)
})

function swordphy(objTail, objHead, objSword){
	var looky;
	var lookx;
	var lookd;
	var swordpx;
	var swordpy;
	var lookagl;
	looky = (vec2(objHead).y-vec2(objTail.pos).y);
	lookx = (vec2(objHead).x-vec2(objTail.pos).x);
	lookd = Math.sqrt(looky * looky + lookx * lookx);
	swordpx = lookx / lookd;
	swordpy = looky / lookd;

	objTail.move(objTail.mot);


	//debug.log(objTail.mot);
	if(vec2(objHead).x > vec2(objTail.pos).x){
		lookagl = (Math.atan(looky / lookx) * (180 / Math.PI)) + 90;
	}else{
		lookagl = 180 - ((Math.atan(looky / lookx) * (180 / Math.PI)) + 90) * -1;
	}
	//debug.log(lookagl);
	objTail.angle = lookagl;
	objSword.angle = lookagl;
	objSword.moveTo((swordpx * 100 + vec2(objTail.pos).x), (swordpy * 100 + vec2(objTail.pos).y));
}