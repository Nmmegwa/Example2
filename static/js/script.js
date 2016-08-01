Parse.initialize("Ntrn4oOn926ELlVzwozZL2hJpR3OHN87Z0vIr8f0", "119CjghihfTpAA0qHFt5l6xyyiThZuJks1Zzt0cK");


var you;
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      var loggedIn = false;
      var link;
      FB.api('/me', {fields: 'link'}, function(response) {
        link = response["link"];
        loggedIn = checkInParse(link);

      });

    }
  }


  function checkInParse(link) {
    var swapUsers1 = Parse.Object.extend("swapUserWithLocationAndLink");
    var query2 = new Parse.Query(swapUsers1);
    var inParse = false;
    query2.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          if(results[i].get("fbLink") == link) {
            inParse = true;
            you = results[i].id;
          }
        };

        if(inParse) {
          $("#fbLogin").hide();
          $("#successfulLogin").show();
          $("#signIn").hide();
          $("#fbLogout").show();
          $("#showAllUsers").show();
          $("#showYourSwaps").show();
        }
        else {
          $("#signIn").hide();
          $("#downloadUserView").show();
          fbLogout(); 
        }

      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

  }
  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1094688440545035',
      status     : false,
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  function fbLogout() {
    FB.logout(function (response) {
            //Do what ever you want here when logged out like reloading the page
            $("#showAllUsers").hide();
            $("#showYourSwaps").hide();
            $("#fbLogin").show();

            window.location.reload();
          });
  }


  function fbLogin() {
    FB.login(function(response) {
     if (response.authResponse) {
       $("#fbLogin").hide();
       $("#fbLogout").show();
       $("#showAllUsers").show();
       $("#showYourSwaps").show();
       window.location.reload();
     } else {
     }
   });
  }



//SWAP Display info data

var yourSwaps;
var call;

function showYourRequests() {
  call = "receivedSwaps";
  showSwaps();
}

function showYourSwaps() {
  call = "completedSwaps";
  showSwaps();
}

function showSwaps() {
  you = String(you);
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
            row.push(result.get("imageFile").url());
            row.push(result.get("firstName"));
            row.push(result.get("lastName"));
            row.push(result.get("phoneNumber"));
            row.push(result.get("fbLink"));
            return row;
          });
          if (call == "completedSwaps") displayPeople(dataset);
          else displayRequested(dataset);
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


function displayRequested(dataSet) {
  var showPeople = document.getElementById("showPeople");
  
  var html = '<div class="row">';

  for (var i = 0; i < dataSet.length; i++) {
  html += '<div class="col-md-4 portfolio-item"><img class="img-circle" ';
  html += 'src="' + dataSet[i][0] + '"';
  html += 'height="200" width="200" border = "5"><p>';
  html += '<span class="glyphicon glyphicon-user"></span> : ' + dataSet[i][1] + ' ' + dataSet[i][2] + '</p>';
  html += '</div> ';
  
  if(((i+1) % 3) == 0 && i != 0) html += '</div> <div class="row">';
  };
  html += '</div>'
  showPeople.innerHTML = html;
}

function displayPeople(dataSet) {
  var showPeople = document.getElementById("showPeople");
  
  var html = '<div class="row">';

  for (var i = 0; i < dataSet.length; i++) {
  html += '<div class="col-md-4 portfolio-item"><img class="img-circle" ';
  html += 'src="' + dataSet[i][0] + '"';
  html += 'height="200" width="200" border = "5"><p>';
  html += '<span class="glyphicon glyphicon-user"></span> : ' + dataSet[i][1] + ' ' + dataSet[i][2] + '</p><p>';
  html +=  '<span class="glyphicon glyphicon-earphone"></span> : ' + dataSet[i][3] + '</p>';
  html += '<p> <span class="glyphicon glyphicon-plus"></span> : Friend <a href="' + dataSet[i][4] + '"  target="_blank">' + dataSet[i][1] + '</a></p></div> ';
  if(((i+1) % 3) == 0 && i != 0) {
    html += '</div> <div class="row">';
  }
  };
  html += '</div>'
  showPeople.innerHTML = html;
}

