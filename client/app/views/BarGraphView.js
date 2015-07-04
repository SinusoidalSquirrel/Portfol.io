/* Backbone view for the graph view
find more information on mbostock's page for charting line charts: http://bl.ocks.org/mbostock/3883245 */

var BarGraphView = Backbone.View.extend({

  className: 'barGraph col-xs-12 col-md-7',

  initialize: function() {
    this.render();
    // this.collection.on('sync edited remove reset', this.render, this);
    var context = this;
    $(window).on("click", function() {
      context.render.apply(context);
    });
  },

  plotBars: function(competitors) {
    var svg = d3.select('.barGraph').append("svg")
        .attr('class', 'chart');

    var fauxsvg = d3.select('.barGraph').append('div').attr('class', 'chart2');

    var settings = {duration: 2000};
    // Waren Buffett, Peter Lynch, David Dreman and Kenneth Fisher

    var gurus = ['buffett', 'icahn', 'soros','gates', 'you'];

    // var competitors = [5, 10, -20, 30, -50];
    var competitors = [5, -20, -30, 40, 16];

    var width = 800, height = 640;
    var barHeight = height/5;

    var min = Math.min.apply(null, competitors);
    var max = Math.max.apply(null, competitors);



    if (min < 0) {
      var x = d3.scale.linear()
          .domain([min, max])
          .range([0, width]);      
    }
    else
    {
      var x = d3.scale.linear()
          .domain([0, max])
          .range([0, width]);
    }

    var offset;
    if (min < 0) {
      // offset = barHeight/2;
      offset = x(min+1);

    }
    else
    {
      offset = 0;
    }

    var start = 0;

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * competitors.length);

    var chart2 = d3.select(".chart2")
        .attr("width", width)
        .attr("height", barHeight * competitors.length);

    var bar = chart.selectAll("g")
        .data(competitors)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
    
    bar.append("rect")
        .attr("width", 0)
        .attr('x', x(start))
        .attr('class', function(d, i) { if (d < 0) {return 'negative'} else { return 'positive'}})
        .transition().duration(settings.duration).ease('cubic-in-out')
        .attr('width', function(d, i) { return Math.abs(x(d) - x(start)) + 'px'; })
        .attr('x', function(d, i) { if (d >=0) {return x(start) + offset} else {return x(d) + offset}})
        .attr("height", barHeight - 1);

    bar.append("text")
        // .attr("x", function(d) { return x(d) - 20; })
        .attr("x", function(d) { if (d < 0)
                                  { return x(d + 8); }
                                 else
                                  { return x(d) - offset; } })
        // .attr("x", function(d) { if (d < 0)
        //                           { return (x(d) + offset)/2; }
        //                          else
        //                           { return (x(d) + offset)/2; } })

        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { if (d > 0) {
                              return "+" + Number(d) + "%";
                            }
                            return Number(d) + "%"; });


    var bar2 = chart2.selectAll(".buffett")
        .data(competitors)
        .enter().append("div")
 
        .attr('class', function(d, i) { return gurus[i]; })
        .style({
          width: barHeight - 1 +'px',
          height: barHeight - 1 +'px', 
          top: function(d, i) { return i * barHeight + 'px'; },
          left: x(start) + offset + 'px'
        })
        .transition().duration(settings.duration).ease('cubic-in-out')
        .style({
    //      left: function(d, i) { return x(start) + 10 + x(d) + 5 + 'px'; },
          left: function(d, i) { if (d >=0) {return x(d) + offset + 'px'}
                               else
                               {return x(d) - offset + 10 + 'px'}}

        });

  },

  render: function() {
    this.$el.hide();
    this.$el.empty();
    // if (this.collection.length > 0) {  
      this.$el.show();
      this.plotBars(this.collection, this);
      return this.$el;
    // }
  }

});
