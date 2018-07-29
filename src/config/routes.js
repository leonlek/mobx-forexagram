import { createStackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CurrencyPairs from '../screens/CurrencyPairs';
import OrderScreen from '../screens/OrderScreen';
import MainScreen from '../screens/MainScreen';

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
        navigationOptions: ({ navigation }) => ({
            headerTitle: navigation.state.params.title,
        }),
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

export default createStackNavigator({
    Main: {
        screen: MainStack,
    },
    Home: {
        screen: HomeStack,
    },
    CurrencyPairs: {
        screen: CurrencyParisStack,
    },
    Order: {
        screen: OrderStack,
    },
}, {
    mode: 'modal',
    cardStyle: { paddingTop: StatusBar.currentHeight },
    headerMode: 'none',
});