var CompareView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template('<td>(<%= id %>)</td><td><%= name %></td><td>!!! <%= portfolio %> !!!</td>'),

  initialize: function(){
    // this.model.on('change',this.render, this)

  },

  render: function(){
    var viewpage = '';
    for (var i = 0; i < this.model.attributes.stocks.length; i++){
      viewpage += '<tr><td>'+ this.model.attributes.stocks[i].symbol + '</td><td>'+ this.model.attributes.stocks[i].shares  +'</td></tr>';
    }
    viewpage += '<div class="pie col-xs-12 col-md-8 gurucharts"></div>';
    var chart = this.pieChart(this.model.attributes.stocks, this);
    return this.$el.html(this.template(this.model.attributes)).append(viewpage);
  },

  pieChart: function(Stocks){
     var newData = Stocks;
     var data = [];
     for(var i = 0; i < newData.length; i++){
      data.push({"Symbol": newData[i].symbol, "Shares": newData[i].shares});
     }

    console.log('DAAATA', data);
    var chart = AmCharts.makeChart( "chartdiv", {
      "type": "pie",
      "theme": "light",
      "dataProvider": data,
      "valueField": "Share",
      "titleField": "Symbol",
      "export": {
        "enabled": true
      },
    });
  }

});
