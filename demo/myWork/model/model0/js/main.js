// JavaScript Document
//用于浏览器测试
console.log("lala");

;$(function()
{
	"user strict";
	
	var sidebar=$("#sidebar"),//选择侧栏
	    mask=$(".mask"),
		backButton=$(".back-top"),
		sidebar_trigger=$("#sidebar_trigger");
	function showSideBar()//显示侧栏
	{
		mask.fadeIn();
		sidebar.animate({"right":0});
	}
	
	function hideSideBar()//隐藏侧栏
	{
	    mask.fadeOut();
		sidebar.animate({"right":-sidebar.width()});
	}
	
	sidebar_trigger.on("click",showSideBar)
	mask.on("click",hideSideBar)
	backButton.on("click",function()//触发返回顶部函数
	{
		console.log("back back");
		$("html,body").animate({
		    scrollTop:0
		},800)
	}							   
	)
	
	$(window).on("scroll",function()//滚动鼠标事件
	{
		if($(window).scrollTop()>$(window).height())//判断：当滚动页距离大于页面距离
		{
			backButton.fadeIn();//显示backButton对象
		}
		else
		{
			backButton.fadeOut();
		}
	})
	
	$(window).trigger("scroll");//页面打开就出发scroll事件
		
})