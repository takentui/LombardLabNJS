var TABLE_MODULE = (function() {
    var self = {
        columns: [{
            id: 'id-1',
            name: "COLUMN1",
            type: "text"
        },{
            id: 'id-2',
            name: "COLUMN2",
            type: "number"
        },{
            id: 'id-3',
            name: "COLUMN3",
            type: "id",
            foreignTable: "foreignTable" //Таблица из которой потянем дропдаун
        }],

        data: [{
            "id-1": "First-text",
            "id-2": "203",
            "id-3": "15"
        },{
            "id-1": "First-text",
            "id-2": "203",
            "id-3": "15"
        }]

    };

    self.init = function() {


    };

    self.printTable = function() {
        var html = "<table id='table'>";
        html += "<tr>";
        for(var i = 0; i < self.columns.length; i++) {
            html +=
        }
        html += "</tr>";
    };

    self.TextField = function(id, value) {
        return "<input type='text' data-record='" + id + "' value='"+ value +"' /> ";
    }


}).call(this);

$(document).ready(function() {
    TABLE_MODULE.init();
});
