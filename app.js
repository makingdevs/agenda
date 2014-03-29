var App = Ember.Application.create();

App.Person = Em.Object.create({
});

App.Router.map( function() {
  this.route('people');
  this.route('calendar');
});

App.PeopleRoute = Ember.Route.extend({

  model : function() {
    []
  }

});

App.PeopleController = Ember.ArrayController.extend({

  actions : {
    addPerson : function() {
      var model = this.get('model');
      model.pushObject({
        name : this.get('name')
      });

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
