import { observable, computed, action, reaction } from 'mobx';

import pairs from '../data/pairs';
import { determineOpenPrice, calculatePipRange, calculatePipValue } from '../utils/utils';

import { getCurrencyConverter, USD_BASE } from './api';
import { PORT_TYPE, ACCOUNT_CURRENCY, CALCULATION_OPTIONS, MARKET_EXECUTION } from '../utils/constants';

const INITIAL_PAIR = 'USDJPY';

export default class CurrencyStore {
    
    @observable currentData = {};
    @observable rates = [];
    
    constructor() {
        this.currentData = {
            accountCurrency: ACCOUNT_CURRENCY.usd,
            pair: INITIAL_PAIR,
            order: MARKET_EXECUTION.sell,
            marketPrice: 0,
            openPrice: 0,
            sl: 0,
            tp: 0,
            pipSLRange: 0,
            pipSLValue: 0,
            pipTPRange: 0,
            pipTPValue: 0,
            lotSize: 0.01,
            balance: 1000,
            riskPercentage: 1,
            riskAmount: 0,
            contractSize: 0,
            portType: PORT_TYPE.standard,
            calculationOption: CALCULATION_OPTIONS.riskPercent,
        };
        
        this.rates = pairs;
        //this.getCurrencyPairs();
        this.currentData.openPrice = determineOpenPrice(this.currentData.order, this.getBidPrice, this.getAskPrice);
        reaction(
            () => this.currentData.pair,
            () => this.calculateOpenPrice()
        );
        reaction(
            () => this.currentData.pair,
            () => this.updateSLTP()
        );
        reaction(
            () => this.currentData.sl,
            () => this.calculatePipRange()
        );
        reaction(
            () => this.currentData.tp,
            () => this.calculatePipRange()
        );
        reaction(
            () => this.currentData.openPrice,
            () => this.calculatePipRange()
        );
        reaction(
            () => this.currentData.order,
            () => this.calculateOpenPrice()
        );
        reaction(
            () => this.currentData.pipSLRange,
            () => this.calculatePipValue()
        );
        reaction(
            () => this.currentData.pipTPRange,
            () => this.calculatePipValue()
        );
        reaction(
            () => this.currentData.lotSize,
            () => this.calculatePipValue()
        );
        this.updateSLTP();
    };

    @computed get getBidPrice() {
        return this.rates
                        .filter(item => item.symbol === this.currentData.pair)
                        .map(symbol => symbol.bid)
    };

    @computed get getAskPrice() {
        return this.rates
                        .filter(item => item.symbol === this.currentData.pair)
                        .map(symbol => symbol.ask)
    };

    @computed get getMarketPrice() {
        return this.rates
                        .filter(item => item.symbol === this.currentData.pair)
                        .map(symbol => symbol.price)
    };

    @action updateCurrentData(keys) {
        for (var key in keys) {
            this.currentData[key] = keys[key]
        }
    };

    @action updateSLTP() {
        this.updateCurrentData({ 
            sl: this.currentData.openPrice,
            tp: this.currentData.openPrice,
         })
    };

    @action calculateOpenPrice() {
        this.updateCurrentData({
            openPrice: determineOpenPrice(this.currentData.order, this.getBidPrice, this.getAskPrice)
        });
    };

    @action calculatePipRange() {
        this.updateCurrentData({ pipSLRange: calculatePipRange(this.currentData.openPrice,
                                            this.currentData.sl)
        });
        this.updateCurrentData({ pipTPRange: calculatePipRange(this.currentData.openPrice,
                                            this.currentData.tp)
        });
    }

    @action calculatePipValue() {
        this.updateCurrentData({ pipSLValue: calculatePipValue(this.currentData.portType, 
                            this.currentData.openPrice,
                            this.currentData.pipSLRange,
                            this.currentData.lotSize)*-1
        });
        this.updateCurrentData({ pipTPValue: calculatePipValue(this.currentData.portType, 
                            this.currentData.openPrice,
                            this.currentData.pipTPRange,
                            this.currentData.lotSize)
        });
    };
}