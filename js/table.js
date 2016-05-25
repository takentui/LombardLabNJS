var TABLE_MODULE = (function() {
    var self = {
        curTable: "clients",
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
        }]

    };

    self.init = function() {
        self.printTable();
        self.initBtns();

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
                switch ( self.columns[i].type) {
                    case "text":
                            html += self.TextField(self.data[i].id, self.columns[i].id, self.data[i][self.columns[i].id]);
                        break;
                    case "number":
                            html += self.IntField(self.data[i].id, self.columns[i].id, self.data[i][self.columns[i].id]);
                        break;
                    case "number":
                            html += self.IntField(self.data[i].id, self.columns[i].id, self.data[i].foreignTable);
                        break;
                    }
                html += "</td>";
            }
            html += "<td><span class='glyphicon glyphicon-trash delete-btn' title='РЈРґР°Р»РёС‚СЊ' data-record='" +self.data[i].id+ "'/></td>";
            html += "</tr>";
        }
        html += "</tr>";
        $("#main-content").html(html);
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
        for(var i = 0; i < self.dropdown[table].records; i++) {
            html += "<option value='"+ data.records[i].value +"'>" + data.records[i].name + "</option>";
        }
        html += "</select>"
        return html;
    }

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
