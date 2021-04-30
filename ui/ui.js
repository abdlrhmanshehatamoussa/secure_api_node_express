function showError(t) {
    $("#message-popup").addClass("alert-danger");
    $("#message-popup").removeClass("alert-success");
    $("#message").html(`Error: ${t}`);
    showMessage();
}

function showSuccessMessage(msg = null) {
    $("#message-popup").removeClass("alert-danger");
    $("#message-popup").addClass("alert-success");
    if (msg !== null && msg !== undefined) {
        $("#message").html(msg);
    } else {
        $("#message").html(`Success`);
    }
    showMessage();
}

function hideMessage() {
    $("#message-popup").removeClass("show");
    $("#message-popup").addClass("fade");
}

function showMessage() {
    $("#message-popup").addClass("show");
    $("#message-popup").removeClass("fade");
}