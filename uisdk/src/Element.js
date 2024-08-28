_private.Element_setRoot = Element_setRoot;
function Element_setRoot(content) {
    if (_.isString(content)) {
        content = $.parseHTML(content);
    }
    this.__root__ = $(content);
}

_private.Element_getRoot = Element_getRoot;
function Element_getRoot() {
    return this.__root__;
}

_private.Element_getNames = Element_getNames;
function Element_getNames() {
    var names = [this.parent.namespace, this.parent.name];
    if (this.name) {
        names.push(this.name);
    }
    return names;
}

_private.Element_initClassNames = Element_initClassNames;
function Element_initClassNames() {
    if (this.parent.namespace && this.parent.name) {
        var root = Element_getRoot.call(this),
            names = Element_getNames.call(this);
        root.addClass(names.join('-'));
    }
}

_private.Element_addClassName = Element_addClassName;
function Element_addClassName(modifier) {
    var root = Element_getRoot.call(this),
        names = Element_getNames.call(this),
        value = this.getModifier(modifier.name);

    if (value !== undefined) {
        root.removeClass(names.join('-') + '_' + modifier.name + '_' + value);
    }

    this.mods[modifier.name] = modifier.value;
    root.addClass(names.join('-') + '_' + modifier.name + '_' + modifier.value);
}

_private.Element_removeClassName = Element_removeClassName;
function Element_removeClassName(modifierName) {
    var value = this.getModifier(modifierName),
        root,
        names;

    if (value !== undefined) {
        root = Element_getRoot.call(this);
        names = Element_getNames.call(this);
        root.removeClass(names.join('-') + '_' + modifierName + '_' + value);
        delete this.mods[modifierName];
    }
}


/**
 * Provides utility functions for dealing with adding of Widgets to containers
 *
 * @class Titan.Element
 * @param content {String} The CSS selector for the element(s) to be used as container(s)
 * @param options
 * @constructor
 */
Titan.Element = function (content, options) {
    if (!content && !this.template) {
        throw new Error('Cannot create Element without content or template');
    }

    this.mods = {};

    if (content) {
        Element_setRoot.call(this, content);
    } else {
        Element_setRoot.call(this, this.template());
    }

    if (options) {
        this.name = options.name;
        this.parent = options.parent;
        Element_initClassNames.call(this);
    }

    this.init();
};

Titan.Element.extend = Utils_extend;

Titan.Element.prototype = {

    init: function () {

    },

    /**
     * Appends a specified Widget to the container(s)
     *
     * @method addWidget
     * @param widget {Titan.View} The View to be added to the Element
     */
    addWidget: function (widget) {
        Element_getRoot.call(this).append(View_getRoot.call(widget));
    },

    /**
     * Detaches all the children from the container(s) and appends a specified Widget to the container(s)
     *
     * @method setWidget
     * @param widget {Titan.View} The View to be set as the sole content of the Element
     */
    setWidget: function (widget) {
        var root = Element_getRoot.call(this);
        root.children().detach();
        root.append(View_getRoot.call(widget));
    },
    removeWidget:function(widget){
        var root = Element_getRoot.call(this);
        root.children().remove();

    },
    addModifier: function (modifier, value) {
        Element_addClassName.call(this, {
            name: modifier,
            value: value
        });
    },

    removeModifier: function (modifier) {
        Element_removeClassName.call(this, modifier);
    },

    append: function (element, name) {
        if (name !== undefined && this.parent !== undefined && element.parent === undefined) {
            element.name = name;
            element.parent = this.parent;
            Element_initClassNames.call(element);
        }
        var parent = Element_getRoot.call(this),
            child = Element_getRoot.call(element);
        parent.append(child);
    },

    getModifier: function (name) {
        return this.mods[name];
    }


};

Titan.Element.jQMethods = function (methods) {
    if (!methods) {
        methods = [];
    }
    var defaults = ['text', 'html', 'bind', 'on', 'off', 'detach', 'val'],
        allMethods = _.union(defaults, methods);
    allMethods.forEach(function (fn) {
        if (Titan.Element.prototype[fn] === undefined) {
            Titan.Element.prototype[fn] = function () {
                var root = Element_getRoot.call(this);
                return root[fn].apply(root, arguments);
            };
        }
    });

};

Titan.Element.jQMethods();