/**
 * Created by tammyslau on 4/20/17.
 */
$(document).ready(function() {
    initFirebase();
    $('select').material_select();
});
function initFirebase(){
    var config = {
        apiKey: "AIzaSyAUxGVqiuzpHcC32DrSrIgyBir2plEZILA",
        authDomain: "packing-list-c91f3.firebaseapp.com",
        databaseURL: "https://packing-list-c91f3.firebaseio.com",
        projectId: "packing-list-c91f3",
        storageBucket: "packing-list-c91f3.appspot.com",
        messagingSenderId: "723371653796"
    };
    firebase.initializeApp(config);
}
function clearForm() {
    $("#itemName").val("");
    $("#category").empty();
    $("#itemDetail").val("");
}
function addToDatabase(){
    var database = firebase.database();
    switch ($("#category").val()){
        case "1":
            database.ref().push({
                username: name,
                email: email,
                profile_picture : imageUrl
            });
            break;
    }

};