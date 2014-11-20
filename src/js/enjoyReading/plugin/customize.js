;(function($,window){
	var customizeSettings = {};
	var customizeDialog = {};
	$.fn.customize = function(opt){
		var that = this;
		var defaults = {
			'event':'click',
			'pathUrl':'/portal/techForum/customizePath',
			'friendUrl':'/portal/techForum/customizeFriend',
			'infoUrl':'/portal/techForum/customizeInfo',
			'savePathUrl':'/portal/techForum/saveCustomizePath',
			'saveFriendUrl':'/portal/techForum/saveCustomizeFriend',
			'saveInfoUrl':'/portal/techForum/saveCustomizeInfo',
			'width':'780px',
			'height':'494px'
		};

		customizeSettings = that.settings = $.extend(defaults,opt,{});

		//path设置
		that.bind(that.settings.event,function(){
			$.get(that.settings.pathUrl+'?t='+new Date().getTime(),function(res){
				customizeDialog = new BC_Dialog({width:that.settings.width,height:that.settings.height,title:'',id:'customizeDialog',buttons:false,content:res});
				customizeDialog.open();
			})
		});
	}
	//表单验证
	var pathValidate = function(){
		if($('#customizeForm input[name="pathId[]"]').size()>0){
			return {"validate":true,"msg":""};
		}else{
			return {"validate":false,"msg":"请选择您感兴趣的内容~"};
		}
	}
	var friendValidate = function(){
		if($('#customizeForm input[name="userNames[]"]').size()>0){
			return {"validate":true,"msg":""};
		}else{
			return {"validate":false,"msg":"请选择hi好友~"};
		}
	}

	//提交，上一步，下一步跳转，保存
	$('body').delegate('.customizeFooter','click',function(e){
		var e = e || window.event,
			target = e.srcElement || e.target,
			$target = $(target);
		var prevUrl,saveUrl,nextUrl;

		if($target.hasClass('disabled')) return;

		if($(this).hasClass('path')){
			nextUrl = customizeSettings.friendUrl;
			saveUrl = customizeSettings.savePathUrl;
		}
		if($(this).hasClass('friend')){
			prevUrl = customizeSettings.pathUrl;
			nextUrl = customizeSettings.infoUrl;
			saveUrl = customizeSettings.saveFriendUrl;
		}
		if($(this).hasClass('info')){
			prevUrl = customizeSettings.friendUrl;
			saveUrl = customizeSettings.saveInfoUrl;
		}
		//上一步
		if($target.hasClass('prev')){
			$.get(prevUrl+'?t='+new Date().getTime(),function(data){
				$('#customizeDialog .d-body').html(data);
			})
		}
		//跳过
		if($target.hasClass('skip')){
			$.post(saveUrl,{},function(data){
				if(data.success){
					$.get(nextUrl+'?t='+new Date().getTime(),function(data){
						$('#customizeDialog .d-body').html(data);
					})
					if($('.cusomizeTrigger').size()==0) return;
					$('#tipDialog').remove();
					$('.cusomizeTrigger').replaceWith('<span class="cusomManageTrigger">偏好设置</span>');
					$('.cusomManageTrigger').customManage();
				}
			})
		}
		//提交
		if($target.hasClass('save')){
			var $form = $('#customizeForm');
			var isValidate;

			if($(this).hasClass('path')){
				isValidate = pathValidate();
			}
			if($(this).hasClass('friend')){
				isValidate = friendValidate();
			}
			if($(this).hasClass('info')){
				if($('.otherConcern')[0].checked){
					$('.otherConcern').val($('.workConcern').val());
				}
				if($('.otherInterest')[0].checked){
					$('.otherInterest').val($('.lifeInterest').val());
				}
				isValidate = {"validate":true};
			}
			if(!isValidate.validate){
				$FAM.fns.showMessage(isValidate.msg);
				return ;
			}

			$.post(saveUrl,$form.serialize(),function(data){

				if(data.success){
					if(!nextUrl){
						customizeDialog.close();
						return;
					}
					$.get(nextUrl+'?t='+new Date().getTime(),function(data){
						$('#customizeDialog .d-body').html(data);
					})

					if($('.cusomizeTrigger').size()==0) return;
					
					$('#tipDialog').remove();
					$('.cusomizeTrigger').replaceWith('<span class="cusomManageTrigger">偏好设置</span>');
					$('.cusomManageTrigger').customManage();
				}else{
					$FAM.fns.showMessage(data.msg);
				}
			})
		}
	});
})(jQuery,window);
