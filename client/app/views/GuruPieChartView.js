var GuruPieChartView = Backbone.View.extend({
  tagName: 'div',

  initialize: function(){

  },

  render: function(){
      return this.$el.html('helooooo')
  },

  pieChart: function(Stocks){
     var newData = Stocks.models
     var data = [];
     for(var i = 0; i < newData.length; i++){
      data.push({"Symbol": newData[i].attributes.symbol, "Amount": newData[i].attributes.amount});
     }
     // var data = [{"Symbol": "AAPL", "Amount":2000}, {"Symbol": "TSLA", "Amount":20}, {"Symbol": "IBM", "Amount":432.50}, {"Symbol": "LMD", "Amount":394}]
     // data.push({"Symbol": newData.symbol, "Amount": newData.amount})
      console.log(data);
          var chart = AmCharts.makeChart( "chartdiv", {
            "type": "pie",
            "theme": "light",
            "dataProvider": data,
            "valueField": "Amount",
            "titleField": "Symbol",
            "export": {
              "enabled": true
            },
            // "groupPercent": 5
          });
          console.log(Stocks)

  }

});
