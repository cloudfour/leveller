# leveller.js

Levels elements per row so that their heights match. Right now it's a jQuery plugin, but a vanilla JS version is planned.

This is super early right now. You're welcome to give it a whirl, but we don't have any fancy demos or even cross-browser testing yet. Consider this a version `0.1`.

If you can, [you should use Flexbox instead](http://css-tricks.com/snippets/css/a-guide-to-flexbox/).

If you only have a single row or you need to equalize widths, you should try [equalize.js](https://github.com/tsvensen/equalize.js).

## Usage

Equalize tile heights across rows with default options:

```javascript
$(elements).leveller();
```

Initialize with advanced options:

```javascript
// pass along options as object
$(elements).leveller({ /* ... */ });
// calling again on the same elements will retain options
$(window).resize(function(){
  $(elements).leveller();
});
```

Reset tile heights that have been set with leveller:

```javascript
$(elements).leveller('reset');
```

## Options

Option | Default | Description
--- | --- | ---
`level` | `true` | Whether or not to `level` right away by default.
`resetBefore` | `true` | If `false`, it will not reset the adjustable property before making new adjustments. This can have weird results, but may be necessary if you have other plugins or JS modifying styles.
`cssProperty` | `'height'` | The CSS property to modify to adjust the height.
`heightMethod` | `'height'` | The jQuery method to use to determine the element's height. Could also be `outerHeight` or `innerHeight`.
`offsetMethod` | `'offset'` | The jQuery method to use to determine the element's position. Could also be `position`.
`alignment` | `'top'` | Can also be `middle` or `bottom` depending on the default alignment of your elements.
`cssSelector` | | A child selector within the parent element to modify instead of the parent (useful for adding space between child elements instead of affecting the overall height).
`columns` | | If specified, the plugin won't attempt to determine the column count per row. This can help performance if you know the column count will always be the same.
`adjustBy` | | If the new heights are just a _tad_ off, specifying this option can allow you to adjust them by a number (`2`) or a CSS property (`border-top`).

## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT).
