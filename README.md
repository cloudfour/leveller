# Leveller

A jQuery plugin for equalizing element heights.

If you can, [you should use Flexbox instead](http://css-tricks.com/snippets/css/a-guide-to-flexbox/). See the [demo]() for an example.

For simple, single-row adjustments, [Equalizer](https://github.com/skrajewski/Equalizer) is a leaner, dependency-free solution.

- [Blog post](http://blog.cloudfour.com/leveller/)
- [Live demo](http://cloudfour.github.io/leveller/)

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
$('.example .column').leveller('reset');
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

## Troubleshooting

### Inconsistent heights

Leveller adjusts elements at the time it's called. If images, fonts or other external resources affect the layout later, the sizing will be off.

The solution is to call Leveller when the elements are ready to be equalized:

```javascript
// run leveller after the page has loaded
$(window).load(function(){
  $('.example .column').leveller();
});
```

This can also happen if you attempt to equalize elements that aren't visible yet (in a modal, for example). This can be resolved the same way:

```javascript
// run leveller after the Bootstrap modal is shown
$('#myModal').on('shown.bs.modal', function(){
  $(this).find('.column').leveller();
});
```

### Margin adjustments result in incorrect heights

This is most likely due to [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/margin_collapsing), and there are a few ways you can attempt to resolve.

You can stop margin collapsing in CSS using [the `clear` property](https://developer.mozilla.org/en-US/docs/Web/CSS/clear).

You can try specifying a different property that _doesn't_ collapse (for example, `padding-bottom` instead of `margin-bottom`).

Finally, there's the `adjustBy` option which lets you tweak height adjustments:

```javascript
$('.example .column').leveller({
  cssSelector: '.example-footer',
  cssProperty: 'margin-top'
  adjustBy: 4 // height adjustments will be 4px greater
});
```

If we wanted to base the value on the margin that's collapsing, we could do something like this:

```javascript
$('.example .column').leveller({
  cssSelector: '.example-footer',
  cssProperty: 'margin-top'
  adjustBy: parseInt($('.example-body').css('margin-bottom'), 10)
});
```

But it's probably cleaner to use a different property or tweak your CSS!

## History

- **0.1.2**: Improved docs, `package.json`
- **0.1.1**: UMD definition and strict equality
- **0.1.0**: Hello world!

## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT).
