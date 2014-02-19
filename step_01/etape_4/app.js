jQuery('#hello').html("Hello World !");
jQuery('#hello').off('click').on('click',function(event){
    event.preventDefault();
    jQuery(event.target).css({
        'background-color':'#00FFFF'
    });
});