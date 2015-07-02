var CompareViewPage = Backbone.View.extend({


    className: 'compareviewpage container-fluid',

    divText: '\
    <div> watatawtaweta </div>',

    initialize: function(){
      this.render();
      this.saveGuruUser();
    },

    render: function(){
      // var returnlist = this.collection.retrieveGuruList();
      // for (var i = 0; i < guruList.length; i++){
      //   console.log('guru', guruList[i].username)
      // }
      return this.$el.html(this.divText);
    },

    saveGuruUser: function(){
        var gurus = this.collection;
        $.ajax({
          url: '/gurulist',
          type: 'POST',
          data: null,
          success: function(data) {
            data.forEach(function (guru) {
              $.ajax({
                url: '/guruportfolio',
                type: 'POST',
                data: {id: guru.id},
                success: function(res){
                  console.log("res is,", res);

                  stocks.create({
                      'name': guru.username,
                      'stocks': res,
                  });
                }
              });

            });
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
