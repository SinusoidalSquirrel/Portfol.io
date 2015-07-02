var CompareViewPage = Backbone.View.extend({


    className: 'compareviewpage container-fluid',

    divText: '\
    <div> watatawtaweta </div>',

    initialize: function(){
      this.render();
    },

    render: function(){
      return this.$el.html(this.divText);
    }


});
