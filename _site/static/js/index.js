$(document).ready(function() {

    categoryDisplay();
    generateContent();
    backToTop();
});

function categoryDisplay() {
    /*only show All*/
    $('.post-list-body>div[post-cate!=All]').hide();
    /*show category when click categories list*/
    $('.categories-list-item').click(function() {
        var cate = $(this).attr('cate'); //get category's name

        $('.post-list-body>div[post-cate!=' + cate + ']').hide(250);
        $('.post-list-body>div[post-cate=' + cate + ']').show(400);
    });
}


function backToTop() {
   
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $("#top").fadeIn(500);
        } else {
            $("#top").fadeOut(500);
        }
    });
    
    $("#top").click(function() {
        $("body,html").animate({
            scrollTop: "0"
        }, 500);
    });

    
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
}



function generateContent() {
    if (typeof $('#myArticle').html() === 'undefined') {
        return;
    }
    // console.log($('#markdown-toc').html());
    if (typeof $('#markdown-toc').html() === 'undefined') {        
        $('#docs-subnavbar').hide();
        //Expand article since we have no TOC contents
        $('#myArticle').removeClass('col-sm-9').addClass('col-sm-12');
        $('#myArticle').removeClass('col-md-9');
    } else {
        $('#docs-subnavbar .nav').html($('#markdown-toc').html());
        
        // $('#myAffix').attr({
        //     'data-spy': 'affix',
        //     'data-offset': '10'
        // });
        // $('#myAffix').width($('#myAffix').parent().width());
        // var maxHeight = $(window).height()-130;
        // console.log(maxHeight);
        // $('#docs-subnavbar .nav').css('max-height', maxHeight+'px');
        // console.log($(window).height());
    }
    // console.log("myAffix!!!");
}
