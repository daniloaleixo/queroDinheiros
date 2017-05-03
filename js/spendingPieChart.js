var data = {};


var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [
                0,
                0,
                0,
                0,
                0,
            ],
            backgroundColor: [
                '#11303B',
                '#266D73',
                '#45EDDC',
                '#33C79B',
            ],
            label: 'Dataset 1'
        }],
        labels: [
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue"
        ]
    },
    options: {
        responsive: true
    }
};

window.onload = function() {
    var database = firebase.database();
    var user = CookieHandler.checkCookie();

    // Date
    var today = new Date();
    var dd = today.getDate().toString();
    var mm = today.getMonth() + 1;
    if (mm < 10) mm = "0" + mm.toString();
    var yyyy = today.getFullYear().toString();



    var ctx = document.getElementById("chart-area").getContext("2d");

    firebase.database().ref().child(user.uid)
                            .child(yyyy)
                            .child(mm)
                            .child("summary")
                            .child("spendingPerCategories")
                            .on('value', function(snapshot) {

        var sortedSpendings = snapshot.val().sort(function(a, b){
            return b.amount - a.amount;
        })

        // console.log(sortedSpendings);

        var spendingsName = [];
        var spendingsAmount = [];

        sortedSpendings.forEach(function(spending){
            spendingsName.push(spending.name);
            spendingsAmount.push(spending.amount);
        })

        // Put in the config for the chart
        config["data"]["labels"] = spendingsName;
        config["data"]["datasets"][0]["data"] = spendingsAmount;

        window.myPie = new Chart(ctx, config);

        
    })

};


var colorNames = Object.keys(window.chartColors);