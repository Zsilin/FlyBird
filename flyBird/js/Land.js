let landImg=new Image();
landImg.src='../img/land.png';

class Land{
	constructor(pen) {
	    this.pen=pen;
		this.img=landImg;
		this.cutx=0;
		this.cuty=0;
		this.cutw=336;
		this.cuth=112;
		this.canvasx=0;
		this.canvasy=457;
		this.canvasw=800;
		this.canvash=112;
	}
	
	// 大地展示
	show(){
		this.pen.drawImage(this.img, this.cutx, this.cuty, this.cutw,
			this.cuth, this.canvasx, this.canvasy, this.canvasw, this.canvash)
	}
}