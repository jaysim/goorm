/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.goorm.org/License
 **/org.goorm.core.theme.area=function(){this.dialog=null,this.buttons=null,this.parent=null,this.target=null},org.goorm.core.theme.area.prototype={init:function(e){var t=this;this.parent=e;var n=function(){var n=0;$(".area_cell").each(function(){$(this).text()==$("#newArea").attr("value")&&(n=1)}),$("#newArea").attr("value").indexOf(" ")>-1&&(n=2);if(n==0){e.part_array.push($("#newArea").attr("value"));var r="<div class='area_cell newAreaCell "+$("#newArea").attr("value")+"'>"+$("#newArea").attr("value")+"</div>";$(t.target).before(r),r="",r+="<div id='css_box"+$("#newArea").attr("value")+"' class='css_box newCssBox'>",r+="<div id='"+$("#newArea").attr("value")+"Cell"+i+"' class='css_cell add_new_css newCssCell'><div style='float:left; margin-left:5px;  margin-top:7px; font-size:11px'>Add New CSS</div></div>",r+="</div>",$(".themeContents").append(r),$(".newAreaCell").bind("click",t.parent.area_box_click_function,this),$(".newCssCell").bind("click",t.parent.css_box_click_function,this),$(".newCssBox").hide(),$(".newAreaCell").removeClass("newCssCell"),$(".newCssCell").removeClass("newCssCell"),$(".newCssBox").removeClass("newCssCell")}else n==1?alert.show(core.module.localization.msg.alertNaming):alert.show(core.module.localization.msg.alertValue);this.hide()},r=function(){this.hide()};this.buttons=[{text:"OK",handler:n,isDefault:!0},{text:"Cancel",handler:r}],this.dialog=new org.goorm.core.theme._css.dialog,this.dialog.init({title:"Add New Area",path:"configs/preferences/org.goorm.core.theme/theme.area.html",width:220,height:150,modal:!0,buttons:this.buttons,success:function(){}}),this.dialog=this.dialog.dialog},show:function(e){var t=this;this.target=e,this.dialog.panel.show()}};