/**
 * React Native News App
 * https://github.com/tabalt/ReactNativeNews
 */
'use strict';

var React = require('react-native');

var Page = require('./Page');

var {
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator
} = React;

//var NEWS_LIST_API_URL = 'http://88.studyteam.sinaapp.com/rnn/news_list.json';

var newsList = [
    {
        "id": 1,
        "title": "新疆福建成为一带一路核心区",
        "url": "",
        "pic": "http://zxpic.gtimg.com/infonew/0/news_pics_117796631.jpg/220",
        "summary": "3月28日发布《推动共建丝绸之路经济带和21世纪海上丝绸之路的愿景与行动》"
    },
    {
        "id": 2,
        "title": "中国人最想“投胎地”排名",
        "url": "",
        "pic": "http://zxpic.gtimg.com/infonew/0/news_pics_117794316.jpg/220",
        "summary": "调查“全国34省市形象地图”显示，56.3%的中国人下辈子都打算换个地方投胎。"
    }
];

var NewsList = React.createClass({

    getInitialState : function() {
        var ds = new ListView.DataSource({
                rowHasChanged : (row1, row2) => row1 !== row2
            });
        return {
            dataSource: ds.cloneWithRows(newsList),
            loaded : false,
        }
    },
    render : function() {
        return (
            <ListView 
                dataSource={this.state.dataSource}
                renderRow={this.renderNews}
                style={styles.listView} />
        );
    },
    renderNews : function(news) {
        return (
            <TouchableOpacity onPress={() => this.onPressNews(news)}>
                <View style={styles.pageContainer}>
                    <View style={[styles.container, styles.newsItemContainer]}>
                        <Image 
                        source={{uri : news.pic}}
                        style={styles.newsPic} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.newsTitle}>{news.title}</Text>
                            <Text style={styles.newsSummary}>{news.summary}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },
    onPressNews : function(news) {
        
        this.props.navigator.push({
            title: "CourseList",
            component: Page,
            passProps: {news},
        });
    },
});

var styles = StyleSheet.create({
    pageContainer: {
        marginLeft : 10,
        marginRight : 10,
    },
    container: {
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    rightContainer: {
        flex: 1,
    },
    newsItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
    },
    listView: {
        backgroundColor: '#ffffff',
    },
    newsPic : {
        width : 90,
        height : 60,
        margin: 10,
        marginLeft: 0,
    },
    newsTitle : {
        color : '#4f4f4f',
        fontSize : 16,
        textAlign : 'left',
    },
    newsSummary : {
        color : '#bababa',
        fontSize : 14,
        textAlign : 'left',
    },
});

module.exports = NewsList;

