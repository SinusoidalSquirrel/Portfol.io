var CompareViewPage = Backbone.View.extend({


    className: 'compareviewpage container-fluid',

    divText: '\
    <div> watatawtaweta </div>',

    initialize: function(){
      this.barGraphView = new BarGraphView({collection: this.collection});
      this.saveGuruUser();
      this.collection.on('rerender', function() {
        console.log("created NEW GURU");
        this.render();
      }, this);
    },

    render: function(){
      // var returnlist = this.collection.retrieveGuruList();
      // for (var i = 0; i < guruList.length; i++){
      //   console.log('guru', guruList[i].username)
      // }

      this.$el.children().empty();
      this.delegateEvents();
      var headerText = '<h1 class="info-view-title text-center">GURU list</h1>';
      this.$el.html(headerText).append([
        this.collection.map(function(model){
          return new CompareView({model: model}).render();
        }), this.barGraphView.$el ]
      );
    },

    saveGuruUser: function(){
        var gurus = this.collection;
        $.ajax({
          url: '/gurulist',
          type: 'POST',
          data: null,
          success: function(data) {
            for (var i = 0; i < data.length; i ++){
              gurus.add({'id': data[i].id, 'name': data[i].username, 'portfolio': [], 'stocks': [] })
            }
          }
        });

    },



});


/*

  className: 'container stock-views-container',

  initialize: function() {
    var context = this;
    $.ajax({
      url: '/portfolios',
      type: 'GET',
      success: function(data) {
        context.render(data);
      }
    });
  },

  render: function(list) {
    this.$el.children().empty();
    this.delegateEvents();
    var headerText = '<h1 class="info-view-title text-center">My Portfolios</h1>';
    this.$el.html(headerText);
    for (var i = 0; i < list.length; i++) {
      this.$el.append(new PortfolioView({collection: this.collection}, list[i]).$el);
    }
  }





*/
