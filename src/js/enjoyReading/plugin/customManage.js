;(function($,window){
	var customManageSettings = {};
	var customManageDialog = {};
	$.fn.customManage = function(opt){
		var that = this;
	
		var defaults = {
			'event':'click',
			'pathUrl':'/portal/techForum/managePath',
			'friendUrl':'/portal/techForum/manageFriend',
			'infoUrl':'/portal/techForum/manageInfo',
			'savePathUrl':'/portal/techForum/saveManagePath',
			'saveFriendUrl':'/portal/techForum/saveManageFriend',
			'saveInfoUrl':'/portal/techForum/saveManageInfo',
			'width':'780px',
			'height':'504px'
		};

		customManageSettings = that.settings = $.extend(defaults,opt,{});

		//path设置
		that.bind(that.settings.event,function(){
			$.get(that.settings.pathUrl+'?t='+new Date().getTime(),function(res){
				customManageDialog = new BC_Dialog({width:that.settings.width,height:that.settings.height,title:'',id:'customManageDialog',buttons:false,content:res});
				customManageDialog.open();
			})
		});
	}

	//表单验证
	var pathManageValidate = function(){
		if($('#customManageForm input[name="pathId[]"]').size()>0){
			return {"validate":true,"msg":""};
		}else{
			return {"validate":false,"msg":"请选择您感兴趣的内容~"};
		}
	}
	var friendManageValidate = function(){
		if($('#customManageForm input[name="userNames[]"]').size()>0){
			return {"validate":true,"msg":""};
		}else{
			return {"validate":false,"msg":"请选择hi好友~"};
		}
	}

	//取消，保存
	$('body').delegate('.customManageFooter','click',function(e){
		var e = e || window.event,
			target = e.srcElement || e.target,
			$target = $(target);
		var saveUrl;

		if($target.hasClass('disabled')) return;

		if($(this).hasClass('pathManage')){
			saveUrl = customManageSettings.savePathUrl;
		}
		if($(this).hasClass('friendManage')){
			saveUrl = customManageSettings.saveFriendUrl;
		}
		if($(this).hasClass('infoManage')){
			saveUrl = customManageSettings.saveInfoUrl;
		}
		
		//提交
		if($target.hasClass('save')){
			var $form = $('#customManageForm');
			var isValidate;

			if($(this).hasClass('pathManage')){
				isValidate = pathManageValidate();
			}
			if($(this).hasClass('friendManage')){
				isValidate = friendManageValidate();
			}
			if($(this).hasClass('infoManage')){
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
					var sDialog = new BC_Dialog({'dropback':false,'auto_close':true,'id':'favDialog','content':'保存成功','dialog_type':'success','buttons':false,'need_close':false,width:'100px',title:''});
						sDialog.dialog.css('text-align','center');
						sDialog.open();
					setTimeout(function(){
						customManageDialog.close();
					},1600)
						
				}else{
					$FAM.fns.showMessage(data.msg);
				}
			})
		}

		//取消
		if($target.hasClass('cancel')){
			customManageDialog.close();
		}
	});

	//标签切换
	$('body').delegate('#customManageDialog .manageTab li','click',function(){
		console.log(customManageSettings.pathUrl)
		if(!$(this).hasClass('current')){
			var saveUrl,
				needSave = false;
			switch($(this).siblings('.current').attr('type')){
				case 'path':
					saveUrl = customManageSettings.savePathUrl;
					if(window.pathFormData != $('#customManageForm').serialize()){
						needSave = true;
					}
					break;
				case 'friend':
					saveUrl = customManageSettings.saveFriendUrl;
					if(window.friendFormData != $('#customManageForm').serialize()){
						needSave = true;
					}
					break;
				case 'info':
					saveUrl = customManageSettings.saveInfoUrl;
					if($('.otherConcern')[0].checked){
						$('.otherConcern').val($('.workConcern').val());
					}
					if($('.otherInterest')[0].checked){
						$('.otherInterest').val($('.lifeInterest').val());
					}
					if(window.infoFormData != $('#customManageForm').serialize()){
						needSave = true;
					}
					break;
				default:
					saveUrl = customManageSettings.savePathUrl;
					if(window.pathFormData != $('#customManageForm').serialize()){
						needSave = true;
					}
			}

			if(needSave){
				$.post(saveUrl,$('#customManageForm').serialize(),function(data){
					
				})
			}

			$(this).siblings('.current').removeClass('current');
			$(this).addClass('current');
			var url;
			switch($(this).attr('type')){
				case 'path':
					url = customManageSettings.pathUrl;
					break;
				case 'friend':
					url = customManageSettings.friendUrl;
					break;
				case 'info':
					url = customManageSettings.infoUrl;
					break;
				default:
					url = customManageSettings.pathUrl;
			}

			$.get(url+'?t='+new Date().getTime(),function(res){
				$('#customManageDialog .d-body').html(res);
			})
		}
	})
})(jQuery,window);
