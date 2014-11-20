;(function($){

	/*数据加载完毕，生成分页*/
	if(parseInt($('input[name="totalCount"]').val()) > 0){
		ShowPageBar(
			'geeksPageBar',
			'',
			{
		       style: 'simpleBlue', mark: '',
		       totalCount: parseInt($('input[name="totalCount"]').val()),
		       showPageNumber: 3, 
		       pageCount: parseInt($('input[name="pageSize"]').val()), 
		       currentPageIndex: parseInt($('input[name="pageNum"]').val()), 
		       noRecordTip: "没有记录", 
		       preWord: "上一页", nextWord: "下一页",
		       onclick: "geeksTurnToPage({pageindex});return false;"
		   }
		)
	}else{
		$('#geeksPageBar').hide();
	}
	
})(jQuery);

/*加载分页数据*/
function geeksTurnToPage(pageIndex){
	var page = pageIndex,
		pageSize = $('input[name="pageSize"]').val();
	var pathId = window.getSearch('pathId');
	
	$.post('/portal/techForum/geeks/ajaxlist',{'pageSize':pageSize,'page':page,'pathId':pathId},function(data){
		var $listContainer = $('.listContainer'),
			top = $listContainer.offset().top,
			left = $listContainer.offset().left;
		$listContainer.html(data);
		window.scrollTo(left,top);
		ShowPageBar(
			'geeksPageBar',
			'',
			{
		       style: 'simpleBlue', mark: '',
		       totalCount: parseInt($('input[name="totalCount"]').val()),
		       showPageNumber: 3, 
		       pageCount: parseInt($('input[name="pageSize"]').val()), 
		       currentPageIndex: parseInt(pageIndex), 
		       noRecordTip: "没有记录", 
		       preWord: "上一页", nextWord: "下一页",
		       onclick: "geeksTurnToPage({pageindex});return false;"
		   }
		);
	})
};