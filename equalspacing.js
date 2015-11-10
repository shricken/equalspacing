/****

To use this script, add the bundle to the appropriate page or layout, and either

- add the class "js-equalspacing" to the navigation's <ul> that you want to apply the spacing to.

or

- call the "equalspacing" function on another element of your choice

NOTE: this script will only work on the following HTML structure, and padding is applied padding to the <a> tag:

<ul>
    <li><a>item 1</a></li>
    <li><a>item 2</a></li>
    <li><a>item 3</a></li>
    <li><a>item 4</a></li>
    <li><a>item 5</a></li>
</ul>

****/

$.fn.equalSpacing = function (px) {
    $(this).each(function () {
        /* Calculate width of container minus static elements */
        var containerWidth = $(this).width();
        $(this).children("li.static-width").each(function () { containerWidth -= $(this).width(); });

        /* Calculate width of <li>s with dynamic padding */
        var sumWidths = 0;
        $(this).find("li:not(.static-width) a").each(function () { sumWidths += $(this).width(); });

        var childrenCount = $(this).children("li:not(.static-width)").length;
        var tertNavPadding = Math.floor(Math.floor(containerWidth - sumWidths) / (childrenCount * 2));
        if ((sumWidths + (tertNavPadding * childrenCount * 2)) >= containerWidth) {
            tertNavPadding -= 0.25;
        }
        $(this).find("li:not(.static-width) > a").each(function () {
            $(this).css("padding-left", tertNavPadding).css("padding-right", tertNavPadding)
        }).parent().css("visibility", "visible");
    });
    return this;
};

$(window).load(function () {
if($(".js-equalspacing").equalSpacing!=undefined){
		$(".js-equalspacing").equalSpacing();
	}
});
