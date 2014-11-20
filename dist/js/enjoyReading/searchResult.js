/*!
	带搜索框的topbar  依赖 tupbbs/plugin/common.js G_TopBar函数
*/
G_TopBar();

/*!
	你可能感兴趣的话题 （个性化定制）
*/


;;(function($){
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
            pageSize = $('input[name="pageSize"]').val(),
            keyWord = $(".searchBlock input[name='keyWord']").val(),
            defaultValue = $(".searchBlock input[name='keyWord']").data("defaultValue");
        var ajaxUrl = '/portal/techForum/ajaxSearchResult';
        var params = {page:pageIndex,pageSize:pageSize,pathId:pathId,timeType:timeType,type:type, keyWord:keyWord};
            if(keyWord == defaultValue){
                keyWord = "";
            }
        
        if($('input[name="keyUserName"]').size()>0){
          var ajaxUrl = '/portal/techForum/ajaxUserArticlePageInfo';
          var params = {pageNo:pageIndex,pageSize:pageSize,userName:$('input[name="keyUserName"]').val()};
        }

        $.get(ajaxUrl,params,function(data){
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