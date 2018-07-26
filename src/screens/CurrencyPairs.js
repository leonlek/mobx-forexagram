import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StatusBar } from 'react-native';
import { inject, observer } from 'mobx-react';

import { ListItem, Separator } from '../components/List';

@inject('currencyStore')
@observer 
export default class CurrencyPairs extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        currencyStore: PropTypes.object,
    };

    handlePress = (data) => {

        this.props.currencyStore.updateCurrentData({
            pair: data.symbol,
            marketPrice: data.price
        });
        
        const openPrice = this.props.currencyStore.currentData.order === 'SELL' 
                            ? this.props.currencyStore.getBidPrice
                            : this.props.currencyStore.getAskPrice
        // const openPrice = determineOpenPrice(this.props.currencyStore.currentData.order,
        //     this.props.currencyStore.getBidPrice,
        //     this.props.currencyStore.getAskPrice
        // );
        this.props.currencyStore.updateCurrentData({ openPrice: openPrice });
        this.props.navigation.goBack(null);
    };

    render() {

        const { rates } = this.props.currencyStore;

        return (
            <View>
                <StatusBar barStyle = 'default' translucent={false} />
                <FlatList 
                    data={rates}
                    renderItem={({ item }) => (
                        <ListItem 
                            text={`${item.symbol} : ${item.price}`}
                            onPress={() => this.handlePress(item)}
                        />
                    )}
                    keyExtractor={item => item.symbol}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        );
    }
}