
export function calculatePipRange(openPrice, closePrice) {

    if (closePrice === 0) {
        return 0;
    }

    let val = 10000; // non jpy currency
    if (getCurrnecyDecimalType(openPrice) === 'JPY') {
        val = 100;
    } 

    let result = Math.abs(openPrice-closePrice);
    if (isFinite(result)) {
        return (val*result).toFixed(1);
    } else {
        return 0;
    }
};

export function calculatePipValue(portType, openPrice, pipRange, lotSize) {

    let val = 100000; // STANDARD
    if (portType === 'MICRO') {
        val = 10000;
    } else if (portType === 'NANO') {
        val = 1000;
    }

    let onePip = getCurrnecyDecimalType(openPrice) === 'JPY' ? 0.01 : 0.0001;
    let result = (val*lotSize*onePip/openPrice)*pipRange;

    if (isFinite(result)) {
        return result.toFixed(2);
    } else {
        return 0;
    }
};

export function determineOpenPrice(order, bid, ask) {
    if (order === 'SELL') {
        return bid;
    } else {
        return ask;
    }
};

export function determineLotSize(accountCurrnecy, pair) {
    if (pair === undefined) {
        return 0;
        console.log('​pair is undefined');
    }
    let arr = Array.from(pair);
    if (arr.length === 6) {
        let base = arr[0]+arr[1]+arr[2];
        let quote = arr[3]+arr[4]+arr[5];

        

        console.log(' -> arr', base + ':' + quote);
    }
};

function getCurrnecyDecimalType(number) {
    if (((number*100)%1 === 0) || ((number*1000)%1 === 0)) {
        return 'JPY';
    } else if (((number*10000)%1 === 0) || ((number*100000)%1 === 0)) {
        return 'NO_JPY';
    };
    return 'ERROR';
};
