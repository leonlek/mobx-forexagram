import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Container, Header, Body, Content, Icon, Picker, 
            Form, Text, Left, Right, Title, Item, ListItem, 
            Input, Label, CardItem, Card
} from 'native-base';
import { observer, inject } from 'mobx-react';

import styles from './styles';
import { InputNumber } from '../components/InputNumber';

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
    handleLotSizeChangeText(text) {
        this.props.currencyStore.updateCurrentData({
            lotSize: text
        });
    };
    handleRiskPercentageChangeText(text) {
        this.props.currencyStore.updateCurrentData({
            riskPercentage: text
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
                                    <Picker.Item label='USD' value='USD'/>
                                    <Picker.Item label='EUR' value='EUR'/>
                                    <Picker.Item label='THB' value='THB'/>
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
                            <Label>Open Price :</Label>
                            <Right>
                                <InputNumber  placeholder='open price' 
                                        keyboardType='decimal-pad'
                                        value={currentData.openPrice.toString()}
                                        onChangeText={(text) => this.handleOpenPriceChangeText(text)}
                                />
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
                                    <Picker.Item label='BUY' value='BUY'/>
                                    <Picker.Item label='SELL' value='SELL'/>
                                </Picker>
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

                        <Item inlineLabel>
                            <Left><Label>Lot Size :</Label></Left>
                            <Body>
                                <InputNumber  placeholder='Lot Size' 
                                        value={currentData.lotSize.toString()}
                                        onChangeText={(text) => this.handleLotSizeChangeText(text)}
                                />
                            </Body>
                        </Item>
                        <Item inlineLabel>
                            <Left><Label>Risk (%) :</Label></Left>
                            <Body>
                                <InputNumber  placeholder='Risk Percentage' 
                                        value={currentData.riskPercentage.toString()}
                                        onChangeText={(text) => this.handleRiskPercentageChangeText(text)}
                                />
                            </Body>
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
                        <CardItem>
                                <Left><Text>Lot Size for {currentData.riskPercentage}% risk => {currentData.lotSize}</Text></Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
            </DismissKeyboard>
        );
    }
}