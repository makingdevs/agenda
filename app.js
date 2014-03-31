var App = Ember.Application.create();

App.Person = Ember.Object.extend({
  id : "",
  name : "",
  appointments : [],

  totalHours : function() {
    return this.get('appointments.length');
  }.property('appointments.@each')

});

App.Appointment = Ember.Object.extend({
  id : "",
  day : "",
  hour: "",
  person: ""
});

App.People = []

App.DaysOfWeeks = ["Monday","Thursday","Wednesday","Tuesday","Friday","Saturday","Sunday"]

App.HoursForDay = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

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

App.CalendarController = Ember.ObjectController.extend({
  selectedPerson : null,
  dayOfWeekSelected : null,
  hourForDaySelected : null,

  actions : {
    createAppointment : function() {
      var person = this.get('selectedPerson');
      var appointment = App.Appointment.create({
        id: person.get('appointments').length + 1,
        person: person,
        day: this.get('dayOfWeekSelected'),
        hour: this.get('hourForDaySelected')
      });
      person.get('appointments').pushObject(appointment);

      var column = App.DaysOfWeeks.indexOf(appointment.day);
      var cell = $("tr td:contains("+appointment.hour+":00)").parent().find("td")[column+1];
      $(cell).text(appointment.person.name);
    }
  }
});

App.AppointmentView = Ember.View.extend({
  template: Ember.Handlebars.compile("{{view.content}}"),
  click : function(){
    console.log(this.content);
  }
});

App.HourPerWeekView = Ember.CollectionView.extend({
  tagName :'tr',
  content : [1,2,3,4,5,6,7,8],
  itemViewClass: App.AppointmentView.extend()
});

App.DaysAndHoursPerWeekView = Ember.ContainerView.create({
  childViews : ['aView','bView','cView','dView'],
  aView: App.HourPerWeekView.create(),
  bView: App.HourPerWeekView.create(),
  cView: App.HourPerWeekView.create(),
  dView: App.HourPerWeekView.create()
});

Ember.Handlebars.helper('iterateOverHour', function() {
  var fila = ""
  for(var i = 0; i < 24; i++) {
    fila += "<tr> <td>" + i + ":00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>"
  }

  return new Handlebars.SafeString(fila);
});
