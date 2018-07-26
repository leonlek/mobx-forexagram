import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StatusBar, KeyboardAvoidingView } from 'react-native';
import { inject, observer } from 'mobx-react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { Container, styles } from '../components/Container';
import InputWithButton from '../components/TextInput/InputWithButton';

@inject('currencyStore')
@observer
export default class HomeScreen extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        currencyStore: PropTypes.object,
    };

    handlePressCurrencyPair = () => {
        this.props.navigation.navigate('CurrencyPairs', { title: 'Symbols'});
    };

    handlePressBuySell = () => {
        this.props.navigation.navigate('Order', { title: 'Market Execution'});
    };

    handlePairChangeText = (text) => {
        this.props.currencyStore.updateCurrentData({ marketPrice: text });
    };
    
    handleBuySellChangeText = (text) => {
        this.props.currencyStore.updateCurrentData({ openPrice: text});
    };

    handleSLChangeText = (text) => {
        this.props.currencyStore.updateCurrentData({ sl: text});
    };
    
    handleTPChangeText = (text) => {
        this.props.currencyStore.updateCurrentData({ tp: text});
    };

    handleLotSizeChangeText = (text) => {
        this.props.currencyStore.updateCurrentData({ lotSize: text});
    };

    render() {

        const { currentData } = this.props.currencyStore;

        return (
            <Container>
            <StatusBar translucent={false} barStyle='light-content' />
            <Text>Port Type : {currentData.portType}</Text>
            <InputWithButton 
                buttonText={currentData.pair}
                onPress={this.handlePressCurrencyPair}
                defaultValue={`Market Price: ${this.props.currencyStore.getMarketPrice.toString()}`}
                keyboardType='numeric'
                editable={false}
                onChangeText={this.handlePairChangeText}
            />
            <InputWithButton 
                buttonText={currentData.order}
                onPress={this.handlePressBuySell}
                keyboardType='numeric'
                editable={true}
                value={currentData.openPrice.toString()}
                onChangeText={this.handleBuySellChangeText}
            />
            <InputWithButton 
                buttonText={'SL'}
                keyboardType='numeric'
                editable={true}
                value={currentData.sl.toString()}
                onChangeText={this.handleSLChangeText}
            />
            <InputWithButton 
                buttonText={'TP'}
                keyboardType='numeric'
                editable={true}
                value={currentData.tp.toString()}
                onChangeText={this.handleTPChangeText}
            />
            <InputWithButton 
                buttonText={'Lot Size'}
                keyboardType='numeric'
                editable={true}
                value={currentData.lotSize.toString()}
                onChangeText={this.handleLotSizeChangeText}
            />
            <Text>Pip SL range : {currentData.pipSLRange}</Text>
            <Text>Pip SL value (Base) : {currentData.pipSLValue}</Text>
            <Text>Pip TP range : {currentData.pipTPRange}</Text>
            <Text>Pip TP value (Base) : {currentData.pipTPValue}</Text>
            </Container>
        )
    }
}
