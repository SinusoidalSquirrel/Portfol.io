var PieChartView = Backbone.View.extend({
 className: 'pie col-xs-12 col-md-6',
    initialize: function() {
      this.collection.on('sync edited remove reset', this.render, this);
      // this.render();
      var context = this;
      // $(window).on("resize", function() {
      //   context.render.apply(context);
      // });
    },


    pieChart: function(Stocks){
       var newData = Stocks.models
       var data = [];
       for(var i = 0; i < newData.length; i++){
        data.push({"Symbol": newData[i].attributes.symbol, "Amount": newData[i].attributes.total});
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
    },


      render: function() {
        console.log("Pie rendered");
        console.log(this.collection);
        this.$el.hide();
        this.$el.empty();
        if (this.collection.length > 0) {
          this.$el.show();
          this.pieChart(this.collection, this);
          return this.$el;
        }
      }

})
