/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');


var AllCats = require('./View/AllCats');


var {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    View,
} = React;


var courseList = React.createClass({
    render: function() {
        return (   
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: '全部分类',
                    component: AllCats,
                }} />          
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('courseList', () => courseList);
