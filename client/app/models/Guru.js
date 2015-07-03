var Guru = Backbone.Model.extend({

  initialize: function(param){
    this.getGuruPortfolio(this.get('id'));
  },

  // Get Guru Portfolio(s), and then get respective stocks in the portfolio
  getGuruPortfolio: function(id){
    // context = this;
    $.ajax({
      context: this,
      url: '/guruportfolios',
      type: "POST",
      data: {id: id },
      success: function(data){
        for (var i = 0; i< data.length; i++){
          this.get('portfolio').push(data[i].id);
          this.set('nothing', null);
          this.getStocks(data[i].id);
        }
      }
    })
  },

  getStocks: function(portfolio_id){
    console.log("IN GET STOCKKKK", portfolio_id)
    $.ajax({
      context: this,
      url: '/gurustocks',
      type: "POST",
      data: {id: portfolio_id },
      success: function(data){
        console.log("portfolio_id RETURNED DATA", data)
        var stocks = []
        for (var i = 0; i < data.length; i++){
          var storage = {};
          storage.symbol = data[i].symbol;
          storage.shares = data[i].shares;
          storage.id = data[i].id;
          stocks.push(storage);
        }
        this.set('stocks', JSON.stringify(stocks));
      }
    })
  },

});
