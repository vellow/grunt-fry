
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