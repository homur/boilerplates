
$(function(){
	var portfolioRange = {start: $("#portfolio").offset().top , finish: ($("#portfolio").offset().top + $("#portfolio").outerHeight())- $(window).height()};
	
	// get the current window width
	winWidth = $(window).width();
	
	//menu items click scrolling
	$("nav.menu-desktop a, .mobile-menu li a").on("click", function(){
		var clickedItem = $(this).attr("data-scroll");
		var offsetTop = $("section#"+clickedItem).offset().top;
		if (winWidth < 768) {
			$('html, body').animate({
		        scrollTop: offsetTop-150
		    }, 400);	
		}
		else{
			$('html, body').animate({
		        scrollTop: offsetTop-100
		    }, 400);
		}

	});

	//headshot greeting animation
	$("img.head-shot").mouseenter(function(e){
		var greetSpan = $("span.greetings");
		greetSpan.addClass("animated bounceIn");
		greetSpan.css("display", "block");
		setTimeout(function(){
			greetSpan.removeClass("animated bounceIn");
			greetSpan.css("display", "none");
			$(this).mouseout(function(){
				return;
			})
		}, 3000)
	});
	
	//open mobile menu on click
	$("#openMobile").on("click", function(){
		var body = $("body, html, .mobile-menu-open");
		if (body.hasClass("mobilePassive")){
			body.removeClass("mobilePassive");
			body.addClass("mobileActive");
			return;	
		}
		if (body.hasClass("mobileActive")){
			body.removeClass("mobileActive");
			body.addClass("mobilePassive");
		}
		
	});

	//mobile menu items click
	$(".mobile-menu li a").on("click", function(){
		var body = $("body, html, .mobile-menu-open");
		body.removeClass("mobileActive");
		body.addClass("mobilePassive");
	});

	//seemore button click toggle
	$("#togglePortfolio").on("click", function(){
		if ($(this).hasClass("seeMore")) {
			$(".portfolio-item").each(function(i){
					$(this).slideDown();
				});
				$("#togglePortfolio").text('See Less');
				$("#togglePortfolio").addClass("seeLess");
				$("#togglePortfolio").removeClass("seeMore");
			}
		else if ($(this).hasClass("seeLess")) {
			console.log("hide");
			$(".portfolio-item").each(function(i){
				if (i >= 1) {
					$(this).slideUp()
				};
			});
			$("#togglePortfolio").text('See More');
			$("#togglePortfolio").addClass("seeMore");
			$("#togglePortfolio").removeClass("seeLess");
		}
	});

});

//fixed nav onresize
	$(window).on("resize", function(){
	console.log("onresize");
	winWidth = $(window).width();
	if ( winWidth >= 992) {
		$("header").addClass("fixed-nav");
		$(".title-col").hide();
	}
	else{
		$("header").removeClass("fixed-nav");
		$(".title-col").show();
	}
	});




