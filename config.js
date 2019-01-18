var config = {

    game_name: "Turning Point",

    field_img: "./res/field.jpg",
    field_coords: {
        start_x: 492,
        start_y: 141,
        width: 732,
        height: 732
    },

    function_move_dist: "chassis::move_dist(%l, %r)",
    function_rotate: "chassis::rotate(%a)",
    function_move_arc: "chassis::move_arc(&r, %a)"

}
