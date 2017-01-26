'use strict';

$(function(){

    var body = $('body');
    var windowWidth = $(window).outerWidth(), windowHeight = $(window).height();
    var nbSlides, i = 0, stringIndicator = '<li><a href="#" class="indicator"></a></li>', stringIndicatorVertical = '<li class="vertical"><a href="#" class="indicator"></a></li>', stringIndicators = '', indicators, currentSlide, indexCurrentSlide, indexIndicatorClicked, indexIndicatorHClicked, indexIndicatorVClicked, nextSlideIndex, slideClicked, nbSlidesVerticalBefore = 0;
    var currentScale, headerSlides = $('#header-slides'), contentHeader, currentSlide, headerNb;
    var contentHeaderHtml = '<header id="header-slides" class="invisible"><div class="content-header"><h1><span class="num-part"></span><span class="title-part"></span></h1></div></header>'

    window.requestAnimFrame = require('./requestAnimFrame.js');

    function setScale(){
        if(contentHeader != undefined){
            currentScale = Reveal.getScale();
            TweenMax.set(contentHeader, {scale: currentScale});
        }
    }

    function updatePageNumber(pageNumber){
        indicators.find('> li.active').removeClass('active');
        indicators.find('> li').eq(pageNumber).addClass('active');
    }

    function updateHeader(pageNumber){
        currentSlide = $('.slide-content').eq(pageNumber);
        headerNb = currentSlide.data('header-nb');
        if(headerNb != undefined){
            if(!headerSlides.length){
                $('.reveal').prepend(contentHeaderHtml);
            }
            headerSlides = $('#header-slides'), contentHeader = $('#header-slides .content-header');
            headerSlides.delay(100).queue(function(){ $(this).removeClass('invisible').dequeue(); });
            headerSlides.find('.num-part').html(currentSlide.data('header-nb'));
            headerSlides.find('.title-part').html(currentSlide.data('header-title'));
        }else{
            if(headerSlides.length){
                headerSlides.addClass('invisible');
            }
        }
    }

    function getCurrentSlideIndex(){
        currentSlide = Reveal.getCurrentSlide();
        return $(currentSlide).index('.slide-content');
    }

    Reveal.initialize({
        // Display controls in the bottom right corner
        controls: false,

        // Display a presentation progress bar
        progress: false,

        // Display the page number of the current slide
        slideNumber: false,

        // Push each slide change to the browser history
        history: true,

        // Enable keyboard shortcuts for navigation
        keyboard: true,

        // Enable the slide overview mode
        overview: true,

        // Vertical centering of slides
        center: true,

        // Enables touch navigation on devices with touch input
        touch: true,

        // Loop the presentation
        loop: false,

        // Change the presentation direction to be RTL
        rtl: false,

        // Randomizes the order of slides each time the presentation loads
        shuffle: false,

        // Turns fragments on and off globally
        fragments: true,

        // Flags if the presentation is running in an embedded mode,
        // i.e. contained within a limited portion of the screen
        embedded: false,

        // Flags if we should show a help overlay when the questionmark
        // key is pressed
        help: true,

        // Flags if speaker notes should be visible to all viewers
        showNotes: false,

        // Number of milliseconds between automatically proceeding to the
        // next slide, disabled when set to 0, this value can be overwritten
        // by using a data-autoslide attribute on your slides
        autoSlide: 0,

        // Stop auto-sliding after user input
        autoSlideStoppable: true,

        // Use this method for navigation when auto-sliding
        autoSlideMethod: Reveal.navigateNext,

        // Enable slide navigation via mouse wheel
        mouseWheel: false,

        // Hides the address bar on mobile devices
        hideAddressBar: true,

        // Opens links in an iframe preview overlay
        previewLinks: false,

        // Transition style
        transition: 'slide', // none/fade/slide/convex/concave/zoom

        // Transition speed
        transitionSpeed: 'default', // default/fast/slow

        // Transition style for full page slide backgrounds
        backgroundTransition: 'default', // none/fade/slide/convex/concave/zoom

        // Number of slides away from the current that are visible
        viewDistance: 3,

        // Parallax background image
        parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

        // Parallax background size
        parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

        // Number of pixels to move the parallax background per slide
        // - Calculated automatically unless specified
        // - Set to 0 to disable movement along an axis
        parallaxBackgroundHorizontal: null,
        parallaxBackgroundVertical: null,

        // The "normal" size of the presentation, aspect ratio will be preserved
        // when the presentation is scaled to fit different resolutions. Can be
        // specified using percentage units.
        width: 960,
        height: 750,

        // Factor of the display size that should remain empty around the content
        margin: 0.2,

        // Bounds for smallest/largest possible scale to apply to content
        minScale: 0.2,
        maxScale: 1.2
    });

    setScale();

    // Create footer indicators
    nbSlides = Reveal.getTotalSlides();
    for(i; i<nbSlides; i++){
        if($('.slide-content').eq(i).parent().hasClass('wrapper-vertical-slides')){
            // Vertical slide
            stringIndicators += stringIndicatorVertical;
        }else{
            stringIndicators += stringIndicator;
        }
    }
    indicators = $('.indicators');
    indicators.append(stringIndicators);
    indexCurrentSlide = getCurrentSlideIndex();
    indicators.find('> li').eq(indexCurrentSlide).addClass('active');

    updateHeader(indexCurrentSlide);

    body.on('click', '.indicator', function(){
        indexIndicatorClicked = $(this).parent().index();
        if($('.slide-content').eq(indexIndicatorClicked).parent().hasClass('wrapper-vertical-slides')){
            // Vertical slide
            nbSlidesVerticalBefore = $('.slide-content').eq(indexIndicatorClicked).parent().prevAll('.wrapper-vertical-slides').length;
            slideClicked = $('.slide-content').eq(indexIndicatorClicked);
            indexIndicatorHClicked = slideClicked.closest('.wrapper-vertical-slides').find('.slide-content').first().index('.slide-content') - nbSlidesVerticalBefore;
            indexIndicatorVClicked = $('.slide-content').eq(indexIndicatorClicked).closest('.wrapper-vertical-slides').find('.slide-content').index(slideClicked);
            Reveal.slide(indexIndicatorHClicked, indexIndicatorVClicked);
        }else{
            nbSlidesVerticalBefore = $('.slide-content').eq(indexIndicatorClicked).prevAll('.wrapper-vertical-slides').length;
            Reveal.slide(indexIndicatorClicked - nbSlidesVerticalBefore);
        }
        updatePageNumber(indexIndicatorClicked);

        return false;
    });

    // Slide Changed Event
    Reveal.addEventListener('slidechanged', function(event){
        indexCurrentSlide = getCurrentSlideIndex();
        updatePageNumber(indexCurrentSlide);
        updateHeader(indexCurrentSlide);
    });

    $(window).on('resize', function(){
        windowWidth = $(window).outerWidth();
        windowHeight = $(window).height();

        setScale();
	}).on('load', function(){

	});


    $(document).on('scroll', function(){

    });

});
