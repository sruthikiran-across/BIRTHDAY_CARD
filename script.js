const confettiCanvas = document.getElementById('confetti-canvas');
const myConfetti = confetti.create(confettiCanvas,{resize:true});

const bouquet = document.getElementById("bouquet");
const rose = document.getElementById("rose");

/* ENVELOPE GREEN SCREEN REMOVAL */

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

video.play();

video.addEventListener("loadeddata",()=>{

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

function draw(){

ctx.drawImage(video,0,0);

let frame = ctx.getImageData(0,0,canvas.width,canvas.height);
let data = frame.data;

for(let i=0;i<data.length;i+=4){

let r=data[i];
let g=data[i+1];
let b=data[i+2];

if(g>120 && g>r*1.3 && g>b*1.3){
data[i+3]=0;
}

}

ctx.putImageData(frame,0,0);

requestAnimationFrame(draw);

}

draw();

});

/* SCENE 1 → SCENE 2 */

bouquet.onclick = () => {

document.getElementById("scene1").classList.add("hidden");
document.getElementById("scene2").classList.remove("hidden");

startHearts();

};

/* ROSE HOVER */

/* DESKTOP HOVER */

rose.addEventListener("mouseenter",()=>{
rose.src="photos/chocolate.png";
});

rose.addEventListener("mouseleave",()=>{
rose.src="photos/rose.png";
});

/* MOBILE TAP */

rose.addEventListener("touchstart",()=>{
rose.src="photos/chocolate.png";
});

/* CHOCOLATE CLICK */

rose.addEventListener("click",()=>{

document.getElementById("scene2").classList.add("hidden");
document.getElementById("sceneVideo").classList.remove("hidden");

const heartVideo=document.getElementById("heartVideo");

let playCount=0;

heartVideo.play();

heartVideo.onended=()=>{

playCount++;

if(playCount<2){

heartVideo.play();

}else{

/* FULLSCREEN CONFETTI */

for(let i=0;i<15;i++){

myConfetti({
particleCount:150,
spread:360,
startVelocity:70,
origin:{
x:Math.random(),
y:Math.random()
}
});

}

/* SHOW ENDING VIDEO */

document.getElementById("sceneVideo").classList.add("hidden");
document.getElementById("sceneEnding").classList.remove("hidden");

document.getElementById("endingVideo").play();

}

};

});

/* FLOATING HEARTS */

function startHearts(){

const container=document.getElementById("hearts-container");

setInterval(()=>{

const heart=document.createElement("div");

heart.className="heart";
heart.innerHTML="❤";

heart.style.left=Math.random()*100+"vw";
heart.style.fontSize=(20+Math.random()*20)+"px";
heart.style.animationDuration=(6+Math.random()*4)+"s";

container.appendChild(heart);

setTimeout(()=>heart.remove(),9000);

},500);

}

/* ENVELOPE CLICK */

function openEnvelope(){

document.getElementById("sceneEnding").classList.add("hidden");
document.getElementById("scene4").classList.remove("hidden");

createPhotoWall();
startRoses();

}

/* PHOTO WALL */

function createPhotoWall(){

const photos=[];

for(let i=1;i<=15;i++){
photos.push("photos/photo"+i+".jpeg");
}

const wall=document.getElementById("photoWall");

for(let r=0;r<6;r++){

const row=document.createElement("div");
row.className="row "+(r%2==0?"left":"right");

photos.concat(photos).forEach(p=>{
const img=document.createElement("img");
img.src=p;
row.appendChild(img);
});

wall.appendChild(row);

}

}
function startRoses(){

const container = document.getElementById("roses-container");

setInterval(()=>{

const rose = document.createElement("img");

rose.src = "photos/rose.png";
rose.className = "floating-rose";

rose.style.left = Math.random()*100 + "vw";
rose.style.animationDuration = (8 + Math.random()*6) + "s";
rose.style.width = (40 + Math.random()*40) + "px";

container.appendChild(rose);

setTimeout(()=>{
rose.remove();
},14000);

},900);

}
