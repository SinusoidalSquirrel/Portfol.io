// Backbone model for investment
var InvestmentModel = Backbone.Model.extend({

  initialize: function(){

	  $.ajax({
      url: '/investments',
      type: 'POST',
      data: { 
        amount: this.get('investment')
      },
      success: function(res) {
        consoe.log(res);
      },
      error: function(error) {
        console.log(error.responseText);
      }
    });
  }

});
 