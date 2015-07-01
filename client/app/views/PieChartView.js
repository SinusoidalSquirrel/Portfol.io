var PieChartView = Backbone.View.extend({
 className: 'pie col-xs-12 col-md-8',
    initialize: function() {
      this.collection.on('sync edited remove reset', this.render, this);
      // this.render();
      var context = this;
      // $(window).on("resize", function() {
      //   context.render.apply(context);
      // });
    },


    pieChart: function(stock){
            var chart = AmCharts.makeChart( "chartdiv", {
              "type": "pie",
              "theme": "light",
              "dataProvider": [{"Stock": "AAPL", "Amount":2000}, {"Stock": "TSLA", "Amount":20}, {"Stock": "IBM", "Amount":432.50}, {"Stock": "LMD", "Amount":394}],
              "valueField": "Amount",
              "titleField": "Stock",
              "export": {
                "enabled": true
              },
              "groupPercent": 5
            });
    },


      render: function() {
        console.log(this.collection)
        this.$el.hide();
        this.$el.empty();
        if (this.collection.length > 0) {  
          this.$el.show();
          this.pieChart(this.collection, this);
          return this.$el;
        }
      }

})