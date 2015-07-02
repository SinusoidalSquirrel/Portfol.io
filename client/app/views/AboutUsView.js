// Backbone view for member profile form
var AboutUsView = Backbone.View.extend({

  className: 'about-us container',

  divText: '\
      <div class="row"> \
        <div class="col-md-10 col-md-offset-1 text-center" id="about-us-container">\
          <div class="row"><h2>About Us</h2></div>\
          <div class="member-profiles row text-left">\
            <div class="member-profile col-xs-3" id="jack-profile"> \
                <img src="assets/images/jack.jpeg" class="profile-image"> \
                <div class="text-center row profile-name">Jack McDevitt</div>\
                <div class="text-center row"><ul class="nav navbar navbar-nav about-us-nav">\
                  <li><a href="https://github.com/jackmcd4" target="_blank"><img src="assets/images/github.png" height="50" width="50"></a></li>\
                </ul></div>\
              </ul>\
            </div> \
            <div class="member-profile col-xs-3" id="stacy-profile"> \
                <img src="assets/images/stacy.jpeg" class="profile-image"> \
                <div class="text-center row profile-name">Stacy Huang</div>\
                <div class="text-center row"><ul class="nav navbar navbar-nav about-us-nav">\
                  <li><a href="https://github.com/stacyhuang" target="_blank"><img src="assets/images/github.png" height="50" width="50"></a></li>\
                </ul></div>\
            </div> \
            <div class="member-profile col-xs-3" id="bryan-profile"> \
                <img src="assets/images/bryan.jpeg" class="profile-image"> \
                <div class="text-center row profile-name">Bryan Liu</div>\
                <div class="text-center row"><ul class="nav navbar navbar-nav about-us-nav">\
                  <li><a href="https://github.com/bsliu17" target="_blank"><img src="assets/images/github.png" height="50" width="50"></a></li>\
                </ul></div>\
            </div> \
            <div class="member-profile col-xs-3" id="john-profile"> \
                <img src="assets/images/john.jpeg" class="profile-image">\
                <div class="text-center row profile-name">John Paulino</div>\
                <div class="text-center row"><ul class="nav navbar navbar-nav about-us-nav">\
                  <li><a href="https://github.com/paulinoj" target="_blank"><img src="assets/images/github.png" height="50" width="50"></a></li>\
                </ul></div>\
            </div> \
          </div>\
        </div> \
     </div>\
     <div class="row text-center attribution"><p>Icons from <a href="http://glyphicons.com" target="_blank">Glyphicons Free</a>,\
                         licensed under <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>.\
                      </p>\
     </div>',

  initialize: function(){
    this.render();
  },

  render: function(){
    //Render profile form
    return this.$el.html(this.divText);
  }

});
