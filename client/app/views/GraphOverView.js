var GraphOverView = Backbone.View.extend({

    // url: '/api/stocks'

    className: 'graphoverview',

    divText:'\
    <input id="visualtxtSymbolLookup" type="text" placeholder="Type To Search Stocks" value="" />\
    <input id="stock" type=submit>\
    <div id="graphdiv"></div>',

    initialize: function(){
      this.render();
    },

     events:{
    'click #stock': 'apiCall',
    'focus #visualtxtSymbolLookup': 'search'
    },
    // render: function(){
    //   this.graph();
    //   // return this.$el.html(this.graph());
    // },

    search: function(){
      $(document).ready(function(){
       $( "#visualtxtSymbolLookup" ).autocomplete({
            source: function( request, response ) {
              $.ajax({
                  type: "GET",
                  dataType: "jsonp",
                  jsonp: "callback",
                  jsonpCallback: "YAHOO.Finance.SymbolSuggest.ssCallback",
                  data: {
                      query: request.term
                  },
                  cache: true,
                  url: "http://d.yimg.com/autoc.finance.yahoo.com/autoc"
              }); // .ajax
              var YAHOO = window.YAHOO = {Finance: {SymbolSuggest: {}}};
              YAHOO.Finance.SymbolSuggest.ssCallback = function (data) {
                var mapped = $.map(data.ResultSet.Result, function (e, i) {
                      return {
                          label: e.symbol + ' (' + e.name + ')',
                          value: e.symbol
                      };
                  });
                  response(mapped);
              };     
            },
            minLength: 2 
          })
      })
    },


    apiCall: function(){
      $.ajax({
        url: '/api/jstocks',
        type: 'POST',
        data: {symbol: document.getElementById('visualtxtSymbolLookup').value, from:'2005-01-01', to: new Date(), period: 'd'},
        success: this.graph
    })
    },


    graph: function(data){
    console.log(data.length)
    var chartData1 = [];
// data[0].date
         function generateChartData() {
           var firstDate = new Date();
           firstDate.setDate( firstDate.getDate() - data.length );
           firstDate.setHours( 0, 0, 0, 0 );

           for ( var i = 0; i < data.length; i++ ) {
             var newDate = new Date( firstDate );
             newDate.setDate( newDate.getDate() + i );

            var a1 = data[i].adjClose;
            var b1 = data[i].volume;

            chartData1.push( {
              date: newDate,
              value: a1,
              volume: b1
            } );
          }
        }
        generateChartData();

        var chart = AmCharts.makeChart( "graphdiv", {
          type: "stock",
          "theme": "light",  

          dataSets: [ {
              title: data[0].symbol,
              fieldMappings: [ {
                fromField: "value",
                toField: "value"
              }, {
                fromField: "volume",
                toField: "volume"
              } ],
              dataProvider: chartData1,
              categoryField: "date"
            },
          ],

          panels: [ {

              showCategoryAxis: false,
              title: "Value",
              percentHeight: 70,

              stockGraphs: [ {
                id: "g1",

                valueField: "value",
                comparable: true,
                compareField: "value",
                balloonText: "[[title]]:<b>[[value]]</b>",
                compareGraphBalloonText: "[[title]]:<b>[[value]]</b>"
              } ],

              stockLegend: {
                periodValueTextComparing: "[[percents.value.close]]%",
                periodValueTextRegular: "[[value.close]]"
              }
            },

            {
              title: "Volume",
              percentHeight: 30,
              stockGraphs: [ {
                valueField: "volume",
                type: "column",
                showBalloon: false,
                fillAlphas: 1
              } ],


              stockLegend: {
                periodValueTextRegular: "[[value.close]]"
              }
            }
          ],

          chartScrollbarSettings: {
            graph: "g1"
          },

          chartCursorSettings: {
            valueBalloonsEnabled: true,
            fullWidth: true,
            cursorAlpha: 0.1,
            valueLineBalloonEnabled: true,
            valueLineEnabled: true,
            valueLineAlpha: 0.5
          },

          periodSelector: {
            position: "left",
            periods: [ {
              period: "MM",
              selected: true,
              count: 1,
              label: "1 month"
            }, {
              period: "YYYY",
              count: 1,
              label: "1 year"
            }, {
              period: "YTD",
              label: "YTD"
            }, {
              period: "MAX",
              label: "MAX"
            } ]
          },

          dataSetSelector: {
            position: "left"
          },
          "export": {
            "enabled": true
          }
        })
      },

    render: function() {
    return this.$el.html(this.divText)


    // if (this.collection.length > 0) {  
    //   this.$el.show();
    //   this.plotLine(this.collection, this);
    //   return this.$el;
    // }
  }
});
