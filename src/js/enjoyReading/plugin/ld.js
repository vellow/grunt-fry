/*
* By beatacao 2013-10-16
* 多级联动下拉菜单
* 传参：{"data":[
					{
						id:1,name:'父栏目1',
						subPaths:[
							{id:11,name:"子栏目11",isSelected:false,
								subPaths:[
									{id:111,name:"子栏目111",isSelected:false},
									{id:122,name:"子栏目122",isSelected:false},
									{id:133,name:"子栏目133",isSelected:false},
									{id:144,name:"子栏目144",isSelected:false},
									{id:155,name:"子栏目155",isSelected:false},
									{id:166,name:"子栏目166",isSelected:false}
								]
							},
							{id:12,name:"子栏目12",isSelected:false,
								subPaths:[
									{id:121,name:"子栏目121",isSelected:false},
									{id:122,name:"子栏目122",isSelected:false},
									{id:123,name:"子栏目123",isSelected:false},
									{id:124,name:"子栏目124",isSelected:false},
									{id:125,name:"子栏目125",isSelected:false},
									{id:126,name:"子栏目126",isSelected:false}
								]
							},
							{id:13,name:"子栏目13",isSelected:false},
							{id:14,name:"子栏目14",isSelected:false},
							{id:15,name:"子栏目15",isSelected:false},
							{id:16,name:"子栏目16",isSelected:false}
						]
					},
					{
						id:2,name:'父栏目2',
						subPaths:[
							{id:21,name:"子栏目21",isSelected:false},
							{id:22,name:"子栏目22",isSelected:false},
							{id:23,name:"子栏目23",isSelected:false},
							{id:24,name:"子栏目24",isSelected:false},
							{id:25,name:"子栏目25",isSelected:false},
							{id:26,name:"子栏目26",isSelected:false}
						]
					}
				],
			"selector":['select1-name','select2-name','select3-name'],
			"selected":['select1被选项id','select2被选项id','select3被选项id']   //不是必传参数
		}

	实例：
	dom	<select name='a1'></select>
		<select name='a2'></select>
		<select name='a3'></select>
		<select name='a4'></select>
	js	new BC_ld({'data':allPaths,'selector':[{'name':'a1','changeCb':fn},{'name':'a2','changeCb':fn},{'name':'a3','changeCb':fn},{'name':'a4','changeCb':fn}]});

*/
;(function(window){
	window.BC_ld = function(opt){
		this.data = opt.data || [];
		this.selected = opt.selected || [];
		this.selector = [];
		var selector = opt.selector || [];

		if((this.data.length==0) || (selector.length==0)) return;


		var i = 0,
			length = selector.length;
		for(i; i<length; i++){
			//console.log(selector[i].selectorStr, "====")
			this.selector[i] = !!selector[i].selectorStr ? $(selector[i].selectorStr)[0] : document.getElementsByName(selector[i].name)[0];
			//console.log( this.selector[i], "=--=-=-" )
			this.selector[i].changeCb = selector[i].changeCb || function(){};
		}

		BC_ld.renderLd(this);
	}

	BC_ld.renderLd = function(tis){
		var self = tis;
		var ldMaxSize = self.selector.length;
		var i = 0;
		for(i; i<ldMaxSize; i++){

			BC_ld.renderItem(self,i);

			(function(i){
				self.selector[i].onchange = function(){
					self.selected = [];
					self.selector[i].changeCb(self);
					if(i>=ldMaxSize-1) return;
					BC_ld.renderItem(self,i+1);
				};
			})(i)
		}
	}

	BC_ld.renderItem = function(tis,index){
		var self = tis,
			index = index,
			ldMaxSize = self.selector.length;
		var dataArr = self.data;
		if(index>0){
			var j = 0;
			for(j; j<index; j++){
				var selectedIndex = self.selector[j].selectedIndex;
				if(typeof(dataArr[selectedIndex].subPaths)=='undefined'){
					dataArr = [];
					break;
				}
				dataArr = dataArr[selectedIndex].subPaths;
			}
		}

		if(dataArr.length==0){
			self.selector[index].length = 0;
			self.selector[index].style.display = 'none';
		}else{
			self.selector[index].length = 0;
			self.selector[index].style.display = 'inline';


			if(dataArr[0].name != '--请选择--'){
				dataArr.unshift({'id':'','name':'--请选择--'});
			}

			var arri = 0,
				arrLen = dataArr.length;
				
			for(arri; arri<arrLen; arri++){
				var value, name;
				value = dataArr[arri].id;
				name = dataArr[arri].name;
				self.selector[index].options.add(new Option(name,value));
				if(self.selector[index].options[arri].value == self.selected[index]){
					self.selector[index].options[arri].selected = true;
				}
			}

		}
		for(index+=1; index<ldMaxSize; index++){
			self.selector[index].style.display = 'none';
		}
	}
})(window);
