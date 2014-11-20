;(function($){
	//切换标签更新列表
	$('.tabBar li').bind('click',function(){
		if(!$(this).hasClass('current')){
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
			var $this = $(this);
			$.get($(this).attr('posturl')+'?t='+new Date().getTime(),function(data){
				$('.listWrapper').html(data);
				ShowPageBar(
			        'pageBar',
			        '',
			        {
			           style: 'simpleBlue', mark: '',
			           totalCount: parseInt($('input[name="totalCount"]').val()),
			           showPageNumber: 3, 
			           pageCount: parseInt($('input[name="pageSize"]').val()), 
			           currentPageIndex: parseInt($('input[name="pageNum"]').val()), 
			           noRecordTip: "没有记录", 
			           preWord: "上一页", nextWord: "下一页",
			           onclick: "window.listTurnToPage({pageindex});return false;"
			       }
			    );
			    if( $this.attr('posturl').indexOf("roleManage") != -1){
			    	//勋章编辑页面，用户suggestion
				    var opts={textId:'privateUserInput',hiddenId : 'userNames'};
				    /*userSuggestion功能*/
				    $('#privateUserInput').userSuggestion(opts);
				    window.defaultsPathDataCallbacks.fire('.private_list_filter [name="pathId"]');
				    window.defaultsPathDataCallbacks.fire('#forumList [name="pathId"]');
			    } 
			})
		}
	});
	//个人描述部分，加链接
		//切换标签更新列表
	$('.description ul li').bind('click',function(){


			var $this = $(this);
			if($this.hasClass('share')){
				$('.tabBar .shared').addClass('current');
				$('.tabBar .shared').siblings('li').removeClass('current');
			}
			if($this.hasClass('response')){
				$('.tabBar .reply').addClass('current');
				$('.tabBar .reply').siblings('li').removeClass('current');
			}
			if($this.hasClass('fav')){
				$('.tabBar .collection').addClass('current');
				$('.tabBar .collection').siblings('li').removeClass('current');
			}
			if($this.hasClass('exchangeGift')){
				$('.tabBar .collection').addClass('current');
				$('.tabBar .collection').siblings('li').removeClass('current');
			}
			if($(this).attr('posturl')){
				$.get($(this).attr('posturl')+'?t='+new Date().getTime(),function(data){
				$('.listWrapper').html(data);
				ShowPageBar(
			        'pageBar',
			        '',
			        {
			           style: 'simpleBlue', mark: '',
			           totalCount: parseInt($('input[name="totalCount"]').val()),
			           showPageNumber: 3, 
			           pageCount: parseInt($('input[name="pageSize"]').val()), 
			           currentPageIndex: parseInt($('input[name="pageNum"]').val()), 
			           noRecordTip: "没有记录", 
			           preWord: "上一页", nextWord: "下一页",
			           onclick: "window.listTurnToPage({pageindex});return false;"
			       }
			    );

				})
			}
	});
	//我发布的主题 修改
	$('.listWrapper').delegate('.changeArticle','click',function(){
		var articleId = $(this).attr('articleid');
		var url = '/portal/enjoyReading/editArticle?articleId='+articleId;
		var delfn = function(){
				window.location.href=url;
		}
		var status = $(this).parent().parent().find('.status span').text();
		if(status!='草稿'){
			$FAM.fns.showConfirm('修改后需要重新审核，您确定要修改吗？',delfn);
		}else{
			delfn();
		}	
	});

	//我发布的主题 删除
	$('.listWrapper').delegate('.del','click',function(){
		var articleId = $(this).attr('articleid');
		var delfn = function(){
			$.post('/portal/enjoyReading/delMyArticle',{articleId:articleId},function(data){
				if(data.success){
					window.location.href=window.location.href;
					// location.reload(true);   
					// window.listTurnToPage(1);
				}else{
					$FAM.fns.showMessage(data.msg);
				}
			})
		}
		$FAM.fns.showConfirm('您确定要删除吗？',delfn);
	});

	//我的收藏 取消收藏
	$('.listWrapper').delegate('.cancelFav','click',function(){
		var articleId = $(this).attr('articleid');
		$.post('/portal/techForum/articleAbstractListDeleteFavouriteArticle',{articleId:articleId},function(data){
			if(data.success){
				var $em = $('.tabBar .current').find('em');
				$em.text(data.data.count);
				window.listTurnToPage(1);
			}else{
				$FAM.fns.showMessage(data.msg);
			}
		})
	});

	//定位到某个标签下
	// if(window.getSearch('type')){
	// 	$('.tabBar [type="'+window.getSearch('type')+'"]').click();
	// }

	//左侧“发布管理”当前状态
	setTimeout(function(){
		$('.manageMenu a').addClass('current');
	},501);

	//我的积分 徽章提示
	$('.listWrapper').delegate('.badgeBlock>a','mouseover mouseout',function(e){
		if(e.type=='mouseover'){
			$(this).parent().find('.tips').show();
		}
		if(e.type=='mouseout'){
			$(this).parent().find('.tips').hide();
		}
	})

	//经验计算规则编辑
	$('.listWrapper').delegate('#editMultiple .edit','click',function(){
		$('#editMultiple input[type="text"]').removeClass('hide');
		$('#editMultiple .save').removeClass('hide');
		$('#editMultiple span').addClass('hide');
		$('#editMultiple .edit').addClass('hide');
	})
	$('.listWrapper').delegate('#editMultiple .save','click',function(){
		$.post('/portal/techForum/selfManage/editMultiple',$('#editMultiple').serialize(),function(data){
			if(data.success){
				var $creditMultiple = $('input[name="integralMultiple"]'),
					$coinMultiple = $('input[name="dCurrencyMultiple"]');
				$creditMultiple.prev('span').text($creditMultiple.val());
				$coinMultiple.prev('span').text($coinMultiple.val());
				$('#editMultiple input[type="text"]').addClass('hide');
				$('#editMultiple .save').addClass('hide');
				$('#editMultiple span').removeClass('hide');
				$('#editMultiple .edit').removeClass('hide');
			}else{
				$FAM.fns.showMessage(data.msg);
			}
		})
		return false;
	})

})(jQuery);