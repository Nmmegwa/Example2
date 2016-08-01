//Parse.initialize("Ntrn4oOn926ELlVzwozZL2hJpR3OHN87Z0vIr8f0", "119CjghihfTpAA0qHFt5l6xyyiThZuJks1Zzt0cK");


var yourSwaps;
var call;

function showYourRequests() {
  call = "requestedSwaps";
  showSwaps();
}

function showYourSwaps() {
  call = "completedSwaps";
  showSwaps();
}

function showSwaps() {
	var swapUsers = Parse.Object.extend("swapUserWithLocationAndLink");
	var query = new Parse.Query(swapUsers);
  var query1 = new Parse.Query(swapUsers);

    var yourSwaps = [];
    query.get(you, {
      success: function(object) {
              yourSwaps = object.get(call);
              query1.containedIn("objectId", yourSwaps);
              query1.find({
              success: function(results) {
      
              var dataset = results.map(function(result) {
                var row = [];
                      row.push(result.get("firstName"));
                      row.push(result.get("lastName"));
                      row.push(result.get("phoneNumber"));
                      return row;
                      });
                      displayUsers(dataset);
                    },
                    error: function(error) {
                      alert("Error: " + error.code + " " + error.message);
                    }
                  });
                  },

              error: function(error) {
                alert("Error: " + error.code + " " + error.message);
              }
            });

}

function displayUsers(dataSet) {

	$('#users').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="userTable"></table>' );
//alert($('#userTable').DataTable)
$('#userTable').DataTable( {
	"data": dataSet,
	"columns": [
	{ "title": "First Name" },
	{ "title": "Last Name" },
	{ "title": "Phone Number "}
	]
} ); 

}
