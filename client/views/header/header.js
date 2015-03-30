Template.header.created = function () {
  Session.set('isActive', false);
  Session.set('showLogin', false);
};

Template['header'].helpers({
  showLogin: function () {
    return Session.get('showLogin');
  },
  animateClass: function () {
    return Session.get('isActive') ? 'fadeIn' : 'fadeOut';
  },
  iconClass: function () {
    return Meteor.user() ? 'user' : 'sign in';
  }

});





Template['header'].events({
  'click .resize.button' : function () {
    var showLogin = Session.get('showLogin');

    Session.set('isActive', !Session.get('isActive'));

    setTimeout(function () {
      Session.set('showLogin', !Session.get('showLogin'));
    }, 600);
  },
  'click .log-out.item' : function () {
    Meteor.logout();
    //Blaze.renderWithData(Template.rating, this.uploadedImages);
  },
  'click .log-in.item' : function () {
    var showLogin = Session.get('showLogin');
    Session.set('isActive', !Session.get('isActive'));
    setTimeout(function () {
      Session.set('showLogin', !Session.get('showLogin'));
    }, 600);
  },
  'click .upload.item' : function() {
    $('.upload.modal').modal('setting', { detachable:false }).modal('show');
  }

});

Template['rating'].helpers({
  uploadedImages: function() {
    return Collections.Images.find({},{sort:{votes:0},limit: 1});
  },
  state : function () {
    if (Meteor.userId()) {
      if (_.contains(Meteor.user().profile.ratedItems,this._id)) {
        return "rated"
      } else {return ""}
    } else {
      return "unrated"
    }
  },
  statetext: function () {
    if (Meteor.userId()) {
      if (_.contains(Meteor.user().profile.ratedItems,this._id)) {
        return "Overall rating:" }
      else { return "Rate this person:"}
    } else {
      return "Overall this person:"
    }
  },
  alreadyVoted: function(docid) {
    console.log(docid);
    console.log(Meteor.user().profile.ratedItems);
    return Meteor.user().profile.ratedItems == docid;
  }
});

Template.rating.events({
  'click .unrated': function () {
    var addedRating = $('.unrated').rating('get rating');
    var currRated = this._id;
    console.log(currRated);
    var newsum = this.score+addedRating;
    var newcount = this.votes+1;
    var newrating = newsum/newcount;
    Collections.Images.update({_id:currRated},{$inc: {votes:1}});
    Collections.Images.update({_id:currRated},{$inc: {score:addedRating}});
    Collections.Images.update( {_id:currRated},{$set: {rating:newrating}});
    if (Meteor.userId()) {

      Meteor.users.update({_id: Meteor.userId()}, {$push: {'profile.ratedItems': currRated}});
    }
    $('.ui.heart.rating').rating({"set rating":Math.floor(newrating)});
    $('.ui.heart.rating').rating('disable');
    //Blaze.renderWithData(Template.rating, this.uploadedImages);
  }
});

Template.rating.rendered = function() {
  var self = this;
  console.log(this);
  Tracker.autorun(function() {
    console.log("Template.child.rendered -> autorun ",Template.currentData(self.view));
    if (Meteor.userId()) {
      if (_.contains(Meteor.user().profile.ratedItems, Template.currentData()._id)) {
        $('.ui.heart.rating').rating('disable');
      } else {
        $('.ui.heart.rating').rating();
      }
    } else {
      $('.ui.heart.rating').rating();
    }
  });
};


Template.birthdayInput.rendered = function () {
    $('.datepicker').pickadate({
      min: new Date(1940,1,1),
      max: new Date(2007,12,30),
      selectMonths: true,
      selectYears: 15
    });
};
