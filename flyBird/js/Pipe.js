let pipeUpImg = new Image();
pipeUpImg.src = '../img/pipeUp.png';

let pipeDownImg = new Image();
pipeDownImg.src = '../img/pipeDown.png';



class Pipe {
	constructor(pen) {
		this.pen = pen;
		this.pipeUpImg = pipeUpImg;
		this.pipeDownImg = pipeDownImg;
		this.pipeMoveTimer=null;
		this.gap=157; //间隙
		this.index=0;//控制什么时候添加管子
		this.point=[{	
				// 创建一个集合，show方法根据这个集合来绘制上下管道，循环就可以
				//同时创建多个管道
				cuth:100,  //上水管高度  
				canvasx:800 //显示的x轴
			}]
	}
	
	
	show(){
		this.point.forEach((item)=>{
			//上水管(0,图片高度-水管高度,图片宽度52,图片高度cuth,放置坐标x canvasx,0,52,图片高度cuth)
			this.pen.drawImage(this.pipeUpImg, 0, 420-item.cuth , 52, item.cuth,
				item.canvasx, 0,52,item.cuth)
			
			//下水管高度=画布高度-大地高度-上水管高度-空隙高度
			this.pen.drawImage(this.pipeDownImg,0,0,52,457-item.cuth-this.gap,
				item.canvasx,item.cuth+this.gap,52,457-item.cuth-this.gap)
		})
	}
	
	//管子移动
	move(){
		this.pipeMoveTimer=setInterval(()=>{
			this.index++;
			this.point.forEach((item)=>{
				item.canvasx-=10;
			})
			if(this.index%30==0){
				//index加30次，即上一个管子移动300px之后，再添加一根管子
				this.point.push({cuth:Math.random()*270+20,canvasx:800})
				if(this.point.length>3){
					document.querySelector('h3').innerHTML=`score：${this.point.length-3}`;
				}
			}
			
			
		},50)
	}
}
