window.onload = function() {

// model
test( "model ui basic tests", function() {

  // load ref object
  App.Collection.loadAssets({
    TicketState: {
      1: {
        name: 'new', id: 1, updated_at: "2014-11-07T23:43:08.000Z",
      },
      2: {
        name: 'open', id: 2, updated_at: "2014-11-07T23:43:08.000Z",
      },
      3: {
        name: 'closed <>&', id: 3, updated_at: "2014-11-07T23:43:08.000Z",
      },
    },
  })

  // create ticket
  var attribute1 = {
    name: 'date', display: 'date 1',  tag: 'date', null: true
  };
  App.Ticket.configure_attributes.push( attribute1 )

  var ticket = new App.Ticket()
  ticket.load({
    id:         1000,
    title:      'some title <>&',
    state_id:   2,
    updated_at: '2014-11-07T23:43:08.000Z',
    date:       '2015-02-07',
  })

  App.i18n.set('en')
  equal( App.viewPrint( ticket, 'id' ), 1000)
  equal( App.viewPrint( ticket, 'title' ), 'some title &lt;&gt;&amp;')
  equal( App.viewPrint( ticket, 'state' ), 'open')
  equal( App.viewPrint( ticket, 'state_id' ), 'open')
  equal( App.viewPrint( ticket, 'not_existing' ), '-')
  equal( App.viewPrint( ticket, 'updated_at' ), "<span class=\"humanTimeFromNow undefined\" data-time=\"2014-11-07T23:43:08.000Z\">?</span>")
  equal( App.viewPrint( ticket, 'date' ), '2015-02-07')


  App.i18n.set('de')
  equal( App.viewPrint( ticket, 'id' ), 1000)
  equal( App.viewPrint( ticket, 'title' ), 'some title &lt;&gt;&amp;')
  equal( App.viewPrint( ticket, 'state' ), 'offen')
  equal( App.viewPrint( ticket, 'state_id' ), 'offen')
  equal( App.viewPrint( ticket, 'not_existing' ), '-')
  equal( App.viewPrint( ticket, 'updated_at' ), "<span class=\"humanTimeFromNow undefined\" data-time=\"2014-11-07T23:43:08.000Z\">?</span>")
  equal( App.viewPrint( ticket, 'date' ), '07.02.2015')

  App.i18n.set('en')
  ticket.state_id = 3
  equal( App.viewPrint( ticket, 'state' ), 'closed &lt;&gt;&amp;')
  equal( App.viewPrint( ticket, 'state_id' ), 'closed &lt;&gt;&amp;')

  App.i18n.set('de')
  equal( App.viewPrint( ticket, 'state' ), 'closed &lt;&gt;&amp;')
  equal( App.viewPrint( ticket, 'state_id' ), 'closed &lt;&gt;&amp;')

  // normal string
  data = {
    a: 1,
    b: 'abc',
    c: {
      displayName: function() { return "my displayName <>&" }
    },
  }
  equal( App.viewPrint( data, 'a' ), 1)
  equal( App.viewPrint( data, 'b' ), 'abc')
  equal( App.viewPrint( data, 'c' ), 'my displayName &lt;&gt;&amp;')

});


}