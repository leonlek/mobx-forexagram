import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Container, Header, Body, Content, Icon, Picker, Form, Text, Left, Right, Title, Item, ListItem, Input } from 'native-base';
import { observer, inject } from 'mobx-react';

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
                        <ListItem>
                            <Left><Text>Balance : </Text></Left>
                            <Body>
                                <Item regular>
                                    <Input  placeholder='balance' 
                                            keyboardType='decimal-pad'
                                    />
                                </Item>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Left><Text>Account Currency :</Text></Left>
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
                        </ListItem>
                        <ListItem>
                            <Left><Text>Currency Pair :</Text></Left>
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
                        </ListItem>
                        <ListItem>
                            <Left><Text>Open Price : </Text></Left>
                            <Body>
                                <Item regular>
                                    <Input  placeholder='open price' 
                                            keyboardType='decimal-pad'
                                            value={currentData.openPrice.toString()}
                                            onChangeText={(text) => this.handleOpenPriceChangeText(text)}
                                    />
                                </Item>
                            </Body>
                        </ListItem>
                        <ListItem>
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
                        </ListItem>
                        <ListItem>
                            <Left><Text>SL : </Text></Left>
                            <Body>
                                <Item regular>
                                    <Input  placeholder='stop loss' 
                                            keyboardType='decimal-pad'
                                            value={currentData.sl.toString()}
                                            onChangeText={(text) => this.handleSLChangeText(text)}
                                    />
                                </Item>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Left><Text>TP : </Text></Left>
                            <Body>
                                <Item regular>
                                    <Input  placeholder='take profit' 
                                            keyboardType='decimal-pad'
                                            value={currentData.tp.toString()}
                                            onChangeText={(text) => this.handleTPChangeText(text)}
                                    />
                                </Item>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Left><Text>Lot Size : </Text></Left>
                            <Body>
                                <Item regular>
                                    <Input  placeholder='Lot Size' 
                                            keyboardType='decimal-pad'
                                            value={currentData.lotSize.toString()}
                                            onChangeText={(text) => this.handleLotSizeChangeText(text)}
                                    />
                                </Item>
                            </Body>
                        </ListItem>
                    </Form>
                </Content>
            </Container>
            </DismissKeyboard>
        );
    }
}