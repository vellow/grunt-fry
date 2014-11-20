;(function($){

	var textSelect = function(obj,start,end){
		if(obj.createTextRange){//IE浏览器
		    var range = obj.createTextRange();              
		    range.moveEnd("character",end);
		    range.moveStart("character", start);
		    range.select();
		}else{//非IE浏览器
		    obj.setSelectionRange(start, end);
		    obj.focus();
		}
	}
	/*数据加载完毕，生成分页*/
	if(parseInt($('input[name="commentCount"]').val()) > 0){
		ShowPageBar(
			'pageBar',
			'',
			{
		       style: 'simplePink', mark: '',
		       totalCount: parseInt($('input[name="commentCount"]').val()),
		       showPageNumber: 3, 
		       pageCount: parseInt($('input[name="pageSize"]').val()), 
		       currentPageIndex: parseInt($('input[name="pageNum"]').val()), 
		       noRecordTip: "没有记录", 
		       preWord: "上一页", nextWord: "下一页",
		       onclick: "turnToPage({pageindex});return false;"
		   }
		)
	}else{
		$('#pageBar').hide();
	}
	

	/*回复某人*/
	$('.comments').delegate('.reply','click',function(e){
		var e = e || window.event;
		e.preventDefault();
		var $form = $('#J_commentForm'),
			$textarea = $form.find('textarea'),
			$replyTo = $form.find('input[name="replyToUser"]'),
			$replyToComment = $form.find('input[name="replyToComment"]');

		var	left = $textarea.offset().left,
			top = $textarea.offset().top,
			name = $(this).attr('username'),
			commentId = $(this).attr('commentId'),
			userId = $(this).attr('userId');

		window.scrollTo(left,top);

		$textarea.val('回复'+name+'：');
		var obj = $textarea[0],
			start = obj.value.length,
			end = obj.value.length;
		textSelect(obj,start,end);

		$replyTo.val(userId);
		$replyToComment.val(commentId);
	})

	$('.comments').delegate('#J_commentForm textarea','focus blur',function(event){
		if(event.type == 'focusin'){
			$(this).addClass('focus');
			if($(this).val() == '我来说两句...'){
				$(this).val('');
			}
		}else if(event.type == 'focusout'){
			$(this).removeClass('focus');
		}
	})

	/*@功能*/
	$('#J_commentForm textarea').at('@');
				//赞
			$('.supportblock').delegate('.support','click',function(){
			var $this = $(this);
			var articleId = $this.attr('articleId');
			
			if(!$this.hasClass('ed')){
				$.post('/portal/enjoyReading/articleAbstractListSupport',{articleId:articleId},function(data){
					var count = parseInt($this.text());
					if(data.success){
						$this.addClass('ed');
						$this.text(count+1);
					}
				})
			}
			/*else{
				$.post('/portal/techForum/articleAbstractListDeleteSupport',{articleId:articleId},function(data){
					var count = parseInt($this.text());
					if(data.success){
						$this.removeClass('ed');
						$this.text(count-1);
					}
				})
			}*/
		});
		//收藏
	$('.supportblock').delegate('.favorate','click',function(){
			var $this = $(this);
			var articleId = $this.attr('articleId');
			if(!$this.hasClass('ed')){
				$.post('/portal/enjoyReading/articleAbstractListAddFavouriteArticle',{articleId:articleId},function(data){
					var count = parseInt($this.text());
					if(data.success){
						$this.addClass('ed');
						$this.text(count+1);
					}
				})
			}else{
				$.post('/portal/techForum/articleAbstractListDeleteFavouriteArticle',{articleId:articleId},function(data){
					var count = parseInt($this.text());
					if(data.success){
						$this.removeClass('ed');
						$this.text(count-1);
					}
				})
			}
	});
	
	/*发表评论*/
	$('.comments').delegate('#J_commentForm .submitBtn','click',function(event){
		var $textarea = $(this).parent().find('textarea'),
			$this = $(this);
		if(!$.trim($textarea.val()) || $textarea.val() == '我来说两句...'){
			$textarea.focus();
			return false;
		}
		if(!$this.hasClass('disabled')){

			if($('#J_login').size()==0){
				$this.addClass('disabled');
			}
			var initContent = $('#J_commentFormTextarea').val();

			// var atArr = initContent.match(/@(\S+)/g);
			// if(atArr){
			// 	var i = 0, len = atArr.length;
			// 	for(i; i<len; i++){
			// 		initContent = initContent.replace(atArr[i],'<span class="atSpan">'+ atArr[i] +'</span>');
			// 	}
			// }
			$('#J_commentForm [name="content"]').val(initContent);
			$.post('/portal/enjoyReading/articleAbstractListAddComment', $('#J_commentForm').serialize(),function(data){
				if(data.success){
					turnToPage(1);
				} else {
					$FAM.fns.showMessage(data.msg);
				}
				$textarea.val('');
				$this.removeClass('disabled');
			})
		}
	})

})(jQuery)

/*加载分页数据*/
function turnToPage(pageIndex){
	var articleId = $('#J_commentForm').attr('articleId'),
		pageSize = $('input[name="pageSize"]').val(),
		param;
	if($('#newsDetailPage').size()>0){
		param = {articleId:articleId};
	}else{
		param = {page:pageIndex,articleId:articleId,pageSize:pageSize};
	}
	$.post('./newsdetail/commentlistpage',param,function(data){
		var $comments = $('.comments'),
			top = $comments.offset().top,
			left = $comments.offset().left;
		$comments.html(data);
		window.scrollTo(left,top);
		ShowPageBar(
			'pageBar',
			'',
			{
		       style: 'simplePink', mark: '',
		       totalCount: parseInt($('input[name="commentCount"]').val()),
		       showPageNumber: 3, 
		       pageCount: parseInt($('input[name="pageSize"]').val()), 
		       currentPageIndex: parseInt(pageIndex), 
		       noRecordTip: "没有记录", 
		       preWord: "上一页", nextWord: "下一页",
		       onclick: "turnToPage({pageindex});return false;"
		   }
		);
		$('#J_commentForm textarea').at('@');
	})
}
;(function($){
	window.getSearch = function(key, searchStr){
		var searchStr = searchStr || window.location.search;
		var key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	    var regexS = "[\\?&]"+key+"=([^&#]*)";
	    var regex = new RegExp( regexS );
	    var results = regex.exec( decodeURIComponent(searchStr.replace('+','%20')) );
	    if( results == null )
	        return "";
	    else
	        return results[1];
	};

	$('.support ul').bind('click',function(){
		var $this = $(this),
			supported = $this.attr('supported'),
			articleId = $(this).attr('articleId');
		if(supported == 'false'){
			var $span = $(this).find('li:first-child span'),
				num = parseInt($span.text()) + 1;
			$.get('./newsdetail/support?t='+new Date().getTime(), {articleId:articleId}, function(rep){
				if (rep.success) {
					if(rep.isAlreadySupport){
						$span.text(num);
						$this.attr('supported','true');
					}
				} else {
            		$FAM.fns.showMessage(rep.message);
            	}
			})
		}else{
			var $li = $(this).find('li:first-child'),
				_html = $li.html();
			$li.html('顶过了:)');
			setTimeout(function(){
				$li.html(_html);
			},500);
		}
	});

	if($('.secretLoading').size()>0){
		var articleId = window.getSearch('articleId');
		$.get('/portal/ajaxSecretArticleDetail',{'articleId':articleId},function(res){
			$('.article>.content').html(res);
		})
	}
})(jQuery)