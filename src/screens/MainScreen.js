import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Container, Header, Body, Content, Icon, Picker, 
            Form, Text, Left, Right, Title, Item, ListItem, 
            Input, Label, CardItem, Card, Button
} from 'native-base';
import { observer, inject } from 'mobx-react';

import styles from './styles';
import { InputNumber } from '../components/InputNumber';
import { PORT_TYPE, ACCOUNT_CURRENCY, CALCULATION_OPTIONS, MARKET_EXECUTION } from '../utils/constants';

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
    handleOptionChange(value) {
        this.props.currencyStore.updateCurrentData({
            calculationOption: value
        });
    };

    // text change
    handleBalanceChangeText(text) {
        this.props.currencyStore.updateCurrentData({
            balance: text
        });
    };
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
    handleOptionChangeText(text) {
        if (this.props.currencyStore.currentData.calculationOption === CALCULATION_OPTIONS.riskPercent) {
            this.props.currencyStore.updateCurrentData({
                riskPercentage: text
            });
        } else if (this.props.currencyStore.currentData.calculationOption === CALCULATION_OPTIONS.lotSize) {
            this.props.currencyStore.updateCurrentData({
                lotSize: text
            });
        }
    };

    //handle onpress
    handleOnPressCalculate() {
        console.log('​MainScreen -> handleOnPressCalculate -> handleOnPressCalculate');
    };

    render() {

        const { rates, currentData } = this.props.currencyStore;

        const ratesList = rates.map(rate => (
            <Picker.Item key={rate.symbol} label={rate.symbol} value={rate.symbol} />
        ));

        const placeholder = currentData.calculationOption === CALCULATION_OPTIONS.riskPercent ? 'risk percentage' : 'lot size';
        const value = currentData.calculationOption === CALCULATION_OPTIONS.riskPercent ? currentData.riskPercentage.toString() : currentData.lotSize.toString();
        const inputOptions = (
            <InputNumber placehoder={placeholder}   
                        value={value}
                        onChangeText={(text) => this.handleOptionChangeText(text)}
                />
        );

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
                        <Item inlineLabel>
                            <Label>Balance :</Label>
                            <Right>
                                <InputNumber    placeholder='balance' 
                                                value={currentData.balance.toString()}
                                                onChangeText={(text) => this.handleBalanceChangeText(text)}
                                />
                            </Right>
                        </Item>
                        
                        <Item>
                            <Label>Account Currency :</Label>
                            <Right>
                                <Picker
                                    mode='dropdown'
                                    iosHeader='Account Currency'
                                    iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                                    selectedValue={currentData.accountCurrency}
                                    onValueChange={(value) => this.handleAccountCurrencyChange(value)}
                                >
                                    <Picker.Item label={ACCOUNT_CURRENCY.usd} value={ACCOUNT_CURRENCY.usd}/>
                                    <Picker.Item label={ACCOUNT_CURRENCY.eur} value={ACCOUNT_CURRENCY.eur}/>
                                    <Picker.Item label={ACCOUNT_CURRENCY.thb} value={ACCOUNT_CURRENCY.thb}/>
                                </Picker>
                            </Right>
                        </Item>

                        <Item>
                            <Label>Currency Pair :</Label>
                            <Right>
                                <Picker
                                    mode='dropdown'
                                    iosHeader='Currency Pair'
                                    iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                                    selectedValue={currentData.pair}
                                    onValueChange={(pair) => this.handleCurrencyPairChange(pair)}
                                    >
                                    {ratesList}
                                </Picker>
                            </Right>
                        </Item>
                        <Item>
                            <Label>Market Execution :</Label>
                            <Right>
                                <Picker
                                    mode='dropdown'
                                    iosHeader='Market Execution'
                                    iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                                    selectedValue={currentData.order}
                                    onValueChange={(value) => this.handleMarketExcChange(value)}
                                    >
                                    <Picker.Item label={MARKET_EXECUTION.buy} value={MARKET_EXECUTION.buy}/>
                                    <Picker.Item label={MARKET_EXECUTION.sell} value={MARKET_EXECUTION.sell}/>
                                </Picker>
                            </Right>
                        </Item>
                        <Item>
                            <Label>Open Price :</Label>
                            <Right>
                                <InputNumber  placeholder='open price' 
                                        keyboardType='decimal-pad'
                                        value={currentData.openPrice.toString()}
                                        onChangeText={(text) => this.handleOpenPriceChangeText(text)}
                                />
                            </Right>
                        </Item>
                        <Item inlineLabel>
                            <Label>SL :</Label>
                            <Right>
                                <InputNumber    placeholder='stop loss' 
                                                value={currentData.sl.toString()}
                                                onChangeText={(text) => this.handleSLChangeText(text)}
                                />
                            </Right>
                        </Item>
                        <Item inlineLabel>
                            <Label>TP :</Label>
                            <Right>
                                <InputNumber  placeholder='take profit' 
                                        keyboardType='decimal-pad'
                                        value={currentData.tp.toString()}
                                        onChangeText={(text) => this.handleTPChangeText(text)}
                                />
                            </Right>
                        </Item>
                        <Item>
                            <Left>
                                <Picker
                                    mode='dropdown'
                                    iosHeader='Options'
                                    iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                                    selectedValue={currentData.calculationOption}
                                    onValueChange={(value) => this.handleOptionChange(value)}
                                    >
                                    <Picker.Item label={CALCULATION_OPTIONS.riskPercent} value={CALCULATION_OPTIONS.riskPercent}/>
                                    <Picker.Item label={CALCULATION_OPTIONS.lotSize} value={CALCULATION_OPTIONS.lotSize}/>
                                </Picker>
                            </Left>
                            <Right>
                                {inputOptions}
                            </Right>
                        </Item>
                        <Item style={{ borderBottomColor: 'white', marginTop: 10, marginBottom: 10, }}>
                            <Right>
                                <Button onPress={()=> this.handleOnPressCalculate()}>
                                    <Text>Calculate</Text>
                                </Button>
                            </Right>
                        </Item>
                    </Form>
                    
                    <Card>
                        <CardItem header bordered>
                            <Text>Result</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                            <Text>SL (pips) : ${currentData.pipSLRange.toString()}</Text>
                            </Left>
                            <Right>
                            <Text>Your Lost : ${currentData.pipSLValue}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                            <Text>TP (pips) : ${currentData.pipTPRange.toString()}</Text>
                            </Left>
                            <Right>
                            <Text>Your Profit : ${currentData.pipTPValue}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
            </DismissKeyboard>
        );
    }
}