var email = "";
var password = "";
var points = 0;
var noOfNotes = 0;
var loggedUser = {};

function post(url, payload, callback, err) {
    $.ajax({
        url: `http://127.0.0.1:2050/${url}`,
        type: "POST",
        data: JSON.stringify(payload),
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        success: function(d) {
            callback(d);
        },
        error: function(e) {
            err(e)
        }
    });
}

function get(url, callback, err) {
    $.ajax({
        url: `http://127.0.0.1:2050/${url}`,
        type: "GET",
        success: function(d) {
            callback(d);
        },
        error: function(e) {
            err(e)
        }
    });
}

function register() {
    let payload = {
        email: email,
        password: password
    };
    post(
        "users",
        payload,
        function(d) {
            $("#in-email").val("");
            $("#in-password").val("");
            showSuccessMessage();
        },
        function(e) {
            showError(e.responseText)
        }
    );
}

function login() {
    let payload = {
        email: email,
        password: password
    };
    post(
        "users/login",
        payload,
        function(d) {
            loggedUser = d;
            $("#in-email").val("");
            $("#in-password").val("");
            $("#lbl-user-name").html(`Welcome <b>${loggedUser.email}</b> !`);
            $("#login-section").hide();
            $("#notes-section").show();
            $("#btn-logout").show();
            $("#lbl-credit").show();
            refreshUserNotes();
            refreshPoints();
        },
        function(e) {
            showError(e.responseText)
        }
    );
}

function logout() {
    loggedUser = {};
    email = "";
    password = "";
    $("#lbl-user-name").text(``);
    $("#login-section").show();
    $("#notes-section").hide();
    $("#btn-logout").hide();
    $("#lbl-credit").hide();
}

function refreshUserNotes() {
    get(
        `notes/${loggedUser.globalId}`,
        function(notes) {
            var html = "";
            notesObject = JSON.parse(notes);
            for (let index = 0; index < notesObject.length; index++) {
                const note = notesObject[index];
                html = html + `<Label class='form-control'>${note.text}</Label>`
            }
            $("#notes-list").html(html)
            noOfNotes = notesObject.length;
        },
        function(e) {
            showError(e.responseText)
        }
    );
}

function addNote() {
    t = $("#in-note").val()
    payload = {
        text: t,
        userId: loggedUser.globalId
    }
    post(
        "notes/",
        payload,
        function(d) {
            $("#in-note").val("");
            refreshUserNotes();
            refreshPoints();
            showSuccessMessage();
        },
        function(e) {
            showError(e.responseText)
        }
    )
}

function updateEmail() {
    e = $("#in-email").val();
    email = e;
}

function updatePassword() {
    p = $("#in-password").val();
    password = p;
}

function addPoint() {
    //Add point through the API
    payload = {
        userId: loggedUser.globalId,
        description: "-"
    }
    post(
        "points",
        payload,
        function(d) {
            showSuccessMessage("Payment accepted !");
            refreshPoints();
        },
        function(e) {}
    )
}

function refreshPoints() {
    //Load user points from the API
    $("#add-notes-section").hide();
    $("#payment-section").show();
    get(
        `points/${loggedUser.globalId}`,
        function(d) {
            result = JSON.parse(d);
            points = result.count
            $("#points-span").html(points);
            if (points > noOfNotes) {
                $("#add-notes-section").show();
                $("#payment-section").hide();
            }
        },
        function(e) {
            customcustomAlert(e.responseText);
        }
    )
}



$(document).ready(function() {
    logout();
    $("#btn-register").click(register);
    $("#btn-logout").click(logout);
    $("#btn-login").click(login);
    $("#in-email").change(updateEmail)
    $("#in-password").change(updatePassword)
    $("#btn-save").click(addNote)
    $("#btn-pay").click(addPoint)


    //debug
    email = "mark@facebook.com"
    password = "123456"
    $("#in-email").val(email)
    $("#in-password").val(password);
})