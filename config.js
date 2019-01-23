var config = {

    game_name: "Turning Point",

    field_img: "./res/field.jpg",
    field_coords: {
        start_x: 128,
        start_y: 141,
        width: 733,
        height: 732
    },

    function_move_dist: "chassis::move_dist(%l, %r, 600, true, %s)",
    function_rotate: "chassis::rotate(%a, 600, true, true)",
    function_move_arc: "chassis::move_arc(%r, %a, 600, true, %s, true)",

    includes: [
        "main.hpp",
        "include.hpp"
    ]

}
