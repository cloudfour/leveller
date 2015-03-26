# Leveller

A jQuery plugin for equalizing element heights.

If you can, [you should use Flexbox instead](http://css-tricks.com/snippets/css/a-guide-to-flexbox/). See the [demo]() for an example.

For simple, single-row adjustments, [Equalizer](https://github.com/skrajewski/Equalizer) is a leaner, dependency-free solution.

- [Blog post]()
- [Live demo]()

## Installation

Include the plugin after you've included [jQuery](http://jquery.com/):

```html
<script src="path/to/jquery.min.js"></script>
<script src="path/to/leveller.min.js"></script>
```

### Using [npm](https://www.npmjs.com/) and [Browserify](http://browserify.org/)

```
npm install --save jquery
npm install --save leveller
```
```javascript
var $ = require('jquery');
require('leveller');
```

## Usage

Equalize element heights across rows:

```javascript
$('.example .column').leveller();
```

Apply adjustments to a property of a child element:

```javascript
$('.example .column').leveller({
  cssSelector: '.example-footer',
  cssProperty: 'margin-top'
});
```

Adjust on window resize:

```javascript
// pass along options (if any) the first time
$('.example .column').leveller({ /* ... */ });

$(window).resize(function(){
  // calling again on the same elements will retain options
  $('.example .column').leveller();
});
```

Reset tile heights that have been set with Leveller:

```javascript
$(elements).leveller('reset');
```

## Options

Option | Default | Description
--- | --- | ---
`level` | `true` | Whether or not to `level` right away by default.
`resetBefore` | `true` | If `false`, it will not reset the adjustable property before making new adjustments. This can have weird results, but may be necessary if you have other plugins or JS modifying styles.
`cssProperty` | `'min-height'` | The CSS property to modify to adjust the height.
`heightMethod` | `'outerHeight'` | The jQuery method to use to determine the element's height. Could also be `height` or `innerHeight`.
`offsetMethod` | `'offset'` | The jQuery method to use to determine the element's position. Could also be `position`.
`alignment` | `'top'` | Can also be `middle` or `bottom` depending on the default alignment of your elements.
`cssSelector` | | A child selector within the parent element to modify instead of the parent (useful for adding space between child elements instead of affecting the overall height).
`columns` | | If specified, the plugin won't attempt to determine the column count per row. This can help performance if you know the column count will always be the same.
`adjustBy` | | If the new heights are just a _tad_ off, specifying this option can allow you to adjust them by a number (`2`) or a CSS property (`border-top`).

## History

- **0.1.2**: Improved docs, `package.json`
- **0.1.1**: UMD definition and strict equality
- **0.1.0**: Hello world!

## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT).
