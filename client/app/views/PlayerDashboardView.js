// Backbone view for the player dashboard
var PlayerDashboardView = Backbone.View.extend({
	className: '',

	initialize: function(){
		// initialize all the views that will be appended to the dashboard view
		this.playerFormView = new PlayerFormView({collection: this.collection});
		this.playerPortfolioView = new PlayerPortfolioView({collection: this.collection});
		this.render();
	},

	render: function(){
		return this.$el.html([
			this.playerFormView.$el,
			this.playerPortfolioView.$el
		])
	}

});