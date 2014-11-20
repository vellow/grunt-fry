
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
;
$(function(){
      
    $(":input[type=radio]:eq(1)", ".create_reward_cost").focus(function(){
        $(this).msgtip({
            theme:"ui-msgtip-def",
            html:"舍不得银子套不着狼~<br/>你需要自行支付<font color='red'>人民币</font>，不是Q币、越南币啦！",
            buttons:[{
              text:"我知道了"
            }]
        }).msgtip("show");
    });
    
    if(!window.getSearch('articleId')){
        var defaultValue = '填写礼物，10个字以内';
        $("input[name='rewardContentGift']").css("color", "#ccc").val(defaultValue).placeholder({'defaultValue':defaultValue,'defaultColor':'#bababa','focusColor':'#333'});
    }
    
});
;
;(function($,window){
    //生成富文本编辑器
    window.editor = window.editor || {};
	window.editor = UE.getEditor('J_editor_1');

	
    //限制字符输入
    new lengthLimit('titleLimit',40);
    //标题placeholder
    $('#titleLimit').placeholder({'defaultValue':'给你分享的文章起个响亮的名字吧，注意不要超过20个字哦~','defaultColor':'#bababa','focusColor':'#333'});
    
    new lengthLimit('shareReason',800);
    $('#shareReason').placeholder({'defaultValue':'这篇文章真不错，记得把你的分享理由告诉大家呢，10个字能说清不嫌少，400个字说不完请压缩','defaultColor':'#bababa','focusColor':'#333'});
    
     new lengthLimit('Url',200);
    $('#Url').placeholder({'defaultValue':'一定要加上链接哦~','defaultColor':'#bababa','focusColor':'#333'});
    
    new lengthLimit('bookName',50);
    $('#bookName').placeholder({'defaultValue':'如果你推荐的是一本书，要写上书名哦','defaultColor':'#bababa','focusColor':'#333'});
    //添加标签
    new addTags({container:'#addTags'});

    //校验链接
    var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp=new RegExp(Expression);
    var checkUrl = function(url){
        if(objExp.test(url)==true){
           return true;
        }else{
           return false;
        }
    };


    var hideLabelsTime;
    $('#addTags input[type="text"]').bind({
    	'focus':function(){
    		clearTimeout(hideLabelsTime);
    		if($(this).val() == '（选填）最多5个标签，空格、enter区分'){
    			$(this).val('');
    			$(this).css({'color':'#333','width':'70px'});
    		}
    		if($('.addTagsWrapper>ul>li').size()>0){
    			$('.addTagsWrapper>ul').show();
    		}
    	},
    	'blur':function(){
    		if(($('#addTags>div').size()==0) && !$.trim($(this).val())){
    			$(this).css({'color':'#bababa','width':'280px'});
    			$(this).val('（选填）最多5个标签，空格、enter区分');
    		}
			hideLabelsTime = setTimeout(function(){
				$('.addTagsWrapper>ul').hide();
			},200);
    	}
    });

    $('.addTagsWrapper').delegate('li','click',function(){
    	clearTimeout(hideLabelsTime);
		var $labels = $('#addTags>div'),
			length = $labels.length,
			i = 0;
		if(length>=5) return;
		for(i; i<length; i++){
			if($labels.eq(i).find('span').text() == $(this).text()){
				return;
			}
		}
		var label = '<div><span>'+$(this).text()+'</span><em>×</em><input type="hidden" name="tags" value="'+$(this).text()+'"></div>';
		$('#addTags input[type="text"]').before(label);
		if($('#addTags>div').size()>=5){
			$('#addTags input[type="text"]').hide();
			$('.addTagsWrapper>ul').hide();
		}else{
			$('#addTags input[type="text"]').focus();
		}
    })

	//保存
	$('#createArticleForm .saveBtn').bind('click',function(){
        var $this = $(this);

        if($this.hasClass('disabled')) return;

		var title = $.trim($('#titleLimit').val());
        var shareReason = $.trim($('#shareReason').val());
        var url = $.trim($('#Url').val());
        var bookName =   $.trim($('#bookName').val());
		// var pathId = $('[name="pathId"]').val();
  //   	var subPathId = $('[name="subPathId"]').val();
    	var saveUrl;

    	// if(((subPathId == -1) || !subPathId)&&((pathId == -1) || !pathId)){
    	// 	$FAM.fns.showMessage('亲，给新主题加个专区吧~');
    	// 	return false;
    	// }

        if(title == '给你分享的文章起个响亮的名字吧，注意不要超过20个字哦~'){
            $('#titleLimit').val('默认标题');
        }
        if(!url || (url == '一定要加上链接哦~')){
            $('#Url').val('');
        }else{
            if(!checkUrl(url)){
                $FAM.fns.showMessage('链接格式不正确');
                $('#Url').focus();
                return false;
            };
        }
        if(bookName == '如果你推荐的是一本书，要写上书名哦'){
            $('#bookName').val('');
        }
        if($('#createArticleForm .create_reward_cost').size()>0){
            if($('#createArticleForm .create_reward_cost input:checked').val()=='GIFT' && !$.trim($('input[name="rewardContentGift"]').val().replace('填写礼物，10个字以内',''))){
                $('input[name="rewardContentGift"]').val('');
            }
        }
    	if(window.getSearch('articleId')){
			saveUrl = '/portal/enjoyReading/editArticle/update';
    	}else{
    		saveUrl = '/portal/enjoyReading/save';
    	}

        $this.addClass('disabled');

		$.post(saveUrl,$('#createArticleForm').serialize(),function(data){
			if(data.success){
				//跳转到我的发布页
				location.href = '/portal/enjoyReading/selfManage?manageType=myArticle';
			}else{
                if(!$.trim($('#titleLimit').val())){
                    $('#titleLimit').val('给你分享的文章起个响亮的名字吧，注意不要超过20个字哦~');
                }
				$FAM.fns.showMessage(data.msg);
                $this.removeClass('disabled');
			}
		})
	})
   
    //提交 
    $('#createArticleForm').submit(function(e){
        var $submitbtn = $(this).find('input[type="submit"]');

        if($submitbtn.hasClass('disabled')) return false;

    	var title = $.trim($('#titleLimit').val());
        var url = $.trim($('#Url').val());
        var shareReason = $.trim($('#shareReason').val());
    	// var subPathId = $('[name="subPathId"]').val();
    	var hasContent = window.editor.hasContents();
        if(!title || (title == '给你分享的文章起个响亮的名字吧，注意不要超过20个字哦~')){
            $FAM.fns.showMessage('请填写标题');
    		$('#titleLimit').focus();
    		return false;
    	}
        if(!shareReason || (shareReason == '这篇文章真不错，记得把你的分享理由告诉大家呢，10个字能说清不嫌少，400个字说不完请压缩')){
            $FAM.fns.showMessage('请填写分享理由');
            $('#shareReason').focus();
            return false;
        }
        if(!url || (url == '一定要加上链接哦~')){
            $FAM.fns.showMessage('请填写原文链接');
            $('#Url').focus();
            return false;
        }else{
            if(!checkUrl(url)){
                $FAM.fns.showMessage('链接格式不正确');
                $('#Url').focus();
                return false;
            };
        }
    	// if((subPathId == -1) || !subPathId){
    	// 	$FAM.fns.showMessage('请选择目录');
    	// 	$('[name="subPathId"]').focus();
    	// 	return false;
    	// }
    	if(!hasContent){
    		$FAM.fns.showMessage('请填写内容');
    		return false;
    	}
    	//$('body').append('<div class="mask"></div><span class="maskLoading"></span>');
    	$submitbtn.addClass('disabled');
        
        var submitFn = function(){
            $.post('/portal/enjoyReading/publish',$('#createArticleForm').serialize(),function(data){
            if(data){
              var dataJSON= $.parseJSON(data);
              //若iframe携带返回数据，则显示在form_submit_return中
              if(dataJSON && !dataJSON.success){
                $FAM.fns.showMessage(dataJSON.msg);
                $submitbtn.removeClass('disabled');
              }
              if(dataJSON && dataJSON.success){
                document.location="/portal/enjoyReading/detail?articleId="+dataJSON.data.id;
                $submitbtn.removeClass('disabled');
              }
            }
        });
        };
        $FAM.fns.showConfirm('您的分享已经交给管理员审核，请耐心等待哦',submitFn);
        $submitbtn.removeClass('disabled');
        return false;
    })

    // var iframeOnload=function(){
    //     var data = $(window.frames['form_submit_return'].document.body).html();
    //     /*$('.mask').remove();
    //     $('.maskLoading').remove();*/
    //     if(data){
    //       var dataJSON= $.parseJSON(data);
    //       //若iframe携带返回数据，则显示在form_submit_return中
    //       if(dataJSON && !dataJSON.success){
    //         $FAM.fns.showMessage(dataJSON.msg);
    //         $('#createArticleForm input[type="submit"]').removeClass('disabled');
    //       }
    //       if(dataJSON && dataJSON.success){
    //           document.location="/portal/techForum/detail?articleId="+dataJSON.data.id;
    //       }
    //     }
    // };

    //iframe加载响应，初始页面时也有一次，此时data为null。
    // $("#form_submit_return").on("load",iframeOnload);
    
    //专区选择
	$.get('/portal/techForum/searchEditPath?pathId='+(window.getSearch('pathId') || $('input[name="pathId"]').val()),function(data){

		var pathData = data;
		var selected = function(arr){
			var i = 0,
				arr = arr || [],
				length = arr.length;
			for(i; i<length; i++){
				if(arr[i].isSelected){
					return arr[i].id;
					break;
				}
			}
			return false;
		};
		var getLabels = function(){
			var selectedId = document.getElementsByName('subPathId')[0].value;
			$.get('/portal/techForum/searchSuggestionLabel?pathId='+selectedId,function(data){
				var labelData = data.labels || [];
				var i = 0,
					length = labelData.length,
					labels = '';
				for(i; i<length; i++){
					labels += '<li>'+labelData[i].name+'</li>';
				}
				$('.addTagsWrapper>ul').html(labels);
			})
		};

		var selectedPath = selected(pathData.paths);
		var selectedSubPath = selected(pathData.subPaths);
		//联动选择专区
		//new BC_ld({'data':pathData.paths,'selector':[{'name':'pathId'},{'name':'subPathId','changeCb':getLabels}],'selected':[selectedPath,selectedSubPath]});
		
		//已有标签渲染
		var labelData = pathData.labels || []; 
		var i = 0,
			length = labelData.length,
			labels = '';
		for(i; i<length; i++){
			labels += '<li>'+labelData[i].name+'</li>';
		}
		$('.addTagsWrapper>ul').html(labels);

	});

    //预览
    $('.previewBtn').bind('click',function(e){
        var $this = $(this);
        if($(this).hasClass('disabled')) return false;

        var title = $.trim($('#titleLimit').val());
        var shareReason =  $.trim($('#shareReason').val());
        var url = $.trim($('#Url').val());
       
        var hasContent = window.editor.hasContents();
        if(!title || (title == '给你分享的文章起个响亮的名字吧，注意不要超过20个字哦~')){
            $FAM.fns.showMessage('请填写标题');
            $('#titleLimit').focus();
            return false;
        }
        // if((subPathId == -1) || !subPathId){
        //     $FAM.fns.showMessage('请选择目录');
        //     $('[name="subPathId"]').focus();
        //     return false;
        // }
        if(!shareReason || (shareReason == '这篇文章真不错，记得把你的分享理由告诉大家呢，10个字能说清不嫌少，400个字说不完请压缩')){
            $FAM.fns.showMessage('请填写分享理由');
            $('#shareReason').focus();
            return false;
        }
        if(!url || (url == '一定要加上链接哦~')){
            $FAM.fns.showMessage('请填写原文链接');
            $('#Url').focus();
            return false;
        }else{
            if(!checkUrl(url)){
                $FAM.fns.showMessage('链接格式不正确');
                $('#Url').focus();
                return false;
            };
        }
        if(!hasContent){
            $FAM.fns.showMessage('请填写内容');
            return false;
        }

        if($('#createArticleForm .create_reward_cost').size()>0){
            if($('#createArticleForm').serialize().indexOf('rewardType')=='-1'){
                $FAM.fns.showMessage('请填写悬赏内容');
                 return false;
            }
            if($('#createArticleForm .create_reward_cost input:checked').val()=='GIFT' && !$.trim($('input[name="rewardContentGift"]').val().replace('填写礼物，10个字以内',''))){
                $FAM.fns.showMessage('请填写具体小礼物信息');
                 return false;
            }
        }
        var toTop = function(){
            window.scrollBy(0,-1000);
            var scrolldelay = setTimeout('toTop()',100);
            if(document.documentElement.scrollTop==0) clearTimeout(scrolldelay); 
        };
        //$('body').append('<div class="mask"></div><span class="maskLoading"></span>');
        $(this).addClass('disabled');

        $.post('/portal/enjoyReading/preview?t='+new Date().getTime(),$('#createArticleForm').serialize(),function(res){
            $('.createWrapper').addClass('hide');
            $('.previewWrapper').removeClass('hide').html(res);
            toTop();
            $this.removeClass('disabled');
            
        })
    })
})(jQuery,window);
;;(function($,window){
	window.uploadLimit = 5 - $('.uploadWrapper>li').size();

	var uploadFile = uploadFile || {};
    uploadFile ={
        onStart:function(){
            var $uploadWrapper = $('.uploadWrapper');
            if($uploadWrapper.find('li').size()==0){
              $uploadWrapper.addClass('loading').html('正在上传中...');
            }
        },
        onProgress:function(){
        },
        onUploadSuccess:function(file,data,response){
          var data=JSON.parse(data);
          var html = '<li id="' +data.url +'">' +file.name +'<span class="fileSize">('+parseInt(file.size/1024)+'KB)</span><span class="delFile"></span></li>',
              $uploadWrapper = $('.uploadWrapper'),
              $file = '<input id="'+data.url+'" type="hidden" name="file" value="'+data.url+'" />'+
                      '<input id="'+data.url+'" type="hidden" name="fileSize" value="'+parseInt(file.size/1024)+'KB" />';
          $uploadWrapper.before($file);
          if($uploadWrapper.find('li').size()==0){
            $uploadWrapper.removeClass('loading').html(html);
          }else{ 
            $uploadWrapper.append(html);  
          }
        },
        onSelectError : function (file, errorCode, errorMsg) {
            if (errorCode===-110) {
                errorMsg='超过文件上传大小限制（10M）！';
            }

            $FAM.fns.showMessage(errorMsg);
        },
        onUploadError: function(file, errorCode, errorMsg) {  //上传失败触发事件
          if(errorCode == -240){
            errorMsg='超过文件上传个数限制（5个）！';
          }
            $FAM.fns.showMessage(errorMsg);
        },
        onUploadComplete:function(res){
            /*if(res.success){
                var i = 0,
                    len = res.data.length,
                    html = '',
                    fileArr = $('#J_commentForm').find('input[type="file"]').val(),
                    $uploadWrapper = $('.uploadWrapper');
                for(i; i<len; i++){
                    html += '<li id="' +res.data[i].id +'">' +res.data[i].name +'<span class="delFile">×</span></li>';
                    $uploadWrapper.removeClass('loading').html(html);
                    fileArr.push(res.data[i].id);
                }
            }else{
                $FAM.fns.showMessage(res.msg);
            }*/
        }
    }

    $('.uploadWrapper').delegate('.delFile','click',function(){
        var $parent = $(this).parent(),
            id = $parent.attr('id');
        $.post('./techForum/delFile',{url:id}, function(res){
            if(res.success){
                $parent.remove();
                $('#createArticleForm').find('input[name="file"][id="'+id+'"]').remove();
                $('#createArticleForm').find('input[name="fileSize"][id="'+id+'"]').remove();
                $("#uploadBtn").uploadify('settings','uploadLimit', ++window.uploadLimit);
            }else{
                $FAM.fns.showMessage(res.msg);
            }
        })
    })

	$("#uploadBtn").uploadify({
		'swf':'/portal/lib/uploadify/uploadify.swf',
		'uploader': '/portal/techForum/uploadFile',
		'buttonImage':'/portal/static/img/tpubbs/uploadfile.png',
		'width':'94px',
		'height':'30px',
        'uploadLimit':window.uploadLimit,
		//'queueSizeLimit': 1, //限制每次选择文件的个数
		'multi': true, //是否多选
		'fileSizeLimit':'10MB',  //最大上传10M
		'overrideEvents':['onDialogClose','onSelectError','onUploadError'],
		onUploadStart : uploadFile.onStart,
		onUploadProgress : uploadFile.onProgress,
		onUploadSuccess : uploadFile.onUploadSuccess,
		onQueueComplete : uploadFile.onUploadComplete,
		onSelectError : uploadFile.onSelectError,
		onUploadError: uploadFile.onUploadError
	});


})(jQuery,window)