;(function($,window){
	$.tabTrans = function(options){
		var defaults = {
				tab:$('.tab li'),
				content:$('.tabContent'),
				index:0,
				event:'mouseover',
				current:'current',
				hide:'hide',
				callback:function(){}
			},
			settings = $.extend(defaults,options);
		
		$.each(settings.tab,function(key,item){
			if(key!=settings.index){
				settings.tab.eq(key).removeClass(settings.current);
				settings.content.eq(key).addClass(settings.hide);
			}else{
				settings.tab.eq(key).addClass(settings.current);
				settings.content.eq(key).removeClass(settings.hide);
			}
		});

		settings.tab.on(settings.event,function(){
			var index = settings.tab.index($(this)),
				$content = settings.content.eq(index),
				oldIndex = settings.tab.index(settings.tab.parent().find('.current'));
				
			if(!$(this).hasClass('.'+settings.current)){
				settings.tab.removeClass(settings.current);
				$(this).addClass(settings.current);
				settings.content.addClass(settings.hide);
				settings.content.eq(index).removeClass(settings.hide);
				settings.callback(oldIndex,index);
			}
		})
	}
})(jQuery,window);