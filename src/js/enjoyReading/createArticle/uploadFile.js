;(function($,window){
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