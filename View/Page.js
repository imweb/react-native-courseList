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
  Navigator,
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
            onSubmitEditing = {this._onSubmit}
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
          <CList 
            mt={this.state.mt}  
            st={this.state.st} 
            tt={this.state.tt} 
            sort={this.state.sort} 
            video={this.state.video}
            word={this.state.word}
            />
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
    /*  
    * 组件间的通讯机制，通过 prop 实现，
    * 通过 props 传递的 function，子组件将自身的变化设置父组件的 state，
    * 同级组件的 props 设置成父组件的 state
    * 组件内部 componentWillReceiveProps 方法会捕获这些 props 的变化
    */
    var change = {};
    change[name] = val;
    this.setState(Object.assign({}, this.state, change));
  },
  _setAllCats: function(catsObjs){
    var test = ''
    for(var k in catsObjs){
      test += '&' + k + '=' + catsObjs[k];
    }
    this.setState(Object.assign({}, this.state, catsObjs));
  },
	_search: function(){


	},
    _onSubmit: function(event){
        this.setState(Object.assign({}, this.state, {
            word: event.nativeEvent.text
        }))
    }
});


var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 64
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
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
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
