// Home Route
Router.onBeforeAction(function (pause) {
  if (!this.ready()) {
    this.render('loadingPage');
    pause();
  } else {
    this.next();
  }
});
Router.route('/', {
  name: 'home',
  action: function () {
    if (this.ready()) {
      this.render('home');
      SEO.set({ title: 'Home - ' + Meteor.App.NAME });
    }
  }
});
