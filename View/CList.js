'use strict';
var React =  require('react-native');

var {
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Navigator
} = React;

var COURSE_LIST_CGI = 'http://ke.qq.com/cgi-bin/pubAccount/courseList?is_ios=1&count=10&no_pc_only=1&pay_type=0&priority=1';


var CList = React.createClass({
	getInitialState: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			dataSource: ds/*.cloneWithRows(data)*/,
			load: false,
			list: [],
			mt: 1001,
			curPage: 0
		}
	},	
	componentDidMount : function() {
		//var mt = this.props.mt || 1002;
        this.fetchData('');
    },
    componentWillReceiveProps: function(){
    	var params = {};
    	params.mt = this.props.mt || 1002;
    	params.video = this.props.video;

    	var query = '';
    	for(var key in params){
    		if(params[key]) {
    			query += '&' + key + '=' + params[key];
    		}
    		
    	}
    	//alert(query);
        this.fetchData(query);
    },
	fetchData: function(mt, page){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		fetch(COURSE_LIST_CGI + mt + '&page=' + (page || 1), {
			method: 'GET',
			headers: {
				'Referer': 'http://mobileapp.ke.qq.com'
			}
		})
		.then((repsonse) => repsonse.json())
		.then((repsonseData) => {
			// 这里每次更新整个list可能有性能问题
			// 但是这里采用了dom  diff 算法，有可能是增量更新
			var list = [];
			if(page && page > 1){
				list = this.state.list.concat(repsonseData.result.list);
			}else{
				list = [].concat(repsonseData.result.list);
			}
			this.setState({
				curPage: page || 1,
				load: true,
				list: list,
				mt: mt,
				//dataSource: this.state.dataSource.concat(ds.cloneWithRows(repsonseData.result.list))
				dataSource: this.state.dataSource.cloneWithRows(list)
			})
		})
		.catch((err) => {
			this.setState({
				curPage: page || 1,
				load: true,
				list: [],
				mt: 1001,
				//dataSource: this.state.dataSource.concat(ds.cloneWithRows(repsonseData.result.list))
				dataSource: this.state.dataSource.cloneWithRows([])
			})
		})
		.done();
	},
	render: function(){
		if (!this.state.load) {
            return (
                <View style={styles.loading}>
	                <Text>
	                    Loading...
	                </Text>
	            </View>
            );
        }
		return (
			<ListView dataSource={this.state.dataSource} 
			renderRow={this.renderRow} onEndReached={this.nextPage}
			style={styles.courseList} 
			keyboardShouldPersistTaps={true}
          	automaticallyAdjustContentInsets={false}
          	keyboardDismissMode="on-drag" />
		)	
	},
	renderRow: function(course){
		course._price = course.price == 0 ? '免费' : '¥' + (course.price / 100).toFixed(2);
		course._priceCla = {};
		course._priceCla.color = course.price == 0 ? '#5db61b' : '#e85308';
		return(
		    <TouchableOpacity>
		        <View style={styles.row}>
		            <View style={styles.container}>
		                <Image style={styles.face} source={{uri : course.cover_url + '222'}}/>
		                <View style={styles.right}>
		                    <Text style={styles.name} numberOfLines="2">{course.name}</Text>
		                    <Text style={styles.agency}>{course.agency_name}</Text>
		                    <View style={{flex: 1, flexDirection: 'row'}}>
		                    <Text style={[styles.price,course._priceCla]}>	                    
		                    {course._price}
		                    </Text>
		                    <Text style={{color: 'gray', flex: 1}}>{course.see_num}人观看</Text>
		                    </View>
		                </View>
		            </View>
		        </View>
		    </TouchableOpacity>
	    )


	},
	nextPage: function(){
		var curPage = this.state.curPage + 1;

		var params = {};
    	params.mt = this.props.mt || 1002;
    	params.video = this.props.video;

    	var query = '';
    	for(var key in params){
    		query += '&key=' + params[key];
    	}
		this.fetchData(query, curPage);
	}
});

var styles = StyleSheet.create({
	loading: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color : '#bababa',
        backgroundColor : '#ffffff',
        fontSize : 12,
        
	},
	courseList: {
		//flex: 1
		//backgroundColor: 'red'
		// marginTop: -64
		// marginTop: 41
	},
	row: {
		// marginLeft: 16,
		// marginRight: 15,
		// flex: 1,
		// textAlign: 'left'

		backgroundColor: 'white',
	    justifyContent: 'center',
	    paddingHorizontal: 15,
	    paddingVertical: 8,
	},
	container: {
		flex: 1,
        flexDirection : 'row',
        paddingTop: 11,
        paddingBottom: 11,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#e1e1e1'

	},
	face: {
		width : 140,
        height : 79,
        marginRight: 8,
        resizeMode: Image.resizeMode.contain
	},
	right: {
		flex: 1
	},
	name: {
		fontSize: 15,
		lineHeight: 20,
		height: 40
	},
	agency: {
		fontSize: 13,
		marginTop: 6,
		color: 'gray'
	},
	price: {
		fontSize: 13,
		lineHeight: 16,
		marginRight: 13
	}
});

module.exports = CList;