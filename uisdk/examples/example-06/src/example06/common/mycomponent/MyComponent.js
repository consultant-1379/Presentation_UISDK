define([
    'Titan',
    './MyComponentView',
    './mywidget/MyWidget',
    './myelement/MyElement'
], function (Titan, View, MyWidget, MyElement) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View();
            this.view.setPresenter(this);

            var container = this.view.container;

            this.view['buttonNoStyles'].bind('click', function () {
                container.append(new MyElement());
            });
            this.view['buttonPrimary'].bind('click', function () {
                var primary = new MyElement();
                primary.setText('Primary');
                container.append(primary, 'primary');
            });
            this.view['buttonSecondary'].bind('click', function () {
                var secondary = new MyElement();
                secondary.setText('Secondary');
                container.append(secondary, 'secondary');
            });
        },

        addItem: function (text, disabled) {
            var myWidget = new MyWidget();
            myWidget.setText(text);
            if (disabled != null) {
                myWidget[MyWidget.EL_LABEL].addModifier(MyWidget.MOD_DISABLED, disabled);
            }
            this.view['list'].addWidget(myWidget);
        }

    });

});
