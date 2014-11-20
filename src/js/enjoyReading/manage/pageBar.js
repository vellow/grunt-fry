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
    window.listTurnToPage = function(pageIndex, options,callback){
        var pageSize = $('input[name="pageSize"]').val();
        var url = $('.tabBar .current').attr('posturl');
        var $wrapper = $('.listWrapper');
        
        //console.log($self)
       
        if(url.indexOf("roleManage") != -1){
          url = "/portal/techForum/roleManage/searchRole";
          $wrapper = $('.private_list');
        }
//debugger;
        $.get(url,$.extend({page:pageIndex,pageSize:pageSize}, options),function(data){
            var top = $wrapper.offset().top,
                left = $wrapper.offset().left;
            $wrapper.html(data);
            if($(window).scrollTop()>top){
              window.scrollTo(left,top-50);
            }
            if(callback){
              callback();
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