;(function(window){
	window.lengthLimit = function(id,max){
		if(!id || !max) return;
		var el = document.getElementById(id);
		var max = max;
		el.onkeyup = function(e){
			var i = 0,
				len = this.value.length;
				num = 0;
			for(i; i<len; i++){
				if(this.value.charCodeAt(i) > 128){
					num += 2;
				}else{
					num += 1;
				}
				if(num>=max){
					this.value = this.value.substr(0,i+1);
					break;
				}
			}
		}
	}
})(window);