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
};
function addToDatabase(){
    var database = firebase.database();
    var dbObject = createDbObject();
    switch ($("#category").val()){
        case "1":
            database.ref("Clothing/" + dbObject.name + "/").set(dbObject);
            break;
        case "2":
            database.ref("Toiletries/" + dbObject.name + "/").set(dbObject);
            break;
        case "3":
            database.ref("Makeup/" + dbObject.name + "/").set(dbObject);
            break;
        case "4":
            database.ref("Food/" + dbObject.name + "/").set(dbObject);
            break;
        case "5":
            database.ref("Footwear/" + dbObject.name + "/").set(dbObject);
            break;
        case "6":
            database.ref("Paperwork/" + dbObject.name + "/").set(dbObject);
            break;
        case "7":
            database.ref("Gifts/" + dbObject.name + "/").set(dbObject);
            break;
        case "8":
            database.ref("Electronics/" + dbObject.name + "/").set(dbObject);
            break;
    }
    clearForm();
};
function createDbObject(){
    var itemName = $("#itemName").val();
    var itemDetail = $("#itemDetail").val();
    var objectGoingToDb = {
        name: itemName,
        detail: itemDetail,
    }
    return objectGoingToDb
}