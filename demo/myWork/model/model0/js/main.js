// JavaScript Document
//�������������
console.log("lala");

;$(function()
{
	"user strict";
	
	var sidebar=$("#sidebar"),//ѡ�����
	    mask=$(".mask"),
		backButton=$(".back-top"),
		sidebar_trigger=$("#sidebar_trigger");
	function showSideBar()//��ʾ����
	{
		mask.fadeIn();
		sidebar.animate({"right":0});
	}
	
	function hideSideBar()//���ز���
	{
	    mask.fadeOut();
		sidebar.animate({"right":-sidebar.width()});
	}
	
	sidebar_trigger.on("click",showSideBar)
	mask.on("click",hideSideBar)
	backButton.on("click",function()//�������ض�������
	{
		console.log("back back");
		$("html,body").animate({
		    scrollTop:0
		},800)
	}							   
	)
	
	$(window).on("scroll",function()//��������¼�
	{
		if($(window).scrollTop()>$(window).height())//�жϣ�������ҳ�������ҳ�����
		{
			backButton.fadeIn();//��ʾbackButton����
		}
		else
		{
			backButton.fadeOut();
		}
	})
	
	$(window).trigger("scroll");//ҳ��򿪾ͳ���scroll�¼�
		
})