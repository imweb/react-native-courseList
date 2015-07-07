'use strict';
var React =  require('react-native');

var CatList = require('./CatList');

var CList = require('./CList');

var {
  AppRegistry,
  ListView,
  PixelRatio,
  Platform,
  Settings,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

/*			<View style={{flex: 1}}>
				<CatList />
				<CList />
			</View>*/
var Page = React.createClass({
	getInitialState: function(){
		return {
			curCat: 1002,
			searchText: 'Search'
		}
	},
	render: function(){
		      var textInput = (
        <View style={styles.searchRow}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={this._search.bind(this)}
            placeholder="Search..."
            style={[styles.searchTextInput, styles.searchTextInputIOS]}
          />
        </View>);
		return (
	      <View style={styles.listContainer}>
	        {textInput}
	        <CatList mt = {this._refresh} video={this._setVideo}/>
	        <CList mt={this.state.curCat} video={this.state.video}/>
	      </View>
		)
	},
	_search: function(){

	},
	_refresh: function(cat){
		this.setState(Object.assign({}, this.state, {curCat: cat}));

		// this.setState({
		// 	curCat: cat,
		// 	video: 0
		// });
	},
	_setVideo: function(video){
		//alert('video' + video);
		this.setState(Object.assign({}, this.state, {video: video}));
	}
});


var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  sectionHeader: {
    padding: 5,
  },
  group: {
    backgroundColor: 'white',
  },
  sectionHeaderTitle: {
    fontWeight: '500',
    fontSize: 11,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: '500',
  },
  rowDetailText: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 20,
  },
  searchRow: {
    backgroundColor: '#eeeeee',
    paddingTop: 75,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
  },
  searchTextInputIOS: {
    height: 30,
  },
  searchTextInputAndroid: {
    padding: 2,
  },
});


module.exports = Page;
