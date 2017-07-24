/*
* @Author: Administrator
* @Date:   2017-07-22 11:53:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-22 14:40:49
*/

'use strict';
 //全部商品-选项卡
 $(function(){
 	/*全部商品导航*/
 	$('.lf_templateGoodsnav>li').on('click',function(){
 		$('.lf_templateGoodsnav>li').removeClass('lf_templateGoodsnavOn');
 		$('.lf_templateGoodsnav>li').eq($(this).index()).addClass('lf_templateGoodsnavOn');
 	});
 	/*全部商品加载*/
 	var arr = [
 		{img:'images/lf_shopgood03.png'},
 		{img:'images/lf_shopgood03.png'},
 		{img:'images/lf_shopgood03.png'},
 		{img:'images/lf_shopgood03.png'},
 		{img:'images/lf_shopgood03.png'},
 		{img:'images/lf_shopgood03.png'},
 		{img:'images/lf_shopgood03.png'}
 	];
 	function allgoods(arr,divClass){
 		$.each(arr,function(index,value){
 			var _li = '<li class="lf_borderBox">'
					+		'<a href="javascript:void(0);" class="lf_jump">'
					+			'<img src="images/lf_shopgoods03.png" alt=""/>'
					+			'<p class="lf_allGoodsDes">原装飞越1升迷你真空空空原装飞越1升迷你真空空空</p>'
					+			'<div class="lf_clearFloat lf_allGoodsPrice">'
					+				'<p class="lf_left lf_allPrice">￥<span>59</span>.9</p>'
					+				'<p class="lf_left lf_payPerson">123人付款</p>'
					+			'</div>'
					+		'</a>'
					+ '</li>';
			divClass.append(_li);
 		})
 	};
 	var allBox = $('.lf_templateAllgoodsbox');
 	allgoods(arr,allBox);
 })