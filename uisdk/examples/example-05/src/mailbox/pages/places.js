define([
    'Titan',
    './mail/places/PlaceDefault',
    './mail/places/PlaceInbox',
    './mail/places/PlaceSent',
    './mail/places/PlaceTrash',
    './mail/places/PlaceMessage',
    './settings/SettingsPlace'
], function (Titan) {

    return Titan.utils.getListFromArguments(arguments, 1);

});