(function() {
  $.fn.extend({
    majTextCounter: function(options) {
      var checkCarLimit, checkLimit, checkWordLimit, displayContent, generateContent, settings, wordCount;
      settings = {
        wordLimit: 255,
        carLimit: 255,
        words: "words",
        letters: "letters",
        separator: " | ",
        class_counter: "maj-text-counter",
        maximum: "MAX :"
      };
      settings = $.extend(settings, options);
      wordCount = function(ch) {
        return ch.replace(/[ ,;\.!\?:\n\r]/gi, ' ').trim().replace(/\s+/gi, ' ').split(" ").length;
      };
      displayContent = function(obj) {
        var ch, max_span, message;
        ch = $(obj).val();
        max_span = "<span class=\"maximum\">" + settings.maximum + settings.wordLimit + "</span>";
        message = wordCount(ch) + " " + settings.words;
        if (checkWordLimit(obj)) {
          message += " (" + max_span + ") ";
        }
        message += settings.separator;
        max_span = "<span class=\"maximum\">" + settings.maximum + settings.carLimit + "</span>";
        message += ch.length + " " + settings.letters;
        if (checkCarLimit(obj)) {
          message += " (" + max_span + ")";
        }
        $(obj).parent().find("." + settings.class_counter).html(message);
      };
      checkCarLimit = function(obj) {
        var ch;
        ch = $(obj).val();
        return ch.length >= settings.carLimit;
      };
      checkWordLimit = function(obj, event) {
        var ch, code;
        ch = $(obj).val();
        if (!event) {
          return wordCount(ch) >= settings.wordLimit;
        }
        code = event.which;
        return wordCount(ch) >= settings.wordLimit && [32, 188, 190, 191, 186].indexOf(code) !== -1;
      };
      checkLimit = function(obj, event) {
        if (checkCarLimit(obj)) {
          return false;
        }
        if (checkWordLimit(obj, event)) {
          return false;
        }
        return true;
      };
      generateContent = function(obj) {
        var new_span;
        new_span = $("<span>", {
          "class": settings.class_counter
        });
        $(obj).after(new_span);
        $(obj).keydown(function(event) {
          return checkLimit(this, event);
        });
        $(obj).keyup(function() {
          return displayContent(this);
        });
        displayContent(obj);
      };
      return this.each(function() {
        return generateContent(this);
      });
    }
  });

}).call(this);
