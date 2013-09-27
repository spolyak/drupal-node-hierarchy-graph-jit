
function convert(array){
    var map = {};
    for(var i = 0; i < array.length; i++){
      
        var obj = array[i].data;
        obj.children= [];

        map[obj.id] = obj;

        var parent = obj.parent || '-';
        if(!map[parent]){
            map[parent] = {
                children: []
            };
        }
        map[parent].children.push(obj);
    }

    return map['-'].children;
}

function translateToSpaceTree(array) {
    var top = array[0];
    var root = {};
    root.id = 'id' + top.id;
    root.data = {};
    root.data.id = top.id;
    root.data.title = top.title;
    root.data.code = top.code;
    root.data.statement = top.statement;
    root.data.children = top.children.length;
    root.children = [];

    for(var i = 0; i < top.children.length; i++){
      root.children.push(translateToSpaceTreeSub(top.children[i]));
    }
    return root;
}

function translateToSpaceTreeSub(element) {
    //alert(JSON.stringify(element));
    var node = {};
    node.id = 'id'+element.id;
    node.data = {};
    node.data.id = element.id;
    node.data.title = element.title;
    node.data.code = element.code;
    node.data.statement = element.statement;
    node.data.children = element.children.length;
    node.children = [];
    for(var i = 0; i < element.children.length; i++) {
      node.children.push(translateToSpaceTreeSub(element.children[i]));
    }
    return node;
}

var arry = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': '/hierarchy-ccss-math-json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

var ORG = translateToSpaceTree(convert(arry.results));

