let birdImg = new Image(); 
birdImg.src = '../img/bird.png';

class Bird {
	//初始化变量
	constructor(pen) {
		this.pen = pen;
		this.img = birdImg;
		this.cutx = 0;
		this.cuty = 0;
		this.cutw = 52;
		this.cuth = 45;
		this.canvasx = 100;
		this.canvasy = 100;
		this.canvasw = 52;
		this.canvash = 45;
		this.imgIndex = 0;
		this.speed=0; //speed 累加给canvasy 控制上升下降
		this.a=1; //加速度，通过累加给speed赋值
		this.birdDropTimer=null;
		this.birdFlyTimer=null;
	}
	
	//展示小鸟的函数
	show() {
		this.pen.drawImage(this.img, this.cutx, this.cuty, this.cutw,
			this.cuth, this.canvasx, this.canvasy, this.canvasw, this.canvash)
	}
	
	//飞行函数
	fly() {
		//每50ms 改变index值，在定时调用展示小鸟函数的时候，每次展示的都是不同的小鸟
		//这个定时器控制小鸟飞行的频率
		this.birdFlyTimer=setInterval(() => {
			this.imgIndex++;
			this.imgIndex %= 3;
			//同时改变剪切的位置，为index*宽度
			this.cutx = this.imgIndex * this.cutw;
		},50)
	}
	
	//下落
	//思路，通过一个定时器来控制canvasy 的值增加，增加即下落
	drop(){
		//这个定时器控制下落的速度
		this.birdDropTimer=setInterval(()=>{
			this.speed+=this.a;
			this.canvasy+=this.speed;
			//当触顶之后，不再增加canvasy 的值，即小鸟不再上升
			if(this.canvasy<-10){
				this.canvasy=-10;
			}
			//当触底之后，不再增加canvasy 的值，即小鸟不再下降
			if(this.canvasy>420){
				// clearInterval(this.dropTimer)
				this.canvasy=420;
			}
		},50)
	}
	
	//上升，
	//每次触发函数，让速度减小固定的值。canvasy就会减小，小鸟就会上升
	jump(){
		this.speed=-10;
	}
}
