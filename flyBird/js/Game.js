class Game{
	constructor({sky,land,pipe,bird}) {
	    this.sky=sky;
		this.land=land;
		this.pipe=pipe;
		this.bird=bird;
		this.startTimer=null;
		this.gameOverTimer=null;
	}
	
	//初始化画面
	init(){
		this.sky.show();
		this.land.show();
		this.bird.show();
	}
	
	//游戏开始
	start(){
		//这个定时器控制图片的刷新率
		if(this.startTimer){
			//如果多次触发这个函数，判断此时是否有定时器存在，如果有的话
			// 直接停止函数，避免多次增加定时器
			return;
		}
		this.startTimer=setInterval(()=>{ 
			this.sky.show();
			this.land.show();
			this.bird.show();
			this.pipe.show();
		},10)
		this.bird.fly(); //小鸟飞行
		this.bird.drop(); //小鸟开始下降
		this.sky.move(); //背景开始移动
		this.pipe.move();
		this.gameOver(); 
		this.showBest(); //展示最高成绩
	}
	
	//游戏暂停
	stop(){
		clearInterval(this.startTimer); //清除游戏开始的定时器
		clearInterval(this.sky.skyMoveTimer);//天空暂停移动
		clearInterval(this.bird.birdFlyTimer);//小鸟暂停飞行
		clearInterval(this.bird.birdDropTimer);//小鸟暂停下掉
		clearInterval(this.pipe.pipeMoveTimer); //背景停止移动
		clearInterval(this.gameOverTimer)
		this.startTimer=false;//改变starTimer的值
		//这样可以暂停之后再开始的时候通过条件判断，开启新的定时器。
	}
	
	
	
	//游戏结束判定函数
	gameOver(){
		// 思路:找到小鸟四个边界的值,
		// 以及水管的四个边界的值,当小鸟在两根水管中间时。
		//判断小鸟的上下是否超出边界，超出就碰撞了，结束游戏
		this.gameOverTimer=setInterval(()=>{
			//显示实时分数
			
			
			this.pipe.point.forEach((item,index)=>{//item表示现在正在遍历的水管，index为水管在数组的下标。
			
				let birdTop=this.bird.canvasy+10; //显示的y值加空白处
				let birdRight=this.bird.canvasx+this.bird.canvasw-20; //显示的x轴加宽度-空白宽度
				let birdBottom=this.bird.canvasy+this.bird.canvash-20;
				let birdLeft=this.bird.canvasx+10;
				
				let pipeTop=item.cuth; //上水管的底部
				let pipeRight=item.canvasx+52; //显示的x轴加宽度
				let pipeBottom=item.cuth+this.pipe.gap; //上水管高度+空隙高度
				let pipeLeft=item.canvasx;
				//顶部碰到的条件:小鸟的右边坐标进入了水管宽度范围内，或小鸟左边坐标还没出去的时候，如果这时，顶部小于了上水管的高度表示已经碰到了
				
				let topTouch=(birdRight>pipeLeft)&&(birdLeft<pipeRight)&&(birdTop<pipeTop);
				let bottomTouch=(birdRight>pipeLeft)&&(birdLeft<pipeRight)&&(birdBottom>pipeBottom)
				
				if(topTouch||bottomTouch){
					// 将此时的index加入本地缓存当中,如果破了最高记录才加
					let score=window.localStorage.getItem('bestScore')||0;
					//取出缓存中最高的成绩，如果没有，则取0
					if(score<index){
						window.localStorage.setItem('bestScore',index);
						this.showBest();
					}
					//如果撞倒了，执行停止函数，并清除本定时器
					this.stop()
					clearInterval(this.gameOverTimer)
					if(confirm(`游戏结束，你的成绩为${index}重新游戏？`)){
						this.replay();
					}
				}
			})
			
		},50)
	}
	//replay
	replay(){
		window.location.reload()
	}
	
	//展示最高记录
	showBest(){
		document.querySelector('h1').innerHTML=`最高记录：${window.localStorage.getItem('bestScore')}`
	}
	
	
}