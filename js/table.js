var TABLE_MODULE = (function() {
    var self = {
        curTable: "table",
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
            type: "dropdown",
            foreignTable: "foreignTable" //РўР°Р±Р»РёС†Р° РёР· РєРѕС‚РѕСЂРѕР№ РїРѕС‚СЏРЅРµРј РґСЂРѕРїРґР°СѓРЅ
        }],

        data: [{
            id: 1,
            "id-1": "First-text",
            "id-2": "203",
            "id-3": "15"
        },{
            id: 2,
            "id-1": "First-text",
            "id-2": "203",
            "id-3": "15"
        }],
        dropdown: {}

    };

    self.init = function() {
        self.loadTable();

    };

    self.initBtns = function() {
        $(".delete-btn").unbind('click');
        $(".delete-btn").on('click', function() {
            var id = $(this).attr('data-record');
            self.deleteRecord(id);
            $(this).parent().parent().addClass("danger");
        });
    }

    self.printTable = function() {
        var html = "<table id='table' class='table table-hover'>";
        html += "<tr>";
        for(var i = 0; i < self.columns.length; i++) {
            html += "<th>";
            html += self.columns[i].name;
            html += "</th>";
        }
        html += "<th></th>";
        html += "<tr class='record-tr'>";
        for(var i = 0; i < self.data.length; i++) {
            html += "<tr>";
            for(var j = 0; j < self.columns.length; j++) {
                html += "<td>";
                switch ( self.columns[j].type) {
                    case "text":
                            html += self.TextField(self.data[i].id, self.columns[j].id, self.data[i][self.columns[j].id]);
                        break;
                    case "number":
                            html += self.IntField(self.data[i].id, self.columns[j].id, self.data[i][self.columns[j].id]);
                        break;
                    case "dropdown":
                            html += self.DropDownField(self.data[i].id, self.columns[j].id, self.data[i][self.columns[j].id], self.columns[j].foreignTable);
                        break;
                    }
                html += "</td>";
            }
            html += "<td><span class='glyphicon glyphicon-trash delete-btn' title='РЈРґР°Р»РёС‚СЊ' data-record='" +self.data[i].id+ "'/></td>";
            html += "</tr>";
        }
        html += "</tr>";
        $("#main-content").html(html);
        self.initBtns();
    };

    self.addRecord = function(id) {
        var form = {};
        for(var i = 0; i < self.columns.length; i++) {
            form[self.columns[i].id] = $("field [data-record=" + id + "]")
        }
        $.ajax({
            type: 'POST',
            dataType: "json",
            url: 'add.php?table=' + self.curTable,
            data: form,
            success: function(data) {
                self.showSuccess("Запись добавлена в таблицу  " + self.curTable);
            },
            error: function(data) {
                self.showDanger("Ошибка добавления записи в таблицу " + data.message);
            }

        });

    }

    self.deleteRecord = function(id) {
        $.ajax({
          type: 'POST',
          dataType: "json",
          url: 'delete.php?table=' + self.curTable,
          data: { 'id': id},
          success: function(data) {
            self.showSuccess("Запись удалена из таблицы " + self.curTable);
          },
          error: function(data) {
              self.showDanger("Ошибка удаления записи из таблицы  " + data.message);
          }
        });

    }

    self.TextField = function(id, field_id, value) {
        return "<input type='text' class='field' data-record='" + id + "' data-field='" + field_id + "' value='"+ value +"' /> ";
    }

    self.IntField = function(id, field_id, value) {
        return "<input type='number' class='field' data-record='" + id + "' data-field='" + field_id + "' value='"+ value +"' /> ";
    }

    self.DropDownField = function(id, field_id, value, table) {
        var html = "<select class='field' data-record='" + id + "' data-field='" + field_id + "' value='"+ value +"' >";
        var selected = "";
        for(var i = 0; i < self.dropdown[table].records.length; i++) {
            data = self.dropdown[table];
            selected = data.records[i].id == value ? "selected" : "";
            html += "<option value='"+ data.records[i].id +"' " + selected + " >" + data.records[i].name + "</option>";
        }
        html += "</select>"
        return html;
    }

    self.loadTable = function() {
        $.ajax({
            type: 'POST',
            dataType: "json",
            url: 'load.php?',
            data: { table : self.curTable, searchstring: $("#searchstring").val(), searchcolumn: $("#searchcolumn").val() },
            success: function(data) {
                if ( data != undefined ) {
                    self.columns = data.columns;
                    self.data = data.records;
                    self.loadForeignTables();
                }
            },
            error: function(data) {
                self.showDanger("Ошибка загрузки сторонней таблицы " + data.message);
            }

        });
    };

    self.loadForeignTables = function() {
        self.dropdown = {};
        for(var j = 0; j < self.columns.length; j++) {
            if (self.columns[j].type == "dropdown") {
                $.ajax({
                    type: 'POST',
                    dataType: "json",
                    url: 'loadForeignTable.php?' ,
                    data: { table : self.columns[j].foreignTable},
                    success: function(data) {
                        self.dropdown[data.table] = {};
                        self.dropdown[data.table].records = data.records;
                        setTimeout(function() {self.printTable();}, 1000);

                    },
                    error: function(data) {
                        self.showDanger("Ошибка загрузки сторонней таблицы " + data.message);
                    }

                });

            }
        }

    };


    self.showSuccess = function(message) {
        $("#alert-success-text").html(message);
        $("#alert-success").fadeIn(2500).fadeOut(2500);
    }

    self.showDanger = function(message) {
        $("#alert-danger-text").html(message);
        $("#alert-danger").fadeIn(2500).fadeOut(2500);
    }


    return self;

}).call(this);

$(document).ready(function() {
    TABLE_MODULE.init();
});
