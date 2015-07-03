// Backbone view for the player dashboard
var PlayerDashboardView = Backbone.View.extend({
	className: 'dashboard container-fluid',

	initialize: function(){
		// initialize all the views that will be appended to the dashboard view
		this.playerFormView = new PlayerFormView({
			collection: this.collection
		});
		this.playerInfoView = new PlayerInfoView({
			collection: this.collection
		});
		this.playerPortfolioView = new PlayerPortfolioView({collection: this.collection});
		this.render();
		// this.collection.on('setInv', this.render, this);
		this.collection.on('setInv', function(param){
			this.render(param);
		}, this);

	},


	render: function(param){
		this.playerInfoView.render(param);
		return this.$el.html([
			this.playerFormView.$el,
			this.playerInfoView.$el,
			this.playerPortfolioView.$el
		])
	}

});