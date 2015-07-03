// Backbone view for the player dashboard
var PlayerFormView = Backbone.View.extend({
  className: 'player-form-view col-xs-12 col-md-6 text-center form container',

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
              <button type="submit" id="setInvBtn" class="btn btn-primary btn-block submit-button">Set</button>\
            </form>\
          </form>\
        </div> \
      </div>\
    </div>\
    <div class="container"> \
      <div class="row"> \
        <div class="col-sm-6 well text-center" id="select-form">\
          <form data-toggle="validator" role="form">\
            <label for="symbol">Stock</label>\
            <div class="form-group"> \
              <input pattern="[a-zA-Z0-9-]{1,6}" maxlength="6" type="text" id="symbol" class="form-control" placeholder="Symbol" data-error="Invalid Stock Ticker" required>\
              <div class="error-message help-block with-errors"></div>\
            </div> \
           <label for="amount">No. of Shares</label>\
           <div class="form-group"> \
             <input type="number" id="shares" class="form-control">\
           </div>\
           <button type="submit" id="addBtn" class="btn btn-primary btn-block submit-button">Add</button>\
           <div class="help-block with-errors"></div>\
          </form>\
        </div> \
      </div> \
    </div>',

  initialize: function(){
    this.playerInfoView = new PlayerInfoView({
      collection: this.collection,
      model: this.model
    });
    this.render();
    this.collection.on('destroy', function() {
      this.$('.error-message').text('Invalid Stock Ticker');
    }, this);
    console.log(this.model);
  },

  // TODO: Add event handlers
  events:{
    'click #addBtn': 'handleAdd',
    'click #setInvBtn': 'handleSet'
  },

  clearErrors: function(){
    $('error-message').text('');
  },

  handleAdd: function(e){
    console.log("This is added!");
    e.preventDefault;
    if(this.$('form')[1].checkValidity()){
      var d = new Date();
      var requestStock = {
        symbol: this.$('#symbol').val().toUpperCase(),
        // from: this.$('#date').val(),
        from: new Date(new Date().setYear(new Date().getFullYear() - 3)),
        shares: this.$('#shares').val(),
        to: d.toISOString().slice(0, 10)
      };
      this.handleDuplicates(requestStock);
    }else{
      this.$('form')[1].reset();
    }
    this.$('#symbol').val('');
    this.$('#date').val('');
    this.$('#shares').val('');
  },

  handleDuplicates: function(params) {
    console.log(params);
    var stocks = this.collection;
    var existingStock = stocks.findStock(params.symbol);
    var startDate = new Date(params.from);
    if (existingStock) {
      if (existingStock.getStartDate() <= startDate) {
        // no need to make an addtional API call; just adds total purchase price to the stock
        // starting with the new start date
        existingStock.addShares(startDate, parseFloat(params.shares));
      } else {
        // makes API call to get earlier stock history, then updates model
        stocks.getNewStockTrajectory(params).then(function(resp) {
          existingStock.updateShares(resp, parseFloat(params.shares));
        });
      }
    } else {
      /* Create will create a new stock in the collection
       and send a request for the pertinent information */
      this.collection.create(params);
    }
  },


  handleSet: function(e){
    e.preventDefault;
    var investment = this.$('#amount').val();
    // new InvestmentModel({investment: investment});
    this.model.set('investment', investment);
    // this.collection.trigger('setInv', investment);
    this.$('#amount').val('');
  },

  render: function(){
    this.$el.html(this.divText);
    // return this.playerInfoView.render().appendTo(this.$('.dashboardTop'));
    // return this.$el.html([
    //   this.divText,
    //   this.playerInfoView.$el
    // ]);
  }

});