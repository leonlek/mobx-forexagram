
export function calculatePipRange(openPrice, closePrice) {

    if (closePrice === 0) {
        return 0;
    }

    let val = 10000; // non jpy currency
    if (getCurrnecyDecimalType(openPrice) === 'JPY') {
        val = 100;
    } 

    let result = Math.abs(openPrice-closePrice);
    return (val*result).toFixed(2);
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

    return result.toFixed(2);
};

export function determineOpenPrice(order, bid, ask) {
    if (order === 'SELL') {
        return bid;
    } else {
        return ask;
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
