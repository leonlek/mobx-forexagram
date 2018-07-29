import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Container, Header, Body, Content, Icon, Picker, Form, Text, Left, Right, Title, Item, ListItem, Input, Label } from 'native-base';
import { observer, inject } from 'mobx-react';

import styles from './styles';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

@inject('currencyStore')
@observer
export default class MainScreen extends Component {
    constructor(props) {
        super(props);
    }
    
    // value change
    handleAccountCurrencyChange(value) {
        this.props.currencyStore.updateCurrentData({
            accountCurrency: value
        });
    ;} 

    handleCurrencyPairChange(value) {
        this.props.currencyStore.updateCurrentData({
            pair: value
        });
    };    

    handleMarketExcChange(value) {
        this.props.currencyStore.updateCurrentData({
            order: value
        });
    };

    // text change
    handleOpenPriceChangeText(text) {
        this.props.currencyStore.updateCurrentData({
            openPrice: text
        });
    };

    handleSLChangeText(text) {
        this.props.currencyStore.updateCurrentData({
            sl: text
        });
    };
    handleTPChangeText(text) {
        this.props.currencyStore.updateCurrentData({
            tp: text
        });
    };
    handleLotSizeChangeText(text) {
        this.props.currencyStore.updateCurrentData({
            lotSize: text
        });
    };

    render() {

        const { rates, currentData } = this.props.currencyStore;

        const ratesList = rates.map(rate => (
            <Picker.Item key={rate.symbol} label={rate.symbol} value={rate.symbol} />
        ));


        return (
            <DismissKeyboard>
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Forexagram</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Text>Pip SL Range: {currentData.pipSLRange} value: {currentData.pipSLValue}</Text>
                        <Text>Pip TP Range: {currentData.pipTPRange} value: {currentData.pipTPValue}</Text>
                        <Item inlineLabel>
                            <Left><Label>Balance:</Label></Left>
                            <Right>
                                <Input  placeholder='balance' 
                                        keyboardType='decimal-pad'
                                />
                            </Right>
                        </Item>
                        
                        <Item>
                            <Left><Label>Account Currency :</Label></Left>
                            <Right>
                                <Picker
                                    mode='dropdown'
                                    iosHeader='Account Currency'
                                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                                    style={{ width: undefined }}
                                    selectedValue={currentData.accountCurrency}
                                    onValueChange={(value) => this.handleAccountCurrencyChange(value)}
                                    >
                                    <Picker.Item label='USD' value='USD'/>
                                    <Picker.Item label='EUR' value='EUR'/>
                                    <Picker.Item label='THB' value='THB'/>
                                </Picker>
                            </Right>
                        </Item>

                        <Item>
                            <Left><Label>Currency Pair :</Label></Left>
                            <Right>
                                <Picker
                                    mode='dropdown'
                                    iosHeader='Currency Pair'
                                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                                    style={{ width: undefined }}
                                    selectedValue={currentData.pair}
                                    onValueChange={(pair) => this.handleCurrencyPairChange(pair)}
                                    >
                                    {ratesList}
                                </Picker>
                            </Right>
                        </Item>

                        <Item>
                            <Left><Text>Open Price:</Text></Left>
                            <Right>
                                <Input  placeholder='open price' 
                                        keyboardType='decimal-pad'
                                        value={currentData.openPrice.toString()}
                                        onChangeText={(text) => this.handleOpenPriceChangeText(text)}
                                />
                            </Right>
                        </Item>

                        <Item>
                            <Left><Text>Market Execution :</Text></Left>
                            <Right>
                                <Picker
                                    mode='dropdown'
                                    iosHeader='Market Execution'
                                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                                    style={{ width: undefined }}
                                    selectedValue={currentData.order}
                                    onValueChange={(value) => this.handleMarketExcChange(value)}
                                    >
                                    <Picker.Item label='BUY' value='BUY'/>
                                    <Picker.Item label='SELL' value='SELL'/>
                                </Picker>
                            </Right>
                        </Item>
                        <Item inlineLabel>
                            <Left><Label>SL :</Label></Left>
                            <Right>
                                <Input  placeholder='stop loss' 
                                        keyboardType='decimal-pad'
                                        value={currentData.sl.toString()}
                                        onChangeText={(text) => this.handleSLChangeText(text)}
                                />
                            </Right>
                        </Item>
                        <Item inlineLabel>
                            <Left><Label>TP:</Label></Left>
                            <Right>
                                <Input  placeholder='take profit' 
                                        keyboardType='decimal-pad'
                                        value={currentData.tp.toString()}
                                        onChangeText={(text) => this.handleTPChangeText(text)}
                                />
                            </Right>
                        </Item>

                        <Item inlineLabel>
                            <Left><Label>Lot Size:</Label></Left>
                            <Body>
                                <Input  placeholder='Lot Size' 
                                        keyboardType='decimal-pad'
                                        value={currentData.lotSize.toString()}
                                        onChangeText={(text) => this.handleLotSizeChangeText(text)}
                                />
                            </Body>
                        </Item>
                    </Form>
                </Content>
            </Container>
            </DismissKeyboard>
        );
    }
}