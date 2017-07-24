/**
 * Created by zhangyuhan on 2017/7/24.
 */
'use strict'
/*
 * tempBoolean
 * true -> 完成 删除状态
 * false -> 编辑 结算状态
 * */
var tempBoolean = false
$("span[name='zyh-select']").on('click',function () {
  if(tempBoolean){
    toggleLable1()
  }else{
    toggleLable2()
  }
})
/*进入 订单结算状态*/
function toggleLable2(){
  tempBoolean =!tempBoolean
  /*切换文字*/
  $("span[name='zyh-select']").text("完成")
  $("span[name='lable2-number']").show()
  $("button[name='lable2-button']").text("删除")
  $("div[name='lable2-del']").hide()
  /*清除之前的数据*/
  $("div[name='zyh-shopInfo'] i").removeClass("icon-xz")
  $("div[name='zyh-select-all'] i").removeClass("icon-xz")
  upAllPicView()
}
/*进入 删除状态*/
function toggleLable1(){
  tempBoolean =!tempBoolean
  /*切换文字*/
  $("span[name='zyh-select']").text("编辑")
  $("span[name='lable2-number']").hide()
  $("button[name='lable2-button']").text("提交订单")
  $("div[name='lable2-del']").show()
  /*清除之前的数据*/
  $("div[name='zyh-shopInfo'] i").removeClass("icon-xz")
  $("div[name='zyh-select-all'] i").removeClass("icon-xz")
  upSeNumber()

}

/*点击切换选择效果*/
$("main").on('click',"div[name='zyh-shopInfo'] i",function () {
  $(this).toggleClass("icon-xz")
  /*删除状态*/
  if(tempBoolean){
    upSeNumber()
  }else{
    /*结算订单状态*/
    upAllPicView()
  }
})
/*全选*/
$("div[name='zyh-select-all']").on('click',function () {
  $(this).find("i").toggleClass("icon-xz")
  if(!$(this).find("i").is(".icon-xz")){
    $("div[name='zyh-shopInfo'] i").removeClass("icon-xz")
  }else{
    $("div[name='zyh-shopInfo'] i").addClass("icon-xz")
  }
  /*删除状态*/
  if(tempBoolean){
    upSeNumber()
  }else{
    /*结算订单状态*/
    upAllPicView()
  }
})
/*计算总价*/
function getAllPic(){
  var allPic = 0;
  $("div[name='zyh-shopInfo']>i.icon-xz").each(function(){
    allPic += parseFloat($(this).siblings().find("div").children("span").text().substr(1))
  })
  return allPic
}
/*str转换并更新view
 * str 格式number,str都可以
 * */
function shiftTtH(str){
  /*转2位小数*/
  var tempArr = parseFloat(str).toFixed(2).split(".")
  var template = '<span data-pic='+parseFloat(str).toFixed(2)+' class="font-color-de352f" style="font-weight: bold">￥'+tempArr[0]+'.<span class="font-size-14">'+tempArr[1]+'</span></span>'
  return template
}
/*更新总价*/
function upAllPicView () {
  $("span[name='shopAllPic']").html(shiftTtH(getAllPic()))
}
/*加减事件*/
$("main").on('click',".button-boxs button",function(){
  let shopPic = $(this).parents(".flex-row .f-j-b").children("span").attr("data-pic")
  var tempBoolean = $(this).text() === '+'
  let shopNumber = numberShift($(this).siblings("span"),tempBoolean)
  let shopNP = parseFloat(shopPic) * parseInt(shopNumber)
  $(this).parents(".flex-row .f-j-b").children("span").html(shiftTtH(shopNP))
  upAllPicView()
})

/*数量转换
 * min,max限制
 * */
function numberShift (el,boolean) {
  var minNumber = 1,maxNumber = 99
  var tempNumber = parseInt(el.text())
  if(boolean){
    if(tempNumber < maxNumber){tempNumber ++}
  }else{
    if(tempNumber > minNumber){tempNumber --}
  }
  el.text(tempNumber)
  return tempNumber
}
/*订单按钮事件*/
$("button.bg-color-b-b").on('click',function () {
  if(tempBoolean){
    alert("删除")
  }else{
    alert("提交订单")
  }
})

/*加载数据
 *
 * data预设格式
 *
 * */

const testData = {
  title : '店铺名称',
  main_url : '店铺地址',
  shopInfo : [
    {
      shop_url : './images/26_02.png',
      shop_title : '商品标题1',
      shop_pic : '88.588'
    },
    {
      shop_url : '商品地址2',
      shop_title : '商品标题2',
      shop_pic : '99'
    }
  ]
}
/*生成Html片段 es6*/
function createHTMl({title ="默认商家名称",main_url = "#",shopInfo}){
  let tempLate =  `<div class="margin-bottom" name="zyh-shopInfoBoxs">
        <a href=${main_url}><div class="zyh height-50 l-height public-padding-lr border-bottom-ea bg-color-white">
        <i class="iconfont icon-dianpu"></i>
        <span>${title}</span>
        <i class="iconfont icon-you icon-right"></i>
        </div></a>`

  function createShopInfo({shop_url,shop_title,shop_pic}) {
    return `<div name="zyh-shopInfo" class="margin-top-5 public-padding-tb public-padding-lr flex-row bg-color-white border-bottom-ea">
        <i class="iconfont icon-weixuanzhong shop-icon"></i>
        <img src=${shop_url} class="shop-img" alt="商品图片">
        <div class="public-padding-l flex-c-b" style="width: 100%">
        <span>${shop_title}</span>
        <div class="flex-row f-j-b" name="shopPic">` + shiftTtH(shop_pic) +
      `<div class="button-boxs">
        <button class="re-button bg-color-white">-</button>
        <span class="button-number">1</span>
        <button class="re-button bg-color-white">+</button>
        </div></div></div></div>`
  }

  /*遍历shopInfo 商品列表*/
  for(let o of shopInfo){
    tempLate +=createShopInfo(o)
  }
  return tempLate

}
/*添加商品信息*/
function upView (data) {
  $("main").append(createHTMl(data))
}
/*选中的数量*/
function getSeNumber () {
  return $("div[name='zyh-shopInfo']>i.icon-xz").length
}
function upSeNumber(){
  $("span[name='select-number']").text(getSeNumber())
}
/*tip*/
console.info("%c输入 upView(testData) 来添加数据","color:red;font-size:1.5rem")