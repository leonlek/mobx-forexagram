import { createStackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CurrencyPairs from '../screens/CurrencyPairs';
import OrderScreen from '../screens/OrderScreen';

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

export default createStackNavigator({
    Home: {
        screen: HomeStack,
    },
    CurrencyPairs: {
        screen: CurrencyParisStack,
    },
    Order: {
        screen: OrderStack,
    }
}, {
    mode: 'modal',
    cardStyle: { paddingTop: StatusBar.currentHeight },
    headerMode: 'none',
});