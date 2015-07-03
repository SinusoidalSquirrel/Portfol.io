// Gurus will be collection of Guru,
// Guru has a portfolio of stocks, and itself is a Model.

var Gurus = Backbone.Collection.extend({
  model: Guru,

  url: '/gurulist',

  initialize: function(){
    this.on('change', this.rerender, this);
  },

  rerender: function(stock){
    this.trigger('rerender', this)
  },

});
