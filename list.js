/**
 * Created by tammyslau on 4/20/17.
 */
$(document).ready(function(){
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
    initFirebase();
    autocomplete();
})
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
function autocomplete(){
    var newList = []
    var database = firebase.database();
    database.ref().once("value").then( function(snapshot){
        var data = snapshot.val();
        var objectArray = Object.keys(data);
        var combined = {};
        for(var i = 0; i < objectArray.length; i++){
            var subObj = data[objectArray[i]];
            var subKeys = Object.keys(subObj);
            var subCombined = {};
            for(var j = 0; j < subKeys.length; j++){
                var key = subKeys[j];
                var val = subObj[key];
                subCombined[key + ' - ' + val] = null;
            }
            Object.assign(combined, subCombined);
        }
        $('input.autocomplete').autocomplete({
            data: combined,
            onAutocomplete: function(val) {
                var itemID = val.split(" - ")[0];
                var divBody = $("<p>").append($("<input>").attr("type", "checkbox").attr("id", itemID)).addClass("listItem");
                var label = $("<label>").attr("for", itemID).text(val);
                var deleteBtn = $("<button>").text("x").addClass("deleteBtn btn-floating red").click(function(){
                    deleteListItem(val, newList)
                });
                divBody.append(label);
                $(".listItems").append(divBody, deleteBtn);
                newList.push(val);
                console.log(newList)
                $("#autocomplete-input").val("");
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
    })
}
function deleteListItem(itemName, listArray){
    for(var i = 0; i < listArray.length; i++){
        if(listArray[i] === itemName){
            listArray.splice(i,1)
        }
    }
    console.log("delete called:", listArray)
    return listArray
}

function addList(){
    var userName = "Tammachine"
    var database = firebase.database();
    var listTitle = $("#listTitle").val();
    $(".listBody").css("display", "inline-block");
    var dbObject = {};
    dbObject[listTitle] = ["meh"]
    var newListKey = database.ref("users/" + userName + "/Lists/").update   (dbObject).key
}