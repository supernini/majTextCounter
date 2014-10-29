# maj Text Counter Plugin

A jQuery plugin for counting and limiting characters/words on text input, or textarea, elements (using .val()).

## Installation

Include script after the jQuery library:

```html
<script src="/javascripts/maj-text-counter.js"></script>
```

## Usage

Basic usage:

```javascript
$('input').majTextCounter();
```

Limit to a maximum words count:

```javascript
$('input').majTextCounter({
	wordLimit: 10,
});
```

Limit to a maximum caracters count:

```javascript
$('input').majTextCounter({
	carLimit: 10,
});
```

Speak french ?:

```javascript
$('input').majTextCounter({
    words: "mots",
    letters: "lettres",
    separator: " & ",
    maximum: "MAX :",
});
```

## Elements

By default the plugin add the following element after the input/textarea:

```html
<span class="maj-text-counter">2 words | 14 letters</span>
```

## Development

- Source hosted at [GitHub](https://github.com/supernini/majTextCounter)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/supernini/majTextCounter/issues)


## Authors

[miseajour](http://www.miseajour.net)
