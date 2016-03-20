// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

	populateAllUserTable();
	
    // Find User button click
    $('#btnFindUser').on('click', populateFindUserTable);

    
    // Add User button click
    $('#btnAddUser').on('click', signin);
    

    // Delete User link click
    $('#btnSignOut').on('click', signout);

});

// Functions =============================================================

//Fill find user table with data
function populateAllUserTable() {
   
    // Empty content string
    var tableContent = '';
    
   
   
    // jQuery AJAX call for JSON
    $.getJSON( '/sisos/sisolist/', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        userListData = data;
        
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.userpin + '</td>';
            tableContent += '<td>' + this.fullname + '</td>';
            tableContent += '<td>'+ this.email + '</td>';
            tableContent += '<td>' + this.location + '</td>';
            tableContent += '<td>' + this.phone + '</td>';
            tableContent += '<td>'+ this.signintime + '</td>';
            tableContent += '</tr>';
        });
       
        // Inject the whole content string into our existing HTML table
        $('#findAllUserList table tbody').html(tableContent);
    });
};

//Fill find user table with data
function populateFindUserTable(event) {
   
    // Empty content string
    var tableContent = '';
    
   
    var findUser= $('#findUser input#inputFindUserByMng').val();
    // jQuery AJAX call for JSON
    $.getJSON( '/sisos/findsisolist/'+findUser, function( data ) {

        // Stick our user data array into a userlist variable in the global object
        userListData = data;
        
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.userpin + '</td>';
            tableContent += '<td>' + this.fullname + '</td>';
            tableContent += '<td>'+ this.email + '</td>';
            tableContent += '<td>' + this.location + '</td>';
            tableContent += '<td>' + this.phone + '</td>';
            tableContent += '<td>'+ this.signintime + '</td>';
            tableContent += '</tr>';
        });
       
        // Inject the whole content string into our existing HTML table
        $('#findUserList table tbody').html(tableContent);
    });
};

// Sign In
function signin(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'userpin': $('#addUser fieldset input#inputUserPin').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'phone': $('#addUser fieldset input#inputUserPhone').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'manager': $('#addUser fieldset input#inputUserManager').val(),
            'signintime': $('#addUser fieldset input#inputUserSignInTime').val()
        }
      
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/sisos/signin',
            dataType: 'JSON'
        }).done(function( response ) {
            
            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
          //      populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Sign Out
function signout(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to Sign out?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
    	  var signoutUser= $('#findUser input#inputSignoutUserPin').val();
        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/sisos/signout/' + signoutUser
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
        //    populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};