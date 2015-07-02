/* Backbone view for the graph view
find more information on mbostock's page for charting line charts: http://bl.ocks.org/mbostock/3883245 */

var BarGraphView = Backbone.View.extend({

  className: 'barGraph col-xs-12 col-md-7',

  initialize: function() {
    this.collection.on('sync edited remove reset', this.render, this);
    var context = this;
    $(window).on("resize", function() {
      context.render.apply(context);
    });
  },

  plotBars: function(competitors) {
    var svg = d3.select('.barGraph').append("svg")
        .attr('class', 'chart');

    var fauxsvg = d3.select('.barGraph').append('div').attr('class', 'chart2');

    var settings = {duration: 2000};
    // Waren Buffett, Peter Lynch, David Dreman and Kenneth Fisher

    var gurus = ['buffett', 'icahn', 'soros','gates', 'sandp', 'you'];

//    var data = [4, 8, 15, 16, 23, 30, 42];
    competitors = [4, 8, 15, 16, 23, 30, 42];

    var width = 600,
        barHeight = 40;

    var x = d3.scale.linear()
        .domain([0, d3.max(competitors)])
        .range([0, width]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * competitors.length);

    var chart2 = d3.select(".chart2")
        .attr("width", width)
        .attr("height", barHeight * competitors.length);

    // var buffet = chart2.selectAll('.buffets')
    //   .data([0])
    //   .enter().append('g')
    //   .attr('class', 'buffet')
    //   .style({
    //     top: 107 + 'px',
    //     left: '0x',
    //     width: '80px',
    //     height: '80px'
    //   });

    var bar = chart.selectAll("g")
        .data(competitors)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
    bar.append("rect")
        .attr("width", 0)
        .transition().duration(settings.duration).ease('cubic-in-out')
        .attr('width', function(d, i) { return x(d) + 'px'; })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d) - 20; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });


    var bar2 = chart2.selectAll(".buffett")
        .data(competitors)
        .enter().append("div")
    //    .attr("top", function(d, i) { return i * barHeight + 'px'; })
 //       .attr('class', 'buffet')
        .attr('class', function(d, i) { return gurus[i]; })
        .style({
          width: barHeight - 1 +'px',
          height: barHeight - 1 +'px', 
          top: function(d, i) { return i * barHeight + 'px'; },
          left: '10px'
        })
        .transition().duration(settings.duration).ease('cubic-in-out')
        .style({
          left: function(d, i) { return x(d) + 5+ 'px'; }

        });
  },

  render: function() {
    this.$el.hide();
    this.$el.empty();
    if (this.collection.length > 0) {  
      this.$el.show();
      this.plotBars(this.collection, this);
      return this.$el;
    }
  }

});
