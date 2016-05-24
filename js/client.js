$(document).ready(function() {
	var CONTROL_STACK = false;
	var VALID = false;
    var TYPE_VALUES = {
        'System.Int32' : 'number',
        'System.Boolean' : 'checkbox',
        'System.String' : 'text'
    }
    $("#download").on('click', function() {
        window.open('./download', '_blank');
    });
    $("#upload").on('click', function() {
        $("#upload_input").click();
    });
    $("#upload_input").on('change', function() {
        $("#upload_form").submit();
    });
    $("#submit").on('click', function(){
        var _this;
        for ( var i = 0; i < $(".numeric").length; i++) {
            _this =$( $(".numeric")[i] );
            if ( !isFinite(_this.val()) || isNaN(parseInt(_this.val())) ) {
                _this.addClass('error-field');
				_this.attr('data-title', "Ошибка ввода");
				_this.attr('data-content', "Не корректное значение");
				_this.popover('show');
                VALID = false;
            }
        }
		if ( VALID ) {
			var conf = createConfig();
			var xhr = new XMLHttpRequest();
			xhr.open("POST", '/', true);
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.send(JSON.stringify(conf));
		}
    });
    $("#add").on('click', function() {
        var name = $("#Name").val(),
            title = $("#Title").val(),
            type = $("#Type").val(),
            button = '<span class="glyphicon glyphicon-trash delete" title="delete row"></span>',
            id = 'id-' + Math.floor(Math.random() * 10000),
            input_type = type == "System.Boolean" ? 'checkbox' : 'text',
            css_class = type == "System.Int32" ? 'numeric' : '';
        var rowHtml = '<tr class="one-row" obj-id="'+ id +'"><td>'+name+'</td><td>'+ title +'</td><td><input id=\"' + id +'\" xml-type=\"'+TYPE_VALUES[type]+'\" type=\"' + input_type + '\" class=\"'+css_class+'\" name=\"'+name+'\" title=\"'+ title +'\" value=\"\" placeholder=\"Введите значение\"></input></td><td>' + button + '</td></td>';
        $("#mainTable").append(rowHtml);
        setDeleteHandler();
        setNumberFields();
    });
    var setNumberFields = function() {
		function setCursor(pos) {
			this.selectionStart = pos;
			this.selectionEnd = pos;
		};
		$(".numeric").unbind("keyup");
		$(".numeric").unbind("keydown");
		$(".numeric").unbind("paste");
		$(".numeric").on("keydown", function (eventObject) {

			var selStart = this.selectionStart,
			selEnd = this.selectionEnd;
			if (eventObject.which == 17) {
				CONTROL_STACK = true;
			}
			var specSymbols = [8, 46, 37, 39, 16, 35, 36];
			var ctrlsSymbols = [65, 67, 86, 88];
			var minus = [48, 96, 109, 189];
			var valLength = $(this).val().length;
			if (specSymbols.indexOf(eventObject.which) > -1 || (CONTROL_STACK && ctrlsSymbols.indexOf(eventObject.which) > -1)) {
				return true;
			}
			if ((minus.indexOf(eventObject.which) > -1)) {
				if (eventObject.which == 189 || eventObject.which == 109) {
						if (($(this).val().length == 0) && selStart == 0) {
							return true;
						}
						if (selStart == 0 && valLength > 0 && selEnd != valLength && $(this).val()[0] !== '-') {
							return true;
						}
						return false;
					}
					else {
						if ((selStart == 0 && valLength > 0 && selEnd != valLength) || (($(this).val()[0] === '-' || $(this).val()[0] === '0') && selStart == 1)) {
							return false;
						}
					return true;
				}
			}

			if ((eventObject.which >= 48 && eventObject.which <= 57) || (eventObject.which >= 96 && eventObject.which <= 105)) {
				if ($(this).val()[0] === '0' && selStart > 0) {
					$(this).val($(this).val().substr(2));
					return false;
				}
				return true;
			}
			if ((valLength == 0 || (selStart == 0 && selEnd == valLength) || (selStart == 0 && selEnd == 0))
				&& (eventObject.which == 189 || eventObject.which == 109)) {
				//Добавим минус
				return $(this).val()[0] !== '-';
			}
			return false;
		 });
		 $(".numeric").on("keyup", function (eventObject) {
			if (eventObject.which == 17) {
				CONTROL_STACK = false;
			}
			var minValue = -2147483648;
			var maxValue = 2147483647;
			var val = parseInt($(this).val());
			if ( val > maxValue || val < minValue || $(this).val() == '-') {
				$(this).addClass('error-field');
				$(this).attr('data-title', "Ошибка ввода");
                if ($(this).val() == '-')
                    $(this).attr('data-content', "Значение не может быть \"-\"");
				if ( val > maxValue )
					$(this).attr('data-content', "Больше максимального значения " + maxValue);
				if (val < minValue)
					$(this).attr('data-content', "Меньше минимального значения " + minValue);
				$(this).popover('show');
				VALID = false;
			}
			else {
				$(this).removeClass('error-field');
				$(this).popover('hide');
				VALID = true;
			}
			if ( $(this).val() == "-0" ) {
				$(this).val("0");
			}

		});
		$(".numeric").bind("paste", function (e) {
			try {
				e.preventDefault();
				var val = $(this).val(),
					newVal = (e.originalEvent || e).clipboardData.getData('text/plain'),
					newValLen = newVal.length,
					startPos = this.selectionStart,
					endPos = this.selectionEnd;
				newVal =  newVal.replace(/[^-0-9]/g, '');
				if ( newVal.indexOf (/[^-0-9]/g) > -1 || newVal.length != newValLen){
					return false;
				}
				if (newVal[0] == '-' && parseInt(startPos) > 0) {
					return false;
				}
				val = val.substr(0, startPos) + newVal + val.substr(endPos);
				//val = val + newVal;
				if (val[0] != '-') {
					val = val.replace(/\-?[^0-9]/g, '');
				}
				else {
					val = '-' + val.replace(/\-?[^0-9]/g, '');
				}
				$(this).val(val);
				setCursor.call(this, startPos + newValLen);
			}
			catch(ex){
				return false;
			}


		});
    }
    var setDeleteHandler = function() {
        $(".delete").unbind('click');
        $(".delete").on('click',function() {
            var parent = this.parentNode.parentNode;
            parent.parentNode.removeChild(parent);
        });
    }
    function createConfig() {
        var conf = [];
        var type = {
            'number': 'System.Int32',
            'checkbox': 'System.Boolean',
            'text': 'System.String'
        }
        $(".one-row").each(function() {
            var child = $(this).find("td"),
                input = $(this).find("input"),
                value = $(input).attr("xml-type") != 'checkbox' ? $(input).val() : $(input).val() == "on" ? true : false;
            conf.push({
                Id: $(this).attr("obj-id"),
                Name: $(child[0]).html(),
                Value: value,
                Description: $(child[1]).html(),
                Type: type[$(input).attr("xml-type")],
            });
        });
        return conf;
    }
    setDeleteHandler();
    setNumberFields();
});
