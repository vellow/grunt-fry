;(function($,window){
	var EXCHANGE_URLS = {
		userInfo:'/portal/enjoyReading/selfManage/ajaxUserInfo',
		exchange:'/portal/enjoyReading/selfManage/createConvert'
	};
	var exchangeDialog;
	$.fn.exchangeGift = function(options){
		$('.listWrapper').delegate('input.EXgift','click',function(){
			var giftId = $(this).attr('giftId');
			exchangeDialog = new BC_Dialog({'id':'exchangeDialog','width':'580px','height':'308px','title':'礼品兑换','buttons':false});
			$.get(EXCHANGE_URLS.userInfo, {'giftId':giftId}, function(res){

				exchangeDialog.setContent(res);
				exchangeDialog.open();

				var $needDb = $('#exchangeDialog .needDbWrapper'),
					$userInfo = $('#exchangeDialog .userInfoWrapper'),
					$exchangeVerify = $('#exchangeDialog .exchangeVerifyWrapper');
					$exchangeSuccess = $('#exchangeDialog .exchangeSuccess');
					$exchangeFail = $('#exchangeDialog .exchangeFail');
				var $span_userName = $exchangeVerify.find('.userName'),
					$span_mobilePhone = $exchangeVerify.find('.mobilePhone'),
					$span_station = $exchangeVerify.find('.station');

				//获取用户联系信息
				$('#exchangeDialog').delegate('.getUserInfo','click',function(){
					$needDb.addClass('hide');
					$exchangeVerify.addClass('hide');
					$userInfo.removeClass('hide');
				});
				//获取礼品积分信息
				$('#exchangeDialog').delegate('.getGiftScore','click',function(){
					$exchangeVerify.addClass('hide');
					$userInfo.addClass('hide');
					$needDb.removeClass('hide');
				});
				
				//确认信息
				$('#exchangeDialog').delegate('.verify','click',function(){
					var userName = $('input[name="userName"]').val(),
						mobilePhone = $('input[name="mobile"]').val(),
						station = $('input[name="address"]').val();
					if(!$.trim(mobilePhone)){
						$('input[name="mobile"]').val('').focus();
						return;
					}
					if(!$.trim(station)){
						$('input[name="address"]').val('').focus();
						return;
					}

					$span_userName.text(userName);
					$span_mobilePhone.text(mobilePhone);
					$span_station.text(station);
					$needDb.addClass('hide');
					$exchangeVerify.removeClass('hide');
					$userInfo.addClass('hide');
				});
				//完成兑换
				$('#exchangeDialog').delegate('.exchange','click',function(){
					var userName = $('input[name="userName"]').val(),
						mobilePhone = $('input[name="mobile"]').val(),
						station = $('input[name="address"]').val();
					$.post(EXCHANGE_URLS.exchange,{'userName':userName,'mobilePhone':mobilePhone,'station':station,'giftId':giftId}, function(data){
						//exchangeDialog.close();
						if(data.success){
						$exchangeVerify.addClass('hide');
						$exchangeSuccess.removeClass('hide');
						/*setTimeout(function(){
		             	   window.location.reload();
		          		},1500);*/
						}else{
							$exchangeVerify.addClass('hide');
							$exchangeFail.removeClass('hide');
						}
					})
				});

				//关闭功能
				$('#exchangeDialog').delegate('.gift-close','click',function(){
					if( this.className !== 'gift-close no-refresh' ){
						giftClose(function(){
							setTimeout(function(){ window.location.reload(); },500)
						});
					}else{
						giftClose();
					}
				})
			})
		})
	}();
	function giftClose(fn){
		exchangeDialog.close();
		fn && fn();
	}

})(jQuery,window);
;/*!
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
