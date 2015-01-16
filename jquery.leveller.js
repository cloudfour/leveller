(function (factory, global) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals.
    factory(global.jQuery);
  }

}(function ($) {

  // Constructor
  // ===========

  var Leveller = function (elements, options) {
    this.$elements = $(elements);
    this.options = $.extend({}, Leveller.DEFAULTS, options);
  };

  Leveller.DATA_KEY = 'plugin_leveller';

  Leveller.DEFAULTS = {
    level: true,
    resetBefore: true,
    cssProperty: 'height',
    heightMethod: 'height',
    offsetMethod: 'offset',
    alignment: 'top'
  };

  Leveller.prototype.level = function () {
    var i = 0;
    var perRow = this.options.columns || this.getPerRow();
    if (this.options.resetBefore) {
      this.reset();
    }
    for ( ; i < this.$elements.length; i += perRow) {
      this.adjustElements(this.$elements.slice(i, i + perRow));
    }
  };

  Leveller.prototype.reset = function () {
    var $styleElements = this.options.cssSelector ? this.$elements.find(this.options.cssSelector) : this.$elements;
    $styleElements.css(this.options.cssProperty, '');
  };

  Leveller.prototype.adjustElements = function ($elements) {
    var i = 0;
    var targetHeight = this.getTallestHeight($elements);
    for ( ; i < $elements.length; i++) {
      this.adjustElement($elements.eq(i), targetHeight);
    }
  };

  Leveller.prototype.adjustElement = function ($element, targetHeight) {
    var currentHeight = $element[this.options.heightMethod]();
    var diff = targetHeight - currentHeight;
    if (diff === 0) return;

    var $styleElement = this.options.cssSelector ? $element.find(this.options.cssSelector) : $element;
    var styleValue = targetHeight;
    if (this.options.cssProperty.indexOf('eight') < 0) {
      styleValue = parseInt($styleElement.css(this.options.cssProperty), 10) + diff;
    }
    if (typeof this.options.adjustBy === 'string') {
      styleValue += parseInt($element.css(this.options.adjustBy), 10);
    } else if (typeof this.options.adjustBy === "number") {
      styleValue += this.options.adjustBy;
    }
    $styleElement.css(this.options.cssProperty, styleValue);
  };

  Leveller.prototype.getPerRow = function () {
    var i = 0;
    var offset = {};
    var $element, current, last;
    for ( ; i < this.$elements.length; i++) {
      $element = this.$elements.eq(i);
      offset = $element[this.options.offsetMethod]();
      current = offset.top;
      if (this.options.alignment === 'middle') {
        current += $element[this.options.heightMethod]() / 2;
      } else if (this.options.alignment === 'bottom') {
        current += $element[this.options.heightMethod]();
      }
      if (typeof last !== 'undefined' && current > last) {
        break;
      }
      last = current;
    }
    return i;
  };

  Leveller.prototype.getTallestHeight = function ($elements) {
    var heightMethod = this.options.heightMethod;
    $elements = $elements || this.$elements;
    var heights = $.map($elements, function (element, i) {
      return $(element)[heightMethod]();
    });
    return Math.max.apply(null, heights);
  };

  // Plugin
  // ======

  function Plugin (option) {
    var data = this.data(Leveller.DATA_KEY);
    var options = $.extend({}, Leveller.DEFAULTS, typeof option == 'object' && option);

    if (!data) {
      if (options.level && option == 'reset') options.level = false;
      this.data(Leveller.DATA_KEY, (data = new Leveller(this, options)));
    }

    if (typeof option === 'string') {
      data[option]();
    } else if (options.level) {
      data.level();
    }

    return this;
  }

  $.fn.leveller = Plugin;
  $.fn.leveller.Constructor = Leveller;

}, this));
