import { observable, computed, action, reaction } from 'mobx';

import pairs from '../data/pairs';
import { determineOpenPrice, calculatePipRange, calculatePipValue } from '../utils/utils';


const INITIAL_PAIR = 'EURUSD';
const INITIAL_ORDER = 'SELL';
const INITIAL_PORT_TYPE = 'STANDARD'; //standard, micro, nano

export default class CurrencyStore {
    
    @observable currentData = {};
    @observable rates = [];
    
    constructor() {
        this.currentData = {
            pair: INITIAL_PAIR,
            order: INITIAL_ORDER,
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
            portType: INITIAL_PORT_TYPE,
        };
        
        this.rates = pairs;
        //this.getCurrencyPairs();
        this.currentData.openPrice = determineOpenPrice(this.currentData.order, this.getBidPrice, this.getAskPrice);
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
    };

    @action async getCurrencyPairs() {
        const res = await fetch('https://forex.1forge.com/1.0.3/quotes?pairs=EURUSD,GBPJPY,AUDUSD&api_key=rvbQUK9PzVfG0QjJYfONcWXSokf78jy2')
            .then(res => res.json())
            .catch(err => console.log(err));
        this.data.rates = res;
        console.log('pair:', this.data.rates)
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
    }

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