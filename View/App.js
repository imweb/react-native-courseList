/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var CList = require('./View/CList');

var CatList = require('./View/CatList');

var Page = require('./View/Page');

var {
    AppRegistry,
    StyleSheet,
    TabBarIOS,
    NavigatorIOS,
    Text,
    View,
} = React;

// http://ke.qq.com/cgi-bin/pubAccount/courseList?is_ios=1&count=10&no_pc_only=1&pay_type=0&priority=1&video=0&mt=1002
var App = React.createClass({
    render: function() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: '课程列表',
                    //component: CatList,
                    component: Page
                }}
                itemWrapperStyle={{backgroundColor: '#fff'}}
                tintColor="#008888" />
        ) 

    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = App;
