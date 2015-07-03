// Backbone view for the player dashboard
var PlayerDashboardView = Backbone.View.extend({
	className: 'dashboard container-fluid',

	initialize: function(){
		// initialize all the views that will be appended to the dashboard view
		this.playerFormView = new PlayerFormView({
			collection: this.collection,
			model: new InvestmentModel()
		});
		this.playerInfoView = new PlayerInfoView({
			collection: this.collection,
			model: new InvestmentModel()
		});
		this.playerPortfolioView = new PlayerPortfolioView({collection: this.collection});
		this.render();
	},

	render: function(){
		return this.$el.html([
			this.playerFormView.$el,
			this.playerInfoView.$el,
			this.playerPortfolioView.$el
		])
	}

});
