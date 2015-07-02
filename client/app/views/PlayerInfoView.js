// Backbone view for the player investment information
var PlayerInfoView = Backbone.View.extend({
  className: 'player-info-view col-xs-12 col-md-6',

  divText: '<div class="well text-center" id="select-form">\
        <div class="stock-summary">\
          <div class="info-stat"> <strong>Buying Power</strong>: $<%=  %></div>\
          <div class="info-stat"> <strong>Total Stock Purchased</strong>: $<%=  %></div>\
        </div>\
      </div>',

  initialize: function(){
    this.render();
  },

  events:{

  },

  render: function(){
    return this.$el.append(this.divText);
  }

});