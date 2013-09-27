var EMPLOYEES = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': '/hierarchy-ccss-math-json-search',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

