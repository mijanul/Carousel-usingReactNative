import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    StatusBar,
    Animated,
    Dimensions, LogBox
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { CarouselImages } from './CarouselData'
const { height, width } = Dimensions.get('window')

class CarouselView extends React.Component {
    SCROLLVIEW_REF = React.createRef();
    constructor(props) {
        super(props);
        this.arr = [];
    }
    render() {
        LogBox.ignoreAllLogs()
        const scrollX = new Animated.Value(0)
        let position = Animated.divide(scrollX, width)
        const numberOfData = CarouselImages.length
        let scrollValue = 0, scrolled = 0
        setInterval(() => {
            scrolled++
            if (scrolled < numberOfData) {
                scrollValue = scrollValue + this.arr[scrolled]
                console.log(scrollValue, "***", scrolled)
                this.SCROLLVIEW_REF.current.scrollTo({
                    x: scrollValue
                })
                // console.log(scrolled, "###", numberOfData - 1)
                // // if (scrolled == numberOfData - 1) {
                // //     scrollValue = 0
                // //     scrolled = 0
                // // }
                // console.log(scrolled, '&&&', numberOfData - 1)
            }
        }, 1200)
        return (
            <Fragment>
                <View style={styles.mainContainer}>
                    <ScrollView
                        ref={this.SCROLLVIEW_REF}
                        pagingEnabled={true}
                        scrollEventThrottle={8}
                        decelerationRate={'fast'}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                        )}
                    >
                        {CarouselImages.map((item, key) => {
                            return (
                                <View style={styles.ImageView}
                                    key={key}
                                    onLayout={event => {
                                        const layout = event.nativeEvent.layout;
                                        this.arr[key] = layout.x;
                                    }}
                                >
                                    <Image
                                        source={item.images}
                                        style={styles.imagesStyle}
                                    />
                                </View>
                            )
                        })}
                    </ScrollView>
                    <View style={styles.dottedView}>
                        {CarouselImages.map((_, i) => {
                            let opacity = position.interpolate({
                                inputRange: [i - 1, i, i + 1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: 'clamp'
                            })
                            return (
                                <Animated.View
                                    key={i}
                                    style={{ opacity, height: hp(1.4), width: hp(1.4), borderRadius: hp(1), marginRight: wp(1), backgroundColor: "#d3d3d3" }}
                                />
                            )
                        })}
                    </View>
                </View>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%'
    },
    ImageView: {
        height: hp(100),
        width: wp(100),
        backgroundColor: '#ff0'
    },
    imagesStyle: {
        height: '100%',
        width: '100%',
        resizeMode: "cover"
    },
    dottedView: {
        height: hp(1.2),
        marginTop: hp(1),
        // backgroundColor: '#ff0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: hp(4),
        left: wp(40)
    },
});
export default CarouselView;