// Backbone view for stock information
var PlayerStockView= Backbone.View.extend({ 

  template: _.template('\
            <div class="info-item row text-center">\
              <div class="col-md-3"><strong><%= symbol %></strong></div>\
              <div class="col-md-3"><strong><%= this.numberWithCommas(shares.toFixed(0)) %></strong></div>\
              <div class="col-md-3"><strong>$<%= this.numberWithCommas(price.toFixed(0)) %></strong></div>\
              <div class="col-md-3"><strong>$<%= this.numberWithCommas((Math.round(shares) * Math.round(price)).toFixed(0)) %></strong></div>\
            </div>'),

  initialize: function() {
    var stock = this.model;
    this.$el.on('click', 'i', function () {
      stock.trigger('clicked', stock);
    });
  },

  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  render: function() {
    return this.$el.html(this.template(
      _.extend(this.model.attributes, {
      'final': this.model.getEndVal(), 
      'percentage': Math.round(((this.model.getEndVal()/this.model.getStartVal()) - 1)*100)
      })
    ));
  }

});
