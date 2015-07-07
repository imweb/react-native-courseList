'use strict';
var React =  require('react-native');

var SubNav = require('./SubNav.js');

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
			show: true,
			nav1: '全部分类',
			nav2: '全部类型',
			nav3: '综合排序'
		}
	},
	render: function(){
		return (
			<View style={styles.wrapper}>
				<View style={styles.nav}>
					<TouchableOpacity>
						<View style={styles.column}>
						<Text>{this.state.nav1}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._showTypes}>
						<View style={styles.column}>
						<Text>{this.state.nav2}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._showCommon}>
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
	_showTypes: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var state = Object.assign({}, this.state, {
			dataSource : ds.cloneWithRows([
				{name: "全部类型", val: 1003}, 
				{name: "直播课程", val: 1004}, 
				{name: "录播课程", val: 1005}
			]),
			show: true,
			query: 'mt'
		});
		this.setState(state);
	},
	_showCommon: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var state = Object.assign({}, this.state, {
			dataSource : ds.cloneWithRows([
				{name: "综合排序", val: 0}, 
				{name: "人气", val: 1}, 
				{name: "最新发布", val: 2}
			]),
			show: true,
			query: 'video'
		});
		this.setState(state);
	},
	_onPressRow: function(row){
		var navIndex = {'mt': 2, 'video': 3};
		if(row.val == this.state.curCat) return;
		var state = Object.assign({}, this.state, {
			curCat: row.val, 
			show: false
		});
		state['nav' + navIndex[this.state.query]] = row.name;
		// alert(this.state.query + state.nav1 + state.nav2 + state.nav3)
		this.setState(state);
		//alert(this.state.query + '/' + row.val)
		this.props[this.state.query](row.val);
	}
});


var styles = StyleSheet.create({
	wrapper: {
		// position: 'absolute',
		// top: 64,
		// left: 0,
		// right: 0,


	},
	nav: {
		//flex: 1,
		flexDirection: 'row',
        color : '#bababa',
        //paddingTop: 64,
        //height: 41,
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
        fontSize: 14
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
		backgroundColor: '#f8f8f8', 
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
  		backgroundColor: '#f8f8f8'
	}
});


module.exports = CatList;
