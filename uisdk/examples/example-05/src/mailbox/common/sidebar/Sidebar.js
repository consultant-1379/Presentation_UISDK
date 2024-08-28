define([
    'Titan',
    './SidebarView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View();
            this.view.setPresenter(this);
        },

        setSelectedFolder: function (folderId) {
            this.view['item'].forEach(function (element) {
                element.removeModifier('selected');
            });
            this.view[folderId].addModifier('selected', true);
        }

    });

});