
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
	// 发表评论的焦点事件
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
				}
				$textarea.val('');
				$this.removeClass('disabled');
			})
		}
	})

	/*@功能*/
	$('#J_commentForm textarea').at('@');

})(jQuery)

/*加载分页数据*/
function turnToPage(pageIndex){
	var articleId = $('#J_commentForm').attr('articleId'),
		pageSize = $('input[name="pageSize"]').val();
	$.post('./newsdetail/commentlistpage',{page:pageIndex,articleId:articleId,pageSize:pageSize},function(data){
		var $comments = $('.comments'),
			top = $comments.offset().top - 40,
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
		/*@功能*/
		$('#J_commentForm textarea').at('@');
	})
}