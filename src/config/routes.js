import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import CurrencyPairs from '../screens/CurrencyPairs';
import OrderScreen from '../screens/OrderScreen';
import MainScreen from '../screens/MainScreen';
import USDPerformanceScreen from '../screens/USDPerformanceScreen';
import NewsScreen from '../screens/NewsScreen';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: () => null,
        }
    }
}, {
    headerMode: 'screen',
});

const CurrencyParisStack = createStackNavigator({
    CurrencyPairs: {
        screen: CurrencyPairs,
        navigationOptions: ({ navigation }) => ({
            headerTitle: navigation.state.params.title,
        }),
    }
});

const OrderStack = createStackNavigator({
    Order: {
        screen: OrderScreen,
        // navigationOptions: ({ navigation }) => ({
        //     headerTitle: navigation.state.params.title,
        // }),
    }
});

const USDPerformanceStack = createStackNavigator({
    USDPerformance: {
        screen: USDPerformanceScreen,
    }
});

const NewsStack = createStackNavigator({
    News: {
        screen: NewsScreen
    }
});

const MainStack = createStackNavigator({
    Main: {
        screen: MainScreen,
        navigationOptions: {
            header: () => null,
        }
    }
}, {
    headerMode: 'screen',
});


export default createBottomTabNavigator({
    Main: MainStack,
    USDPerformance: USDPerformanceStack,
    News: NewsStack,
},{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Main') {
                iconName = `ios-calculator${focused ? '' : '-outline'}`;
            } else if (routeName === 'USDPerformance') {
                iconName = `ios-stats${focused ? '' : '-outline'}`;
            } else if (routeName === 'Order') {
                iconName = `ios-options${focused ? '' : '-outline'}`;
            } else if (routeName === 'News') {
                iconName = `ios-globe${focused ? '' : '-outline'}`
            }

            return <Ionicons  name={iconName} size={25} color={tintColor} />;
        },            
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
});

// export default createStackNavigator({
//     Main: {
//         screen: MainStack,
//     },
//     Home: {
//         screen: HomeStack,
//     },
//     CurrencyPairs: {
//         screen: CurrencyParisStack,
//     },
//     Order: {
//         screen: OrderStack,
//     },
// }, {
//     mode: 'modal',
//     cardStyle: { paddingTop: StatusBar.currentHeight },
//     headerMode: 'none',
// });