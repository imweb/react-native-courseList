'use strict';
var React =  require('react-native');

// var SubNav = require('./SubNav.js');

var AllCatsView = require('./AllCatsView');

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


var CatList = React.createClass({
	getInitialState: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			dataSource: ds.cloneWithRows([]),
			curCat: 0,
			show: false,
			showAll: false,
			nav1: '全部分类',
			nav2: '全部类型',
			nav3: '综合排序',
			catname0: '全部分类'
		}
	},
	render: function(){
		return (
			<View style={styles.wrapper}>
				<View style={styles.nav}>
					<TouchableOpacity onPress={this._showAllCats}>
						<View style={styles.column} 
							mt={this.state.mt}
							st={this.state.st}
							tt={this.state.tt}>
						<Text>{this.state.nav1}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._showVideo}>
						<View style={styles.column}>
						<Text>{this.state.nav2}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._showSort}>
						<View style={styles.column}>
						<Text>{this.state.nav3}</Text>
						</View>
					</TouchableOpacity>
				</View>
				{ this.state.show ? 
				<ListView dataSource={this.state.dataSource} 
					renderRow={this._renderRow}
					style={styles.subNav} keyboardShouldPersistTaps={true}
	          		automaticallyAdjustContentInsets={false}
	          		keyboardDismissMode="on-drag"  /> : null
	          	}
	          	{ this.state.showAll ? 
	          		<AllCatsView 
	          		mt={this._setProps}
	          		st={this._setProps}
	          		tt={this._setProps}
	          		cmt={this.state.mt}
	          		cst={this.state.st}
	          		stt={this.state.tt}
	          		/> : null
	          	}
			</View>
		)
	},
	_renderRow: function(row){
		var cur;
		if(row.val == this.state.curCat){
			cur = styles.curCat;
		}
		return (
			<TouchableHighlight underlayColor='#f8f8f8' onPress={() => this._onPressRow(row)}>
	        <View style={[styles.navRow, cur]}>
	        	<Text style={styles.navText}>{row.name}</Text>
	        </View>
	        </TouchableHighlight>
	    )
	},
	_showVideo: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var state = Object.assign({}, this.state, {
			dataSource : ds.cloneWithRows([
				{name: "全部类型", val: 0}, 
				{name: "直播课程", val: 1}, 
				{name: "录播课程", val: 2}
			]),
			show: true,
			showAll: false,
			query: 'video'
		});
		this.setState(state);
	},
	_showSort: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var state = Object.assign({}, this.state, {
			dataSource : ds.cloneWithRows([
				{name: "综合排序", val: 0}, 
				{name: "人气", val: 1}, 
				{name: "最新发布", val: 2}
			]),
			show: true,
			showAll: false,
			query: 'sort'
		});
		this.setState(state);
	},
	_onPressRow: function(row){
		var navIndex = {'video': 2, 'sort': 3};
		if(row.val == this.state.curCat){
			this.setState(Object.assign({}, this.state, {
				show: false
			}))
			return;
		}
		var state = Object.assign({}, this.state, {
			curCat: row.val, 
			show: false
		});
		state['nav' + navIndex[this.state.query]] = row.name;
		// alert(this.state.query + state.nav1 + state.nav2 + state.nav3)
		this.setState(state);
		//alert(this.state.query + '/' + row.val)
		this.props[this.state.query](this.state.query, row.val);
	},
	_showAllCats: function(){
		this.setState(Object.assign({}, this.state, {
			showAll: true,
			show: false,
		}));
	},
	_setProps: function(name, val, level, wording){
		var change = {};
		change[name] = val;
		change.nav1 = wording;
		// 保存上一级分类名
		change['catname' + level] = wording;
		/*	
		* 不要在 function 里面多次掉调用 setState，底层逻辑好像会合并起来，
		* 可能会有问题
		*/
		
		/*		
		* 选择三级菜单，或选择菜单中的全部
		* 1. 修改props，触发listView更新数据
		* 2. 修改state，隐藏分类信息，同时修改导航的wording
		*/
		if(level == 3 || !val){			
			change.showAll = false;
			// 当前级选择 “全部” 时，导航需要显示上一级分类名
			!val && (change.nav1 = this.state['catname' + (level - 1)]);
			this.props[name]({
				mt: this.state.mt,
				tt: val,
				st: this.state.st
			});
			
		}
		this.setState(Object.assign({}, this.state, change));
	},
	_setAllCats: function(name, cats){
		this.setState(Object.assign({}, this.state, {
			nav1: name,
			showAll: false,
			mt: cats.mt,
			st: cats.st,
			tt: cats.tt
		}));

		//alert('mt=' + this.state.mt + '&st=' + this.state.st + '&tt=' + this.state.tt);

		this.props[name]({
			mt: this.state.mt,
			tt: this.state.tt,
			st: this.state.st
		});
	}
});


var styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		top: 74,
		left: 0,
		right: 0,
		marginTop: 40
		// backgroundColor: 'red'
	},
	nav: {
		//flex: 1,
		flexDirection: 'row',
        color : '#bababa',
        height: 41,
        backgroundColor: '#f8f8f8',
        borderWidth: 1 / PixelRatio.get(),
		borderColor: '#e4e4e4'
        
	},
	column: {
		flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 41,
        fontSize: 14,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#e4e4e4'
	},
	subNav: {
		backgroundColor: '#f8f8ff',
		flex: 1,

		// position: 'absolute',
		// left: 0,
		// top: 41
	},
	navRow: {
		flex:1, 
		textAlign: 'left',
		backgroundColor: '#fff', 
		borderBottomWidth: 1 / PixelRatio.get(),
		borderColor: '#e4e4e4',
		height: 47,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingLeft: 15
	},
	navText: {
		fontSize: 14,
		textAlign: 'left'
	},
	curCat: {
		borderLeftWidth: 3 * PixelRatio.get(),
		borderLeftColor: '#06f',
  		backgroundColor: '#f8f8f8',
  		color: '#06F'
	}
});




module.exports = CatList;
