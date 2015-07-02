// Backbone view for the player investment information
var PlayerInfoView = Backbone.View.extend({
  className: 'player-info-view col-xs-12 col-md-6',

  divText: '<div class="well text-center investment-info">\
              <div class="stock-summary">\
                <div class="investment-data"> <strong>Investment Remaining</strong>: $<%=  %></div>\
                <div class="investment-data"> <strong>Total Stock Purchased</strong>: $<%=  %></div>\
              </div>\
            </div>\
            <button type="submit" id="submitBtn" class="btn btn-primary btn-block submit-button">Invest</button>',

  initialize: function(){
    this.render();
  },

  events:{

  },

  render: function(){
    return this.$el.append(this.divText);
  }

});