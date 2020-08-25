// jQeury로 짠 후 바닐라로 다시 한번 짜보기
// check off specific todos by clicking
$("ul").on("click", "li", function() {
    // 'this' is an only on element in lis - clicked li
    $(this).toggleClass("completed");
});
        // turn it black
    // else
        // turn gray

// click() only adds listeners for existing elements
// on() will add listeners for all potential future elements

// all spans in ul (container)
// click on X delete todo
$("ul").on("click", "span", function(e) {
    // when the fadeout end, remove element;
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    e.stopPropagation();
});

$("input[type='text']").keypress(function(e) {
    if (e.which === 13) {
        const toDoText = $(this).val();
        $("ul").append(`<li><span><i class="fa fa-trash-alt"></i></span>${toDoText}</li>`);
        $(this).val("");
    }
});

$(".fa-plus").click(function() {
    $("input[type='text']").fadeToggle();
})