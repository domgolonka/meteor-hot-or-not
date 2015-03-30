// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Hot or Not',
  DESCRIPTION: 'A Hot or Not application made for Meteor'
};
