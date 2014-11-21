


;(function($,window){
	window.addTags = function(opt){
		var self = this;
		this.$tagContainer = $(opt.container),
		this.$input = this.$tagContainer.find('input[type="text"]'),
		this.maxTagLength = opt.maxLength || 10,
		this.maxTagNum = opt.max || 5;
		this.$tagContainer.bind('click',function(e){
			var e = e || window.event,
				target = e.target || e.srcElement;
			if(target.tagName != 'em' || target.tagName != 'EM'){
				self.$input.focus();
			}
		});
		addTags.addTag(this);
		addTags.delTag(this);
	};

	addTags.addTag = function(tis){
		var self = tis;
		self.$input.bind({
			keyup: function(e){
				var e = e || window.event,
					keyCode = e.keyCode || e.which || e.charCode,
					tagHtml = '';
				var reg = /[<>，]/;
				var lastLetter = this.value.slice(this.value.length-1,this.value.length);
				if(reg.test(lastLetter)){
					this.value = this.value.substr(0,this.value.length-1);
				}
				
				if(this.value.length>=self.maxTagLength){
					this.value = this.value.substr(0,self.maxTagLength);
				}
			},
			keydown: function(e){
				var e = e || window.event,
					keyCode = e.keyCode || e.which || e.charCode,
					tagHtml = '';
				if(self.$tagContainer.find('span').length >= self.maxTagNum){
					e.returnValue = false;
				}

				if(keyCode == 188 || keyCode == 32 || keyCode == 13){
					e.preventDefault();
					var i = 0,
						tags = self.$tagContainer.children('div'),
						len = tags.length;
					for(i; i<len; i++){
						if(tags.eq(i).find('span').text() == this.value){
							this.value = '';
							break;
						}
					}
					if(this.value.length>0){
						var j = 0,
							len = this.value.length;
						for(j; j<len; j++){
							
						}
						tagHtml = '<div><span>'+this.value.substr(0,self.maxTagLength)+'</span><em>×</em><input  type="hidden" name="tags" value="'+this.value.substr(0,self.maxTagLength)+'"/></div>';
						$(this).before(tagHtml);
						this.value = '';
					}
					if(self.$tagContainer.find('div').length >= self.maxTagNum){
						this.style.display = 'none';
					}
				}
			}
		})
	};

	addTags.delTag = function(tis){
		var self = tis;
		self.$tagContainer.delegate('em','click',function(e){
			$(this).parent().remove();
			self.$input[0].style.display = 'inline';
		})
	};

})(jQuery,window);