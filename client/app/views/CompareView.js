var CompareView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template('<td>(<%= id %>)</td><td><%= name %></td><td>!!! <%= portfolio %> !!!</td><td>~~<%= stocks %>~~</td>'),

  initialize: function(){
    // this.model.on('change',this.render, this)

  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});
