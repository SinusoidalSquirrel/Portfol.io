// Backbone view for the dashboard
var GraphDashboardView = Backbone.View.extend({

  className: 'graphoverview container-fluid',

  initialize: function(){
    this.graphOverView = new GraphOverView({collection: this.collection});
    this.render();
  },

  render: function(){
    return this.$el.html([
      this.graphOverView.$el
    ]);
  }

});
