require([
    'Titan'
], function (Titan) {

    Titan.extension(function (env) {


        var $console = env.$('<div></div>', {
            css:{
                'background':'#fafafa',
                'border':'2px solid #ddd',
                'padding':'3px 5px',
                'position':'absolute',
                'right':'2px',
                'top':'2px',
                'width':'600px',
                'height':'200px',
                'overflow':'auto',
                'font':'12px monospace'
            }
        });


        Titan.console = {

            log:function () {
                $console.appendTo('body');
                var $line = env.$('<div></div>').css('lineHeight', '1.5em').prependTo($console);
                env.$('<span>&gt;&nbsp;</span>').appendTo($line);
                env._.each(arguments, function (arg) {
                    env.$('<span></span>', {
                        css:{
                            'padding':'0 2px',
                            'cursor':'pointer'
                        }
                    }).text(arg).appendTo($line).hover(
                        function () {
                            env.$(this).css({
                                'background': '#d00',
                                'color': '#fff',
                                'fontWeight':'bold'
                            });
                        },function () {
                            env.$(this).css({
                                'background': 'transparent',
                                'color': '#000',
                                'fontWeight':'normal'
                            });
                        }
                    ).click(function () {
                            console.log(arg);
                        }
                    );
                });
            }

        };


        Titan.console.log('jQuery is available in extension', env.$);
        Titan.console.log('underscore is available in extension', env._);
        Titan.console.log('Backbone is available in extension', env.Backbone);


    });

});