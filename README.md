# binance-api-node [![build](https://img.shields.io/travis/Ashlar/binance-api-node/master.svg?style=flat-square)](https://travis-ci.org/Ashlar/binance-api-node) [![cover](https://img.shields.io/coveralls/github/Ashlar/binance-api-node/master?style=flat-square)](https://coveralls.io/github/Ashlar/binance-api-node?branch=master) [![bnb](https://img.shields.io/badge/binance-winner-yellow.svg?style=flat-square)](https://github.com/binance-exchange/binance-api-node)

> A complete API wrapper for the [Binance](https://binance.com) API.

Note: This wrapper uses Promises, if they are not supported in your environment, you might
want to add [a polyfill](https://github.com/stefanpenner/es6-promise) for them.

For PRs or issues, head over to the [source repository](https://github.com/Ashlar/binance-api-node).

### Installation

    yarn add binance-api-node

### Getting started

Import the module and create a new client. Passing api keys is optional only if
you don't plan on doing authenticated calls. You can create an api key
[here](https://www.binance.com/userCenter/createApi.html).

```js
import Binance from 'binance-api-node'

const client = Binance()

// Authenticated client, can make signed calls
const client2 = Binance({
  apiKey: 'xxx',
  apiSecret: 'xxx',
  getTime: xxx,
})

client.time().then(time => console.log(time))
```

If you do not have an appropriate babel config, you will need to use the basic commonjs requires.

```js
const Binance = require('binance-api-node').default
```

Every REST method returns a Promise, making this library [async await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) ready.
Following examples will use the `await` form, which requires some configuration you will have to lookup.

### Table of Contents
- [Init](#init)
- [Public REST Endpoints](#public-rest-endpoints)
  - [ping](#ping)
  - [time](#time)
  - [exchangeInfo](#exchangeinfo)
  - [book](#book)
  - [candles](#candles)
  - [aggTrades](#aggtrades)
  - [trades](#trades)
  - [dailyStats](#dailystats)
  - [avgPrice](#avgPrice)
  - [prices](#prices)
  - [allBookTickers](#allbooktickers)
- [Futures Public REST Endpoints](#futures-public-rest-endpoints)
  - [futures ping](#futures-ping)
  - [futures time](#futures-time)
  - [futures exchangeInfo](#futures-exchangeinfo)
  - [futures book](#futures-book)
  - [futures candles](#futures-candles)
  - [futures aggTrades](#futures-aggtrades)
  - [futures trades](#futures-trades)
  - [futures dailyStats](#futures-dailystats)
  - [futures avgPrice](#futures-avgPrice)
  - [futures prices](#futures-prices)
  - [futures allBookTickers](#futures-allbooktickers)
  - [futures markPrice](#futures-markPrice)
  - [futures allForceOrders](#futures-allForceOrders)
- [Authenticated REST Endpoints](#authenticated-rest-endpoints)
  - [order](#order)
  - [orderTest](#ordertest)
  - [orderOco](#orderoco)
  - [getOrder](#getorder)
  - [cancelOrder](#cancelorder)
  - [cancelOpenOrders](#cancelOpenOrders)
  - [openOrders](#openorders)
  - [allOrders](#allorders)
  - [allOrdersOCO](#allordersoco)  
  - [accountInfo](#accountinfo)
  - [myTrades](#mytrades)
  - [tradesHistory](#tradeshistory)
  - [depositHistory](#deposithistory)
  - [withdrawHistory](#withdrawhistory)
  - [withdraw](#withdraw)
  - [depositAddress](#depositaddress)
  - [tradeFee](#tradefee)
  - [capitalConfigs](#capitalConfigs)
  - [capitalDepositAddress](#capitalDepositAddress)
  - [universalTransfer](#universalTransfer)
  - [universalTransferHistory](#universalTransferHistory)
- [Margin](#margin)
  - [marginRepay](#marginRepay)
  - [marginIsolatedAccount](#marginIsolatedAccount)
  - [marginMaxBorrow](#marginMaxBorrow)
  - [marginCreateIsolated](#marginCreateIsolated)
  - [marginIsolatedTransfer](#marginIsolatedTransfer)
  - [marginIsolatedTransferHistory](#marginIsolatedTransferHistory)
- [Futures Authenticated REST Endpoints](#futures-authenticated-rest-endpoints)
  - [futuresGetOrder](#futuresGetOrder)
  - [futuresAllOrders](#futuresAllOrders)
  - [futuresAccountBalance](#futuresAccountBalance)
  - [futuresUserTrades](#futuresUserTrades)
  - [futuresLeverage](#futuresLeverage)
  - [futuresMarginType](#futuresMarginType)
  - [futuresPositionMargin](#futuresPositionMargin)
  - [futuresMarginHistory](#futuresMarginHistory)
  - [futuresIncome](#futuresIncome)
- [Websockets](#websockets)
  - [depth](#depth)
  - [partialDepth](#partialdepth)
  - [ticker](#ticker)
  - [allTickers](#alltickers)
  - [candles](#candles-1)
  - [aggTrades](#aggtrades-1)
  - [trades](#trades-1)
  - [user](#user)
- [Futures Websockets](#futuresWebsockets)
  - [futuresDepth](#futuresDepth)
  - [futuresPartialDepth](#futuresPartialdepth)
  - [futuresTicker](#futuresTicker)
  - [futuresAllTickers](#futuresAlltickers)
  - [futuresCandles](#futuresCandles)
  - [futuresAggTrades](#futuresAggtrades)
  - [futuresUser](#futuresUser)
- [Common](#common)
  - [getInfo](#getInfo)
- [ErrorCodes](#errorcodes)

### Init

| Param       | Type     | Required | Info                                         |
| ----------- | -------- | -------- | -------------------------------------------- |
| apiKey      | String   | false    | Required when making private calls           |
| apiSecret   | String   | false    | Required when making private calls           |
| getTime     | Function | false    | Time generator, defaults to () => Date.now() |
| httpBase    | String   | false    | Changes the default endpoint                 |
| httpFutures | String   | false    | Changes the default endpoint                 |
| wsBase      | String   | false    | Changes the default endpoint                 |
| wsFutures   | String   | false    | Changes the default endpoint                 |

### Public REST Endpoints

#### ping

Test connectivity to the API.

```js
console.log(await client.ping())
```

#### time

Test connectivity to the Rest API and get the current server time.

```js
console.log(await client.time())
```

<details>
<summary>Output</summary>

```js
1508478457643
```

</details>

#### exchangeInfo

Get the current exchange trading rules and symbol information.

```js
console.log(await client.exchangeInfo())
```

<details>
<summary>Output</summary>

```js
{
  "timezone": "UTC",
  "serverTime": 1508631584636,
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 1,
      "limit": 10
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 100000
    }
  ],
  "exchangeFilters": [],
  "symbols": [{
    "symbol": "ETHBTC",
    "status": "TRADING",
    "baseAsset": "ETH",
    "baseAssetPrecision": 8,
    "quoteAsset": "BTC",
    "quotePrecision": 8,
    "orderTypes": ["LIMIT", "MARKET"],
    "icebergAllowed": false,
    "filters": [{
      "filterType": "PRICE_FILTER",
      "minPrice": "0.00000100",
      "maxPrice": "100000.00000000",
      "tickSize": "0.00000100"
    }, {
      "filterType": "LOT_SIZE",
      "minQty": "0.00100000",
      "maxQty": "100000.00000000",
      "stepSize": "0.00100000"
    }, {
      "filterType": "MIN_NOTIONAL",
      "minNotional": "0.00100000"
    }]
  }]
}
```

</details>

#### book

Get the order book for a symbol.

```js
console.log(await client.book({ symbol: 'ETHBTC' }))
```

| Param  | Type   | Required | Default |
| ------ | ------ | -------- | ------- |
| symbol | String | true     |
| limit  | Number | false    | `100`   |

<details>
<summary>Output</summary>

```js
{
  lastUpdateId: 17647759,
  asks:
   [
     { price: '0.05411500', quantity: '5.55000000' },
     { price: '0.05416700', quantity: '11.80100000' }
   ],
  bids:
   [
     { price: '0.05395500', quantity: '2.70000000' },
     { price: '0.05395100', quantity: '11.84100000' }
   ]
}
```

</details>

#### candles

Retrieves Candlestick for a symbol. Candlesticks are uniquely identified by their open time.

```js
console.log(await client.candles({ symbol: 'ETHBTC' }))
```

| Param     | Type   | Required | Default | Description                                                                                    |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| symbol    | String | true     |
| interval  | String | false    | `5m`    | `1m`, `3m`, `5m`, `15m`, `30m`, `1h`, `2h`,<br>`4h`, `6h`, `8h`, `12h`, `1d`, `3d`, `1w`, `1M` |
| limit     | Number | false    | `500`   | Max `1000`                                                                                     |
| startTime | Number | false    |
| endTime   | Number | false    |

<details>
<summary>Output</summary>

```js
;[
  {
    openTime: 1508328900000,
    open: '0.05655000',
    high: '0.05656500',
    low: '0.05613200',
    close: '0.05632400',
    volume: '68.88800000',
    closeTime: 1508329199999,
    quoteAssetVolume: '2.29500857',
    trades: 85,
    baseAssetVolume: '40.61900000',
  },
]
```

</details>

#### aggTrades

Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.

```js
console.log(await client.aggTrades({ symbol: 'ETHBTC' }))
```

| Param     | Type   | Required | Default | Description                                              |
| --------- | ------ | -------- | ------- | -------------------------------------------------------- |
| symbol    | String | true     |
| fromId    | String | false    |         | ID to get aggregate trades from INCLUSIVE.               |
| startTime | Number | false    |         | Timestamp in ms to get aggregate trades from INCLUSIVE.  |
| endTime   | Number | false    |         | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| limit     | Number | false    | `500`   | Max `500`                                                |

Note: If both `startTime` and `endTime` are sent, `limit` should not be sent AND the distance between `startTime` and `endTime` must be less than 24 hours.

Note: If `frondId`, `startTime`, and `endTime` are not sent, the most recent aggregate trades will be returned.

<details>
<summary>Output</summary>

```js
;[
  {
    aggId: 2107132,
    symbol: 'ETHBTC',
    price: '0.05390400',
    quantity: '1.31000000',
    firstId: 2215345,
    lastId: 2215345,
    timestamp: 1508478599481,
    isBuyerMaker: true,
    wasBestPrice: true,
  },
]
```

</details>

#### trades

Get recent trades of a symbol.

```js
console.log(await client.trades({ symbol: 'ETHBTC' }))
```

| Param  | Type   | Required | Default | Description |
| ------ | ------ | -------- | ------- | ----------- |
| symbol | String | true     |
| limit  | Number | false    | `500`   | Max `500`   |

<details>
<summary>Output</summary>

```js
;[
  {
    id: 28457,
    price: '4.00000100',
    qty: '12.00000000',
    time: 1499865549590,
    isBuyerMaker: true,
    isBestMatch: true,
  },
]
```

</details>

#### dailyStats

24 hour price change statistics, not providing a symbol will return all tickers and is resource-expensive.

```js
console.log(await client.dailyStats({ symbol: 'ETHBTC' }))
```

| Param  | Type   | Required |
| ------ | ------ | -------- |
| symbol | String | false    |

<details>
<summary>Output</summary>

```js
{
  symbol: 'ETHBTC',
  priceChange: '-0.00112000',
  priceChangePercent: '-1.751',
  weightedAvgPrice: '0.06324784',
  prevClosePrice: '0.06397400',
  lastPrice: '0.06285500',
  lastQty: '0.63500000',
  bidPrice: '0.06285500',
  bidQty: '0.81900000',
  askPrice: '0.06291900',
  askQty: '2.93800000',
  openPrice: '0.06397500',
  highPrice: '0.06419100',
  lowPrice: '0.06205300',
  volume: '126240.37200000',
  quoteVolume: '7984.43091340',
  openTime: 1521622289427,
  closeTime: 1521708689427,
  firstId: 45409308, // First tradeId
  lastId: 45724293, // Last tradeId
  count: 314986 // Trade count
}
```

</details>

#### avgPrice

Current average price for a symbol.

```js
console.log(await client.avgPrice({ symbol: 'ETHBTC' }))
```

| Param  | Type   | Required |
| ------ | ------ | -------- |
| symbol | String | true     |

<details>
<summary>Output</summary>

```js
{
  "mins": 5,
  "price": "9.35751834"
}
```

</details>

#### prices

Latest price for a symbol, not providing the symbol will return prices for all symbols. 

```js
console.log(await client.prices())
```

| Param  | Type   | Required |
| ------ | ------ | -------- |
| symbol | String | false    |

<details>
<summary>Output</summary>

```js
{
  ETHBTC: '0.05392500',
  LTCBTC: '0.01041100',
  ...
}
```

</details>

#### allBookTickers

Best price/qty on the order book for all symbols.

```js
console.log(await client.allBookTickers())
```

<details>
<summary>Output</summary>

```js
{
  DASHBTC: {
    symbol: 'DASHBTC',
    bidPrice: '0.04890400',
    bidQty: '0.74100000',
    askPrice: '0.05230000',
    askQty: '0.79900000'
  },
  DASHETH: {
    symbol: 'DASHETH',
    bidPrice: '0.89582000',
    bidQty: '0.63300000',
    askPrice: '1.02328000',
    askQty: '0.99900000'
  }
  ...
}
```

</details>

#### futures ping

Test connectivity to the API.

```js
console.log(await client.futuresPing())
```

#### futures time

Test connectivity to the Rest API and get the current server time.

```js
console.log(await client.futuresTime())
```

<details>
<summary>Output</summary>

```js
1508478457643
```

</details>

#### futures exchangeInfo

Get the current exchange trading rules and symbol information.

```js
console.log(await client.futuresExchangeInfo())
```

<details>
<summary>Output</summary>

```js
{
  "timezone": "UTC",
  "serverTime": 1508631584636,
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 1,
      "limit": 10
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 100000
    }
  ],
  "exchangeFilters": [],
  "symbols": [...]
}
```

</details>

#### futures book

Get the order book for a symbol.

```js
console.log(await client.futuresBook({ symbol: 'BTCUSDT' }))
```

| Param  | Type   | Required | Default |
| ------ | ------ | -------- | ------- |
| symbol | String | true     |
| limit  | Number | false    | `100`   |

<details>
<summary>Output</summary>

```js
{
  lastUpdateId: 17647759,
  asks:
   [
     { price: '8000.05411500', quantity: '54.55000000' },
     { price: '8000.05416700', quantity: '1111.80100000' }
   ],
  bids:
   [
     { price: '8000.05395500', quantity: '223.70000000' },
     { price: '8000.05395100', quantity: '1134.84100000' }
   ]
}
```

</details>

#### futures candles

Retrieves Candlestick for a symbol. Candlesticks are uniquely identified by their open time.

```js
console.log(await client.futuresCandles({ symbol: 'BTCUSDT' }))
```

| Param     | Type   | Required | Default | Description                                                                                    |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| symbol    | String | true     |
| interval  | String | false    | `5m`    | `1m`, `3m`, `5m`, `15m`, `30m`, `1h`, `2h`,<br>`4h`, `6h`, `8h`, `12h`, `1d`, `3d`, `1w`, `1M` |
| limit     | Number | false    | `500`   | Max `1000`                                                                                     |
| startTime | Number | false    |
| endTime   | Number | false    |

<details>
<summary>Output</summary>

```js
;[
  {
    openTime: 1508328900000,
    open: '0.05655000',
    high: '0.05656500',
    low: '0.05613200',
    close: '0.05632400',
    volume: '68.88800000',
    closeTime: 1508329199999,
    quoteAssetVolume: '2.29500857',
    trades: 85,
    baseAssetVolume: '40.61900000',
  },
]
```

</details>

#### futures aggTrades

Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.

```js
console.log(await client.futuresAggTrades({ symbol: 'ETHBTC' }))
```

| Param     | Type   | Required | Default | Description                                              |
| --------- | ------ | -------- | ------- | -------------------------------------------------------- |
| symbol    | String | true     |
| fromId    | String | false    |         | ID to get aggregate trades from INCLUSIVE.               |
| startTime | Number | false    |         | Timestamp in ms to get aggregate trades from INCLUSIVE.  |
| endTime   | Number | false    |         | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| limit     | Number | false    | `500`   | Max `500`                                                |

Note: If both `startTime` and `endTime` are sent, `limit` should not be sent AND the distance between `startTime` and `endTime` must be less than 24 hours.

Note: If `frondId`, `startTime`, and `endTime` are not sent, the most recent aggregate trades will be returned.

<details>
<summary>Output</summary>

```js
;[
  {
    aggId: 2107132,
    price: '0.05390400',
    quantity: '1.31000000',
    firstId: 2215345,
    lastId: 2215345,
    timestamp: 1508478599481,
    isBuyerMaker: true,
    wasBestPrice: true,
  },
]
```

</details>

#### futures trades

Get recent trades of a symbol.

```js
console.log(await client.futuresTrades({ symbol: 'ETHBTC' }))
```

| Param  | Type   | Required | Default | Description |
| ------ | ------ | -------- | ------- | ----------- |
| symbol | String | true     |
| limit  | Number | false    | `500`   | Max `500`   |

<details>
<summary>Output</summary>

```js
;[
  {
    id: 28457,
    price: '4.00000100',
    qty: '12.00000000',
    time: 1499865549590,
    isBuyerMaker: true,
    isBestMatch: true,
  },
]
```

</details>

#### futures dailyStats

24 hour price change statistics, not providing a symbol will return all tickers and is resource-expensive.

```js
console.log(await client.futuresDailyStats({ symbol: 'ETHBTC' }))
```

| Param  | Type   | Required |
| ------ | ------ | -------- |
| symbol | String | false    |

<details>
<summary>Output</summary>

```js
{
  symbol: 'BTCUSDT',
  priceChange: '-0.00112000',
  priceChangePercent: '-1.751',
  weightedAvgPrice: '0.06324784',
  prevClosePrice: '0.06397400',
  lastPrice: '0.06285500',
  lastQty: '0.63500000',
  bidPrice: '0.06285500',
  bidQty: '0.81900000',
  askPrice: '0.06291900',
  askQty: '2.93800000',
  openPrice: '0.06397500',
  highPrice: '0.06419100',
  lowPrice: '0.06205300',
  volume: '126240.37200000',
  quoteVolume: '7984.43091340',
  openTime: 1521622289427,
  closeTime: 1521708689427,
  firstId: 45409308, // First tradeId
  lastId: 45724293, // Last tradeId
  count: 314986 // Trade count
}
```

</details>

#### futures prices

Latest price for all symbols.

```js
console.log(await client.futuresPrices())
```

<details>
<summary>Output</summary>

```js
{
  BTCUSDT: '8590.05392500',
  ETHUSDT: '154.1100',
  ...
}
```

</details>

#### futures allBookTickers

Best price/qty on the order book for all symbols.

```js
console.log(await client.futuresAllBookTickers())
```

<details>
<summary>Output</summary>

```js
{
  BTCUSDT: {
    symbol: 'BTCUSDT',
    bidPrice: '0.04890400',
    bidQty: '0.74100000',
    askPrice: '0.05230000',
    askQty: '0.79900000'
  },
  ETHUSDT: {
    symbol: 'ETHUSDT',
    bidPrice: '0.89582000',
    bidQty: '0.63300000',
    askPrice: '1.02328000',
    askQty: '0.99900000'
  }
  ...
}
```

</details>

#### futures markPrice

Mark Price and Funding Rate.

```js
console.log(await client.futuresMarkPrice())
```

<details>
<summary>Output</summary>

```js
{
    "symbol": "BTCUSDT",
    "markPrice": "11012.80409769",
    "lastFundingRate": "-0.03750000",
    "nextFundingTime": 1562569200000,
    "time": 1562566020000
}
```

</details>

#### futures AllForceOrders

Get all Liquidation Orders.

```js
console.log(await client.futuresAllForceOrders())
```

| Param     | Type   | Required |
| --------- | ------ | -------- |
| symbol    | String | false    |
| startTime | Long   | false    |
| endTime   | Long   | false    |
| limit     | Long   | false    |

<details>
<summary>Output</summary>

```js
;[
  {
    symbol: 'BTCUSDT', // SYMBOL
    price: '7918.33', // ORDER_PRICE
    origQty: '0.014', // ORDER_AMOUNT
    executedQty: '0.014', // FILLED_AMOUNT
    avragePrice: '7918.33', // AVG_PRICE
    status: 'FILLED', // STATUS
    timeInForce: 'IOC', // TIME_IN_FORCE
    type: 'LIMIT',
    side: 'SELL', // DIRECTION
    time: 1568014460893,
  },
]
```

</details>

### Authenticated REST Endpoints

Note that for all authenticated endpoints, you can pass an extra parameter
`useServerTime` set to `true` in order to fetch the server time before making
the request.

#### order

Creates a new order.

```js
console.log(
  await client.order({
    symbol: 'XLMETH',
    side: 'BUY',
    quantity: '100',
    price: '0.0002',
  }),
)
```

| Param            | Type   | Required | Default  | Description                                                         |
| ---------------- | ------ | -------- | -------- | ------------------------------------------------------------------- |
| symbol           | String | true     |
| side             | String | true     |          | `BUY`,`SELL`                                                        |
| type             | String | false    | `LIMIT`  | `LIMIT`, `MARKET`                                                   |
| quantity         | String | true     |
| price            | String | true     |          | Optional for `MARKET` orders                                        |
| timeInForce      | String | false    | `GTC`    | `FOK`, `GTC`, `IOC`                                                 |
| newClientOrderId | String | false    |          | A unique id for the order. Automatically generated if not sent.     |
| stopPrice        | Number | false    |          | Used with stop orders                                               |
| newOrderRespType | String | false    | `RESULT` | Returns more complete info of the order. `ACK`, `RESULT`, or `FULL` |
| icebergQty       | Number | false    |          | Used with iceberg orders                                            |
| recvWindow       | Number | false    |

Additional mandatory parameters based on `type`:

| Type                | Additional mandatory parameters                 |
| ------------------- | ----------------------------------------------- |
| `LIMIT`             | `timeInForce`, `quantity`, `price`              |
| `MARKET`            | `quantity`                                      |
| `STOP_LOSS`         | `quantity`, `stopPrice`                         |
| `STOP_LOSS_LIMIT`   | `timeInForce`, `quantity`, `price`, `stopPrice` |
| `TAKE_PROFIT`       | `quantity`, `stopPrice`                         |
| `TAKE_PROFIT_LIMIT` | `timeInForce`, `quantity`, `price`, `stopPrice` |
| `LIMIT_MAKER`       | `quantity`, `price`                             |

- `LIMIT_MAKER` are `LIMIT` orders that will be rejected if they would immediately match and trade as a taker.
- `STOP_LOSS` and `TAKE_PROFIT` will execute a `MARKET` order when the `stopPrice` is reached.
- Any `LIMIT` or `LIMIT_MAKER` type order can be made an iceberg order by sending an `icebergQty`.
- Any order with an `icebergQty` MUST have `timeInForce` set to `GTC`.

<details>
<summary>Output</summary>

```js
{
  symbol: 'XLMETH',
  orderId: 1740797,
  clientOrderId: '1XZTVBTGS4K1e',
  transactTime: 1514418413947,
  price: '0.00020000',
  origQty: '100.00000000',
  executedQty: '0.00000000',
  status: 'NEW',
  timeInForce: 'GTC',
  type: 'LIMIT',
  side: 'BUY'
}
```

</details>

#### orderTest

Test new order creation and signature/recvWindow. Creates and validates a new order but does not send it into the matching engine.

Same API as above, but does not return any output on success.

#### orderOco

Creates a new OCO order.

```js
console.log(
  await client.orderOco({
    symbol: 'XLMETH',
    side: 'SELL',
    quantity: 100,
    price: 0.0002,
    stopPrice: 0.0001,
    stopLimitPrice: 0.0001,
  }),
)
```

| Param                | Type   | Required | Description
|----------------------|--------|----------|------------
| symbol               | String | true     |
| listClientOrderId    | String | false    | A unique Id for the entire orderList
| side                 | String | true     | `BUY`,`SELL`
| quantity             | Number | true     |
| limitClientOrderId   | String | false    | A unique Id for the limit order
| price                | Number | true     |
| limitIcebergQty      | Number | false    | Used to make the `LIMIT_MAKER` leg an iceberg order.
| stopClientOrderId    | String | false    | A unique Id for the stop loss/stop loss limit leg
| stopPrice            | Number | true
| stopLimitPrice       | Number | false    | If provided, `stopLimitTimeInForce` is required.
| stopIcebergQty       | Number | false    | Used with `STOP_LOSS_LIMIT` leg to make an iceberg order.
| stopLimitTimeInForce | String | false    | `FOK`, `GTC`, `IOC`
| newOrderRespType     | String | false    | Returns more complete info of the order. `ACK`, `RESULT`, or `FULL`
| recvWindow           | Number | false    | The value cannot be greater than `60000`

Additional Info:
- Price Restrictions:
    - `SELL`: Limit Price > Last Price > Stop Price
    - `BUY`: Limit Price < Last Price < Stop Price
- Quantity Restrictions:
    - Both legs must have the same quantity.
    - ```ICEBERG``` quantities however do not have to be the same

<details>
<summary>Output</summary>

```js
{
  "orderListId": 0,
  "contingencyType": "OCO",
  "listStatusType": "EXEC_STARTED",
  "listOrderStatus": "EXECUTING",
  "listClientOrderId": "JYVpp3F0f5CAG15DhtrqLp",
  "transactionTime": 1514418413947,
  "symbol": "XLMETH",
  "orders": [
    {
      "symbol": "XLMETH",
      "orderId": 1740797,
      "clientOrderId": "1XZTVBTGS4K1e"
    },
    {
      "symbol": "XLMETH",
      "orderId": 1740798,
      "clientOrderId": "1XZTVBTGS4K1f"
    }
  ],
  "orderReports": [
    {
      "symbol": "XLMETH",
      "orderId": 1740797,
      "orderListId": 0,
      "clientOrderId": "1XZTVBTGS4K1e",
      "transactTime": 1514418413947,
      "price": "0.000000",
      "origQty": "100",
      "executedQty": "0.000000",
      "cummulativeQuoteQty": "0.000000",
      "status": "NEW",
      "timeInForce": "GTC",
      "type": "STOP_LOSS",
      "side": "SELL",
      "stopPrice": "0.0001"
    },
    {
      "symbol": "XLMETH",
      "orderId": 1740798,
      "orderListId": 0,
      "clientOrderId": "1XZTVBTGS4K1f",
      "transactTime": 1514418413947,
      "price": "0.0002",
      "origQty": "100",
      "executedQty": "0.000000",
      "cummulativeQuoteQty": "0.000000",
      "status": "NEW",
      "timeInForce": "GTC",
      "type": "LIMIT_MAKER",
      "side": "SELL"
    }
  ]
}
```

</details>

#### getOrder

Check an order's status.

```js
console.log(
  await client.getOrder({
    symbol: 'BNBETH',
    orderId: 50167927,
  }),
)
```

| Param             | Type   | Required | Description                                 |
| ----------------- | ------ | -------- | ------------------------------------------- |
| symbol            | String | true     |
| orderId           | Number | true     | Not required if `origClientOrderId` is used |
| origClientOrderId | String | false    |
| recvWindow        | Number | false    |

<details>
<summary>Output</summary>

```js
{
  clientOrderId: 'NkQnNkdBV1RGjUALLhAzNy',
  cummulativeQuoteQty: '0.16961580',
  executedQty: '3.91000000',
  icebergQty: '0.00000000',
  isWorking: true,
  orderId: 50167927,
  origQty: '3.91000000',
  price: '0.04338000',
  side: 'SELL',
  status: 'FILLED',
  stopPrice: '0.00000000',
  symbol: 'BNBETH',
  time: 1547075007821,
  timeInForce: 'GTC',
  type: 'LIMIT',
  updateTime: 1547075016737
}

```

</details>

#### cancelOrder

Cancels an active order.

```js
console.log(
  await client.cancelOrder({
    symbol: 'ETHBTC',
    orderId: 1,
  }),
)
```

| Param             | Type   | Required | Description                                                                |
| ----------------- | ------ | -------- | -------------------------------------------------------------------------- |
| symbol            | String | true     |
| orderId           | Number | true     | Not required if `origClientOrderId` is used                                |
| origClientOrderId | String | false    |
| newClientOrderId  | String | false    | Used to uniquely identify this cancel. Automatically generated by default. |
| recvWindow        | Number | false    |

<details>
<summary>Output</summary>

```js
{
  symbol: 'ETHBTC',
  origClientOrderId: 'bnAoRHgI18gRD80FJmsfNP',
  orderId: 1,
  clientOrderId: 'RViSsQPTp1v3WmLYpeKT11'
}
```

</details>

#### cancelOpenOrders

Cancels all active orders on a symbol.
This includes OCO orders.

```js
console.log(
  await client.cancelOpenOrders({
    symbol: 'ETHBTC'
  }),
)
```
| Param      | Type     | Required  |
|------------|----------|-----------|
| symbol     | String   | true      |  

<details>
<summary>Output</summary>

```js
[
  {
    symbol: 'ETHBTC',
    origClientOrderId: 'bnAoRHgI18gRD80FJmsfNP',
    orderId: 1,
    clientOrderId: 'RViSsQPTp1v3WmLYpeKT11'
  },
  {
    symbol: 'ETHBTC',
    origClientOrderId: 'IDbzcGmfwSCKihxILK1snu',
    orderId: 2,
    clientOrderId: 'HKFcuWAm9euMgRuwVGR8CL'
  }
]
```

</details>

#### openOrders

Get all open orders on a symbol.

```js
console.log(
  await client.openOrders({
    symbol: 'XLMBTC',
  }),
)
```

| Param      | Type   | Required |
| ---------- | ------ | -------- |
| symbol     | String | true     |
| recvWindow | Number | false    |

<details>
<summary>Output</summary>

```js
;[
  {
    symbol: 'XLMBTC',
    orderId: 11271740,
    clientOrderId: 'ekHkROfW98gBN80LTfufQZ',
    price: '0.00001081',
    origQty: '1331.00000000',
    executedQty: '0.00000000',
    status: 'NEW',
    timeInForce: 'GTC',
    type: 'LIMIT',
    side: 'BUY',
    stopPrice: '0.00000000',
    icebergQty: '0.00000000',
    time: 1522682290485,
    isWorking: true,
  },
]
```

</details>

#### allOrders

Get all account orders on a symbol; active, canceled, or filled.

```js
console.log(
  await client.allOrders({
    symbol: 'ETHBTC',
  }),
)
```

| Param      | Type   | Required | Default | Description                                                                            |
| ---------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------- |
| symbol     | String | true     |
| orderId    | Number | false    |         | If set, it will get orders >= that orderId. Otherwise most recent orders are returned. |
| limit      | Number | false    | `500`   | Max `500`                                                                              |
| recvWindow | Number | false    |

<details>
<summary>Output</summary>

```js
;[
  {
    symbol: 'ENGETH',
    orderId: 191938,
    clientOrderId: '1XZTVBTGS4K1e',
    price: '0.00138000',
    origQty: '1.00000000',
    executedQty: '1.00000000',
    status: 'FILLED',
    timeInForce: 'GTC',
    type: 'LIMIT',
    side: 'SELL',
    stopPrice: '0.00000000',
    icebergQty: '0.00000000',
    time: 1508611114735,
    isWorking: true,
  },
]
```

</details>


#### allOrdersOCO

Retrieves all OCO based on provided optional parameters

```js
console.log(
  await client.allOrdersOCO({
    timestamp: 1565245913483,
  }),
)
```

| Param      | Type    | Required | Default | Description                                               |
|------------|---------|----------|---------|-----------------------------------------------------------|
| timestamp  | Number  | true     |         |                                                           |
| startTime  | Number  | false    |         |                                                           |
| endTime    | Number  | false    |         |                                                           |
| limit      | Integer | false    | `500`   | Max `1000`                                                |
| recvWindow | Number  | false    |         | The value cannot be greater than 60000                    |
| formId     | Number  | false    |         | If supplied, neither startTime or endTime can be provided |

<details>
<summary>Output</summary>

```js
;[
  {
    "orderListId": 29,
    "contingencyType": "OCO",
    "listStatusType": "EXEC_STARTED",
    "listOrderStatus": "EXECUTING",
    "listClientOrderId": "amEEAXryFzFwYF1FeRpUoZ",
    "transactionTime": 1565245913483,
    "symbol": "LTCBTC",
    "orders": [
      {
        "symbol": "LTCBTC",
        "orderId": 4,
        "clientOrderId": "oD7aesZqjEGlZrbtRpy5zB"
      },
      {
        "symbol": "LTCBTC",
        "orderId": 5,
        "clientOrderId": "Jr1h6xirOxgeJOUuYQS7V3"
      }
    ]
  },
  {
    "orderListId": 28,
    "contingencyType": "OCO",
    "listStatusType": "EXEC_STARTED",
    "listOrderStatus": "EXECUTING",
    "listClientOrderId": "hG7hFNxJV6cZy3Ze4AUT4d",
    "transactionTime": 1565245913407,
    "symbol": "LTCBTC",
    "orders": [
      {
        "symbol": "LTCBTC",
        "orderId": 2,
        "clientOrderId": "j6lFOfbmFMRjTYA7rRJ0LP"
      },
      {
        "symbol": "LTCBTC",
        "orderId": 3,
        "clientOrderId": "z0KCjOdditiLS5ekAFtK81"
      }
    ]
  }
]
```

</details>


#### accountInfo

Get current account information.

```js
console.log(await client.accountInfo())
```

| Param      | Type   | Required |
| ---------- | ------ | -------- |
| recvWindow | Number | false    |

<details>
<summary>Output</summary>

```js
{
  makerCommission: 10,
  takerCommission: 10,
  buyerCommission: 0,
  sellerCommission: 0,
  canTrade: true,
  canWithdraw: true,
  canDeposit: true,
  balances: [
    { asset: 'BTC', free: '0.00000000', locked: '0.00000000' },
    { asset: 'LTC', free: '0.00000000', locked: '0.00000000' },
  ]
}
```

</details>

#### myTrades

Get trades for the current authenticated account and symbol.

```js
console.log(
  await client.myTrades({
    symbol: 'ETHBTC',
  }),
)
```

| Param      | Type   | Required | Default | Description                                             |
| ---------- | ------ | -------- | ------- | ------------------------------------------------------- |
| symbol     | String | true     |
| limit      | Number | false    | `500`   | Max `500`                                               |
| fromId     | Number | false    |         | TradeId to fetch from. Default gets most recent trades. |
| recvWindow | Number | false    |

<details>
<summary>Output</summary>

```js
;[
  {
    id: 9960,
    orderId: 191939,
    price: '0.00138000',
    qty: '10.00000000',
    commission: '0.00001380',
    commissionAsset: 'ETH',
    time: 1508611114735,
    isBuyer: false,
    isMaker: false,
    isBestMatch: true,
  },
]
```

</details>

#### tradesHistory

Lookup symbol trades history.

```js
console.log(await client.tradesHistory({ symbol: 'ETHBTC' }))
```

| Param  | Type   | Required | Default | Description                                             |
| ------ | ------ | -------- | ------- | ------------------------------------------------------- |
| symbol | String | true     |
| limit  | Number | false    | `500`   | Max `500`                                               |
| fromId | Number | false    | `null`  | TradeId to fetch from. Default gets most recent trades. |

<details>
<summary>Output</summary>

```js
;[
  {
    id: 28457,
    price: '4.00000100',
    qty: '12.00000000',
    time: 1499865549590,
    isBuyerMaker: true,
    isBestMatch: true,
  },
]
```

</details>

#### depositHistory

Get the account deposit history.

```js
console.log(await client.depositHistory())
```

| Param      | Type   | Required | Description                |
| ---------- | ------ | -------- | -------------------------- |
| asset      | String | false    |
| status     | Number | false    | 0 (0: pending, 1: success) |
| startTime  | Number | false    |
| endTime    | Number | false    |
| recvWindow | Number | false    |

<details>
<summary>Output</summary>

```js
{
  "depositList": [
    {
      "insertTime": 1508198532000,
      "amount": 0.04670582,
      "asset": "ETH",
      "status": 1
    }
  ],
  "success": true
}
```

</details>

#### withdrawHistory

Get the account withdraw history.

```js
console.log(await client.withdrawHistory())
```

| Param      | Type   | Required | Description                                                                                                |
| ---------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| asset      | String | false    |
| status     | Number | false    | 0 (0: Email Sent, 1: Cancelled 2: Awaiting Approval, 3: Rejected, 4: Processing, 5: Failure, 6: Completed) |
| startTime  | Number | false    |
| endTime    | Number | false    |
| recvWindow | Number | false    |

<details>
<summary>Output</summary>

```js
{
  "withdrawList": [
    {
      "amount": 1,
      "address": "0x6915f16f8791d0a1cc2bf47c13a6b2a92000504b",
      "asset": "ETH",
      "applyTime": 1508198532000,
      "status": 4
    },
  ],
  "success": true
}
```

</details>

#### withdraw

Triggers the withdraw process (_untested for now_).

```js
console.log(
  await client.withdraw({
    asset: 'ETH',
    address: '0xfa97c22a03d8522988c709c24283c0918a59c795',
    amount: 100,
  }),
)
```

| Param      | Type   | Required | Description                |
| ---------- | ------ | -------- | -------------------------- |
| asset      | String | true     |
| address    | String | true     |
| amount     | Number | true     |
| name       | String | false    | Description of the address |
| recvWindow | Number | false    |

<details>
<summary>Output</summary>

```js
{
  "msg": "success",
  "success": true
}
```

</details>

#### depositAddress

Retrieve the account deposit address for a specific asset.

```js
console.log(await client.depositAddress({ asset: 'NEO' }))
```

| Param | Type   | Required | Description    |
| ----- | ------ | -------- | -------------- |
| asset | String | true     | The asset name |

<details>
<summary>Output</summary>

```js
{
  address: 'AM6ytPW78KYxQCmU2pHYGcee7GypZ7Yhhc',
  addressTag: '',
  asset: 'NEO',
  success: true,
}
```

</details>

#### tradeFee

Retrieve the account trade Fee per asset.

```js
console.log(await client.tradeFee())
```

<details>
<summary>Output</summary>

```js
{
  tradeFee: [{
    symbol: 'BTC',
    maker: 0.0001,
    taker: 0.0001,
  },
  {
    symbol: 'LTC',
    maker: 0.0001,
    taker: 0.0001,
  }
  ...],
  success: true,
}

```

</details>

#### capitalConfigs

Get information of coins (available for deposit and withdraw) for user.

```js
console.log(await client.capitalConfigs())
```

<details>
<summary>Output</summary>

```js
[
  {
    'coin': 'CTR',
    'depositAllEnable': false,
    'free': '0.00000000',
    'freeze': '0.00000000',
    'ipoable': '0.00000000',
    'ipoing': '0.00000000',
    'isLegalMoney': false,
    'locked': '0.00000000',
    'name': 'Centra',
    'networkList': [
      {
        'addressRegex': '^(0x)[0-9A-Fa-f]{40}$',
        'coin': 'CTR',
        'depositDesc': 'Delisted, Deposit Suspended',
        'depositEnable': false,
        'isDefault': true,
        'memoRegex': '',
        'minConfirm': 12,
        'name': 'ERC20',
        'network': 'ETH',
        'resetAddressStatus': false,
        'specialTips': '',
        'unLockConfirm': 0,
        'withdrawDesc': '',
        'withdrawEnable': true,
        'withdrawFee': '35.00000000',
        'withdrawIntegerMultiple': '0.00000001',
        'withdrawMax': '0.00000000',
        'withdrawMin': '70.00000000'
      }
    ],
    'storage': '0.00000000',
    'trading': false,
    'withdrawAllEnable': true,
    'withdrawing': '0.00000000'
  }
]
```

</details>

#### capitalDepositAddress

Fetch deposit address with network.

```js
console.log(await client.capitalDepositAddress({ coin: 'NEO' }))
```

| Param    | Type   | Required | Description      |
| -------- | ------ | -------- | ---------------- |
| coin     | String | true     | The coin name    |
| network  | String | false    | The network name |

<details>
<summary>Output</summary>

```js
{
  address: 'AM6ytPW78KYxQCmU2pHYGcee7GypZ7Yhhc',
  coin: 'NEO',
  tag: '',
  url: 'https://neoscan.io/address/AM6ytPW78KYxQCmU2pHYGcee7GypZ7Yhhc'
}
```

</details>

#### universalTransfer

You need to enable Permits Universal Transfer option for the api key which requests this endpoint.

```js
console.log(await client.universalTransfer({ type: 'MAIN_C2C', asset: 'USDT', amount: '1000' }))
```

| Param      | Type   | Required | Description      |
| ---------- | ------ | -------- | ---------------- |
| type       | String | true     |
| asset      | String | true     |
| amount     | String | true     |
| recvWindow | Number | true     |

<details>
<summary>Output</summary>

```js
{
  tranId:13526853623
}
```

</details>

#### universalTransferHistory

```js
console.log(await client.universalTransferHistory({ type: 'MAIN_C2C' }))
```

| Param      | Type   | Required | Description         |
| ---------- | ------ | -------- | ------------------- |
| type       | String | true     |
| startTime  | Number | false    |
| endTime    | Number | false    |
| current    | Number | false    | Default 1           |
| size       | Number | false    | Default 10, Max 100 |
| recvWindow | Number | true     |

<details>
<summary>Output</summary>

```js
{
  "total":2,
  "rows":[
    {
      "asset":"USDT",
      "amount":"1",
      "type":"MAIN_C2C"
      "status": "CONFIRMED",
      "tranId": 11415955596,
      "timestamp":1544433328000
    },
    {
      "asset":"USDT",
      "amount":"2",
      "type":"MAIN_C2C",
      "status": "CONFIRMED",
      "tranId": 11366865406,
      "timestamp":1544433328000
    }
  ]
}
```

</details>

### Margin

#### marginLoan

Create a loan for margin account.

```js
console.log(await client.marginLoan({ asset: 'BTC', amount:'0.0001' }));
```

| Param | Type   | Required | Description    |
| ----- | ------ | -------- | -------------- |
| asset | String | true     | The asset name |
| amount | Number | true     | 


<details>
<summary>Output</summary>

```js
{
    "tranId": 100000001 //transaction id
}
```

</details>

#### marginRepay

Repay loan for margin account.

```js
console.log(await client.marginRepay({ asset: 'BTC', amount:'0.0001' }));
```

| Param | Type   | Required | Description    |
| ----- | ------ | -------- | -------------- |
| asset | String | true     | The asset name |
| amount | Number | true     | 


<details>
<summary>Output</summary>

```js
{
    "tranId": 100000001 //transaction id
}
```

</details>

#### marginIsolatedAccount

Query Isolated Margin Account Info

```js
console.log(await client.marginIsolatedAccount({ symbols: 'BTCUSDT'}));
```

| Param | Type   | Required | Description    |
| ----- | ------ | -------- | -------------- |
| symbols | String | false     | Max 5 symbols can be sent; separated by "," |
| recvWindow | Number | false     | No more than 60000 |

<details>
<summary>Output</summary>

```js
{
   "assets":[
      {
        "baseAsset": 
        {
          "asset": "BTC",
          "borrowEnabled": true,
          "borrowed": "0.00000000",
          "free": "0.00000000",
          "interest": "0.00000000",
          "locked": "0.00000000",
          "netAsset": "0.00000000",
          "netAssetOfBtc": "0.00000000",
          "repayEnabled": true,
          "totalAsset": "0.00000000"
        },
        "quoteAsset": 
        {
          "asset": "USDT",
          "borrowEnabled": true,
          "borrowed": "0.00000000",
          "free": "0.00000000",
          "interest": "0.00000000",
          "locked": "0.00000000",
          "netAsset": "0.00000000",
          "netAssetOfBtc": "0.00000000",
          "repayEnabled": true,
          "totalAsset": "0.00000000"
        },
        "symbol": "BTCUSDT"
        "isolatedCreated": true, 
        "marginLevel": "0.00000000", 
        "marginLevelStatus": "EXCESSIVE", // "EXCESSIVE", "NORMAL", "MARGIN_CALL", "PRE_LIQUIDATION", "FORCE_LIQUIDATION"
        "marginRatio": "0.00000000",
        "indexPrice": "10000.00000000"
        "liquidatePrice": "1000.00000000",
        "liquidateRate": "1.00000000"
        "tradeEnabled": true
      }
    ],
    "totalAssetOfBtc": "0.00000000",
    "totalLiabilityOfBtc": "0.00000000",
    "totalNetAssetOfBtc": "0.00000000" 
}
```

</details>

#### marginMaxBorrow

If isolatedSymbol is not sent, crossed margin data will be sent.

```js
console.log(await client.marginMaxBorrow({ asset: 'BTC', isolatedSymbol: 'BTCUSDT'}));
```

| Param | Type   | Required | Description    |
| ----- | ------ | -------- | -------------- |
| asset | String | true     |
| isolatedSymbol| String | false | 
| recvWindow | Number | false     | No more than 60000 |

<details>
<summary>Output</summary>

```js
{
  "amount": "1.69248805", // account's currently max borrowable amount with sufficient system availability
  "borrowLimit": "60" // max borrowable amount limited by the account level
}
```

</details>

#### marginCreateIsolated

```js
console.log(await client.marginCreateIsolated({ base: 'BTC', quote: 'USDT'}));
```

| Param      | Type   | Required | Description           |
| ---------- | ------ | -------- | --------------------- |
| base       | String | true     | Base asset of symbol  |
| quote      | String | true     | Quote asset of symbol |
| recvWindow | Number | false    | No more than 60000    |

<details>
<summary>Output</summary>

```js
{
    "success": true,
    "symbol": "BTCUSDT"
}
```
</details>

#### marginIsolatedTransfer

```js
console.log(await client.marginIsolatedTransfer({ asset: 'USDT', symbol: 'BNBUSDT', transFrom: 'ISOLATED_MARGIN', transTo: 'SPOT', amount: 1}));
```

| Param      | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| asset      | String | true     | asset,such as BTC         |
| symbol     | String | true     |
| transFrom  | String | true     | "SPOT", "ISOLATED_MARGIN" |
| transTo    | String | true     | "SPOT", "ISOLATED_MARGIN" |
| amount     | Number | true     |
| recvWindow | Number | false    | No more than 60000        |

<details>
<summary>Output</summary>
    
```js
{
    //transaction id
    "tranId": 100000001
}
```

</details>

#### marginIsolatedTransferHistory

```js
console.log(await client.marginIsolatedTransferHistory({ symbol: 'BNBUSDT'}));
```

| Param      | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| asset      | String | false    | asset,such as BTC         |
| symbol     | String | true     |
| transFrom  | String | false    | "SPOT", "ISOLATED_MARGIN" |
| transTo    | String | false    | "SPOT", "ISOLATED_MARGIN" |
| startTime  | Number | false    |
| endTime    | Number | false    |
| current    | Number | false    | Current page, default 1   |
| size       | Number | false    | Default 10, max 100       |
| recvWindow | Number | false    | No more than 60000        |

<details>
<summary>Output</summary>
    
```js
{
  "rows": [
    {
      "amount": "0.10000000",
      "asset": "BNB",
      "status": "CONFIRMED",
      "timestamp": 1566898617000,
      "txId": 5240372201,
      "transFrom": "SPOT",
      "transTo": "ISOLATED_MARGIN"
    },
    {
      "amount": "5.00000000",
      "asset": "USDT",
      "status": "CONFIRMED",
      "timestamp": 1566888436123,
      "txId": 5239810406,
      "transFrom": "ISOLATED_MARGIN",
      "transTo": "SPOT"
    }
  ],
  "total": 2
}
```

</details>

### Futures Authenticated REST endpoints

#### futuresGetOrder

Check an order's status.

- These orders will not be found
  - order status is CANCELED or EXPIRED, <b>AND</b>
  - order has NO filled trade, <b>AND</b>
  - created time + 7 days < current time
  

| Name              | Type   | Mandatory | Description      |
| ----------------- | ------ | --------  | ---------------- |
| symbol            | STRING | YES       | The pair name    |
| orderId           | LONG   | NO        |                  |
| origClientOrderId | STRING | NO        |                  |
| recvWindow        | LONG   | NO        |                  |


Either <b>orderId</b> or <b>origClientOrderId</b> must be sent.

```js
console.log(
  await client.futuresGetOrder({
    symbol: 'BNBETH',
    orderId: 50167927,
  })
)
```

<details>
<summary>Output</summary>

```js
{
    "avgPrice": "0.00000",
    "clientOrderId": "abc",
    "cumQuote": "0",
    "executedQty": "0",
    "orderId": 1917641,
    "origQty": "0.40",
    "origType": "TRAILING_STOP_MARKET",
    "price": "0",
    "reduceOnly": false,
    "side": "BUY",
    "positionSide": "SHORT",
    "status": "NEW",
    "stopPrice": "9300",                // please ignore when order type is TRAILING_STOP_MARKET
    "closePosition": false,             // if Close-All
    "symbol": "BTCUSDT",
    "time": 1579276756075,              // order time
    "timeInForce": "GTC",
    "type": "TRAILING_STOP_MARKET",
    "activatePrice": "9020",            // activation price, only return with TRAILING_STOP_MARKET order
    "priceRate": "0.3",                 // callback rate, only return with TRAILING_STOP_MARKET order
    "updateTime": 1579276756075,        // update time
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false               // if conditional order trigger is protected   
}
```
</details>

#### futuresAllOrders

Get all account orders; active, canceled, or filled.

- These orders will not be found
  - order status is CANCELED or EXPIRED, <b>AND</b>
  - order has NO filled trade, <b>AND</b>
  - created time + 7 days < current time
  
| Name              | Type   | Mandatory | Description            |
| ----------------- | ------ | --------  | ---------------------- |
| symbol            | STRING | YES       | The pair name          |
| orderId           | LONG   | NO        |                        |
| startTime         | LONG   | NO        |                        |
| endTime           | LONG   | NO        |                        |
| limit             | INT    | NO        | Default 500; max 1000. |
| recvWindow        | LONG   | NO        |                        |

If <b>orderId</b> is set, it will get orders >= that <b>orderId</b>. Otherwise most recent orders are returned.

```js
console.log(
  await client.futuresAllOrders({
    symbol: 'BNBETH',
    orderId: 50167927,
    startTime: 1579276756075,
    limit: 700,
  })
)
```

<details>
<summary>Output</summary>

```js
[
  {
    "avgPrice": "0.00000",
    "clientOrderId": "abc",
    "cumQuote": "0",
    "executedQty": "0",
    "orderId": 1917641,
    "origQty": "0.40",
    "origType": "TRAILING_STOP_MARKET",
    "price": "0",
    "reduceOnly": false,
    "side": "BUY",
    "positionSide": "SHORT",
    "status": "NEW",
    "stopPrice": "9300",                // please ignore when order type is TRAILING_STOP_MARKET
    "closePosition": false,             // if Close-All
    "symbol": "BTCUSDT",
    "time": 1579276756075,              // order time
    "timeInForce": "GTC",
    "type": "TRAILING_STOP_MARKET",
    "activatePrice": "9020",            // activation price, only return with TRAILING_STOP_MARKET order
    "priceRate": "0.3",                 // callback rate, only return with TRAILING_STOP_MARKET order
    "updateTime": 1579276756075,        // update time
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false               // if conditional order trigger is protected   
  }
]
```
</details>


#### futuresLeverage

Change user's initial leverage of specific symbol market.


| Name              | Type   | Mandatory | Description                                |
| ----------------- | ------ | --------  | ------------------------------------------ |
| symbol            | STRING | YES       | The pair name                              |
| leverage          | INT    | YES       | target initial leverage: int from 1 to 125 |
| recvWindow        | LONG   | NO        |                                            |

```js
console.log(
  await client.futuresLeverage({
    symbol: 'BTCUSDT',
    leverage: 21,
  })
)
```

<details>
<summary>Output</summary>

```js
{
    "leverage": 21,
    "maxNotionalValue": "1000000",
    "symbol": "BTCUSDT"
}
```
</details>

#### futuresMarginType

Change margin type.

| Name              | Type   | Mandatory | Description       |
| ----------------- | ------ | --------  | ----------------- |
| symbol            | STRING | YES       | The pair name     |
| marginType        | ENUM   | YES       | ISOLATED, CROSSED |
| recvWindow        | LONG   | NO        |                   |

```js
console.log(
  await client.futuresMarginType({
    symbol: 'BTCUSDT',
    marginType: 'ISOLATED',
  })
)
```

<details>
<summary>Output</summary>

```js
{
    "code": 200,
    "msg": "success"
}
```
</details>

#### futuresPositionMargin

Modify isolated position margin.

| Name              | Type    | Mandatory | Description                                       |
| ----------------- | ------- | --------  | ------------------------------------------------- |
| symbol            | STRING  | YES       | The pair name                                     |
| positionSide      | ENUM    | NO        | Default BOTH for One-way Mode; <br>LONG or SHORT for Hedge Mode. <br>It must be sent with Hedge Mode. |
| amount            | DECIMAL | YES       |                                                   |
| type              | INT     | YES       | 1: Add position margin，2: Reduce position margin |
| recvWindow        | LONG    | NO        |                                                   |

Only for isolated symbol.

```js
console.log(
  await client.futuresPositionMargin({
    symbol: 'BTCUSDT',
    amount: 100,
    type: 1,
  })
)
```

<details>
<summary>Output</summary>

```js
{
    "amount": 100.0,
    "code": 200,
    "msg": "Successfully modify position margin.",
    "type": 1
}
```
</details>

#### futuresMarginHistory

Get position margin change history.

| Name              | Type   | Mandatory | Description                                       |
| ----------------- | ------ | --------  | ------------------------------------------------- |
| symbol            | STRING | YES       | The pair name                                     |
| type              | INT    | NO        | 1: Add position margin，2: Reduce position margin |
| startTime         | LONG   | NO        |                                                   |
| endTime           | LONG   | NO        |                                                   |
| limit             | INT    | NO        | Default 500;                                      |
| recvWindow        | LONG   | NO        |                                                   |

```js
console.log(
  await client.futuresMarginHistory({
    symbol: 'BTCUSDT',
    type: 1,
    startTime: 1579276756075,
    limit: 700,
  })
)
```

<details>
<summary>Output</summary>

```js
[
    {
        "amount": "23.36332311",
        "asset": "USDT",
        "symbol": "BTCUSDT",
        "time": 1578047897183,
        "type": 1,
        "positionSide": "BOTH"
    },
    {
        "amount": "100",
        "asset": "USDT",
        "symbol": "BTCUSDT",
        "time": 1578047900425,
        "type": 1,
        "positionSide": "LONG"
    }
]
```
</details>

#### futuresIncome

Get income history.

| Name              | Type   | Mandatory | Description                                       |
| ----------------- | ------ | --------  | ------------------------------------------------- |
| symbol            | STRING | NO        | The pair name                                     |
| incomeType        | STRING | NO        | "TRANSFER"，"WELCOME_BONUS", "REALIZED_PNL"，<br>"FUNDING_FEE", "COMMISSION", and "INSURANCE_CLEAR" |
| startTime         | LONG   | NO        | Timestamp in ms to get funding from INCLUSIVE.    |
| endTime           | LONG   | NO        | Timestamp in ms to get funding until INCLUSIVE.   |
| limit             | INT    | NO        | Default 100; max 1000                             |
| recvWindow        | LONG   | NO        |                                                   |

- If incomeType is not sent, all kinds of flow will be returned
- "trandId" is unique in the same incomeType for a user

```js
console.log(
  await client.futuresIncome({
    symbol: 'BTCUSDT',
    startTime: 1579276756075,
    limit: 700,
  })
)
```

<details>
<summary>Output</summary>

```js
[
    {
        "symbol": "",                   // trade symbol, if existing
        "incomeType": "TRANSFER",       // income type
        "income": "-0.37500000",        // income amount
        "asset": "USDT",                // income asset
        "info":"TRANSFER",              // extra information
        "time": 1570608000000,      
        "tranId":"9689322392",          // transaction id
        "tradeId":""                    // trade id, if existing
    },
    {
        "symbol": "BTCUSDT",
        "incomeType": "COMMISSION", 
        "income": "-0.01000000",
        "asset": "USDT",
        "info":"COMMISSION",
        "time": 1570636800000,
        "tranId":"9689322392",
        "tradeId":"2059192"
    }
]
```
</details>

#### futuresAccountBalance

Get futures account balance

```js
console.log(await client.futuresAccountBalance());
```

<details>
<summary>Output</summary>

```js
[
  {
    "accountAlias": "SgsR",    // unique account code
    "asset": "USDT",    // asset name
    "balance": "122607.35137903", // wallet balance
    "crossWalletBalance": "23.72469206", // crossed wallet balance
    "crossUnPnl": "0.00000000"  // unrealized profit of crossed positions
    "availableBalance": "23.72469206",       // available balance
    "maxWithdrawAmount": "23.72469206"     // maximum amount for transfer out
  }
]
```

</details>

#### futuresUserTrades

Get trades for a specific account and symbol.

```js
console.log(
  await client.futuresUserTrades({
    symbol: 'ETHBTC',
  }),
)
```

| Param      | Type   | Mandatory | Description                                              |
| ---------- | ------ | --------- | -------------------------------------------------------- |
| symbol     | STRING | YES       |                                                          |
| startTime  | LONG   | NO        |                                                          |
| endTime    | LONG   | NO        |                                                          |
| limit      | INT    | NO        | Default 500; max 1000.                                   |
| fromId     | LONG   | NO        | Trade id to fetch from. Default gets most recent trades. |
| recvWindow | LONG   | NO        |                                                          |

<details>
<summary>Output</summary>

```js
[
  {
    "buyer": false,
    "commission": "-0.07819010",
    "commissionAsset": "USDT",
    "id": 698759,
    "maker": false,
    "orderId": 25851813,
    "price": "7819.01",
    "qty": "0.002",
    "quoteQty": "15.63802",
    "realizedPnl": "-0.91539999",
    "side": "SELL",
    "positionSide": "SHORT",
    "symbol": "BTCUSDT",
    "time": 1569514978020
  }
]
```

</details>

### WebSockets

Every websocket utility returns a function you can call to close the opened
connection and avoid memory issues.

```js
const clean = client.ws.depth('ETHBTC', depth => {
  console.log(depth)
})

// After you're done
clean()
```

#### depth

Live depth market data feed. The first parameter can either
be a single symbol string or an array of symbols.

```js
client.ws.depth('ETHBTC', depth => {
  console.log(depth)
})
```

<details>
<summary>Output</summary>

```js
{
  eventType: 'depthUpdate',
  eventTime: 1508612956950,
  symbol: 'ETHBTC',
  firstUpdateId: 18331140,
  finalUpdateId: 18331145,
  bidDepth: [
    { price: '0.04896500', quantity: '0.00000000' },
    { price: '0.04891100', quantity: '15.00000000' },
    { price: '0.04891000', quantity: '0.00000000' } ],
  askDepth: [
    { price: '0.04910600', quantity: '0.00000000' },
    { price: '0.04910700', quantity: '11.24900000' }
  ]
}
```

</details>

#### partialDepth

Top levels bids and asks, pushed every second. Valid levels are 5, 10, or 20.
Accepts an array of objects for multiple depths.

```js
client.ws.partialDepth({ symbol: 'ETHBTC', level: 10 }, depth => {
  console.log(depth)
})
```

<details>
<summary>Output</summary>

```js
{
  symbol: 'ETHBTC',
  level: 10,
  bids: [
    { price: '0.04896500', quantity: '0.00000000' },
    { price: '0.04891100', quantity: '15.00000000' },
    { price: '0.04891000', quantity: '0.00000000' }
  ],
  asks: [
    { price: '0.04910600', quantity: '0.00000000' },
    { price: '0.04910700', quantity: '11.24900000' }
  ]
}
```

</details>

#### ticker

24hr Ticker statistics for a symbol pushed every second. Accepts an array of symbols.

```js
client.ws.ticker('HSRETH', ticker => {
  console.log(ticker)
})
```

<details>
<summary>Output</summary>

```js
{
  eventType: '24hrTicker',
  eventTime: 1514670820924,
  symbol: 'HSRETH',
  priceChange: '-0.00409700',
  priceChangePercent: '-11.307',
  weightedAvg: '0.03394946',
  prevDayClose: '0.03623500',
  curDayClose: '0.03213800',
  closeTradeQuantity: '7.02000000',
  bestBid: '0.03204200',
  bestBidQnt: '78.00000000',
  bestAsk: '0.03239800',
  bestAskQnt: '7.00000000',
  open: '0.03623500',
  high: '0.03659900',
  low: '0.03126000',
  volume: '100605.15000000',
  volumeQuote: '3415.49097353',
  openTime: 1514584420922,
  closeTime: 1514670820922,
  firstTradeId: 344803,
  lastTradeId: 351380,
  totalTrades: 6578
}
```

</details>

#### allTickers

Retrieves all the tickers.

```js
client.ws.allTickers(tickers => {
  console.log(tickers)
})
```

#### candles

Live candle data feed for a given interval. You can pass either a symbol string
or a symbol array.

```js
client.ws.candles('ETHBTC', '1m', candle => {
  console.log(candle)
})
```

<details>
<summary>Output</summary>

```js
{
  eventType: 'kline',
  eventTime: 1508613366276,
  symbol: 'ETHBTC',
  open: '0.04898000',
  high: '0.04902700',
  low: '0.04898000',
  close: '0.04901900',
  volume: '37.89600000',
  trades: 30,
  interval: '5m',
  isFinal: false,
  quoteVolume: '1.85728874',
  buyVolume: '21.79900000',
  quoteBuyVolume: '1.06838790'
}
```

</details>

#### trades

Live trade data feed. Pass either a single symbol string or an array of symbols. The trade streams push raw trade information; each trade has a unique buyer and seller.

```js
client.ws.trades(['ETHBTC', 'BNBBTC'], trade => {
  console.log(trade)
})
```

<details>
<summary>Output</summary>

```js
{
  eventType: 'trade',
  eventTime: 1508614495052,
  tradeTime: 1508614495050,
  symbol: 'ETHBTC',
  price: '0.04923600',
  quantity: '3.43500000',
  isBuyerMaker: true,
  maker: true,
  tradeId: 2148226,
  buyerOrderId: 390876,
  sellerOrderId: 390752
}
```

</details>

#### aggTrades

Live trade data feed. Pass either a single symbol string or an array of symbols. The aggregate trade streams push trade information that is aggregated for a single taker order.

```js
client.ws.aggTrades(['ETHBTC', 'BNBBTC'], trade => {
  console.log(trade)
})
```

<details>
<summary>Output</summary>

```js
{
  eventType: 'aggTrade',
  eventTime: 1508614495052,
  aggId: 2148226,
  price: '0.04923600',
  quantity: '3.43500000',
  firstId: 37856,
  lastId: 37904,
  timestamp: 1508614495050,
  symbol: 'ETHBTC',
  isBuyerMaker: false,
  wasBestPrice: true
}
```

</details>

#### user

Live user messages data feed.

**Requires authentication**

```js
const clean = await client.ws.user(msg => {
  console.log(msg)
})
```

There is also equivalent function to query the margin wallet:

```js
client.ws.marginUser()
```

Note that this method return a promise which will resolve the `clean` callback.

<details>
<summary>Output</summary>

```js
{
  eventType: 'account',
  eventTime: 1508614885818,
  balances: {
    '123': { available: '0.00000000', locked: '0.00000000' },
    '456': { available: '0.00000000', locked: '0.00000000' },
    BTC: { available: '0.00000000', locked: '0.00000000' },
  }
}
```

</details>

### Futures WebSockets

Every websocket utility returns a function you can call to close the opened
connection and avoid memory issues.

```js
const clean = client.ws.futuresDepth('ETHBTC', depth => {
  console.log(depth)
})

// After you're done
clean()
```

Each websocket utility supports the ability to get a clean callback without data transformation, for this, pass the third attribute FALSE.

```js
const clean = client.ws.futuresDepth('ETHBTC', depth => {
  console.log(depth)
}, false)
```

<details>
<summary>Output</summary>

```js
{
  "e": "depthUpdate", // Event type
  "E": 123456789,     // Event time
  "T": 123456788,     // transaction time 
  "s": "BTCUSDT",      // Symbol
  "U": 157,           // First update ID in event
  "u": 160,           // Final update ID in event
  "pu": 149,          // Final update Id in last stream(ie `u` in last stream)
  "b": [              // Bids to be updated
    [
      "0.0024",       // Price level to be updated
      "10"            // Quantity
    ]
  ],
  "a": [              // Asks to be updated
    [
      "0.0026",       // Price level to be updated
      "100"          // Quantity
    ]
  ]
}
```
</details>

#### futuresDepth

Live futuresDepth market data feed. The first parameter can either
be a single symbol string or an array of symbols.

```js
client.ws.futuresDepth('ETHBTC', depth => {
  console.log(depth)
})
```

<details>
<summary>Output</summary>

```js
{
  eventType: 'depthUpdate',
  eventTime: 1508612956950,
  symbol: 'ETHBTC',
  firstUpdateId: 18331140,
  finalUpdateId: 18331145,
  bidDepth: [
    { price: '0.04896500', quantity: '0.00000000' },
    { price: '0.04891100', quantity: '15.00000000' },
    { price: '0.04891000', quantity: '0.00000000' } ],
  askDepth: [
    { price: '0.04910600', quantity: '0.00000000' },
    { price: '0.04910700', quantity: '11.24900000' }
  ]
}
```
</details>

#### futuresPartialDepth

Top levels bids and asks, pushed every second. Valid levels are 5, 10, or 20.
Accepts an array of objects for multiple depths.

```js
client.ws.futuresPartialDepth({ symbol: 'ETHBTC', level: 10 }, depth => {
  console.log(depth)
})
```

<details>
<summary>Output</summary>

```js
{

  eventType: 'depthUpdate',
  eventTime: 1508612956950,
  symbol: 'ETHBTC',
  level: 10,
  firstUpdateId: 18331140,
  finalUpdateId: 18331145,
  bidDepth: [
    { price: '0.04896500', quantity: '0.00000000' },
    { price: '0.04891100', quantity: '15.00000000' },
    { price: '0.04891000', quantity: '0.00000000' } ],
  askDepth: [
    { price: '0.04910600', quantity: '0.00000000' },
    { price: '0.04910700', quantity: '11.24900000' }
  ]
}
```
</details>

#### futuresTicker

24hr Ticker statistics for a symbol pushed every 500ms. Accepts an array of symbols.

```js
client.ws.futuresTicker('HSRETH', ticker => {
  console.log(ticker)
})
```

<details>
<summary>Output</summary>

```js
{
  eventType: '24hrTicker',
  eventTime: 123456789,
  symbol: 'BTCUSDT',
  priceChange: '0.0015',
  priceChangePercent: '250.00',
  weightedAvg: '0.0018',
  curDayClose: '0.0025',
  closeTradeQuantity: '10',
  open: '0.0010',
  high: '0.0025',
  low: '0.0010',
  volume: '10000',
  volumeQuote: '18',
  openTime: 0,
  closeTime: 86400000,
  firstTradeId: 0,
  lastTradeId: 18150,
  totalTrades: 18151,
}
```
</details>

#### futuresAllTickers

Retrieves all the tickers.

```js
client.ws.futuresAllTickers(tickers => {
  console.log(tickers)
})
```

#### futuresCandles

Live candle data feed for a given interval. You can pass either a symbol string
or a symbol array.

```js
client.ws.futuresCandles('ETHBTC', '1m', candle => {
  console.log(candle)
})
```

<details>
<summary>Output</summary>

```js
{
  eventType: 'kline',
  eventTime: 1508613366276,
  symbol: 'ETHBTC',
  open: '0.04898000',
  high: '0.04902700',
  low: '0.04898000',
  close: '0.04901900',
  volume: '37.89600000',
  trades: 30,
  interval: '5m',
  isFinal: false,
  quoteVolume: '1.85728874',
  buyVolume: '21.79900000',
  quoteBuyVolume: '1.06838790'
}
```
</details>

#### futuresAggTrades

Live trade data feed. Pass either a single symbol string or an array of symbols. The Aggregate Trade Streams push trade information that is aggregated for a single taker order every 100 milliseconds.

```js
client.ws.futuresAggTrades(['ETHBTC', 'BNBBTC'], trade => {
  console.log(trade)
})
```

<details>
<summary>Output</summary>

```js
{
  eventType: 'aggTrade',
  eventTime: 1508614495052,
  aggId: 2148226,
  price: '0.04923600',
  quantity: '3.43500000',
  firstId: 37856,
  lastId: 37904,
  timestamp: 1508614495050,
  symbol: 'ETHBTC',
  isBuyerMaker: false,
}
```
</details>

#### futuresUser

Live user messages data feed.

**Requires authentication**

```js
const futuresUser = await client.ws.futuresUser(msg => {
  console.log(msg)
})
```

<details>
<summary>Output</summary>

```js
{
  eventTime: 1564745798939,
  transactionTime: 1564745798938,
  eventType: 'ACCOUNT_UPDATE',
  eventReasonType: 'ORDER',
  balances: [
    {
      asset:'USDT',
      walletBalance:'122624.12345678',
      crossWalletBalance:'100.12345678'
    },
    {
      asset:'BNB',           
      walletBalance:'1.00000000',
      crossWalletBalance:'0.00000000'         
    }
  ],
  positions: [
    {
      symbol:'BTCUSDT',
      positionAmount:'0',
      entryPrice:'0.00000',
      accumulatedRealized:'200',
      unrealizedPnL:'0',
      marginType:'isolated',
      isolatedWallet:'0.00000000',
      positionSide:'BOTH'
    },
    {
      symbol:'BTCUSDT',
      positionAmount:'20',
      entryPrice:'6563.66500',
      accumulatedRealized:'0',
      unrealizedPnL:'2850.21200',
      marginType:'isolated',
      isolatedWallet:'13200.70726908',
      positionSide:'LONG'
    }
  ],
}
```
</details>

#### Common

#### getInfo

To get information about limits from response headers call getInfo()

```js
const binanceInfo = client.getInfo()
```

<details>
<summary>Output</summary>

```js
{
  futures: {
     futuresLatency: "2ms",
     orderCount1m: "10",
     usedWeigh1m: "1",
  },
  spot: {
     orderCount1d: "347",
     orderCount10s: "1",
     usedWeigh1m: "15",
  }
}
```
</details>

### ErrorCodes

An utility error code map is also being exported by the package in order for you to make readable
conditionals upon specific errors that could occur while using the API.

```js
import Binance, { ErrorCodes } from 'binance-api-node'

console.log(ErrorCodes.INVALID_ORDER_TYPE) // -1116
```
