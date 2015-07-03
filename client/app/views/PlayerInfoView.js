// Backbone view for the player investment information
var PlayerInfoView = Backbone.View.extend({
  model: InvestmentModel,
  
  className: 'player-info-view col-xs-12 col-md-6',

  template: _.template('\
            <div class="well text-center investment-info">\
              <div class="stock-summary">\
                <div class="investment-data investment-remaining"> <strong>Investment Remaining</strong>: $<%= remaining %></div>\
                <div class="investment-data stock-purchased"> <strong>Total Stock Purchased</strong>: $<%= purchased.toFixed(0) %></div>\
              </div>\
            </div>\
            <button type="submit" id="submitBtn" class="btn btn-primary btn-block submit-button">Invest</button>'),

  initialize: function(){
    this.render();
    this.collection.on('sync edited remove reset', this.render, this);
    this.model.on("change:investment",_.bind(this.render,this));
  },

  // render: function(){
  //   return this.$el.html(this.template(this.model.attributes));
  // }

  render: function() {
    console.log("Triggered!");
    this.$el.empty();
    this.delegateEvents();
    var purchased = 0;
    var investment = this.model.get('investment') || 0;
    this.collection.map(function(item) {
      purchased += (Math.round(item.get('shares')) * Math.round(item.get('price')));
    });
    var remaining = investment - purchased;
    return this.$el.html(this.template(
      {
      'purchased': purchased,
      'remaining': remaining
      }
    ));
  }

});