// Backbone view for the player dashboard
var PlayerDashboardView = Backbone.View.extend({
	className: 'dashboard dashboardTop container-fluid',

	divText: '<div id="chartdiv"></div>',

	initialize: function(){
		// initialize all the views that will be appended to the dashboard view
		this.playerFormView = new PlayerFormView({
			collection: this.collection,
			model: new InvestmentModel()
		});
		this.pieChartView = new PieChartView({collection: this.collection});
		this.playerPortfolioView = new PlayerPortfolioView({collection: this.collection});
		this.render();
	},


	render: function(){
		return this.$el.html([
			this.playerFormView.$el,
			this.playerFormView.playerInfoView.$el,
			this.playerPortfolioView.$el,
			this.divText,
		])
	}

});