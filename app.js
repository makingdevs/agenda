var App = Ember.Application.create();

App.Person = Ember.Object.extend({
  id : "",
  name : ""
});

App.People = []

App.Router.map( function() {
  this.route('people');
  this.route('calendar');
});

App.PeopleRoute = Ember.Route.extend({
  model : function() {
    return App.People;
  }
});

App.PeopleController = Ember.ArrayController.extend({

  actions : {
    addPerson : function() {
      var person = App.Person.create({
        id : App.People.length + 1,
        name : this.get('name')
      });

      var model = this.get('model');
      model.pushObject( person );
      this.set('name', '');
    }
  }

});


Ember.Handlebars.helper('iterateOverHour', function() {
  var fila = ""
  for(var i = 0; i < 24; i++) {
    fila += "<tr> <td>" + i + ":00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>"
  }

  return new Handlebars.SafeString(fila);
});
