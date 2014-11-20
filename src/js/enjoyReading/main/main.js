/*!
	带搜索框的topbar  依赖 tupbbs/plugin/common.js G_TopBar函数
*/
G_TopBar();

/*!
	你可能感兴趣的话题 （个性化定制）
*/

$("#J_showInterest").click(function(){
    $("#interestArticles ul").load("/portal/techForum/ajaxInterest?t=" + new Date().getTime() );
    return false;
});

/*首页slider*/
$('#J_indexSlider').flexslider({slideshowSpeed: 3000});
$('#J_indexSlider li').on('mouseover',function(){
  $('#J_indexSlider').flexslider('pause');
}).on('mouseout',function(){
  $('#J_indexSlider').flexslider('play');
});

/*极客专题*/
$('.geekSliderWrapper').Xslider({
	unitdisplayed:3,
	numtoMove:3,
	speed:100,
	unitlen:136
});

/*猜你喜欢，最新，七日热贴，最新回复切换*/
$.tabTrans({
	'tab':$('.tabWrapper .grayTitle ul li'),
	'content':$('.tabWrapper .tablist>div'),
	'callback':function(oldIndex,index){$('.tabWrapper .grayTitle').removeClass('titleTrans'+oldIndex).addClass('titleTrans'+index)}
});

/*搜索placeholder及搜索关键字下拉*/
$('#techSearchForm input[type="text"]').placeholder({
	'defaultValue':'输入文章标题、关键字、作者',
	'focusCallback':function(){
		if(typeof $('.hotkeyWords').data['hideTime'] != 'undefined'){
			clearTimeout($('.hotkeyWords').data['hideTime']);
		}
		$('.hotkeyWords').removeClass('hide');
	},
	'blurCallback':function(){
		$('.hotkeyWords').data['hideTime'] = setTimeout(function(){
			$('.hotkeyWords').addClass('hide');
		},50)
	}
});

/*度学堂十大热播切换*/
$.tabTrans({
	'tab':$('.learnTab li'),
	'content':$('.duLearn'),
	'callback':function(oldIndex,index){$('.learnTab').removeClass('learnTab'+oldIndex).addClass('learnTab'+index)}
})
