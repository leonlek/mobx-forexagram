
export function calculatePipRange(openPrice, closePrice) {

    if (closePrice === 0) {
        return 0;
    }

    if (getDecimalPoint(openPrice) === 'JPY') {
        let result = Math.abs(openPrice-closePrice).toFixed(3);
        return result * 100;
    } else {
        let result = Math.abs(openPrice-closePrice).toFixed(5);
        return result * 10000
    }
};

export function calculatePipValue(portType, openPrice, pipRange, lotSize) {

    let val = 100000;
    if (portType === 'MICRO') {
        val = 10000;
    } else if (portType === 'NANO') {
        val = 1000;
    }

    let onePip = getDecimalPoint(openPrice) === 'JPY' ? 0.01 : 0.0001;
    
    return (val*lotSize*onePip/openPrice)*pipRange.toFixed(3);

};

export function determineOpenPrice(order, bid, ask) {
    if (order === 'SELL') {
        return bid;
    } else {
        return ask;
    }
};

function getDecimalPoint(number) {
    if (((number*100)%1 === 0) || ((number*1000)%1 === 0)) {
        return 'JPY';
    } else if (((number*10000)%1 === 0) || ((number*100000)%1 === 0)) {
        return 'NO_JPY';
    };
    return 'OTHER';
};
