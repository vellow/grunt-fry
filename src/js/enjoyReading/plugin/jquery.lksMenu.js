/* @version 1.1 lksMenu
 * @author Lucas Forchino
 * @webSite: http://www.tutorialjquery.com
 * lksMenu.
 * jQuery Plugin to create a css menu
 */
;(function($){
    $.fn.lksMenu=function(options){
        var defaults = {
            onOpen:function(){
                window.location.href = "/portal/techForum/articleAbstractList?pathId="+$(this).attr("pathid")||"";
            }
        };
        var options = $.extend(defaults, options);

        return this.each(function(){
            var menu= $(this);

            if((menu.find(".current").size() == 0)&& $('.techForumIndex').size()==0){
                menu.find(".holder_title").addClass("current")
            }

            menu.find('.menu-toggle-arrows').bind('click',function(event){
                event.stopPropagation();
                var $this = $(this);
                var $parent = $this.parent();
                if($parent.hasClass("open")){
                    $parent.removeClass("open");
                    $parent.next().slideUp(250);
                }else{
                    $parent.addClass("open");
                    $parent.next().slideDown(250);
                }
            });

            //menu.find(".current .menu-toggle-arrows").click();

            menu.find('.holder').click(function(event){
                var currentlink=$(event.currentTarget);
                options.onOpen.call(currentlink);
            });
        });
    }
})(jQuery);