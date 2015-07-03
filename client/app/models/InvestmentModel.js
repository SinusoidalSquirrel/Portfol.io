// Backbone model for investment
var InvestmentModel = Backbone.Model.extend({

  initialize: function(){
	  var collection = this.get('collection');

	  $.ajax({
      url: '/investments',
      type: 'POST',
      data: { 
        amount: this.get('investment')
      },
      success: function(res) {
        console.log(res);
      },
      error: function(error) {
        console.log(error.responseText);
      }
    });
  }

});
 