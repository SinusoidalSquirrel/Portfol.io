//include yahooFinance npm module
var yahooFinance = require('yahoo-finance');


module.exports = {
  getStocks: function(req,res) {
    // use npm yahooFinance library function to instantiate stock request
    yahooFinance.historical({
      symbol: req.body.symbol,
      from: req.body.from, //FORMAT: 'YYYY-MM-DD',
      //to: req.body.to,     //FORMAT: 'YYYY-MM-DD', Currently unnecessary because we always retrieve to the latest date
      period: 'd'          // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
    }, function (err, quotes) {
      if(err) return console.log(err);
      res.json(quotes);
    });
  },

  getJStocks: function(req,res) {
    // use npm yahooFinance library function to instantiate stock request
    yahooFinance.historical({
      symbol: req.body.symbol,
      from: req.body.from, //FORMAT: 'YYYY-MM-DD',
      to: req.body.to,     //FORMAT: 'YYYY-MM-DD', Currently unnecessary because we always retrieve to the latest date
      period: req.body.period,         // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
    }, function (err, quotes) {
      if(err) return console.log(err);
      res.json(quotes);
    });
  }
}

// module.exports = ;