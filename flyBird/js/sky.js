let skyImg=new Image();
skyImg.src='../img/sky.png';

class Sky {
	constructor(pen) {
		this.pen = pen;
		this.img = skyImg;
		this.cutx = 0;
		this.cuty = 0;
		this.cutw = 800;
		this.cuth = 569;
		this.canvasx = 0;
		this.canvasy = 0;
		this.canvasw = 800;
		this.canvash = 569;
		this.skyMoveTimer=null;
	}
	//天空绘制
	show() {
		//绘制的时候我们需要绘制两张，一张在正常的位置，一张在紧接后面看不到的位置
		//第一张，0，0位置
		this.pen.drawImage(this.img, this.cutx, this.cuty, this.cutw,
			this.cuth, this.canvasx, this.canvasy, this.canvasw, this.canvash)
		//第二张。800,0位置
		this.pen.drawImage(this.img, this.cutx, this.cuty, this.cutw,
			this.cuth, this.canvasx + this.canvasw, this.canvasy, this.canvasw, this.canvash)

	}
	
	//天空背景移动
	move(){
		//这个定时器控制天空的移动速度
		this.skyMoveTimer=setInterval(()=>{
			this.canvasx-=5;
			if(this.canvasx==-800){
				this.canvasx=0;
			}
		},50)
	}
	
}
