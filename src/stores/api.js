
export async function getCurrencyPairs() {
    const res = await fetch('https://forex.1forge.com/1.0.3/quotes?pairs=EURUSD,GBPJPY,AUDUSD&api_key=rvbQUK9PzVfG0QjJYfONcWXSokf78jy2')
        .then(res => res.json())
        .catch(err => console.log(err));
    return res;
    //this.data.rates = res;
    //console.log('pair:', this.data.rates)
};

export async function getCurrencyConverter(base) {
    const res = await fetch(`http://apilayer.net/api/live?access_key=4884d5abe9eb46ccc16f06b15176f3c9&currencies=EUR,GBP,CAD,AUD,THB,JPY&source=${base}&format=1`)
        .then(res => res.json())
        .catch(err => console.log(err));
    return res;
};

export const USD_BASE = {
    "success":true,
    "terms":"https:\/\/currencylayer.com\/terms",
    "privacy":"https:\/\/currencylayer.com\/privacy",
    "timestamp":1532928307,
    "source":"USD",
    "quotes":{
        "USDEUR":0.857565,
        "USDGBP":0.76274,
        "USDCAD":1.306865,
        "USDAUD":1.352165,
        "USDCHF":0.99451,
        "USDNZD":1.470415,
        "USDTHB":33.379877
    }
}


