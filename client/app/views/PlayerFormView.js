// Backbone view for the player input form
var PlayerFormView = Backbone.View.extend({
	className: 'form container',

	divText: '\
    <div class="container"> \
      <div class="row"> \
        <div class="col-sm-6 well text-center" id="select-form">\
          <form data-toggle="validator" role="form">\
            <form class="form-inline">\
              <div class="form-group">\
                <label for="amount">Investment Amount ($)</label>\
                <div class="input-group">\
                  <div class="input-group-addon">$</div>\
                  <input type="number" id="amount" class="form-control" placeholder="Amount" data-error="Invalid amount" required>\
                  <div class="input-group-addon">.00</div>\
                  <div class="help-block with-errors"></div>\
                </div>\
              </div>\
            </form>\
            <div class="form-group"> \
              <label for="date">Investment Date</label>\
              <input pattern="^(?!.*00/).*$" type="date" id="date" class="form-control" data-error="Invalid Date" required>\
              <div class="help-block with-errors">After 1972</div>\
            </div> \
            <label for="symbol">Stock</label>\
            <div class="form-group"> \
              <input pattern="[a-zA-Z0-9-]{1,6}" maxlength="6" type="text" id="symbol" class="form-control" placeholder="Symbol" data-error="Invalid Stock Ticker" required>\
              <div class="error-message help-block with-errors"></div>\
              <button type="submit" class="btn btn-xs submit-button">Add</button>\
            </div> \
            <div class="form-group"> \
               <label for="amount">Shares</label>\
               <input type="number" id="amount" class="form-control" data-error="Invalid amount" required>\
               <div class="help-block with-errors"></div>\
            </div> \
            <button type="submit" class="btn btn-xs submit-button">Submit</button>\
          </form>\
        </div> \
      </div> \
    </div>',

	initialize: function(){
		this.render();
	},

	render: function(){
		return this.$el.html(this.divText);
	}

});