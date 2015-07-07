'use strict';
var React =  require('react-native');

var {
    StyleSheet,
    ListView,
    Text,
    View,
    TouchableOpacity,
    PixelRatio,
    Navigator,
    TouchableHighlight
} = React;

var SubNav = React.createClass({
	getInitialState: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			dataSource: ds/*.cloneWithRows(["全部类型", "直播课程", "录播课程"])*/
		}
	},
	render: function(){
		return (
			<ListView dataSource={this.state.dataSource} 
				renderRow={this._renderRow}
				style={styles.subNav} keyboardShouldPersistTaps={true}
          		automaticallyAdjustContentInsets={false}
          		keyboardDismissMode="on-drag"  />

		)
	},
	_showTypes: function(){
		this.state.dataSource = this.state.dataSource.cloneWithRows([]);
	},
	_renderRow: function(row){
		return (
			<TouchableHighlight underlayColor='#f8f8f8' onPress={() => this._onPressRow(row)}>
	        <View style={styles.navRow}>
	        	<Text style={styles.navText}>{row}</Text>
	        </View>
	        </TouchableHighlight>
	    )
	},
	_onPressRow: function(row){

	}
});


var styles = StyleSheet.create({
	subNav: {
		backgroundColor: '#f8f8ff',
		flex: 1
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
	}
});


module.exports = SubNav;
