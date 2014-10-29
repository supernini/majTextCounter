/*!
* jQuery Maj Text Counter Plugin v0.1
* https://github.com/supernini/majTextCounter
*
* Copyright 2014 miseajour.net
* Released under the MIT license
*/

$.fn.extend
  majTextCounter: (options) ->
    # Default settings
    settings =
      wordLimit: 255
      carLimit: 255
      words: "words"
      letters: "letters"
      separator: " | "
      class_counter: "maj-text-counter"
      maximum: "MAX :"

    settings = $.extend settings, options
    
    wordCount = (ch) ->
      return ch.replace(/[ ,;\.!\?:\n\r]/gi, ' ').trim().replace(/\s+/gi, ' ').split(" ").length
    
    displayContent = (obj) ->
      ch = $(obj).val()
      max_span = "<span class=\"maximum\">" + settings.maximum + settings.wordLimit + "</span>"
      message = wordCount(ch) + " " + settings.words
      message += " (" + max_span + ") " if checkWordLimit(obj)
      message += settings.separator

      max_span = "<span class=\"maximum\">" + settings.maximum + settings.carLimit + "</span>"
      message += ch .length + " " + settings.letters
      message += " (" + max_span + ")" if checkCarLimit(obj)
      
      $(obj).parent().find("." + settings.class_counter).html message
      return
      
    checkCarLimit = (obj)->
      ch = $(obj).val()
      return ch.length >= settings.carLimit
      
    checkWordLimit = (obj, event)->
      ch = $(obj).val()
      if !event
        return wordCount(ch) >= settings.wordLimit
      code = event.which
      return wordCount(ch) >= settings.wordLimit && [32,188, 190, 191,186].indexOf(code)!=-1
      
    checkLimit = (obj, event) ->
      return false if checkCarLimit(obj)
      return false if checkWordLimit(obj, event)
      return true
      
      
    generateContent = (obj) ->
      new_span = $("<span>", {class: settings.class_counter})
      $( obj ).after( new_span );
      $( obj ).keydown (event) ->
        return checkLimit(this, event)
      $( obj ).keyup ->
        displayContent(this)
      displayContent(obj)
      return

    return @each ()->
      generateContent this
      
$ ->
  $(".text-counter").majTextCounter { wordLimit: 3}