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

var Page = React.createClass({
	getInitialState: function(){
		return {
			searchText: 'Search',
      video: 0,
      sort: 0
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
    // 这里Clist cgi的参数有5个依赖于catList, mt, st, tt(分类信息),
    // video 直播或录播(0, 1, 2)
    // sort 排序（0， 1， 2）
		return (
	      <View style={styles.listContainer}>
	        {textInput}
          <CList mt={this.state.mt}  st={this.state.st} tt={this.state.tt} sort={this.state.sort} video={this.state.video}/>
	        <CatList 
            mt={this._setAllCats}
            st={this._setAllCats}
            tt={this._setAllCats}
            video={this._setProps}
            sort={this._setProps}
            />
	        
	      </View>
		)
	},
  _setProps: function(name, val){
    var change = {};
    change[name] = val;
    this.setState(Object.assign({}, this.state, change));
  },
  _setAllCats: function(catsObjs){
    var test = ''
    for(var k in catsObjs){
      test += '&' + k + '=' + catsObjs[k];
    }
    //alert('_setAllCats' + test)
    this.setState(Object.assign({}, this.state, catsObjs));
  },
	_search: function(){

	}
});


var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eee',
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
    backgroundColor: '#bbb',
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
    backgroundColor: '#eee',
    paddingTop: 75,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 51,
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#ccc',
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
