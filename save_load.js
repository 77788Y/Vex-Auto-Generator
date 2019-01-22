class Path {

    constructor() {
        this.pts = [];
        this.mvs = [];
    }
}

function load_path(path) {

    path_points = path.pts;
    path_moves = path.mvs;
    selected = null;
    selected_index = null;
    selected_tool = null;
    reverse_current_arc = false;
    draw_tentative = true;
}

function save_path() {

    let path = new Path();
    path.pts = path_points;
    path.mvs = path_moves;
    return path;
}