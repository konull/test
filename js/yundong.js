function getstyle(obj,name){
	var value=obj.currentStyle ? obj.currentStyle[name]:getComputedStyle(obj,false)[name];
	if(name=='opacity'){
		value=Math.round(parseFloat(value)*100);
	}
	else{
		value=parseInt(value);
	}
	return value;
}//获取样式表属性值的函数
function hxsd_move(obj,modeJson,stopTime,callback){//盒子，运动模式，移动距离，移动所需时间
	var speed={
		'veryslow':5000,
		'skow':2000,
		'normal':1000,
		'fast':700,
		'veryfast':300
	};
	if(stopTime){
		if(typeof stopTime=="string"){
			stopTime=speed[stopTime];
		}						
	}
	else{
			stopTime=speed.normal;
		};
	var start={};//起点 初始值
	var dis={};//终点
	for(var key in modeJson){
		//确定起点
		start[key]=getstyle(obj,key)
		//确认终点
		dis[key]=modeJson[key]-start[key];
	}
	
	var count=parseInt(stopTime/30); //时间分份
	var n=0;
	clearInterval(obj.time)
	obj.time=setInterval(function(){
		n++;
		for(var key in modeJson){
			//step_dis=初始值+总距离/份数*已经移动的份数
			var step_dis=start[key]+dis[key]/count*n; 
			if(key=="opacity"){
				obj.style.opacity=step_dis/100;
				obj.style.filter='alpha(opacity:'+step_dis+')';
			}
			else{
				obj.style[key]=step_dis+"px";//变量和参数需放在中括号里
				
			}
			if(n==count){
				clearInterval(obj.time)
				if(callback){
					callback();
				}
			}	
		}
		
	},30)
}