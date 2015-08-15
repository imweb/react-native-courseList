'use strict';
var React =  require('react-native');
var Page = require('./Page');

var {
    StyleSheet,
    ListView,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    PixelRatio,
    TouchableHighlight,
    PixelRatio,
    Image
} = React;

var _catList = [
	{id: 1, name: '职业技能', icon: require('image!icon1'), subs:[
		{id: 11, name: '职场/求职'}, 
		{id: 12, name: '市场营销'},
		{id: 13, name: '职业类考试'},
		{id: 14, name: '其他技能'}
	]},
	{id: 2, name: 'IT培训', icon: require('image!icon2'), subs:[
		{id: 21, name: '编程开发'}, 
		{id: 22, name: '工具软件'},
		{id: 23, name: '游戏设计'}, 
		{id: 24, name: '动漫制作'},
		{id: 25, name: '其他'}
	]},
	{id: 3, name: '语言学习', icon: require('image!icon3'), subs:[
		{id: 31, name: '英语口语'}, 
		{id: 32, name: '英语考试'},
		{id: 33, name: '留学英语'}, 
		{id: 34, name: '商务英语'},
		{id: 35, name: '汉语'},
		{id: 36, name: '韩语'}, 
		{id: 37, name: '日语'},
		{id: 38, name: '其他'}
	]},
	{id: 4, name: '中小学/大学', icon: require('image!icon4'), subs:[
		{id: 41, name: '小学'}, 
		{id: 42, name: '初中'},
		{id: 43, name: '高中'}, 
		{id: 44, name: '小升初备战'},
		{id: 45, name: '中考备战'},
		{id: 46, name: '高考备战'}, 
		{id: 47, name: '考验/自考'}
	]},
	{id: 5, name: '兴趣爱好', icon: require('image!icon5'), subs:[
		{id: 51, name: '投资理财'}, 
		{id: 52, name: '生活百科'},
		{id: 53, name: '文化艺术'}, 
		{id: 54, name: '时尚健康'}
	]},
	{id: 6, name: '亲子课堂', icon: require('image!icon6'), subs:[
		{id: 61, name: '育儿教育'}, 
		{id: 62, name: '学前早教'},
		{id: 63, name: '家长训练营'}
	]}
];

var PAGE_SIZE = _catList.length;

var NUMBER_OF_EACH_ROW = 4;


var CAT_CGI = 'http://ke.qq.com/cgi-bin/pubAccount/catgoryList?is_ios=0';

var AllCats = React.createClass({
	getInitialState : function() {

		var getSectionData = (data, sectionID) => {
			return data[sectionID];
		};

		var getRowData = (data, sectionID, rowID) => {
			return data[rowID];
		};

        var ds = new ListView.DataSource({
        		getRowData: getRowData,
        		getSectionHeaderData: getSectionData,
                rowHasChanged : (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (h1, h2) => h1 != h2
            });
       	var sectionIDs = [],
       		rowIDs = [],
       		data = {};
       	for(var i=0;i<_catList.length;i++){
       		var sectionID = _catList[i].id,
       			subs = _catList[i].subs;
       		sectionIDs.push(sectionID);
       		data[sectionID] = _catList[i];
       		rowIDs[i] = [];
       		var rowName = 'sub' + i;
       		rowIDs[i].push(rowName);
       		data[rowName] = _catList[i];
       	}
        return {
            dataSource: ds.cloneWithRowsAndSections(data, sectionIDs,rowIDs),
            subCats: ds
        }
    },
    componentDidMount : function() {
        this.fetchData();
    },
	fetchData: function(mt, page){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		fetch(CAT_CGI, {
			method: 'GET',
			headers: {
				'Referer': 'http://ke.qq.com'
			}
		})
		.then((repsonse) => repsonse.json())
		.then((repsonseData) => {
			var data = repsonseData.result.catgoryList,
				cat1 = [];
			cat1 = this._getValFromArr(data, 1);
			var cat2 = [],
				cat3 = [];
			if(typeof this.state.curCat1 != 'undefined'){
				cat2 = this._getValFromArr(data[this.state.curCat1]['s'], 2);
				if(typeof this.state.curCat2 != 'undefined'){
					cat3 = this._getValFromArr(data[this.state.curCat1]['s'][this.state.curCat2]['t'], 3);
				}
			}
			this.setState(Object.assign({}, this.state, {
				cat1: ds.cloneWithRows(cat1),
				cat2: ds.cloneWithRows(cat2),
				cat3: ds.cloneWithRows(cat3),
				allData: data
			}));
		})
		.catch((err) => {

		})
		.done();
	},
    renderRow: function(rowData: string, sectionID: string, rowID: string){
    	var rows = [],
    		views = [],
    		subs = rowData.subs;
    	for(var i=0;i<Math.ceil(subs.length/NUMBER_OF_EACH_ROW) * NUMBER_OF_EACH_ROW;i++){
    		rows.push((<TouchableOpacity onPress={() => this.onPressCat(rowData)}>
    				<View style={styles.row}>
    				<Text>{rowData.subs[i] ? rowData.subs[i].name : ''}</Text>
    				</View>
    			</TouchableOpacity>))
    	}

    	var _renderVerticalRow = (index) => {
    		var tmpl = [],
    			i = 0;
    		while(i++ < NUMBER_OF_EACH_ROW) tmpl.push(i);
    		return (
    			<View style={{flexDirection: 'row'}}>
	    			{ tmpl.map(function(o, k){
	    				return rows[index * NUMBER_OF_EACH_ROW + k];
	    			})}
	    		</View>
    		)
    	};
    	for(i=0;i< Math.ceil(subs.length/NUMBER_OF_EACH_ROW);i++){
			views.push(_renderVerticalRow(i));
    	}
    	return (
    		<View style={{backgroundColor: '#fff',color: '#8fb3f1'}}>
    			{views.map(function(o, i){
			        return views[i];
			    })}
    		</View>
    	)
    },
    renderSectionHeader: function(sectioinData: string, sectionID: string) {
    	return (
    		<TouchableOpacity onPress={() => this.onPressCat(sectioinData)}>
    		<View style={styles.section}>
    			<Image style={styles.icon} source={sectioinData.icon} />
    			<Text style={styles.text}>{sectioinData.name}</Text>
    		</View>
    		</TouchableOpacity>

    	)
    },
	render: function(){
		return (
            <ListView 
                dataSource={this.state.dataSource}
                renderSectionHeader={this.renderSectionHeader}
                pageSize={PAGE_SIZE}
                renderRow={this.renderRow}
                style={{flex: 1}} />
		)
	},
	onPressCat: function(row) {  
        this.props.navigator.push({
            title: "课程列表",
            component: Page,
            passProps: {row},
        });
    }
});

var styles = StyleSheet.create({
	row: {
		height: 50,
		flex: 1,
		
		borderWidth: 1 / PixelRatio.get(),
		borderColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'
	},
	section: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    paddingLeft: 15,
	   	color: '#8fb3f1',
		backgroundColor: '#f8f8f8',
		borderBottomWidth: 1 / PixelRatio.get(),
		borderBottomColor: '#eee',
		height: 50,
	},
	text: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 8,
	},
	icon: {
		paddingLeft: 15,
		width: 17,
		height: 17,
	}
})

module.exports = AllCats;