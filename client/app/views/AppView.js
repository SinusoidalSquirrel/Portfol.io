// Backbone view for the entire app
var AppView = Backbone.View.extend({

  el:'#main',

  navDiv: '<nav class="navbar navbar-inverse navbar-static-top"> \
             <div class="container-fluid"> \
               <a href="#front" class="navbar-brand">Portfol.io</a> \
               <ul class="nav nav-pills navbar-nav navbar-right"> \
                 <li><a href="#game">Game</a></li> \
                 <li><a href="#overview">Stock Overviews</a></li> \
                 <li><a href="#compare">Compare to Gurus</a></li> \
                 <li><a href="#signup">Sign Up</a></li> \
                 <li><a href="#signin">Sign In</a></li> \
                 <li><a href="#about">About Us</a></li> \
               </ul> \
             </div> \
          </nav> \
          <div class="username-verification text-right"></div>',

  template: _.template('<nav class="navbar navbar-inverse navbar-static-top"> \
                          <div class="container-fluid"> \
                            <a href="#front" class="navbar-brand">Portfol.io</a> \
                            <ul class="nav nav-pills navbar-nav navbar-right"> \
                              <li class="username-container">Signed in as <strong class="username"><%= username %></strong></li>\
                              <li><a href="#signout">Sign Out</a></li>\
                              <li><a href="#portfolios">My Portfolios</a></li> \
                              <li><a href="#new">New Portfolio</a></li> \
                              <li><a href="#about">About Us</a></li> \
                              <li><a href="#compare">Compare to Gurus</a></li> \
                            </ul> \
                          </div> \
                        </nav> \
                        <div class="username-verification text-right"></div>'),

  initialize: function(){
    this.formView = new FormView({collection: this.collection});
    this.dashboardView = new DashboardView({collection: this.collection});
    this.playerDashboardView = new PlayerDashboardView({collection: this.collection});
    this.graphOverview = new GraphDashboardView({collection: this.collection});
    this.compareViewP = new CompareViewPage({collection: new Gurus()});  //Bryan: Added CompareViewPage.
    this.aboutusView = new AboutUsView();
    this.signupView = new SignupView({model: this.model});
    this.signinView = new SigninView({model: this.model});
    // this.pieChartView = new PieChartView({model: this.model});
    this.render();
    window.location.hash = 'front';
  },

  setUsername: function(name) {
    this.model.set('username', name);
    this.dashboardView.setUsername(name);
  },

  renderBody: function(view, renderDashboard) {
    this.$el.empty();
    view.delegateEvents();
    this.formView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();
    this.playerDashboardView.delegateEvents();
    this.playerDashboardView.playerFormView.delegateEvents();
    this.playerDashboardView.playerPortfolioView.delegateEvents();
    // this.playerDashboardView.playerInfoView.delegateEvents();
    this.graphOverview.delegateEvents();

    // this.playerDashboardView.playerInfoView.delegateEvents();

    var navbar = $(this.navDiv);
    if (this.model.get('signedin')) {
      navbar = this.template(this.model.attributes);
    }
    this.$el.append([
      navbar,
      view.$el,
      this.dashboardView.$el

      // this.graphOverview.$el

    ]);
  },

  render: function(){
    var context = this;
    // immediately makes a request to see if user is signed in
    $.ajax({
      url:'/auth',
      success: function (response) {
        context.model.set('signedin', true);
        context.setUsername(response);
        context.renderBody(context.formView);
       },
      error: function() {
        context.renderBody(context.formView);
      }
    });
  },

  game: function() {
    this.renderBody(this.playerDashboardView, false);
  },

  signup: function() {
    this.renderBody(this.signupView, false);
  },

  signin: function() {
    this.renderBody(this.signinView, false);
  },

  aboutus: function() {
    this.renderBody(this.aboutusView, false);
  },


  portfolios: function () {
    this.$el.empty();
    this.portfoliosView = new PortfoliosView({collection: this.collection});
    var navbar = $(this.navDiv);
    if (this.model.get('signedin')) {
      navbar = this.template(this.model.attributes);
    }
    this.$el.append([
      navbar,
      this.portfoliosView.$el
    ]);
  },

  compareViewPage: function() {
    this.renderBody(this.compareViewP, false);
  },

  overview: function(){
    this.renderBody(this.graphOverview, false);
  },
});
