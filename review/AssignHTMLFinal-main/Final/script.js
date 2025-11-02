$(document).ready(function() {
    // Add Review
    $("#reviewForm").submit(function(e) {
        e.preventDefault();
        const name = $("#name").val();
        const review = $("#reviewText").val();

        if (name && review) {
            $("#reviewsList ul").append(
                `<li><strong>${name}</strong>: ${review}</li>`
            );
            $("#name").val('');
            $("#reviewText").val('');
        }
    });



    $("#questionForm").submit(function(e) {
        e.preventDefault();
        const name = $("#qName").val();
        const question = $("#qText").val();

        if (name && question) {
            alert("Thank you! We’ll reply to your question soon.");
            $("#qName").val('');
            $("#qText").val('');
        }
    });


    
    $(".faq-question").click(function() {
        $(this).next(".faq-answer").slideToggle(300);
        $(this).toggleClass("active");
    });
});
