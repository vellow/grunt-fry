;(function(window){
	window.getSearch = function(key, searchStr){
		var searchStr = searchStr || window.location.search;
		var key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	    var regexS = "[\\?&]"+key+"=([^&#]*)";
	    var regex = new RegExp( regexS );
	    var results = regex.exec( decodeURIComponent(searchStr.replace('+','%20')) );
	    if( results == null )
	        return "";
	    else
	        return results[1];
	}

	window.parseSearch = function(key, searchStr){
		var searchStr = searchStr || "";
		var obj = {};
		$.each(searchStr.split("&"), function(i, item){
			var tem_arr = item.split("=");
			obj[tem_arr[0]] = obj[tem_arr[0]] || [];
			
			if(!!tem_arr[1]){
			   obj[tem_arr[0]].push(tem_arr[1]);
			}
		})
		return obj[key] || "";
	}

	window.showImgDelay = function (imgObj,imgSrc,maxErrorNum){  
	    if(maxErrorNum > 0){  
	        imgObj.onerror = function(){  
	            showImgDelay(imgObj,imgSrc,maxErrorNum-1);  
	        };  
	        setTimeout(function(){  
	            imgObj.src = imgSrc;  
	        }, 500);  
	    }else{  
	        imgObj.onerror = null;  
	        imgObj.src = "/portal/static/img/family_people.jpg";  
	    }  
	}
})(window);



/*!
	带搜索框的topbar
*/
;var G_TopBar = function(){
	var $root = $(".topBar");
	var focusColor = "#333", defaultColor = "#bababa", defaultValue="输入文章标题、关键字、作者";
	//订阅栏目
	$('.topBar .subscribe', $root).bind('click',function(){
		
		var $this = $(this);
		var pathId = window.getSearch('pathId');
		$.post('/portal/techForum/articleAbstractListAddFavouriteChannel',{pathId:pathId},function(data){
			if(data){
				if($this.hasClass('ed')){
					$this.removeClass('ed').text('+订阅此栏目');
				}else{
					$this.addClass('ed').text('取消订阅');
				}
			}
		})
	});

	$('input[name="keyWord"]').placeholder({'defaultValue':defaultValue,'defaultColor':defaultColor,'focusColor':focusColor});
    $('input[name="keyWord"]').data("defaultValue", defaultValue);

	//发布下拉菜单
	$('.createMenu', $root).bind({
		'mouseenter':function(){
			$(this).children('ul').show();
		},
		'mouseleave':function(){
			$(this).children('ul').hide();
		}
	});

    _str = window.getSearch("keyWord");
    if(!!_str){
        $('input[name="keyWord"]', $root).val(_str).css("color", focusColor) ;
    }

	/*if(location.href.indexOf("searchResult") != -1){
	    $(".searchBlock :submit").click(function(){
	    	
	        	listTurnToPage(1, _str);
	    	
	        return false;
	    })
    }*/
};

//获得徽章提示弹框
window.newBadgeTip = function(opt){
	var defaultSettings = {
		"imgSrc":"",
		"name":[]
	}
	this.settings = $.extend(defaultSettings,opt,{});
	var i =0, len = this.settings.name.length,
		badges = [];
	for(i;i<len;i++){
		if(i>2) break;
		badges.push(this.settings.name[i]);
	}
	var etc = (len>3) ? '等' : '';
	var onlyStr = (len==1) ? "一枚" : '';
	var content = 	'<a class="badgePic"><img src="'+this.settings.imgSrc+'"/></a>'+
					'<ul>'+
						'<li>恭喜你少年！</li>'+
						'<li>成功斩获“<span>'+badges.join('，')+'</span>”'+etc+'徽章'+onlyStr+'！</li>'+
					'</ul>';
	var closefn_badgeTipDialog = function(plugin){
		plugin.close();
	}
	var okfn_badgeTipDialog = function(plugin){
		plugin.close();
		location.href = '/portal/techForum/selfManage';
	}
	var badgeTipDialog = new BC_Dialog({
								id:'badgeTipDialog',
								title:'',content:content,
								width:'390px',height:'168px',
								buttons:[
									{caption:'我知道了',classes:'btn_gray',callback:closefn_badgeTipDialog},
									{caption:'去看看',classes:'btn_blue',callback:okfn_badgeTipDialog}
								]
							});
	badgeTipDialog.open();
	var $ul = $('#badgeTipDialog .d-body>ul'),
		marginTop = -$ul.height()/2 - 18 +'px';
	$ul.css('margin-top',marginTop);
};

//搜索提交验证
$('#techSearchForm').submit(function(){
	if(!$.trim($(this).find('input[name="keyWord"]').val().replace('输入文章标题、关键字、作者',''))){
		$(this).find('input[name="keyWord"]').focus();
		return false;
	}
});