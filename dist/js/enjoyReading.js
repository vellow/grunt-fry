;(function($){
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
    window.listTurnToPage = function(pageIndex){
        var pathId = window.getSearch('pathId'),
            timeType = $('.timeTab .current').attr('type'),
            type = $('.typeTab .current').attr('type'),
            pageSize = $('input[name="pageSize"]').val();
        $.get('/portal/enjoyReading/ajaxEnjoyReadingList',{page:pageIndex,pageSize:pageSize,pathId:pathId,timeType:timeType,type:type},function(data){
            var $wrapper = $('.listWrapper'),
                top = $wrapper.offset().top,
                left = $wrapper.offset().left;
            $wrapper.html(data);
            if($(window).scrollTop()>top){
              window.scrollTo(left,top-50);
            }
            
            ShowPageBar(
                'pageBar',
                '',
                {
                   style: 'simpleBlue', mark: '',
                   totalCount: parseInt($('input[name="totalCount"]').val(),10),
                   showPageNumber: 3, 
                   pageCount: parseInt($('input[name="pageSize"]').val(),10),
                   currentPageIndex: parseInt(pageIndex,10),
                   noRecordTip: "没有记录", 
                   preWord: "上一页", nextWord: "下一页",
                   onclick: "window.listTurnToPage({pageindex});return false;"
               }
            );
        });
    };
})(jQuery);;;(function($){
	$('input[name="keyWord"]').placeholder({'defaultValue':'输入文章标题、关键字、作者','defaultColor':'#bababa','focusColor':'#333'});
	//切换标签更新列表
	$('.tabBar li').bind('click',function(){
		if(!$(this).hasClass('current')){
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
			window.listTurnToPage(1);
		}else{
			$(this).removeClass('current');
			window.listTurnToPage(1);
		}
	});
	//订阅栏目
	$('.topBar .subscribe').bind('click',function(){
		var $this = $(this);
		var pathId = window.getSearch('pathId');
		$.post('/portal/techForum/articleAbstractListAddFavouriteChannel',{pathId:pathId},function(data){
			if(data){
				if($this.hasClass('ed')){
					$this.removeClass('ed').text('+订阅此栏目');
				}else{
					$this.addClass('ed').text('取消订阅');
				}
			}
		})
	});
	//收藏
	$('.listWrapper').delegate('.collection','click',function(){
		var $this = $(this);
		var articleId = $this.attr('articleId');
		if(!$this.hasClass('ed')){
			$.post('/portal/techForum/articleAbstractListAddFavouriteArticle',{articleId:articleId},function(data){
				if(data.success){
					var sDialog = new BC_Dialog({'dropback':false,'auto_close':true,'id':'favDialog','content':'收藏成功','position':{trigger:$this},'dialog_type':'success','buttons':false,'need_close':false,width:'100px',title:''});
					sDialog.dialog.css('text-align','center');
					//sDialog.dialog.prepend('<span class="pointer border">◆</span><span class="pointer">◆</span>');
					sDialog.open();
					$this.addClass('ed');
				}
			})
		}else{
			$.post('/portal/techForum/articleAbstractListDeleteFavouriteArticle',{articleId:articleId},function(data){
				if(data.success){
					$this.removeClass('ed');
					var sDialog = new BC_Dialog({'dropback':false,'auto_close':true,'id':'favDialog','content':'取消成功','position':{trigger:$this},'dialog_type':'success','buttons':false,'need_close':false,width:'100px',title:''});
					sDialog.dialog.css('text-align','center');
					//sDialog.dialog.prepend('<span class="pointer border">◆</span><span class="pointer">◆</span>');
					sDialog.open();
				}
			})
		}
	});
	//赞
	$('.listWrapper').delegate('.support','click',function(){
		var $this = $(this);
		var articleId = $this.attr('articleId');
		if(!$this.hasClass('ed')){
			$.post('/portal/enjoyReading/articleAbstractListSupport',{articleId:articleId},function(data){
				var count = parseInt($this.text());
				if(data.success){
					var sDialog = new BC_Dialog({'dropback':false,'auto_close':true,'id':'favDialog','content':'成功赞','position':{trigger:$this},'dialog_type':'success','buttons':false,'need_close':false,width:'100px',title:''});
					sDialog.dialog.css('text-align','center');
					//sDialog.dialog.prepend('<span class="pointer border">◆</span><span class="pointer">◆</span>');
					sDialog.open();
					$this.addClass('ed');
					$this.text(count+1);
				}
			})
		}
		// 撤消 取消赞的功能
		/*else{
			$.post('/portal/techForum/articleAbstractListDeleteSupport',{articleId:articleId},function(data){
				var count = parseInt($this.text());
				if(data.success){
					var sDialog = new BC_Dialog({'dropback':false,'auto_close':true,'id':'favDialog','content':'取消赞','position':{trigger:$this},'dialog_type':'success','buttons':false,'need_close':false,width:'100px',title:''});
					sDialog.dialog.css('text-align','center');
					//sDialog.dialog.prepend('<span class="pointer border">◆</span><span class="pointer">◆</span>');
					sDialog.open();
					$this.removeClass('ed');
					$this.text(count-1);
				}
			})
		}*/
	});
	//发布下拉菜单
	$('.createMenu').bind({
		'mouseenter':function(){
			$(this).children('ul').show();
		},
		'mouseleave':function(){
			$(this).children('ul').hide();
		}
	});

	//评论
	var postComment = function(plugin){
		var content = $.trim($('#postComment').find('textarea').val());
		var articleId= $('#postComment').find('input[name="articleId"]').val();
		var $this = $('.commentCount.current');
		if(content){
			$.post('/portal/enjoyReading/articleAbstractListAddComment',{articleId:articleId,content:content},function(data){
				if(data.success){
					var $el = $('.listWrapper').find('.commentCount.current'),
						num = parseInt($el.text())+1;
					$el.text(num); 
					plugin.close();
					var sDialog = new BC_Dialog({'dropback':false,'auto_close':true,'id':'favDialog','content':'评论成功','position':{trigger:$this},'dialog_type':'success','buttons':false,'need_close':false,width:'100px',title:''});
					sDialog.dialog.css('text-align','center');
					//sDialog.dialog.prepend('<span class="pointer border">◆</span><span class="pointer">◆</span>');
					sDialog.open();
				}
			})
		}else{
			$('#postComment').find('textarea').focus();
		}
	};

	var closeCb = function(){
		$('.listWrapper').find('.commentCount.current').removeClass('current');
	}

	$('.listWrapper').delegate('.commentCount','click',function(e){
		var $this = $(this);
		var title = '快速评论 <span>- '+ $this.closest('.articleBlock').find('.titleBar h5 a').text() + '</span>';
		var articleId = $this.attr('articleId');
		var content = '<input type="hidden" name="articleId" value="'+articleId+'" /><textarea name="comment"></textarea>';
		var commentDialog = new BC_Dialog({'title':title,'content':content,'id':'postComment','buttons':[{'caption':'发表评论','classes':'submitBtn', 'callback': postComment}],'position':{'trigger':$this,'defaultPosition':'down'},'closeCallback':closeCb});
		commentDialog.dialog.prepend('<span class="pointer border">◆</span><span class="pointer">◆</span>');
		commentDialog.open();
		$this.addClass('current');
	})

	//给发布链接添加pathId
	$('.createMenu a').each(function(index){
		var href = $(this).attr('href') + window.getSearch('pathId');
		$(this).attr('href',href);
	})

	//列表和摘要切换
	$('.displayType select').change(function(){
		if($(this).val()=='列表'){
			$.setCookie('familyTechForumListDisplay',new Date().getTime(),{'expires':24*3600000*365*10000});
		}else{
			$.removeCookie('familyTechForumListDisplay');
		}
		window.listTurnToPage(1);
	})

	//享读首页等级 tip 提示
	/*$('.uc-message .level').bind({
		mouseenter:function(e){
			var that = $(this);
			this.timer = setTimeout(function(){
				if( !$('.choose_wrap').is(':animated') ){
				that.find('.level-tip').fadeIn(0);
				}
			},250)
		},
		mouseleave:function(){
			console.log(1)
			clearTimeout( $(this).timer )
			$(this).find('.level-tip').hide()
		}
	})*/
	
	/// 享读首页等级 tip 经验提示
	$('.level').bind({
		mouseenter:function(){
			$(this).find('.level-tip').stop(true).fadeIn(100);
		},
		mouseleave:function(){
			$(this).find('.level-tip').stop(true).fadeOut(100);
		}
	})

	//享读首页 打卡 dialog

	$('#sign').bind('click',function(){
		if(this.className == 'signed') {return};
		$.get('/portal/enjoyReading/signIn',function(data){
			if(data.success){
				$('<p>签到成功! 经验</p><span>+2 </span><p>享读币</p><span>+1</span>').prependTo( $('.sign-content .success-tip') )
				$('.sign-content img').attr('src','/portal/static/img/enjoyReading/success_icon.png')
				$('#sign strong').html('已签到')
				$('#sign').addClass('signed');
				$('.sign-mask').stop().fadeIn();
			}else{
				$('.sign-content img').attr('src','/portal/static/img/enjoyReading/fail_icon.png');
				$('.sign-content .success-tip').text(data.msg);
				$('.sign-content>span').text('');
				$('.sign-mask').stop().fadeIn();
			}
			
		})
		/*$('.sign-content img')[0].src = '/portal/static/img/enjoyReading/fail_icon.png'
		$('.sign-content p').text('打卡失败, 请重试!');
		$('.sign-content span').text('');
		$('.sign-mask').stop().fadeIn();
		$(this).addClass('signed')*/
	})

	$('.sign-mask').on('click','.sign-close',function(){
		$('.sign-mask').stop().fadeOut(100);
	})
	$('.sign-button').bind('click',function(){
		$('.sign-mask').stop().fadeOut(100);
		window.location.reload();
	})

	//自动定位切换到响应标签
	// if(window.getSearch('time')){
	// 	$('.tabBar>.timeTab>li[type="'+window.getSearch('time')+'"]').click();
	// }
	// if(window.getSearch('type')){
	// 	$('.tabBar>.typeTab>li[type="'+window.getSearch('type')+'"]').click();
	// }
	
})(jQuery);