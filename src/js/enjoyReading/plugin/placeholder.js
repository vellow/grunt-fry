;(function($){
	$.fn.placeholder = function(settings){
		var defaultValue = settings.defaultValue || '请输入文字';
		var defaultColor = settings.defaultColor || '#bababa';
		var focusColor = settings.focusColor || '#333';
		var focusCb = settings.focusCallback || function(){};
		var blurCb = settings.blurCallback || function(){};

		$(this).bind({
			focus:function(){
				var value = this.value.replace(/(^\s*)|(\s*$)/g, "");
				if(value == defaultValue){
					this.value = '';
					this.style.color = focusColor;
				}
				focusCb();
			},
			blur:function(){
				var value = this.value.replace(/(^\s*)|(\s*$)/g, "");
				if(!value || (value==defaultValue)){
					this.value = defaultValue;
					this.style.color = defaultColor;
				}
				blurCb();
			}
		})
	}
})(jQuery);