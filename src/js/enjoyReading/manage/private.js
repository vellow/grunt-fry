/*!
	权限管理
*/
$(function(){
	if (!Array.prototype.indexOf){
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
	    var len = this.length >>> 0;

	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)
	         ? Math.ceil(from)
	         : Math.floor(from);
	    if (from < 0)
	      from += len;

	    for (; from < len; from++)
	    {
	      if (from in this &&
	          this[from] === elt)
	        return from;
	    }
	    return -1;
	  };
	}
	window.privateCallbacks = $.Callbacks();
	window.defaultsPathDataCallbacks = $.Callbacks();
	/*window.defaultsPathData = {
        "paths": [
            {
                "id": 1,
                "name": "编程语言",
                "subPaths": [
                    {
                        "id": 11,
                        "name": "C/C++"
                    },
                    {
                        "id": 12,
                        "name": "JAVA"
                    }
                ]
            },
            {
                "id": 2,
                "name": "技术交流",
                "subPaths": [
                    {
                        "id": 21,
                        "name": "Flash"
                    },
                    {
                        "id": 22,
                        "name": "Ruby"
                    }
                ]
            }
        ],
        "subPaths": [
            {
                "id": 11,
                "name": "C/C++"
                
            },
            {
                "id": 12,
                "name": "JAVA"
            }
        ]
    };

	window.pathData = [
	    {
	        "paths": [
	            {
	                "id": 1,
	                "name": "编程语言",
	                "isSelected": true,
	                "subPaths": [
	                    {
	                        "id": 11,
	                        "name": "C/C++"
	                    },
	                    {
	                        "id": 12,
	                        "name": "JAVA"
	                    }
	                ]
	            },
	            {
	                "id": 2,
	                "name": "技术交流",
	                "subPaths": [
	                    {
	                        "id": 21,
	                        "name": "Flash"
	                    },
	                    {
	                        "id": 22,
	                        "name": "Ruby"
	                    }
	                ]
	            }
	        ],
	        "subPaths": [
	            {
	                "id": 11,
	                "name": "C/C++"
	                
	            },
	            {
	                "id": 12,
	                "name": "JAVA",
	                "isSelected": true
	            }
	        ]
	    },
	    {
	        "paths": [
	        	{
	                "id": 1,
	                "name": "编程语言",
	                "subPaths": [
	                    {
	                        "id": 11,
	                        "name": "C/C++"
	                    },
	                    {
	                        "id": 12,
	                        "name": "JAVA"
	                    }
	                ]
	            },
	            {
	                "id": 2,
	                "name": "技术交流",
	                "isSelected": true,
	                "subPaths": [
	                    {
	                        "id": 21,
	                        "name": "Flash"
	                    },
	                    {
	                        "id": 22,
	                        "name": "Ruby"
	                    }
	                ]
	            }
	        ],
	        "subPaths": [
	            {
	                "id": 21,
	                "name": "Flash"
	            },
	            {
	                "id": 22,
	                "name": "Ruby"
	            }
	        ]
	    }
	];*/
  	$.get("/portal/techForum/searchEditPath", {}, function(data){
    	window.defaultsPathData = data;
    })

	
	var editForumSelect = function(selectArr, userName){
		
		$.get("/portal/techForum/roleManage/searchRoleUserPath", {userName:userName}, function(data){
			var pathData = data;
			//console.log(data, "-------------");
			//专区选择
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
			
			//联动选择专区

            if(pathData.length != 0){
                $(selectArr).each(function(i,item){
                    var selectedPath = selected(pathData[i].paths);
                    var selectedSubPath = selected(pathData[i].subPaths);
                    //console.log(item, $(item).next(), i)
                    new BC_ld({'data':pathData[i].paths,'selector':[{'selectorStr':item},{'selectorStr':$(item).next(),'changeCb':""}],'selected':[selectedPath,selectedSubPath]});
                })
            };

		})
	};
	var defaultsPathDataForumSelect = function(selectArr){
		//专区选择
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
		
		//联动选择专区
		$(selectArr).each(function(i,item){
			var selectedPath = selected(defaultsPathData.paths);
			var selectedSubPath = selected(defaultsPathData.subPaths);
			//console.log(item, $(item).next(), i)
			new BC_ld({'data':defaultsPathData.paths,'selector':[{'selectorStr':item},{'selectorStr':$(item).next(),'changeCb':""}],'selected':[selectedPath,selectedSubPath]});
		})
	};
	defaultsPathDataCallbacks.add(defaultsPathDataForumSelect);
	privateCallbacks.add(editForumSelect);


	//版主
	$(".listWrapper").delegate(".J_forum_admin", "click", function(){
		//console.log("版主 checkbox", this, this.checked);
		if(this.checked){
			$("#forumList").show();
			//privateCallbacks.fire('#forumList [name="pathId"]');
		}else{
			$("#forumList").hide();
		}

	});

	//privateCallbacks.fire('.private_list_filter [name="pathId"]');

	/*添加删除板块*/
	$(".listWrapper").delegate(".J_add_forum", "click", function(){
		var $li = $("#forumList li:eq(0)").clone();
		$("#forumList").append($li);
		defaultsPathDataCallbacks.fire($li.find('[name="pathId"]'));
		//console.log("添加版块");
	})

	$(".listWrapper").delegate(".J_del_forum", "click", function(){
		if( $("#forumList li").length > 1 ){
			$(this).closest("li").remove();	
		}else{
			$FAM.fns.showMessage("至少保留一个")
		}
		
		//console.log("删除版块");
	});


	/*添加用户*/
	$(".listWrapper").delegate("#addRoleBtn", "click", function(){
		//console.log("添加用户", $("#addRoleForm"), $("#addRoleForm").serialize());
		var serializeStr = $("#addRoleForm").serialize();

		if( window.parseSearch("userNames", serializeStr).length == 0 ){
			alert("至少添加一个用户");
			return false;
		}
		if( window.parseSearch("roles", serializeStr).indexOf("MODERATORS") != -1 && window.parseSearch("subPathId", serializeStr).length == 0){
			alert("请选择板块");
			return false;
		}

		$.post('/portal/techForum/roleManage/saveRole?' + serializeStr, {}, function(data){
			if(data.success){
				$("#addOrDelrole").load("/portal/techForum/roleManage/addRole", function(){
					var opts={textId:'privateUserInput',hiddenId : 'userNames'};
					/*userSuggestion功能*/
					$('#privateUserInput').userSuggestion(opts);
					defaultsPathDataCallbacks.fire('#forumList [name="pathId"]');
				});
				listTurnToPage( 1 );				
			}else{
				alert(data.msg);
			}
		}, 'json');
	});

	/*修改保存用户*/
	$(".listWrapper").delegate("#saveRoleBtn", "click", function(){
		var serializeStr = $("#addRoleForm").serialize();
		if( window.parseSearch("roles", serializeStr).indexOf("MODERATORS") != -1 && window.parseSearch("subPathId", serializeStr).length == 0){
			alert("请选择板块");
			return false;
		}
		var userName = $(this).attr("data-userName");
		$.post('/portal/techForum/roleManage/updateRole?'+serializeStr + "&userNames="+userName, {}, function(data){
			//console.log(data)
			if(data.success){
				$("#addOrDelrole").load("/portal/techForum/roleManage/addRole", function(){
					var opts={textId:'privateUserInput',hiddenId : 'userNames'};
					/*userSuggestion功能*/
					$('#privateUserInput').userSuggestion(opts);
					defaultsPathDataCallbacks.fire('#forumList [name="pathId"]');
				});
				listTurnToPage( parseInt( $("[name=pageNum]").val() ) );				
			}else{
				alert(data.msg);
			}
		}, 'json');
	});
	$(".listWrapper").delegate("#cancelRoleBtn", "click", function(){
		//console.log("取消用户");
		$("#addOrDelrole").load("/portal/techForum/roleManage/addRole", function(){
			var opts={textId:'privateUserInput',hiddenId : 'userNames'};
			/*userSuggestion功能*/
			$('#privateUserInput').userSuggestion(opts);
			defaultsPathDataCallbacks.fire('#forumList [name="pathId"]');
		});

	})

	/* 用户列表 */
	//filter roleType select
	$(".listWrapper").delegate(".private_list_filter .roleType_select", "change", function(){
		//console.log("filter roleType select", $(this).val());
		listTurnToPage( 1, {role:$('.private_list_filter .roleType_select').val(), pathId:$(".private_list_filter [name='subPathId']").val()} );
	});
	
	//filter forum select subPathId
	$(".listWrapper").delegate(".private_list_filter [name='subPathId']", "change", function(){
		//console.log("filter forum select subPathId");
		listTurnToPage( 1, {role:$('.private_list_filter .roleType_select').val(), pathId:$(".private_list_filter [name='subPathId']").val()} );
	});

	//searchUserBtn
	// 积分管理查询
	$(".listWrapper").delegate("#searchUserBtn", "click", function(){
		//console.log("filter forum select subPathId");
		listTurnToPage( 1, {role:$('.private_list_filter .roleType_select').val(), pathId:$(".private_list_filter [name='subPathId']").val(), 'userName':$("#searchUserInput").val()} );
	});

	//edit
	$(".listWrapper").delegate(".private_list .J_edit_role", "click", function(){
		//console.log("edit");
		var userName = $(this).attr("data-userName");
		$("#addOrDelrole").load("/portal/techForum/roleManage/editRole", {userName:userName}, function(){

			if( $(".private_type [value='MODERATORS']").is(":checked") ){
		    	$("#forumList").show();
		    	//console.log('#forumList [name="pathId"]', "---------------")
		    	privateCallbacks.fire('#forumList [name="pathId"]', userName);
		    }else{
		    	$("#forumList").hide();
		    	defaultsPathDataCallbacks.fire('#forumList [name="pathId"]', userName);
		    }
		});
	});

    //edit integral(修改积分)
    $(".listWrapper").delegate(".private_list .J_edit_integral", "click", function(){
        //console.log("edit");
        var userName = $(this).attr("data-userName");
        $("#addOrDelIntegral").load("/portal/enjoyReading/selfManage/editIntegral", {userName:userName}, function(){
        });
    });

    //保存积分
    $(".listWrapper").delegate("#saveIntegralBtn", "click", function(){
        var userName = $(this).attr("data-userName");
        $.post('/portal/enjoyReading/selfManage/saveIntegral?'+$("#editIntegralForm").serialize() + "&userName="+userName, {}, function(data){
            //console.log(data)
            if(data.success){
                //listTurnToPage( parseInt( $("[name=pageNum]").val() ) );
                listTurnToPage( 1, {role:$('.private_list_filter .roleType_select').val(), pathId:$(".private_list_filter [name='subPathId']").val(), 'userName':userName } );
               
            }
        }, 'json');
    });
    //取消积分修改
    $(".listWrapper").delegate("#cancelIntegralBtn", "click", function(){
        listTurnToPage( parseInt( $("[name=pageNum]").val() ) );
    })
	
	//del
	$(".listWrapper").delegate(".private_list .J_del_role", "click", function(){
		//console.log("del");
		var userName = $(this).attr("data-userName");
		$.post('/portal/techForum/roleManage/delRole', {userName:userName}, function(data){
			//console.log(data)
			if(data.success){
				listTurnToPage( parseInt( $("[name=pageNum]").val() ), {role:$('.private_list_filter .roleType_select').val(), pathId:$(".private_list_filter [name='subPathId']").val() });				
			}
		}, 'json');
	});

	//通过
	$(".listWrapper").delegate("#pass_article", "click", function(){
		//console.log("del");
		var userName = $(this).attr("data-userName");
		var type_val = $(this).attr("type");
		var id_val = $(this).attr("articleId");
		$.post('/portal/enjoyReading/passArticle', {id:id_val,type:type_val}, function(data){
			//console.log(data)
			if(data.success){
				listTurnToPage(1);				
			}
		}, 'json');
	});

	//打回
	$(".listWrapper").delegate("#refuse_article", "click", function(){
		//console.log("del");
		var userName = $(this).attr("data-userName");
		var type_val = $(this).attr("type");
		var id_val = $(this).attr("articleId");
		var delfn = function(reason_val){
			if(reason_val!=''){
				$.post('/portal/enjoyReading/backArticle', {id:id_val,type:type_val,backReason:reason_val}, function(data){
				//console.log(data)
				if(data.success){
					// window.location.href = window.location.href;
					listTurnToPage(1);

				}
				}, 'json');
			}else{
				$FAM.fns.showMessage("请输入打回理由");
			}

		}
		var showDailog = function(m,cbSure,cbCancel){
 			var msgModal = '<div id="confirmModal" class="modal">'+
							    '<div class="shadow"></div>'+
							    '<div class="wrapper">'+
									'<div class="title"><span>提示</span></div>'+
									'<div class="content">'+m+'</div>'+
									'<textarea id="refuseReason">打回理由：</textarea>'+
									'<div class="footer"><span class="bt_blue" id="sure"><b>确定</b></span><span class="bt_blue bt_gray" id="cancel"><b>取消</b></span></div>'+
								'</div>'+
								'<span class="close-modal"></span>'+
							'</div><div class="alertBlocker"></div>';
 			if($("#confirmModal").length===0){
 				$("body").append(msgModal);
 			}
 			
 			$('#confirmModal .close-modal,#confirmModal #cancel,#confirmModal #sure').bind('click',function(){
 				$(this).closest('#confirmModal').next('.alertBlocker').hide();
 				$(this).closest('#confirmModal').hide();
 				var reason_val = $('#refuseReason').val();
 				if($(this).attr('id')=='sure'){
 					if(typeof cbSure == 'function') cbSure(reason_val);
 				}else{
 					if(typeof cbCancel == 'function') cbCancel();
 				}
 				$('#confirmModal .close-modal,#confirmModal #cancel,#confirmModal #sure').unbind('click');
 			});

 			var $msgModal = $("#confirmModal");
 			$msgModal.find('.content').html(m);
            $msgModal.show();
 			$msgModal.next('.alertBlocker').show();
 			var	width = $msgModal.find('.wrapper').width()+20,
 				height = $msgModal.find('.wrapper').height(),
 				left = ($(window).width()-width)/2,
 				top = ($(window).height()-height)/2;

 			$msgModal.css({top:top,left:left,width:width,height:height});
 			
 		}
		showDailog('请输入打回理由',delfn);
	});

    //查询兑换
    $(".listWrapper").delegate("#searchConvertBtn", "click", function(){
        //console.log("filter forum select subPathId");
        var current = $("#searchConvertStatus").val();
        listTurnToPage( 1, {key:$('#searchConvertInput').val(), status:$("#searchConvertStatus").val()},function(){
       	var select = $('#searchConvertStatus')[0];
	       	for(var i=0;i<select.options.length;i++){
	       		if(select.options[i].value == current){
	       			select.options[i].selected = true;
	       		}
	       	}
        } );
    });

    //兑换奖品,修改状态
    $(".listWrapper").delegate(".J_edit_convert", "click", function(){
        var id = $(this).attr("data-id");
        var url="/portal/enjoyReading/selfManage/updateConvert";
        $.post(url,{"id":id,status:'ENABLED'},function(data){
            if (data.success) {
                $FAM.fns.showMessage("修改成功!");
                listTurnToPage( 1, {key:'', status:'ENABLED'} );
            } else {
                $FAM.fns.showMessage(data.data);
            }
        });
    });

    //撤销兑换奖品,修改状态
    $(".listWrapper").delegate(".J_cancel_convert", "click", function(){
        var id = $(this).attr("data-id");
        var url="/portal/enjoyReading/selfManage/updateConvert";
        $.post(url,{"id":id,status:'DISABLED'},function(data){
            if (data.success) {
                $FAM.fns.showMessage("修改成功!");
                listTurnToPage( 1, {key:'', status:'DISABLED'} );
            } else {
                $FAM.fns.showMessage(data.data);
            }
        });
    });


	/*userSuggestion功能*/
    $.fn.userSuggestion = function(flag){
        var that = this;
        var textId=flag.textId;//文本框Id
        var hiddenId=flag.hiddenId;//隐含域Id
        var key = $('#'+textId).val();
        var fixPosition = function(){
            var queryUser = $('#'+textId);
            if(queryUser){
                var atPos = $(that).caret('offset',queryUser.head_pos);
                
                var top = atPos.top + atPos.height + 15,
                    left = atPos.left - 6;

                var top = $(that).position().top + $(that).height() + 3;
                var left = $(that).position().left;

                $('#addRoleForm .autocomplete-suggestions').css({
                    top: top + 'px',
                    left: left + 'px'
                });
            }
        }
        $(this).autocomplete({
            width:'200px',
            appendTo:$('#addRoleForm'),
            serviceUrl: './search/suggestion',
            paramName:'searchWord',
            query:key,
            type:'GET',
            dataType:'JSON',
            maxHeight:400,
            minChars:2,
            deferRequestBy:300,
            onSearchStart:fixPosition,
            formatResult:function(suggestion, currentValue){
                return '<p><b>'+suggestion.name+'</b>('+suggestion.userName+')</p>';
            },
            transformResult: function (response) {
                return typeof response === 'string' ? $.parseJSON(response) : {"suggestions":response};
            },
            onSelect: function(suggestion,that) {
                var selectedUserName=$('#'+hiddenId).val();

                if (selectedUserName.indexOf(suggestion.userName)==-1) {
                    //构造显示
                    var span=$('<span/>');
                    span.attr('id','user_'+suggestion.userName);
                    span.addClass("w-35");
                    var lable=$('<label/>');
                    lable.text(' '+suggestion.name+'('+suggestion.userName+')');
                    span.append(lable);

                    var delspan=$('<i>&nbsp;×&nbsp;</i>');
                    delspan.attr('class','private_del_user');
                    delspan.click(function(){
                        $('#user_'+suggestion.userName).remove();

                        //存在隐含域的话，去掉隐含域中value
                        if ($('#userNames') && $('#userNames').length>0) {
                            var userNames=$('#userNames').val();
                            $('#userNames').val(userNames.replace(suggestion.userName,""));
                        }

                   
                    });
                    span.append(delspan);
                    $('#'+textId).before(span);

                    //用户名保存在隐含域
                    $('#'+hiddenId).val($('#'+hiddenId).val()+","+suggestion.userName);

                    //清空输入框
                    var queryUser = $('#'+textId);
                    var text = suggestion.name + '(' + suggestion.userName + ')';
                    var val = that.currentValue.slice(0,queryUser.head_pos) + text + that.currentValue.slice(queryUser.end_pos);
                    $(this).val();
                } else {
                    $FAM.fns.showMessage("亲，不允许重复添加哟!");
                }
            }
        });
    }
})
