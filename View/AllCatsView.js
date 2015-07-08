'use strict';
var React =  require('react-native');

// var SubNav = require('./SubNav.js');

var {
    StyleSheet,
    ListView,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    PixelRatio,
    TouchableHighlight
} = React;

var CAT_CGI = 'http://ke.qq.com/cgi-bin/pubAccount/catgoryList?is_ios=0';

var AllCatsView = React.createClass({
	getInitialState: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			dataSource: ds.cloneWithRows([
			{ name: '全部' },
			{ name: '职业' },
			{ name: 'IT' },
			{ name: '语言' },
			{ name: '学生' },
			{ name: '爱好' },
			{ name: '亲子' }
			]),
			cat1: ds.cloneWithRows([]),
			cat2: ds.cloneWithRows([]),
			cat3: ds.cloneWithRows([]),
			curCat1: this.props.cmt,
			curCat2: this.props.cst,
			curCat3: this.props.ctt
		}
	},
	componentDidMount : function() {
        this.fetchData();
    },
    componentWillReceiveProps: function(){

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
			}))
		})
		.catch((err) => {
		})
		.done();
	},
	render: function(){
		return(
			<View style={allCatsStyles.mask}>
			<View style={allCatsStyles.cats}>
				<ListView dataSource={this.state.cat1} 
					renderRow={this._renderRow}
					style={allCatsStyles.catColumn} keyboardShouldPersistTaps={true}
	          		automaticallyAdjustContentInsets={false}
	          		keyboardDismissMode="on-drag"  /> 
	          	<ListView dataSource={this.state.cat2} 
					renderRow={this._renderRow}
					style={allCatsStyles.catColumn} keyboardShouldPersistTaps={true}
	          		automaticallyAdjustContentInsets={false}
	          		keyboardDismissMode="on-drag"  /> 
	          	<ListView dataSource={this.state.cat3} 
					renderRow={this._renderRow}
					style={allCatsStyles.catColumn} keyboardShouldPersistTaps={true}
	          		automaticallyAdjustContentInsets={false}
	          		keyboardDismissMode="on-drag"  /> 
			</View>
			</View>
		)
	},
	_renderRow: function(row){
		var curStyle,
			state = this.state;
		if(row.id == state.curCat1 || row.id == state.curCat2 || row.id == state.curCat3){
			curStyle = allCatsStyles.currentCat;
		}
		return (
			<TouchableHighlight underlayColor='#f8f8f8' onPress={() => this._onPressRow(row)}>
	        <View style={[allCatsStyles.catRow, curStyle]}>
	        	<Text>{row.name}</Text>
	        </View>
	        </TouchableHighlight>
		)
	},
	_getValFromArr: function(data, level){
		var levelMap = {1: 'mt', 2: 'st', 3: 'tt'};
		var ret = [{
			name: '全部',
			level: level,
			key: levelMap[level]
		}];
		for(var i in data){
			ret.push({
				key: levelMap[level],
				name: data[i]['n'],
				level: level,
				id: i
			});
		}
		return ret;
	},
	_onPressRow: function(row){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		var cat = [],
			data = [];
		if(row.level == 1){
			cat = this._getValFromArr(row.id ? this.state.allData[row.id]['s'] : {}, 2)
			this.setState(Object.assign({}, this.state, {
				cat2: ds.cloneWithRows(cat),
				cat3: ds.cloneWithRows(this._getValFromArr({}, 3)),
				curCat1: row.id
			}));

		}else if(row.level == 2){
			cat = this._getValFromArr(row.id ? this.state.allData[this.state.curCat1]['s'][row.id]['t'] : {}, 3);
			this.setState(Object.assign({}, this.state, {
				cat3: ds.cloneWithRows(cat),
				curCat2: row.id
			}))
		}else{
			this.setState(Object.assign({}, this.state, {
				curCat3: row.id
			}));
		}
		this.props[row.key](row.key, row.id, row.level, row.name);
	}
});


var allCatsStyles = StyleSheet.create({
	mask: {
		//backgroundColor: 'rgba(0,0,0,0.1)',
		//opacity: '3',
/*		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,*/
		///height: 600
	},
	cats: {
		flexDirection: 'row',
		backgroundColor: '#f8f8f8',
		height: 350,
		position: 'absolute',
		//top: 41,
		left: 0,
		right: 0
	},
	catColumn: {
		flex: 1,
		borderRightColor: '#e4e4e4',
        borderRightWidth: 1 / PixelRatio.get(),
	},
	catRow: {
		flex: 1,
		alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        textAlign: 'left',
        backgroundColor: '#f8f8f8', 
		borderBottomWidth: 1 / PixelRatio.get(),
		borderBottomColor: '#e4e4e4',
	},
	currentCat: {
		backgroundColor: '#fff'
	}
});

module.exports = AllCatsView;