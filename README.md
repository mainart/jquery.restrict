$.restrict()
============

This jQuery plugin that allows you to restrict input of any text/password input field to specific characters.

### Features

* Uses direct input validation, instead of va≈lue altering
* Filters pasted values
* Supports `text` and `password` input types

#### Example 1

```javascript
	$('input[type=text]').restrict('123456789:');
```

This example illustrates the primary use case of the plugin and restricts given text input to list of numeric characters along with semicolon.

#### Example 2

In HTML:

```html
	<input type="text" data-restrict="1234567890:"/>
```

In JavaScript:

```javascript
	$('input[type=text]').restrict();
```

This example clones the funcionality of the 1<sup>st</sup> example, but here you define restriction rules directly in the `restrcit` attribute of an input field.

#### Notes

* Does not support character classes, e.g `a-z`, `0-9`
* Using `data-restrict` attribute of `input` field node will invalidate your pre-HTML5 makrup

#### Requirements

* jQuery 1.9.2 
* Internet Explorer 8 or newer

#### License

Released under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

#### Changelog

###### 1.1.0 - 21.04.2013

* Type check is replaced with filtering
* ESC key triggers `blur` event
* Fixed Meta + V key combo

###### 1.0.0 - 20.04.2013

* Initial release

