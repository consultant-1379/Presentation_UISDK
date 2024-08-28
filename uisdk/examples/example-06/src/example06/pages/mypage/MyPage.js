define([
    'Titan',
    './MyPageView',
    'example06/common/mycomponent/MyComponent'
], function (Titan, View, MyComponent) {

    return Titan.Presenter.extend({

        View: View,

        main: function () {
            var myComponent = new MyComponent();
            myComponent.addItem('item 1 without modifier');
            myComponent.addItem('item 2 with modifier disabled=false', false);
            myComponent.addItem('item 3 with modifier disabled=true', true);
            myComponent.start(this.view['container']);
            this.view['myWidget'].setText('item without modifier');
        }

    });

});
