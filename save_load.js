class Path {

    constructor() {
        this.pts = [];
        this.mvs = [];
    }
}

function load_path_from_file(file) {
    if (file == null) return false;
    let reader = new FileReader();
    reader.onload = function() {load_path(JSON.parse(reader.result));}
    reader.readAsText(file);
}

function load_path(path) {

    path_points = path.pts;
    path_moves = path.mvs;
    selected = null;
    selected_index = null;
    selected_tool = null;
    reverse_current_arc = false;
    draw_tentative = true;
    save_to_file(save_path())
}

function save_path() {

    let path = new Path();
    path.pts = path_points;
    path.mvs = path_moves;
    return path;
}

let text_file = null;
function save_to_file(text) {

    let data = new Blob([text], {type: 'text/plain'});
    if (text_file != null) window.URL.revokeObjectURL(text_file);
    text_file = window.URL.createObjectURL(data);

    let save_btn = document.getElementById("btn_save");
    save_btn.href = text_file;
    save_btn.setAttribute('download', 'auton_path.json');
    document.getElementById('btn_save_img').setAttribute('available', true);
    
    if (path_moves.length > 1) {
        let generate_btn = document.getElementById("btn_generate");
        generate_btn.href = 'javascript:generate_file_blob()';
        generate_btn.removeAttribute('download');
        document.getElementById('btn_generate_img').setAttribute('available', true);
    }
    return text_file;
}