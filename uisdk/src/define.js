/*
 Binds the Titan object to 'Titan' for require.
 Wherever Titan is needed from this point onwards, using 'Titan' in require() or define() is sufficient.
 */
define('Titan', function () {
    return Titan;
});
