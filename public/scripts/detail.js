$(".drop-1").click(function(){

    document.getElementById("input-1").value=$(this).attr("value");
});

$('.more-less').click(function(){
    console.log($('.more-less').text());
    $('.more-text').slideToggle();
    if($('.more-less').text()=="Read More"){
        // $(this).style.display="visible";
        $(this).text("Read Less");
    }
    else{
        $(this).text("Read More");
    }
});

