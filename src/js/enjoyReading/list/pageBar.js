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
})(jQuery);