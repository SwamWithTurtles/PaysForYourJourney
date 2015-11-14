module.exports.parse = function(data) {
    return {
        from: {
            ambig: true,
            options: [{name: "ambig1"}, {name: "ambig2"}]
        },
        dest: {
            ambig: false
        }
    }
}
