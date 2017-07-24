//开启严格模式
"use strict";

//立即执行函数,防止变量污染
(function () {
	//获取页面标题,判定js使用
	var webTitle = $(".public_head h3").html();
	console.log(webTitle);
	//进行判定
	if (webTitle === "需求大厅" || webTitle === "服务大厅"  || webTitle === "辅材街" || webTitle === "搜索店铺") {//需求大厅/服务大厅/辅材街/搜索店铺
		//头部搜索框展示js
		searchShow();
		//头部导航点击事件
		$(".klnh-nav_li").on("touchend", function () {
			$(this).addClass("klnh-nav_li_change")
				   .siblings(".klnh-nav_li").removeClass("klnh-nav_li_change");
			if (this !== $(".klnh-nav_li")[0]) {
				$("#out-boxbg").remove();//移除遮罩
				$(".klnh-nav_list").css("display", "none");
			}
		});
		//综合排序点击事件
		$(".klnh-nav_li").eq(0).on("touchend", function () {
			//判定是否点开了
			if ($("#out-boxbg").length) {
				$("#out-boxbg").remove();//移除遮罩
				$(".klnh-nav_list").css("display", "none");
			} else {
				addBox(".klnh-content");//添加遮罩
				$(".klnh-nav_list").css("display", "block");
			}
		});
		//综合排序内容选中事件
		$(".klnh-nav_show").on("touchend", function () {
			//更改样式
			$(this).addClass("icon-ok")
				   .siblings(".klnh-nav_show").removeClass("icon-ok");
			//更改排序内容
			$(".klnh-nav_li").eq(0).html($(this).text() + '<span class="iconfont icon-bottom"></span>');
		});
		//筛选点击事件
		$(".klnh-nav_li").eq(2).on("touchend", function () {
			addBox("body", 15);//添加遮罩
			$(".klnh-change_box").css("right", "0");
		});
		//筛选完成
		$(".klnh-change_btn").on("touchend", function () {
			$("#out-boxbg").remove();//移除遮罩
			$(".klnh-change_box").css("right", "-80%");
		});
		//筛选list选中事件
		$(".klnh-change_li").on("touchend", function () {
			$(this).addClass("klnh-change_li_change")
			       .siblings(".klnh-change_li_change").removeClass("klnh-change_li_change");
		});
		//筛选列表收起展开
		$(".klnh-change_dt").on("touchend", function (e) {
			
		});
		
		if (webTitle === "辅材街") {
			$(".klam-con_li:odd").css("margin-left", "2vw");
		}
	} else if ($(".public_head").has(".klnd-header").length) {//需求详情
		//需求标题长度
		if ($(".klnd-top_title").text().length >= 25) {
			$(".klnd-top_title").text($(".klnd-top_title").text().substring(0,25) + "...");
		}
		//详情/投标切换
		$(".klnd-header .klnd-header_li").on("touchstart", function () {
			$(this).children(".klnd-header_a").addClass("klnd-header_achange");
			$(this).siblings(".klnd-header_li").children(".klnd-header_a").removeClass("klnd-header_achange");
		});
		//投标参加提示
		$(".klnd-button").on("touchend", function () {
			addBox("body",20);
			outBox("根据国家信网办最新的实名制要求,所有服务提供方都需要实名认证,造成不便还请谅解。请先进行实名认证！");
		});
	} else if (webTitle === "修改资料") {
		$("#klscn-my-header").on("change", function () {
			var imgType = this.value.split(".");
			imgType = imgType[imgType.length-1];
			//判定是否是图片
			if (imgType !== "jpg" && imgType !== "png" && imgType !== "jpeg") {
				return alert("请上传jpg/png/jpeg格式的图片");
			}
			//判定图片是否过大     1M
			if (this.files[0].size > 1048576) {
				return alert("图片过大,请重新选择小于1M");
			}
			var rander = new FileReader();
			rander.onload = function (e) {
				var imgSrc = e.target.result;//
				$(".klscn-header_img")[0].src = imgSrc;
			}
			rander.readAsDataURL(this.files[0]);
		});
	}
})();

//头部搜索框显示函数
function searchShow() {
	$(".public_head .icon-sousuo").on("touchend", function () {
		//判定搜索框是否显示
		if ($(".kll-search_input").width() === 0) {
			$(".kll-search_input").css({"display": "block",
										"width": "65%"});
		} else {
			//判定搜索框是否为空,如果为空收缩
			if ($(".kll-search_input").val() === "") {
				$(".kll-search_input").css("width", "0");
				setTimeout(function () {
					$(".kll-search_input").css("display", "none");
				}, 350);
			} else {//如果有内容点击搜索
				
			}
		}
	});
}

//生成半透明遮罩
function addBox(out,zi) {
	if (!zi) {
		zi = 10;
	}
	var box = $("<div></div>");
	box.css({
		"width": "100%",
		"min-height": "100vh",
		"position": "fixed",
		"top": "0",
		"left": "0",
		"background": "rgba(0,0,0,0.4)",
		"zIndex": zi
	});
	box.attr("id", "out-boxbg");
	if ($(out).css("position") === "static") {
		$(out).css("position", "relative");
	}
	box.on("touchstart", function (e) {
		if (e.target === box[0]) {
			e.preventDefault();
		}
	});
	$(out).append(box);
	return "out-boxbg";
}

//生成弹出框
function outBox(news, url) {
	if (!news) {
		news = "";
	}
	if (!url) {
		url = " ";
	}
	//盒子
	var box = $("<div></div>");
	box.css({
		"position": "absolute",
		"top": "10vh",
		"left": "10%",
		"width": "80%",
		"background": "#fff",
		"border-radius": "10px",
		"box-sizing": "border-box",
		"padding": "10px 20px"
	});
	//标题
	var title = $("<h4></h4>");
	title.css({
		"text-align": "center",
		"font-size": "14px",
		"color": "#666",
		"line-height": "2.4em",
		"border-bottom": "1px solid #e6e6e6"
	});
	title.html("提示");
	//内容
	var show = $("<p></p>");
	show.css({
		"text-align": "justify",
		"padding": "1.2em 0",
		"font-size": "15px",
		"line-height": "2em",
		"color": "#555"
	});
	//确认取消
	var btnBox = $("<div></div>");
	btnBox.css({
		"width": "100%",
		"overflow": "hidden",
		"padding-bottom": "10px"
	});
	var btnNo = $("<a></a>");
	btnNo.css({
		"float": "left",
		"width": "45%",
		"height": "2rem",
		"color": "#3c8fed",
		"background": "#fff",
		"border-radius": "5px",
		"border": "1px solid #3c8fed",
		"text-align": "center",
		"line-height": "2rem"
	});
	var btnOk = $("<a></a>");
	btnOk.css({
		"float": "right",
		"width": "45%",
		"height": "2rem",
		"color": "#fff",
		"background": "#3c8fed",
		"border-radius": "5px",
		"border": "1px solid #3c8fed",
		"text-align": "center",
		"line-height": "2rem"
	});
	btnNo.html("取消");
	btnOk.html("确认");
	btnOk.attr("href", url);
	btnNo.on("touchend", function () {
		$($("#out-boxbg")).remove();
	});
	show.html(news);
	btnBox.append(btnNo);
	btnBox.append(btnOk);
	box.append(title);
	box.append(show);
	box.append(btnBox);
	$($("#out-boxbg")).append(box);
}
