import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StatusBar } from 'react-native';
import { inject, observer } from 'mobx-react';

import { ListItem, Separator } from '../components/List';
import order from '../data/order';
import { determineOpenPrice } from '../utils/utils';

@inject('currencyStore')
@observer
class OrderScreen extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        currencyStore: PropTypes.object,
    };

    handlePress= (order) => {
        this.props.currencyStore.updateCurrentData({ order: order });

        // const openPrice = this.props.currencyStore.currentData.order === 'SELL' 
        //                     ? this.props.currencyStore.getBidPrice
        //                     : this.props.currencyStore.getAskPrice

        const openPrice = determineOpenPrice(this.props.currencyStore.currentData.order,
                                            this.props.currencyStore.getBidPrice,
                                            this.props.currencyStore.getAskPrice
        );

        this.props.currencyStore.updateCurrentData({ openPrice: openPrice });
        this.props.navigation.goBack(null);
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="default" translucent={false} />
                <FlatList
                    data={order}
                    renderItem={({ item }) => (
                        <ListItem 
                            text={item} 
                            selected={item === 'SELL'} 
                            onPress={() => this.handlePress(item)}
                        />
                    )}
                    keyExtractor={item => item}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        );
    };
};

export default OrderScreen;