

// Hogan



// Libraries







// Verlag


// Backbone



    
// Router



;
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */




var Hogan = {};

(function (Hogan, useArrayBuffer) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options;
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.ib();
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // ensurePartial
    ep: function(symbol, partials) {
      var partial = this.partials[symbol];

      // check to see that if we've instantiated this partial before
      var template = partials[partial.name];
      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }
        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      }

      // We use this to check whether the partials dictionary has changed
      this.partials[symbol].base = template;

      if (partial.subs) {
        template = createSpecializedPartial(template, partial.subs, partial.partials);
      }

      this.partials[symbol].instance = template;
      return template;
    },

    // tries to find a partial in the curent scope and render it
    rp: function(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);
      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = (val === '') || !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        return ctx[ctx.length - 1];
      }

      for (var i = 1; i < names.length; i++) {
        if (val && typeof val == 'object' && val[names[i]] != null) {
          cx = val;
          val = val[names[i]];
        } else {
          val = '';
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        if (v && typeof v == 'object' && v[key] != null) {
          val = v[key];
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ls: function(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;

      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;

      return false;
    },

    // compile text
    ct: function(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }
      return this.c.compile(text, this.options).render(cx, partials);
    },

    // template result buffering
    b: (useArrayBuffer) ? function(s) { this.buf.push(s); } :
                          function(s) { this.buf += s; },

    fl: (useArrayBuffer) ? function() { var r = this.buf.join(''); this.buf = []; return r; } :
                           function() { var r = this.buf; this.buf = ''; return r; },
    // init the buffer
    ib: function () {
      this.buf = (useArrayBuffer) ? [] : '';
    },

    // method replace section
    ms: function(func, ctx, partials, inverted, start, end, tags) {
      var cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          return this.ls(result, cx, partials, this.text.substring(start, end), tags);
        }
      }

      return result;
    },

    // method replace variable
    mv: function(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },

    sub: function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        f(context, partials, this, indent);
      }
    }

  };

  function createSpecializedPartial(instance, subs, partials) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.ib();

    for (key in subs) {
      partial.subs[key] = subs[key];
    }

    for (key in partials) {
      partial.partials[key] = partials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos =/\'/g,
      rQuot = /\"/g,
      hChars =/[&<>\"\']/;

  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp,'&amp;')
        .replace(rLt,'&lt;')
        .replace(rGt,'&gt;')
        .replace(rApos,'&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(typeof exports !== 'undefined' ? exports : Hogan);



(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g;

  Hogan.tags = {
    '#': 1, '^': 2, '<': 3, '$': 4,
    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
    '{': 10, '&': 11, '_t': 12
  };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push({tag: '_t', text: new String(buf)});
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (tokens[j].text) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].text.toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = Hogan.tags[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  // the tags allowed inside super templates
  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        tail = null,
        token = null;

    tail = stack[stack.length - 1];

    while (tokens.length > 0) {
      token = tokens.shift();

      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
        throw new Error('Illegal content in < super tag.');
      }

      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else if (token.tag == '\n') {
        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
      }

      instructions.push(token);
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function stringifySubstitutions(obj) {
    var items = [];
    for (var key in obj) {
      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
    }
    return "{ " + items.join(",") + " }";
  }

  function stringifyPartials(codeObj) {
    var partials = [];
    for (var key in codeObj.partials) {
      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
    }
    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
  }

  Hogan.stringify = function(codeObj, text, options) {
    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
  }

  var serialNo = 0;
  Hogan.generate = function(tree, text, options) {
    serialNo = 0;
    var context = { code: '', subs: {}, partials: {} };
    Hogan.walk(tree, context);

    if (options.asString) {
      return this.stringify(context, text, options);
    }

    return this.makeTemplate(context, text, options);
  }

  Hogan.wrapMain = function(code) {
    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
  }

  Hogan.template = Hogan.Template;

  Hogan.makeTemplate = function(codeObj, text, options) {
    var template = this.makePartials(codeObj);
    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
    return new this.template(template, text, this, options);
  }

  Hogan.makePartials = function(codeObj) {
    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
    for (key in template.partials) {
      template.partials[key] = this.makePartials(template.partials[key]);
    }
    for (key in codeObj.subs) {
      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
    }
    return template;
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {name: node.n, partials: {}};
    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }

  Hogan.codegen = {
    '#': function(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                      't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },

    '^': function(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },

    '>': createPartial,
    '<': function(node, context) {
      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },

    '$': function(node, context) {
      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;
      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },

    '\n': function(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },

    '_v': function(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },

    '_t': function(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },

    '{': tripleStache,

    '&': tripleStache
  }

  function tripleStache(node, context) {
    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
  }

  function write(s) {
    return 't.b(' + s + ');';
  }

  Hogan.walk = function (nodelist, context) {
    var func;
    for (var i = 0, l = nodelist.length; i < l; i++) {
      func = Hogan.codegen[nodelist[i].tag];
      func && func(nodelist[i], context);
    }
    return context;
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  },

  Hogan.cache = {};

  Hogan.cacheKey = function(text, options) {
    return [text, !!options.asString, !!options.disableLambda].join('||');
  },

  Hogan.compile = function(text, options) {
    options = options || {};
    var key = Hogan.cacheKey(text, options);
    var template = this.cache[key];

    if (template) {
      return template;
    }

    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = template;
  };
})(typeof exports !== 'undefined' ? exports : Hogan);

        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["assets/edit"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"modal edit-asset hide\">");t.b("\n" + i);t.b("  <div class=\"modal-header\">");t.b("\n" + i);t.b("    <a class=\"close\" data-dismiss=\"modal\">×</a>");t.b("\n" + i);t.b("    <h3>Edit Asset</h3>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("     ");t.b("\n" + i);if(t.s(t.f("asset",c,p,1),c,p,0,162,1711,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"modal-body\">");t.b("\n" + i);t.b("      <form method=\"post\" action=\"/admin/assets/");t.b(t.v(t.f("id",c,p,0)));t.b("\" enctype=\"multipart/form-data\" id=\"edit-asset\" class=\"command-save\">");t.b("\n" + i);t.b("      ");t.b("\n" + i);if(t.s(t.f("is_image",c,p,1),c,p,0,340,463,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"image display\" id=\"image-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <img src=\"");t.b(t.v(t.f("asset_path",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("is_image",c,p,1),c,p,1,0,0,"")){t.b("    <div class=\"downloads\">");t.b("\n" + i);t.b("      <h1>");t.b(t.v(t.f("ext",c,p,0)));t.b("</h1>");t.b("\n" + i);t.b("      <p>");t.b("\n" + i);t.b("        Download: ");t.b("\n" + i);t.b("        <a href=\"");t.b(t.v(t.f("asset_path",c,p,0)));t.b("\">");t.b(t.v(t.f("file_name",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("      </p>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);};t.b("    <div class=\"image-info\" id=\"image-info-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div class=\"hidden\">");t.b("\n" + i);t.b("          <input type=\"hidden\" name=\"_method\" value=\"put\" />");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"field\">");t.b("\n" + i);t.b("          Path: /images/");t.b(t.v(t.f("id",c,p,0)));t.b("/");t.b(t.v(t.f("file_name",c,p,0)));t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"field\">");t.b("\n" + i);t.b("          <input type=\"text\" name=\"name\" id=\"asset-name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />");t.b("\n" + i);t.b("        </div> ");t.b("\n" + i);t.b("        <div class=\"field\">");t.b("\n" + i);t.b("          <label for=\"asset_tags\">Tags</label> ");t.b("\n" + i);t.b("          <input type=\"text\" name=\"tag_list\" id=\"asset-tag-list\" value=\"");t.b(t.v(t.f("tag_list",c,p,0)));t.b("\" class=\"textfield\" /> ");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        ");t.b("\n" + i);t.b("        <!--");if(t.s(t.f("previous",c,p,1),c,p,0,1299,1378,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<a class=\"previous\" href=\"/admin/assets/");t.b(t.v(t.f("id",c,p,0)));t.b("/edit");t.b(t.v(t.f("query_path",c,p,0)));t.b("\">Previous</a>");});c.pop();}t.b("\n" + i);t.b("        ");if(t.s(t.f("next",c,p,1),c,p,0,1409,1480,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<a class=\"next\" href=\"/admin/assets/");t.b(t.v(t.f("id",c,p,0)));t.b("/edit");t.b(t.v(t.f("query_path",c,p,0)));t.b("\">Next</a>");});c.pop();}t.b("-->");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"modal-footer\">");t.b("\n" + i);t.b("      <a href=\"#\" data-dismiss=\"modal\" class=\"cancel\">Cancel</a>");t.b("\n" + i);t.b("      <button type=\"submit\" class=\"btn btn-primary js-update\">Save</button>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");t.b("\n");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["assets/form"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"overlay\">");t.b("\n" + i);t.b("  <div class=\"modal\">");t.b("\n");t.b("\n" + i);t.b("    <h1>Upload Assets</h1>");t.b("\n" + i);t.b("       ");t.b("\n" + i);t.b("    <form action=\"/admin/assets\" id=\"uploader\" enctype=\"multipart/form-data\" class=\"js-create form-horizontal\" method=\"post\">");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("      <div class=\"control-group\">");t.b("\n" + i);t.b("        <label class=\"control-label\" for=\"file\">Choose a file</label>");t.b("\n" + i);t.b("        <div class=\"controls\">");t.b("\n" + i);t.b("          <input id=\"file\" name=\"file\" type=\"file\" multiple=\"multiple\"><!--  -->");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("      <div id=\"progress\">0</div>");t.b("\n" + i);t.b("      <div id=\"percent\">0</div>");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("      <div class=\"form-actions\">");t.b("\n" + i);t.b("        <button type=\"submit\" class=\"btn js-create\">Upload</button>");t.b("\n" + i);t.b("        <a href=\"/admin/assets\" class=\"close\">Cancel</a> ");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("    </form>  ");t.b("\n");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["assets/index"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<aside id=\"sidebar\">");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("</aside>");t.b("\n");t.b("\n" + i);t.b("<section id=\"main\" class=\"assets\">");t.b("\n");t.b("\n" + i);t.b("  <header class=\"header\" id=\"folder-info\">");t.b("\n" + i);t.b("    ");t.b("\n" + i);t.b("  </header>");t.b("\n");t.b("\n" + i);t.b("  <ul id=\"assets\" class=\"unstyled\">");t.b("\n" + i);if(t.s(t.f("assets",c,p,1),c,p,0,184,207,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<node0",c,p,"      "));});c.pop();}t.b("  </ul>");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("</section>");t.b("\n");t.b("\n");return t.fl(); },partials: {"<node0":{name:"node", partials: {}, subs: {  }}}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["assets/node"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li id=\"asset-");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"asset\">");t.b("\n" + i);t.b("  <div class=\"image\">");t.b("\n" + i);t.b("    <a href=\"");t.b(t.v(t.f("admin_path",c,p,0)));t.b("\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"js-show-asset\">");t.b("\n" + i);if(t.s(t.f("is_image",c,p,1),c,p,0,153,247,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <img src=\"");t.b(t.v(t.f("image_path",c,p,0)));t.b("?w=240&amp;h=180&amp;c=t&amp;g=North\" alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" />");t.b("\n" + i);});c.pop();}if(!t.s(t.f("is_image",c,p,1),c,p,1,0,0,"")){t.b("      <img src=\"/icons/file.png\" alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" />");t.b("\n" + i);};t.b("    </a>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <p>");t.b(t.v(t.f("name",c,p,0)));t.b("</p> ");t.b("\n" + i);t.b("  <a href=\"");t.b(t.v(t.f("admin_path",c,p,0)));t.b("/remove\" class=\"remove-icon js-remove\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">remove</a>");t.b("\n" + i);t.b("</li>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["assets/toolbar"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<header>");t.b("\n" + i);t.b("  <h1>");if(t.s(t.f("folder",c,p,1),c,p,0,28,38,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.f("name",c,p,0)));});c.pop();}t.b("</h1>");t.b("\n" + i);t.b("  <a class=\"btn js-new-folder\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" href=\"/admin/folders/new\">New Folder</a>");t.b("\n" + i);t.b("  <a class=\"btn js-new-asset\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" href=\"/admin/assets/new\">New Asset</a>");t.b("\n" + i);t.b("  <form action=\"/admin/assets\" id=\"uploader\" enctype=\"multipart/form-data\" class=\"js-create form-horizontal\" method=\"post\">");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("    <div class=\"control-group\">");t.b("\n" + i);t.b("      <label class=\"control-label\" for=\"file\">Choose a file</label>");t.b("\n" + i);t.b("      <div class=\"controls\">");t.b("\n" + i);t.b("        <input id=\"file\" class=\"js-upload\" name=\"file\" type=\"file\" multiple=\"multiple\"><!--  -->");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</header><!--toolbar -->");t.b("\n");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["folders/form"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"hidden\">");t.b("\n" + i);t.b("  <input type=\"hidden\" id=\"parent_id\" name=\"parent_id\" value=\"");t.b(t.v(t.f("parent_id",c,p,0)));t.b("\" />  ");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"name\">Name</label>");t.b("\n" + i);t.b("   <div class=\"controls\">");t.b("\n" + i);t.b("     <input type=\"text\" id=\"name\" name=\"name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("   </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["folders/index"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<ul class=\"folders unstyled\">");t.b("\n" + i);if(t.s(t.f("folders",c,p,1),c,p,0,46,65,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<node0",c,p,"    "));});c.pop();}t.b("</ul>     ");t.b("\n");t.b("\n" + i);t.b("<a class=\"btn js-new-folder\">New Folder</a>");t.b("\n");return t.fl(); },partials: {"<node0":{name:"node", partials: {}, subs: {  }}}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["folders/node"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"node level-");t.b(t.v(t.f("level",c,p,0)));t.b("\" id=\"folder-");t.b(t.v(t.f("id",c,p,0)));t.b("\"> ");t.b("\n" + i);t.b("  <div class=\"item\">");t.b("\n" + i);t.b("    <a class=\"js-show-folder\" id=\"edit-");t.b(t.v(t.f("id",c,p,0)));t.b("\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" href=\"");t.b(t.v(t.f("admin_path",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);t.b("    </a>     ");t.b("\n" + i);t.b("    <ul>");t.b("\n" + i);if(t.s(t.f("children",c,p,1),c,p,0,227,387,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li> ");t.b("\n" + i);t.b("        <a class=\"js-show-folder\" id=\"edit-");t.b(t.v(t.f("id",c,p,0)));t.b("\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" href=\"");t.b(t.v(t.f("admin_path",c,p,0)));t.b("\">");t.b("\n" + i);t.b("          ");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);t.b("        </a>");t.b("\n" + i);t.b("      </li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</li>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["folders/show"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("folder",c,p,1),c,p,0,13,606,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<h1>");t.b(t.v(t.f("name",c,p,0)));t.b("</h1>");t.b("\n" + i);t.b("<a class=\"btn js-settings\">Settings</a>");t.b("\n" + i);t.b("<a class=\"btn js-remove-folder\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">Remove Folder</a>");t.b("\n");t.b("\n" + i);t.b("<input id=\"file\" class=\"js-upload\" name=\"file\" type=\"file\" multiple=\"multiple\"><!--  -->");t.b("\n" + i);t.b("<!-- form action=\"/admin/assets\" id=\"uploader\" enctype=\"multipart/form-data\" class=\"js-create form-horizontal\" method=\"post\">");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("  <div class=\"control-group\">");t.b("\n" + i);t.b("    <label class=\"control-label\" for=\"file\">Choose a file</label>");t.b("\n" + i);t.b("    <div class=\"controls\">");t.b("\n" + i);t.b("      <input id=\"file\" class=\"js-upload\" name=\"file\" type=\"file\" multiple=\"multiple\">");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("</form> -->");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["image_parts/_edit"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("part",c,p,1),c,p,0,9,1985,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.f("name",c,p,0)));t.b(" <span class=\"timestamp\">");t.b(t.v(t.f("timestamp",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("<div id=\"selected-assets\"  class=\"\">");t.b("\n" + i);t.b("  <h1>Selected Asset</h1>  ");t.b("\n" + i);t.b("  <form method=\"post\" action=\"#/pages/");t.b(t.v(t.f("page_id",c,p,0)));t.b("/parts/");t.b(t.v(t.f("id",c,p,0)));t.b("\" enctype=\"multipart/form-data\" id=\"edit-part\">");t.b("\n" + i);t.b("    <div class=\"hidden\">");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"_method\" value=\"put\" /> ");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"part[id]\" id=\"part-");t.b(t.v(t.f("id",c,p,0)));t.b("-id\" value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"hidden\" />");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"part[name]\" id=\"part-");t.b(t.v(t.f("id",c,p,0)));t.b("-name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"hidden\" />");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"base_id\" id=\"base-");t.b(t.v(t.f("id",c,p,0)));t.b("\" value=\"");t.b(t.v(t.f("base_page_id",c,p,0)));t.b("\" class=\"hidden\" />");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"part[asset_id]\" id=\"part-asset-id\" value=\"");t.b(t.v(t.f("asset_id",c,p,0)));t.b("\" class=\"\" />");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <ul>");t.b("\n" + i);t.b("      <li class=\"asset\">");t.b("\n" + i);t.b("        <img class=\"preview\" src=\"/images/thumbnail/");t.b(t.v(t.f("asset_id",c,p,0)));t.b("/file_name_goes_here.jpg\" alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("      </li>");t.b("\n" + i);t.b("    </ul>");t.b("\n" + i);t.b("    ");t.b("\n" + i);t.b("    <div class=\"field\">");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    last updated: ");t.b("\n" + i);t.b("    <div class=\"actions\">");t.b("\n" + i);t.b("      <input type=\"submit\" value=\"Save\" class=\"button html-only\" />");t.b("\n" + i);t.b("      <a href=\"/admin/pages/");t.b(t.v(t.f("page_id",c,p,0)));t.b("\" class=\"cancel verlag-editor\">Cancel</a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"toolbar\">");t.b("\n" + i);t.b("  <form action=\"#/pages/");t.b(t.v(t.f("page_id",c,p,0)));t.b("/image_parts/");t.b(t.v(t.f("id",c,p,0)));t.b("/assets\" enctype=\"multipart/form-data\" class=\"upload-asset\" method=\"post\">");t.b("\n" + i);t.b("    <div class=\"hidden\">");t.b("\n" + i);t.b("      <input name=\"limit\" value=\"12\" type=\"hidden\" />");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"filefield\">");t.b("\n" + i);t.b("      <div class=\"uploader\">");t.b("\n" + i);t.b("        <input id=\"ajax_uploader\" name=\"file\" type=\"file\" />");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <label for=\"ajax_uploader\">Upload Images</label>");t.b("\n" + i);t.b("      <!--input type=\"submit\" value=\"Save\" class=\"button html-only\" /-->");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("  <form action=\"/admin/pages/");t.b(t.v(t.f("page_id",c,p,0)));t.b("/parts/");t.b(t.v(t.f("id",c,p,0)));t.b("/results\" class=\"search-form\" method=\"get\">");t.b("\n" + i);t.b("    <div class=\"field\">");t.b("\n" + i);t.b("      <input class=\"textfield\" id=\"search-query\" name=\"query\" type=\"text\">");t.b("\n" + i);t.b("      <input class=\"button search\" type=\"submit\" value=\"Search\">");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}t.b("  ");t.b("\n" + i);t.b("<div class=\"progress\"></div> ");t.b("\n" + i);t.b("<div id=\"search-results-container\" class=\"assets-container\"> ");t.b("\n" + i);t.b("  <h1>Recent Assets</h1>");t.b("\n" + i);t.b("  <ul id=\"part-assets\">");t.b("\n" + i);if(t.s(t.f("assets",c,p,1),c,p,0,2154,2324,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li id=\"asset-");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"asset\">");t.b("\n" + i);t.b("        <a href=\"#\">");t.b("\n" + i);t.b("          <img src=\"/images/icon/");t.b(t.v(t.f("id",c,p,0)));t.b("/");t.b(t.v(t.f("file_name",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("        </a>  ");t.b("\n" + i);t.b("      </li>");t.b("\n" + i);});c.pop();}t.b("  </ul>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);if(t.s(t.f("part",c,p,1),c,p,0,2361,2439,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <a href=\"/admin/pages/");t.b(t.v(t.f("page_id",c,p,0)));t.b("\" class=\"cancel verlag-editor\">Cancel</a>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["image_parts/edit"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("part",c,p,1),c,p,0,9,1149,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.f("name",c,p,0)));t.b(" <span class=\"timestamp\">");t.b(t.v(t.f("timestamp",c,p,0)));t.b("</span>");t.b("\n");t.b("\n" + i);t.b("  <h1>Selected Asset</h1>  ");t.b("\n" + i);t.b("  <a class='insert-image' href='");t.b(t.v(t.f("admin_path",c,p,0)));t.b("/edit'>insert widget goes here</a>");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("  <form method=\"post\" action=\"#/pages/");t.b(t.v(t.f("page_id",c,p,0)));t.b("/parts/");t.b(t.v(t.f("id",c,p,0)));t.b("\" enctype=\"multipart/form-data\" id=\"edit-part\">");t.b("\n" + i);t.b("    <div class=\"hidden\">");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"_method\" value=\"put\" /> ");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"part[id]\" id=\"part-");t.b(t.v(t.f("id",c,p,0)));t.b("-id\" value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"hidden\" />");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"part[name]\" id=\"part-");t.b(t.v(t.f("id",c,p,0)));t.b("-name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"hidden\" />");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"base_id\" id=\"base-");t.b(t.v(t.f("id",c,p,0)));t.b("\" value=\"");t.b(t.v(t.f("base_page_id",c,p,0)));t.b("\" class=\"hidden\" />");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"part[asset_id]\" id=\"part-asset-id\" value=\"");t.b(t.v(t.f("asset_id",c,p,0)));t.b("\" class=\"\" />");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div>");t.b("\n" + i);t.b("      <img src=\"/images/");t.b(t.v(t.f("asset_id",c,p,0)));t.b("/");t.b(t.v(t.f("file_name",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    ");t.b("\n" + i);t.b("    <div class=\"field\">");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    last updated: ");t.b("\n" + i);t.b("    <div class=\"actions\">");t.b("\n" + i);t.b("      <input type=\"submit\" value=\"Save\" class=\"button html-only\" />");t.b("\n" + i);t.b("      <a href=\"/admin/pages/");t.b(t.v(t.f("page_id",c,p,0)));t.b("\" class=\"cancel verlag-editor\">Cancel</a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n");t.b("\n" + i);});c.pop();}t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["image_parts/index"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"overlay\">");t.b("\n" + i);t.b("  <div class=\"modal image-browser\">");t.b("\n" + i);t.b("    <h2>Image Browser</h2>");t.b("\n" + i);t.b("    <ul class=\"assets\">");t.b("\n" + i);if(t.s(t.f("assets",c,p,1),c,p,0,121,436,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li id=\"asset-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div class=\"image\">");t.b("\n" + i);t.b("          <a href=\"");t.b(t.v(t.f("admin_path",c,p,0)));t.b("/edit");t.b(t.v(t.f("query_path",c,p,0)));t.b("\" id=\"edit-asset-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            <img src=\"/images/");t.b(t.v(t.f("id",c,p,0)));t.b("/");t.b(t.v(t.f("file_name",c,p,0)));t.b("?w=120&amp;h=90&amp;c=t&amp;g=North\" alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <p>");t.b(t.v(t.f("title",c,p,0)));t.b("<br />");t.b("\n" + i);t.b("      </li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["javascripts/form"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"hidden\">");t.b("\n" + i);t.b("  <input type=\"hidden\" id=\"template-klass\" name=\"klass\" value=\"");t.b(t.v(t.f("klass",c,p,0)));t.b("\" class=\"hidden\" />   ");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\"> ");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"template-name\">Name</label>");t.b("\n" + i);t.b("  <div class=\"controls\">");t.b("\n" + i);t.b("    <input type=\"text\" id=\"template-name\" name=\"name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["layouts/form"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"hidden\">");t.b("\n" + i);t.b("  <input type=\"hidden\" id=\"template-klass\" name=\"klass\" value=\"");t.b(t.v(t.f("klass",c,p,0)));t.b("\" class=\"hidden\" />   ");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\"> ");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"template-name\">Name</label>");t.b("\n" + i);t.b("  <div class=\"controls\">");t.b("\n" + i);t.b("    <input type=\"text\" id=\"template-name\" name=\"name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);if(t.s(t.f("part_types",c,p,1),c,p,0,374,509,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <p class=\"control-label\">");t.b(t.v(t.f("name",c,p,0)));t.b("</p> ");t.b("\n" + i);t.b("  <p class=\"controls\">");t.b("\n" + i);t.b("    Description goes here");t.b("\n" + i);t.b("  </p>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["page_types/new"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("model",c,p,1),c,p,0,12,551,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<h1>New Page</h1>  ");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"title\">Name</label>");t.b("\n" + i);t.b("   <div class=\"controls\">");t.b("\n" + i);t.b("     <input type=\"text\" id=\"title\" name=\"name\" value=\"\" class=\"textfield\" />  ");t.b("\n" + i);t.b("   </div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"layout\">Layout</label> ");t.b("\n" + i);t.b("  <div class=\"controls\">");t.b("\n" + i);t.b("    <select id=\"page-layout\" class=\"select\" name=\"layout_id\"> ");t.b("\n" + i);if(t.s(t.f("layouts",c,p,1),c,p,0,437,504,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <option value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" ");t.b(t.v(t.f("selected",c,p,0)));t.b(">");t.b(t.v(t.f("name",c,p,0)));t.b("</option>");t.b("\n" + i);});c.pop();}t.b("    </select>  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["pages/edit"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<aside id=\"sidebar\">");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("</aside>");t.b("\n");t.b("\n" + i);t.b("<section id=\"main\" class=\"page\">");t.b("\n" + i);if(t.s(t.f("page",c,p,1),c,p,0,80,469,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <header class=\"header\">");t.b("\n" + i);t.b("    <h1 id=\"page-title-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h1>");t.b("\n" + i);t.b("    <a class=\"btn js-settings\">Settings</a>");t.b("\n" + i);t.b("    <a class=\"btn js-new-child\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">Add Child</a>");t.b("\n" + i);t.b("    <a class=\"btn js-remove\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">Remove</a>");t.b("\n" + i);t.b("  </header>");t.b("\n" + i);t.b(" ");t.b("\n" + i);t.b("  <div id=\"preview-");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"preview\">");t.b("\n" + i);t.b("    <iframe src=\"/preview");t.b(t.v(t.f("path",c,p,0)));t.b("\" id=\"page-iframe-");t.b(t.v(t.f("id",c,p,0)));t.b("\"></iframe>");t.b("\n" + i);t.b("  </div>   ");t.b("\n" + i);t.b("  ");t.b("\n" + i);});c.pop();}t.b("</section>");t.b("\n");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["pages/form"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"hidden\">");t.b("\n" + i);t.b("  <input type=\"hidden\" id=\"parent_id\" name=\"parent_id\" value=\"");t.b(t.v(t.f("parent_id",c,p,0)));t.b("\" class=\"hidden\" />   ");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"page-title\">Title</label>");t.b("\n" + i);t.b("   <div class=\"controls\">");t.b("\n" + i);t.b("     <input type=\"text\" id=\"page-title\" name=\"title\" value=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("   </div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"slug\">Slug</label>");t.b("\n" + i);t.b("   <div class=\"controls\">");t.b("\n" + i);t.b("     <input type=\"text\" id=\"slug\" name=\"slug\" value=\"");t.b(t.v(t.f("slug",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("   </div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"keywords\">Keywords</label>");t.b("\n" + i);t.b("   <div class=\"controls\">");t.b("\n" + i);t.b("     <input type=\"text\" id=\"keywords\" name=\"keywords\" value=\"");t.b(t.v(t.f("keywords",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("   </div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"description\">Description</label>");t.b("\n" + i);t.b("   <div class=\"controls\">");t.b("\n" + i);t.b("     <input type=\"text\" id=\"description\" name=\"description\" value=\"");t.b(t.v(t.f("description",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("   </div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"page-layout\">Layout</label> ");t.b("\n" + i);t.b("  <div class=\"controls\">");t.b("\n" + i);t.b("    <select id=\"page-layout\" class=\"select\" name=\"layout_id\"> ");t.b("\n" + i);if(t.s(t.f("layouts",c,p,1),c,p,0,1260,1327,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <option value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" ");t.b(t.v(t.f("selected",c,p,0)));t.b(">");t.b(t.v(t.f("name",c,p,0)));t.b("</option>");t.b("\n" + i);});c.pop();}t.b("    </select>  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);if(t.s(t.f("parts",c,p,1),c,p,0,1387,1522,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <p class=\"control-label\">");t.b(t.v(t.f("name",c,p,0)));t.b("</p> ");t.b("\n" + i);t.b("  <p class=\"controls\">");t.b("\n" + i);t.b("    Description goes here");t.b("\n" + i);t.b("  </p>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["pages/index"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("root",c,p,1),c,p,0,11,81,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<ul class=\"unstyled page-children\" id=\"pages\">");t.b("\n" + i);t.b(t.rp("<node0",c,p,"  "));t.b("</ul>  ");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {"<node0":{name:"node", partials: {}, subs: {  }}}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["pages/node"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"node level-");t.b(t.v(t.f("level",c,p,0)));t.b("\" id=\"page-");t.b(t.v(t.f("id",c,p,0)));t.b("\"> ");t.b("\n" + i);t.b("  <div class=\"item\">");t.b("\n" + i);if(t.s(t.f("child?",c,p,1),c,p,0,90,230,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("children?",c,p,1),c,p,0,106,214,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <span style=\"padding-left: ");t.b(t.v(t.f("padding",c,p,0)));t.b("px;\" class=\"opener");if(t.s(t.f("open?",c,p,1),c,p,0,181,187,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" open ");});c.pop();}t.b("\">+</span>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("    <span class=\"title\" style=\"padding-left: ");t.b(t.v(t.f("padding",c,p,0)));t.b("px;\"> ");t.b("\n" + i);t.b("       <a class=\"js-show\" id=\"edit-");t.b(t.v(t.f("id",c,p,0)));t.b("\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" href=\"");t.b(t.v(t.f("admin_path",c,p,0)));t.b("\">");t.b(t.v(t.f("title",c,p,0)));t.b("</a>     ");t.b("\n" + i);t.b("    </span>");t.b("\n" + i);if(t.s(t.f("children?",c,p,1),c,p,0,440,550,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <span class=\"count\" style=\"padding-left: ");t.b(t.v(t.f("padding",c,p,0)));t.b("px;\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("child_count",c,p,0)));t.b(" Children");t.b("\n" + i);t.b("    </span>");t.b("\n" + i);});c.pop();}t.b("  </div>");t.b("\n" + i);if(t.s(t.f("children?",c,p,1),c,p,0,594,687,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <ul class=\"unstyled\">");t.b("\n" + i);if(t.s(t.f("children",c,p,1),c,p,0,638,661,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<node0",c,p,"      "));});c.pop();}t.b("  </ul>");t.b("\n" + i);});c.pop();}t.b("</li>");t.b("\n");t.b("\n");t.b("\n");t.b("\n");return t.fl(); },partials: {"<node0":{name:"node", partials: {}, subs: {  }}}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["pages/show"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("page",c,p,1),c,p,0,9,135,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div id=\"preview-");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"preview\">");t.b("\n" + i);t.b("  <iframe src=\"/preview");t.b(t.v(t.f("path",c,p,0)));t.b("\" id=\"page-iframe-");t.b(t.v(t.f("id",c,p,0)));t.b("\"></iframe>");t.b("\n" + i);t.b("</div>   ");t.b("\n" + i);t.b("  ");t.b("\n");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["pages/toolbar"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<section class=\"toolbar\">");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("  <header class=\"editbar\">");t.b("\n" + i);t.b("    <input type=\"button\" value=\"Bold\" data-cmd=\"bold\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"Italic\" data-cmd=\"italic\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"Underline\" data-cmd=\"underline\" />");t.b("\n" + i);t.b("    <!-- span class=\"separator\">|</span -->");t.b("\n" + i);t.b("    <!-- input type=\"button\" value=\"&lt;a&gt;\" data-cmd=\"createLink\" data-value=\"promptUser\" data-text=\"URL of link?\" / -->");t.b("\n" + i);t.b("    <!-- input type=\"button\" value=\"&lt;img /&gt;\" data-cmd=\"insertimage\" data-value=\"promptUser\" data-text=\"enter an image path\" / -->");t.b("\n" + i);t.b("    <span class=\"separator\">|</span>");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;sub&gt;\" data-cmd=\"subscript\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;sup&gt;\" data-cmd=\"superscript\" />");t.b("\n" + i);t.b("    <span class=\"separator\">|</span>");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;div&gt;\" data-cmd=\"formatblock\" data-value=\"div\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;p&gt;\" data-cmd=\"formatblock\" data-value=\"p\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;h1&gt;\" data-cmd=\"formatblock\" data-value=\"h1\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;h2&gt;\" data-cmd=\"formatblock\" data-value=\"h2\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;h3&gt;\" data-cmd=\"formatblock\" data-value=\"h3\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;h4&gt;\" data-cmd=\"formatblock\" data-value=\"h4\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;h5&gt;\" data-cmd=\"formatblock\" data-value=\"h5\" />");t.b("\n" + i);t.b("    <input type=\"button\" value=\"&lt;h6&gt;\" data-cmd=\"formatblock\" data-value=\"h6\" />");t.b("\n" + i);t.b("    <!--input type=\"button\" value=\"html\" id=\"inserthtml\" cmdValue=\"promptUser\" promptText=\"Valid HTML snippet\" /-->");t.b("\n" + i);t.b("  </header>");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("</section>  ");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["partials/form"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"hidden\">");t.b("\n" + i);t.b("  <input type=\"hidden\" id=\"template-klass\" name=\"klass\" value=\"");t.b(t.v(t.f("klass",c,p,0)));t.b("\" class=\"hidden\" />   ");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\"> ");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"template-name\">Name</label>");t.b("\n" + i);t.b("  <div class=\"controls\">");t.b("\n" + i);t.b("    <input type=\"text\" id=\"template-name\" name=\"name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["settings/index"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<aside id=\"sidebar\">");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("  <section>");t.b("\n" + i);t.b("    <h2>");t.b("\n" + i);t.b("      Page Types");t.b("\n" + i);t.b("      <span class=\"modify\">");t.b("\n" + i);t.b("        <a href=\"/admin/page_types/new\" class=\"js-new\">+</a>");t.b("\n" + i);t.b("      </span>");t.b("\n" + i);t.b("    </h2>");t.b("\n" + i);t.b("    <ul class=\"unstyled\">");t.b("\n" + i);if(t.s(t.f("page_types",c,p,1),c,p,0,222,356,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li>");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);t.b("      <a href=\"/admin/page_types/");t.b(t.v(t.f("id",c,p,0)));t.b("/remove\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"js-remove\">x</a>");t.b("\n" + i);t.b("    </li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("  </section>");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("  <section>");t.b("\n" + i);t.b("    <h2>Sites</h2>");t.b("\n" + i);t.b("    <ul class=\"unstyled\">");t.b("\n" + i);if(t.s(t.f("sites",c,p,1),c,p,0,473,506,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li>");t.b(t.v(t.f("domain",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("  </section>");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("  <section>");t.b("\n" + i);t.b("    <h2>Users</h2>");t.b("\n" + i);t.b("    <ul class=\"unstyled\">");t.b("\n" + i);if(t.s(t.f("users",c,p,1),c,p,0,618,650,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li>");t.b(t.v(t.f("email",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("  </section>");t.b("\n");t.b("\n" + i);t.b("</aside>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["shared/insert"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("model",c,p,1),c,p,0,12,467,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"modal hide\">");t.b("\n" + i);t.b("  <div class=\"modal-header\">");t.b("\n" + i);t.b("    <a class=\"close\" data-dismiss=\"modal\">×</a>");t.b("\n" + i);t.b("    <h3>Insert</h3>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <form method=\"post\" class=\"js-update form-horizontal\">");t.b("\n" + i);t.b("    <div class=\"modal-body\">   ");t.b("\n" + i);t.b(t.rp("<form0",c,p,"      "));t.b("    </div>");t.b("\n" + i);t.b("    ");t.b("\n" + i);t.b("    <div class=\"modal-footer\">");t.b("\n" + i);t.b("      <a href=\"#\" data-dismiss=\"modal\" class=\"cancel\">Cancel</a>");t.b("\n" + i);t.b("      <button type=\"submit\" class=\"btn btn-primary js-create\">Save</button>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {"<form0":{name:"form", partials: {}, subs: {  }}}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["shared/loader"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"loader\">");t.b("\n" + i);t.b("  <img src=\"/images/ajax-loader-site.gif\">");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["shared/new"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"modal hide\">");t.b("\n" + i);t.b("  <div class=\"modal-header\">");t.b("\n" + i);t.b("    <a class=\"close\" data-dismiss=\"modal\">×</a>");t.b("\n" + i);t.b("    <h3>New ");t.b(t.v(t.f("name",c,p,0)));t.b("</h3>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <form method=\"post\" class=\"js-create form-horizontal\">");t.b("\n" + i);t.b("    <div class=\"modal-body\">   ");t.b("\n" + i);if(t.s(t.f("model",c,p,1),c,p,0,244,267,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form0",c,p,"      "));});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"modal-footer\">");t.b("\n" + i);t.b("      <a href=\"#\" data-dismiss=\"modal\" class=\"cancel\">Cancel</a>");t.b("\n" + i);t.b("      <button type=\"submit\" class=\"btn btn-primary js-create\">Save</button>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<form0":{name:"form", partials: {}, subs: {  }}}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["shared/remove"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("model",c,p,1),c,p,0,12,734,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"modal hide\">");t.b("\n" + i);t.b("  <div class=\"modal-header\">");t.b("\n" + i);t.b("    <a class=\"close\" data-dismiss=\"modal\">×</a>");t.b("\n" + i);t.b("    <h3>Remove</h3>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <form method=\"post\" action=\"");t.b(t.v(t.f("admin_url",c,p,0)));t.b("\" enctype=\"multipart/form-data\" class=\"remove\">");t.b("\n" + i);t.b("    <div class=\"modal-body\">");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("      <div class=\"hidden\">                   ");t.b("\n" + i);t.b("        <input type=\"hidden\" name=\"_method\" value=\"delete\" />");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"note\"> ");t.b("\n" + i);t.b("        Are you sure you want to delete <strong>");t.b(t.v(t.f("name",c,p,0)));t.b(t.v(t.f("title",c,p,0)));t.b("</strong>?");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      ");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"modal-footer\">");t.b("\n" + i);t.b("      <a href=\"#\" data-dismiss=\"modal\" class=\"cancel\">Cancel</a>");t.b("\n" + i);t.b("      <button type=\"submit\" class=\"btn btn-primary js-delete\">Remove</button>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form> ");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["shared/settings"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("model",c,p,1),c,p,0,12,478,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"modal settings hide\">");t.b("\n" + i);t.b("  <div class=\"modal-header\">");t.b("\n" + i);t.b("    <a class=\"close\" data-dismiss=\"modal\">×</a>");t.b("\n" + i);t.b("    <h3>Settings</h3>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <form method=\"post\" class=\"js-update form-horizontal\">");t.b("\n" + i);t.b("    <div class=\"modal-body\">   ");t.b("\n" + i);t.b(t.rp("<form0",c,p,"      "));t.b("    </div>");t.b("\n" + i);t.b("    ");t.b("\n" + i);t.b("    <div class=\"modal-footer\">");t.b("\n" + i);t.b("      <a href=\"#\" data-dismiss=\"modal\" class=\"cancel\">Cancel</a>");t.b("\n" + i);t.b("      <button type=\"submit\" class=\"btn btn-primary js-create\">Save</button>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {"<form0":{name:"form", partials: {}, subs: {  }}}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["sites/edit"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("site",c,p,1),c,p,0,9,983,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<h1>Edit Site</h1>  ");t.b("\n");t.b("\n" + i);t.b("<form action=\"/admin/sites/");t.b(t.v(t.f("id",c,p,0)));t.b("\" method= \"post\" class=\"command-save autosave\">   ");t.b("\n" + i);t.b("  <div class=\"hidden\">");t.b("\n" + i);t.b("    <input type=\"hidden\" name=\"_method\" value=\"put\" /> ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"field\">   ");t.b("\n" + i);t.b("    <label for=\"site_name\">Name</label>");t.b("\n" + i);t.b("    <input type=\"text\" id=\"site_name\" name=\"site[name]\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div> ");t.b("\n" + i);t.b("  <div class=\"field\">   ");t.b("\n" + i);t.b("    <label for=\"site_domain\">Domain</label>");t.b("\n" + i);t.b("    <input type=\"text\" id=\"site_domain\" name=\"site[domain]\" value=\"");t.b(t.v(t.f("domain",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"field\">   ");t.b("\n" + i);t.b("    <label for=\"site_subdomain\">Subdomain</label>");t.b("\n" + i);t.b("    <input type=\"text\" id=\"site_subdomain\" name=\"site[subdomain]\" value=\"");t.b(t.v(t.f("subdomain",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"actions\">");t.b("\n" + i);t.b("    <input type=\"submit\" id=\"page_save\" value=\"Save\" class=\"button\" /> ");t.b("\n" + i);t.b("    <a href=\"/admin/sites\" class=\"cancel\">Cancel</a> ");t.b("\n" + i);t.b("    <a href= \"http://");t.b(t.v(t.f("domain",c,p,0)));t.b("/admin/\">Switch to this Site</a>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</form>  ");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["sites/index"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"sites\" class=\"listing\">");t.b("\n" + i);t.b("  <h1>Sites</h1> ");t.b("\n" + i);t.b("  <ul>");t.b("\n" + i);if(t.s(t.f("sites",c,p,1),c,p,0,70,453,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"site\" id=\"site-");t.b(t.v(t.f("id",c,p,0)));t.b("\"> ");t.b("\n" + i);t.b("      <div class=\"item\"> ");t.b("\n" + i);t.b("        <span class=\"title\"> ");t.b("\n" + i);t.b("           ");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);t.b("        </span> ");t.b("\n" + i);t.b("        <span class=\"modify\">                 ");t.b("\n" + i);t.b("          <a class=\"edit-site\" id=\"edit-site-");t.b(t.v(t.f("id",c,p,0)));t.b("\" href=\"/admin/sites/");t.b(t.v(t.f("id",c,p,0)));t.b("/edit\">edit</a>    ");t.b("\n" + i);t.b("        </span>  ");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"site-form\" id=\"site-form-");t.b(t.v(t.f("id",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    </li>  ");t.b("\n" + i);});c.pop();}t.b("  </ul>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["sites/new"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"small-modal\">  ");t.b("\n" + i);t.b("  <h1>New Site</h1>  ");t.b("\n");t.b("\n" + i);t.b("  <form action=\"/admin/sites\" method= \"post\">  ");t.b("\n" + i);t.b("    <div class=\"field\">   ");t.b("\n" + i);t.b("      <label for=\"site_name\">Name</label>");t.b("\n" + i);t.b("      <input type=\"text\" id=\"site_name\" name=\"site[name]\" value=\"\" class=\"textfield\" />  ");t.b("\n" + i);t.b("    </div> ");t.b("\n" + i);t.b("    <div class=\"field\">   ");t.b("\n" + i);t.b("      <label for=\"site_subdomain\">Subdomain</label>");t.b("\n" + i);t.b("      <input type=\"text\" id=\"site_subdomain\" name=\"site[subdomain]\" value=\"\" class=\"textfield\" />  ");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"buttons\">");t.b("\n" + i);t.b("      <input type=\"submit\" id=\"page_save\" value=\"Save\" class=\"button\" /> ");t.b("\n" + i);t.b("      <a href=\"/admin/sites\" class=\"cancel\">Cancel</a> ");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>  ");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["sites/remove"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"small-modal\">");t.b("\n" + i);if(t.s(t.f("site",c,p,1),c,p,0,35,528,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <h2>Remove ");t.b(t.v(t.f("name",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("  <form method=\"post\" action=\"#/sites/");t.b(t.v(t.f("id",c,p,0)));t.b("\" enctype=\"multipart/form-data\" id=\"remove-part\">");t.b("\n" + i);t.b("    <div class=\"hidden\">                   ");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"_method\" value=\"delete\" />");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"note\"> ");t.b("\n" + i);t.b("      Are you sure you want to delete this site?");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"buttons\">");t.b("\n" + i);t.b("      <input type=\"submit\" value=\"Delete\" class=\"button html-only\" />");t.b("\n" + i);t.b("      <a href=\"#/sites\" class=\"cancel\">Cancel</a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>  ");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["stylesheets/form"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"hidden\">");t.b("\n" + i);t.b("  <input type=\"hidden\" id=\"template-klass\" name=\"klass\" value=\"");t.b(t.v(t.f("klass",c,p,0)));t.b("\" class=\"hidden\" />   ");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\"> ");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"template-name\">Name</label>");t.b("\n" + i);t.b("  <div class=\"controls\">");t.b("\n" + i);t.b("    <input type=\"text\" id=\"template-name\" name=\"name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["templates/edit"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<aside id=\"sidebar\">");t.b("\n" + i);t.b("  ");t.b("\n" + i);t.b("</aside>");t.b("\n");t.b("\n" + i);if(t.s(t.f("layout",c,p,1),c,p,0,47,380,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<section id=\"main\">");t.b("\n" + i);t.b("    <header class=\"header\">");t.b("\n" + i);t.b("      <h1 id=\"layout-title-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</h1>");t.b("\n" + i);t.b("      <a class=\"btn js-settings\">Settings</a>");t.b("\n" + i);t.b("      <a class=\"btn js-insert\">Insert</a>");t.b("\n" + i);t.b("      <a class=\"btn js-remove\">Remove</a>");t.b("\n" + i);t.b("    </header>    ");t.b("\n" + i);t.b("    <pre id=\"code-editor\" class=\"");t.b(t.v(t.f("klass",c,p,0)));t.b(" ");t.b(t.v(t.f("mode",c,p,0)));t.b(" pane\"></pre>  ");t.b("\n" + i);t.b("</section>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["templates/form"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"hidden\">");t.b("\n" + i);t.b("  <input type=\"hidden\" id=\"template-klass\" name=\"klass\" value=\"");t.b(t.v(t.f("klass",c,p,0)));t.b("\" class=\"hidden\" />   ");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"control-group\"> ");t.b("\n" + i);t.b("  <label class=\"control-label\" for=\"template-name\">Name</label>");t.b("\n" + i);t.b("  <div class=\"controls\">");t.b("\n" + i);t.b("    <input type=\"text\" id=\"template-name\" name=\"name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);if(t.s(t.f("part_types",c,p,1),c,p,0,374,509,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"control-group\">");t.b("\n" + i);t.b("  <p class=\"control-label\">");t.b(t.v(t.f("name",c,p,0)));t.b("</p> ");t.b("\n" + i);t.b("  <p class=\"controls\">");t.b("\n" + i);t.b("    Description goes here");t.b("\n" + i);t.b("  </p>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["templates/index"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("templates",c,p,1),c,p,0,16,498,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <h2>");t.b("\n" + i);t.b("    ");t.b(t.v(t.f("title",c,p,0)));t.b(" ");t.b("\n" + i);t.b("    <span class=\"modify\">");t.b("\n" + i);t.b("      <a data-klass=\"");t.b(t.v(t.f("klass",c,p,0)));t.b("\" class=\"js-new\" href=\"/admin/design/new/layout\">+</a>");t.b("\n" + i);t.b("    </span>");t.b("\n" + i);t.b("  </h2> ");t.b("\n" + i);t.b("  <ul class=\"unstyled\">");t.b("\n" + i);if(t.s(t.f("models",c,p,1),c,p,0,216,473,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li class=\"layout\" id=\"layout-");t.b(t.v(t.f("id",c,p,0)));t.b("\"> ");t.b("\n" + i);t.b("        <div class=\"item\"> ");t.b("\n" + i);t.b("          <span class=\"title\"> ");t.b("\n" + i);t.b("             <a class=\"js-show\" id=\"edit-layout-");t.b(t.v(t.f("id",c,p,0)));t.b("\" href=\"");t.b(t.v(t.f("admin_path",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a>       ");t.b("\n" + i);t.b("          </span> ");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </li>  ");t.b("\n" + i);});c.pop();}t.b("  </ul>   ");t.b("\n" + i);});c.pop();}t.b("\n");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["templates/remove"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"remove small-modal\">");t.b("\n" + i);if(t.s(t.f("layout",c,p,1),c,p,0,44,531,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <h2>Remove Layout</h2>");t.b("\n" + i);t.b("  <form method=\"post\" action=\"/admin/templates/");t.b(t.v(t.f("id",c,p,0)));t.b("\" id=\"remove-template\">");t.b("\n" + i);t.b("    <div class=\"hidden\">                   ");t.b("\n" + i);t.b("      <input type=\"hidden\" name=\"_method\" value=\"delete\" />");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"note\"> ");t.b("\n" + i);t.b("      Are you sure you want to delete this template?");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"buttons\">");t.b("\n" + i);t.b("      <input type=\"submit\" value=\"Delete\" class=\"button html-only\" />");t.b("\n" + i);t.b("      <a href=\"/admin/templates\" class=\"cancel\">Cancel</a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </form>  ");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["users/edit"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("user",c,p,1),c,p,0,9,972,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<form action=\"/admin/users/");t.b(t.v(t.f("id",c,p,0)));t.b("\" method= \"post\" class=\"command-save autosave\">   ");t.b("\n" + i);t.b("  <div class=\"hidden\">");t.b("\n" + i);t.b("    <input type=\"hidden\" name=\"_method\" value=\"put\" /> ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"field\">   ");t.b("\n" + i);t.b("    <label for=\"user_name\">Name</label>");t.b("\n" + i);t.b("    <input type=\"text\" id=\"user_name\" name=\"user[name]\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div> ");t.b("\n" + i);t.b("  <div class=\"field\">   ");t.b("\n" + i);t.b("    <label for=\"user_email\">Email</label>");t.b("\n" + i);t.b("    <input type=\"text\" id=\"user_email\" name=\"user[email]\" value=\"");t.b(t.v(t.f("email",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"field\">   ");t.b("\n" + i);t.b("    <label for=\"user_email\">Password</label>");t.b("\n" + i);t.b("    <input type=\"password\" id=\"user_password\" name=\"user[password]\" value=\"");t.b(t.v(t.f("password",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);if(t.s(t.f("is_admin?",c,p,1),c,p,0,735,788,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"field\">  ");t.b("\n" + i);t.b("  Roles go here!");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);});c.pop();}t.b("  <div class=\"actions\">");t.b("\n" + i);t.b("    <input type=\"submit\" id=\"save-user\" value=\"Save\" class=\"button\" /> ");t.b("\n" + i);t.b("    <a href=\"/admin/users\" class=\"cancel\">Cancel</a> ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</form>  ");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["users/index"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"users\" class=\"listing\">");t.b("\n" + i);t.b("  <h1>Users</h1> ");t.b("\n" + i);t.b("  <ul>");t.b("\n" + i);if(t.s(t.f("users",c,p,1),c,p,0,70,548,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"site\" id=\"user-");t.b(t.v(t.f("id",c,p,0)));t.b("\"> ");t.b("\n" + i);t.b("      <div class=\"item\"> ");t.b("\n" + i);t.b("        <span class=\"name\"> ");t.b("\n" + i);t.b("           ");t.b(t.v(t.f("name",c,p,0)));t.b("        ");t.b("\n" + i);t.b("        </span> ");t.b("\n" + i);t.b("        <span class=\"email\"> ");t.b("\n" + i);t.b("           ");if(t.s(t.f("role",c,p,1),c,p,0,262,270,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.f("name",c,p,0)));});c.pop();}t.b("       ");t.b("\n" + i);t.b("        </span>");t.b("\n" + i);t.b("        <span class=\"modify\">                 ");t.b("\n" + i);t.b("          <a class=\"edit-user\" id=\"edit-user-");t.b(t.v(t.f("id",c,p,0)));t.b("\" href=\"/admin/users/");t.b(t.v(t.f("id",c,p,0)));t.b("/edit\">edit</a> ");t.b("\n" + i);t.b("        </span>  ");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"user-form\" id=\"user-form-");t.b(t.v(t.f("id",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    </li>  ");t.b("\n" + i);});c.pop();}t.b("  </ul>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["users/new"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"small-modal\"> ");t.b("\n" + i);t.b("<h1>Create User</h1>");t.b("\n" + i);t.b("<form action=\"/admin/users\" method= \"post\" class=\"command-save \">   ");t.b("\n" + i);t.b("  <div class=\"field\">   ");t.b("\n" + i);t.b("    <label for=\"user_name\">Name</label>");t.b("\n" + i);t.b("    <input type=\"text\" id=\"user_name\" name=\"user[name]\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div> ");t.b("\n" + i);t.b("  <div class=\"field\">   ");t.b("\n" + i);t.b("    <label for=\"user_email\">Email</label>");t.b("\n" + i);t.b("    <input type=\"text\" id=\"user_email\" name=\"user[email]\" value=\"");t.b(t.v(t.f("email",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"field\">   ");t.b("\n" + i);t.b("    <label for=\"user_email\">Password</label>");t.b("\n" + i);t.b("    <input type=\"password\" id=\"user_password\" name=\"user[password]\" value=\"");t.b(t.v(t.f("password",c,p,0)));t.b("\" class=\"textfield\" />  ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"\">");t.b("\n" + i);t.b("    <input type=\"submit\" id=\"save-user\" value=\"Save\" class=\"button\" /> ");t.b("\n" + i);t.b("    <a href=\"#/users\" class=\"cancel\">Cancel</a> ");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</form>  ");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
/*
 *  Sugar Library vedge
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2012 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */

(function(context){var i=true,j=null,k=false,n=Object,o=Array,p=RegExp,q=Date,r=String,s=Number,t=n.defineProperty&&n.defineProperties;function v(a,b,c,d){var e=b?a.prototype:a;w(a,b,d);x(d,function(f,g){if(typeof c==="function")y(e,f,aa(e[f],g,c));else if(c===i||!e[f])y(e,f,g);a.SugarMethods[f]={e:b,method:g}})}
function w(a){if(!a.SugarMethods){y(a,"SugarMethods",{});v(a,k,k,{restore:function(){var b=arguments.length===0,c=z(arguments);x(a.SugarMethods,function(d,e){if(b||c.has(d))y(e.e?a.prototype:a,d,e.method)})},extend:function(b,c,d){a===n&&arguments.length===0?A(C.concat(D),Object):v(a,d!==k,c,b)}})}}function aa(a,b,c){return function(){return a&&(c===i||!c.apply(this,arguments))?a.apply(this,arguments):b.apply(this,arguments)}}
function y(a,b,c){if(t)n.defineProperty(a,b,{value:c,configurable:i,enumerable:k,writable:i});else a[b]=c}function x(a,b){for(var c in a)n.prototype.hasOwnProperty.call(a,c)&&b.call(a,c,a[c])}function E(a,b,c,d){var e=i;if(a===b)return i;else if(n.isRegExp(b))return p(b).test(a);else if(n.isFunction(b))return b.apply(c,[a].concat(d));else if(n.isObject(b)&&n.isObject(a)){x(b,function(f){E(a[f],b[f],c,d)||(e=k)});return!n.isEmpty(b)&&e}else return n.equal(a,b)}
function F(a,b){var c,d,e,f,g,h,l=typeof a;if(l==="string")return a;d=n.prototype.toString.call(a);c=d==="[object Object]";e=d==="[object Array]";if(a!=j&&c||e){b||(b=[]);if(b.length>10)for(g=b.length;g--;)if(b[g]===a)return"CYC";b.push(a);c=r(a.constructor);f=e?a:n.keys(a).sort();for(g=0;g<f.length;g++){h=e?g:f[g];c+=h+F(a[h],b)}b.pop()}else c=1/a===-Infinity?"-0":r(a);return l+d+c}function G(a,b,c,d){return H(b)?a:n.isFunction(b)?b.apply(c,d||[]):n.isFunction(a[b])?a[b].call(a):a[b]}
function I(a,b){return Array.prototype.slice.call(a,b)}function z(a,b,c,d){a=I(a);if(c===i)a=J(a,1);K(a,b||function(){},d);return a}function ba(a,b,c){var d=[],e=a.length,f=b[b.length-1]!==k,g;z(b,function(h){if(n.isBoolean(h))return k;if(f){h%=e;if(h<0)h=e+h}g=c?a.charAt(h)||"":a[h];d.push(g)});return d.length<2?d[0]:d}function L(a,b){return n.prototype.toString.call(a)==="[object "+b+"]"}function H(a){return a===void 0}
function ca(a,b,c,d){var e=/^(.+?)(\[.*\])$/,f,g,h;if(d!==k&&(g=b.match(e))){h=g[1];b=g[2].replace(/^\[|\]$/g,"").split("][");K(b,function(l){f=!l||l.match(/^\d+$/);if(!h&&n.isArray(a))h=a.length;a[h]||(a[h]=f?[]:{});a=a[h];h=l});if(!h&&f)h=a.length.toString();ca(a,h,c)}else a[b]=c.match(/^[\d.]+$/)?parseFloat(c):c==="true"?i:c==="false"?k:c}function M(a){var b=this;x(a,function(c,d){b[c]=d})}var C=["isObject","isNaN"],D=["keys","values","each","merge","isEmpty","clone","equal","watch","tap","has"];
function A(a,b){var c={};K(a,function(d){c[d+(d==="equal"?"s":"")]=function(){return Object[d].apply(j,[this].concat(I(arguments)))}});v(b,i,k,c)}v(n,k,i,{watch:function(a,b,c){if(t){var d=a[b];n.defineProperty(a,b,{get:function(){return d},set:function(e){d=c.call(a,b,d,e)},enumerable:i,configurable:i})}}});
v(n,k,k,{extended:function(a){return new M(a)},isObject:function(a){return a==j?k:L(a,"Object")&&r(a.constructor)===r(n)},isNaN:function(a){return n.isNumber(a)&&a.valueOf()!==a.valueOf()},each:function(a,b){b&&x(a,function(c,d){b.call(a,c,d,a)});return a},merge:function(a,b,c,d){var e,f;if(typeof b=="object")for(e in b)if(n.prototype.hasOwnProperty.call(b,e)&&a){f=b[e];if(a[e]!==void 0){if(d===k)continue;if(n.isFunction(d))f=d.call(b,e,a[e],b[e])}if(c===i&&f&&typeof f==="object")if(n.isDate(f))f=
new Date(f.getTime());else if(n.isRegExp(f))f=RegExp(f.source,f.getFlags());else{a[e]||(a[e]=o.isArray(f)?[]:{});Object.merge(a[e],b[e],c,d);continue}a[e]=f}return a},isEmpty:function(a){if(a==j||typeof a!="object")return!(a&&a.length>0);return n.keys(a).length==0},equal:function(a,b){return F(a)===F(b)},values:function(a,b){var c=[];x(a,function(d,e){c.push(e);b&&b.call(a,e)});return c},clone:function(a,b){if(a==j||typeof a!=="object")return a;if(o.isArray(a))return a.clone();var c=a.constructor===
M?new M:{};return n.merge(c,a,b)},fromQueryString:function(a,b){var c=n.extended();a=a&&a.toString?a.toString():"";a.replace(/^.*?\?/,"").unescapeURL().split("&").each(function(d){d=d.split("=");d.length===2&&ca(c,d[0],d[1],b)});return c},tap:function(a,b){G(a,b,a,[a]);return a},has:function(a,b){return n.prototype.hasOwnProperty.call(a,b)}});
v(n,k,function(){return arguments.length>1},{keys:function(a,b){if(a==j||typeof a!="object"&&!n.isRegExp(a)&&!n.isFunction(a))throw new TypeError("Object required");var c=[];x(a,function(d,e){c.push(d);b&&b.call(a,d,e)});return c}});function K(a,b,c,d,e){var f,g;N(b);if(c<0)c=a.length+c;g=isNaN(c)?0:parseInt(c>>0);for(c=d===i?a.length+g:a.length;g<c;){f=g%a.length;if(!(f in a)&&e===i)return da(a,b,g,d);else if(b.call(a,a[f],f,a)===k)break;g++}}
function ea(a,b,c,d,e){var f,g;K(a,function(h,l,m){if(E(h,b,m,[l,m])){f=h;g=l;return k}},c,d);return e?g:f}function O(a,b){var c=[],d={},e,f;K(a,function(g,h){f=b?G(g,b,a,[g,h,a]):g;e=F(f);if(!(e in d)||typeof f==="function"&&f!==d[e]){d[e]=f;c.push(g)}});return c}function J(a,b,c){b=b||Infinity;c=c||0;var d=[];K(a,function(e){if(n.isArray(e)&&c<b)d=d.concat(J(e,b,c+1));else d.push(e)});return d}
function fa(a,b,c){var d=[],e={};b.each(function(f){e[F(f)]=f});a.each(function(f){var g=F(f);if((g in e&&(typeof f!=="function"||f===e[g]))!=c){delete e[g];d.push(f)}});return d}function ga(a,b,c,d){var e=a.length,f=d==-1,g=f?e-1:0;c=isNaN(c)?g:parseInt(c>>0);if(c<0)c=e+c;if(!f&&c<0||f&&c>=e)c=g;for(;f&&c>=0||!f&&c<e;){if(a[c]===b)return c;c+=d}return-1}
function ha(a,b,c,d){var e=a.length,f=0,g=c!==void 0;N(b);if(e==0&&!g)throw new TypeError("Reduce called on empty array with no initial value");else if(g)c=c;else{c=a[d?e-1:f];f++}for(;f<e;){g=d?e-f-1:f;if(g in a)c=b.call(void 0,c,a[g],g,a);f++}return c}function N(a){if(!a||!a.call)throw new TypeError("Callback is not callable");}function P(a){if(a.length===0)throw new TypeError("First argument must be defined");}
function da(a,b,c){var d=[],e;for(e in a)e in a&&e>>>0==e&&e!=4294967295&&e>=c&&d.push(e.toNumber());d.sort().each(function(f){return b.call(a,a[f],f,a)});return a}function Q(a,b,c,d){var e=c==="max",f=c==="min",g=e?-Infinity:Infinity,h=[];x(a,function(l){var m=a[l];l=G(m,b,a,d?[m,l.toNumber(),a]:[]);if(l===g)h.push(m);else if(e&&l>g||f&&l<g){h=[m];g=l}});return h}function ia(a){if(o[ja])a=a.toLowerCase();return a.remove(o[ka])}function la(a,b){var c=a.charAt(b);return(o[ma]||{})[c]||c}
var ka="AlphanumericSortIgnore",ja="AlphanumericSortIgnoreCase",ma="AlphanumericSortEquivalents";v(o,k,k,{create:function(){var a=[];z(arguments,function(b){if(b&&b.callee)b=I(b);a=a.concat(b)});return a},isArray:function(a){return L(a,"Array")}});
v(o,i,function(){var a=arguments;return a.length>0&&!n.isFunction(a[0])},{every:function(a,b){var c=this.length,d=0;for(P(arguments);d<c;){if(d in this&&!E(this[d],a,b,[d,this]))return k;d++}return i},some:function(a,b){var c=this.length,d=0;for(P(arguments);d<c;){if(d in this&&E(this[d],a,b,[d,this]))return i;d++}return k},map:function(a,b){var c=this.length,d=0,e,f=Array(c);for(P(arguments);d<c;){if(d in this){e=this[d];f[d]=G(e,a,b,[e,d,this])}d++}return f},filter:function(a,b){var c=this.length,
d=0,e=[];for(P(arguments);d<c;){d in this&&E(this[d],a,b,[d,this])&&e.push(this[d]);d++}return e}});
v(o,i,k,{indexOf:function(a,b){if(n.isString(this))return this.indexOf(a,b);return ga(this,a,b,1)},lastIndexOf:function(a,b){if(n.isString(this))return this.lastIndexOf(a,b);return ga(this,a,b,-1)},forEach:function(a,b){var c=this.length,d=0;for(N(a);d<c;){d in this&&a.call(b,this[d],d,this);d++}},reduce:function(a,b){return ha(this,a,b)},reduceRight:function(a,b){return ha(this,a,b,i)},each:function(a,b,c){K(this,a,b,c,i);return this},find:function(a,b,c){return ea(this,a,b,c)},findAll:function(a,
b,c){var d=[];K(this,function(e,f,g){E(e,a,g,[f,g])&&d.push(e)},b,c);return d},findIndex:function(a,b,c){a=ea(this,a,b,c,i);return H(a)?-1:a},count:function(a){if(H(a))return this.length;return this.findAll(a).length},none:function(){return!this.any.apply(this,arguments)},remove:function(){var a,b=this;z(arguments,function(c){for(a=0;a<b.length;)if(E(b[a],c,b,[a,b]))b.splice(a,1);else a++});return b},removeAt:function(a,b){if(H(a))return this;if(H(b))b=a;for(var c=0;c<=b-a;c++)this.splice(a,1);return this},
add:function(a,b){if(!n.isNumber(s(b))||isNaN(b)||b==-1)b=this.length;else if(b<-1)b+=1;o.prototype.splice.apply(this,[b,0].concat(a));return this},include:function(a,b){return this.clone().add(a,b)},exclude:function(){return o.prototype.remove.apply(this.clone(),arguments)},clone:function(){return n.merge([],this)},unique:function(a){return O(this,a)},union:function(){var a=this;z(arguments,function(b){a=a.concat(b)});return O(a)},intersect:function(){return fa(this,z(arguments,j,i),k)},subtract:function(){return fa(this,
z(arguments,j,i),i)},at:function(){return ba(this,arguments)},first:function(a){if(H(a))return this[0];if(a<0)a=0;return this.slice(0,a)},last:function(a){if(H(a))return this[this.length-1];return this.slice(this.length-a<0?0:this.length-a)},from:function(a){return this.slice(a)},to:function(a){if(H(a))a=this.length;return this.slice(0,a)},min:function(a){return O(Q(this,a,"min",i))},max:function(a){return O(Q(this,a,"max",i))},least:function(){var a=J(Q(this.groupBy.apply(this,arguments),"length",
"min"));return a.length===this.length?[]:O(a)},most:function(){var a=J(Q(this.groupBy.apply(this,arguments),"length","max"));return a.length===this.length?[]:O(a)},sum:function(a){a=a?this.map(a):this;return a.length>0?a.reduce(function(b,c){return b+c}):0},average:function(a){a=a?this.map(a):this;return a.length>0?a.sum()/a.length:0},groupBy:function(a,b){var c=this,d=n.extended(),e;K(c,function(f,g){e=G(f,a,c,[f,g,c]);d[e]||(d[e]=[]);d[e].push(f)});return d.each(b)},inGroups:function(a,b){var c=
arguments.length>1,d=this,e=[],f=(this.length/a).ceil();(0).upto(a-1,function(g){g=g*f;var h=d.slice(g,g+f);c&&h.length<f&&(f-h.length).times(function(){h=h.add(b)});e.push(h)});return e},inGroupsOf:function(a,b){if(this.length===0||a===0)return this;if(H(a))a=1;if(H(b))b=j;var c=[],d=j;this.each(function(e,f){if(f%a===0){d&&c.push(d);d=[]}if(H(e))e=b;d.push(e)});if(!this.length.isMultipleOf(a)){(a-this.length%a).times(function(){d.push(b)});this.length+=a-this.length%a}d.length>0&&c.push(d);return c},
compact:function(a){var b=[];K(this,function(c){if(n.isArray(c))b.push(c.compact());else if(a&&c)b.push(c);else!a&&c!=j&&!n.isNaN(c)&&b.push(c)});return b},isEmpty:function(){return this.compact().length==0},flatten:function(a){return J(this,a)},sortBy:function(a,b){var c=this.clone();c.sort(function(d,e){var f,g;f=G(d,a,c,[d]);g=G(e,a,c,[e]);if(n.isString(f)&&n.isString(g)){f=f;g=g;var h,l,m,u,B=0,R=0;f=ia(f);g=ia(g);do{m=la(f,B);u=la(g,B);h=m?o.AlphanumericSortOrder.indexOf(m):j;l=u?o.AlphanumericSortOrder.indexOf(u):
j;if(h===-1||l===-1){h=f.charCodeAt(B)||j;l=g.charCodeAt(B)||j}m=m!==f.charAt(B);u=u!==g.charAt(B);if(m!==u&&R===0)R=m-u;B+=1}while(h!=j&&l!=j&&h===l);f=h===l?R:h<l?-1:1}else f=f<g?-1:f>g?1:0;return f*(b?-1:1)});return c},randomize:function(){for(var a=this.concat(),b,c,d=a.length;d;b=parseInt(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a},zip:function(){var a=I(arguments);return this.map(function(b,c){return[b].concat(a.map(function(d){return c in d?d[c]:j}))})},sample:function(a){var b=[],
c=this.clone(),d;for(a>0||(a=1);b.length<a;){d=Number.random(0,c.length-1);b.push(c[d]);c.removeAt(d);if(c.length==0)break}return arguments.length>0?b:b[0]}});v(o,i,k,{all:o.prototype.every,any:o.prototype.some,has:o.prototype.some,insert:o.prototype.add});function S(a,b,c){c=Math[c||"round"];var d=Math.pow(10,(b||0).abs());if(b<0)d=1/d;return c(a*d)/d}function na(a,b,c,d){var e=[];a=parseInt(a);for(var f=d>0;f&&a<=b||!f&&a>=b;){e.push(a);c&&c.call(this,a);a+=d}return e}
function T(a,b,c,d,e,f){var g=a.toFixed(20),h=g.search(/\./);g=g.search(/[1-9]/);h=h-g;if(h>0)h-=1;e=Math.max(Math.min((h/3).floor(),e===k?c.length:e),-d);d=c.charAt(e+d-1);if(h<-9){e=-3;b=h.abs()-9;d=c.first()}return(a/(f?(2).pow(10*e):(10).pow(e*3))).round(b||0).format()+d.trim()}v(s,k,k,{random:function(a,b){var c;if(arguments.length==1){b=a;a=0}c=Math.min(a||0,H(b)?1:b);return S(Math.random()*(Math.max(a||0,H(b)?1:b)-c)+c)}});
v(s,i,k,{toNumber:function(){return parseFloat(this,10)},abbr:function(a){return T(this,a,"kmbt",0,4)},metric:function(a,b){return T(this,a,"n\u03bcm kMGTPE",4,H(b)?1:b)},bytes:function(a,b){return T(this,a,"kMGTPE",0,H(b)?4:b,i)+"B"},isInteger:function(){return this%1==0},ceil:function(a){return S(this,a,"ceil")},floor:function(a){return S(this,a,"floor")},abs:function(){return Math.abs(this)},pow:function(a){if(H(a))a=1;return Math.pow(this,a)},round:function(a){return S(this,a,"round")},chr:function(){return r.fromCharCode(this)},
isOdd:function(){return!this.isMultipleOf(2)},isEven:function(){return this.isMultipleOf(2)},isMultipleOf:function(a){return this%a===0},upto:function(a,b,c){return na(this,a,b,c||1)},downto:function(a,b,c){return na(this,a,b,-(c||1))},times:function(a){if(a)for(var b=0;b<this;b++)a.call(this,b);return this.toNumber()},ordinalize:function(){var a;a=this.abs();var b=a.toString().last(2).toNumber();if(b>=11&&b<=13)a="th";else switch(a%10){case 1:a="st";break;case 2:a="nd";break;case 3:a="rd";break;
default:a="th"}return this.toString()+a},pad:function(a,b,c){c=c||10;c=this.toNumber()===0?"":this.toString(c).replace(/^-/,"");c=U(c,"0",a-c.replace(/\.\d+$/,"").length,0);if(b||this<0)c=(this<0?"-":"+")+c;return c},format:function(a,b,c){var d,e,f=/(\d+)(\d{3})/;if(r(b).match(/\d/))throw new TypeError("Thousands separator cannot contain numbers.");d=n.isNumber(a)?S(this,a).toFixed(Math.max(a,0)):this.toString();b=b||",";c=c||".";e=d.split(".");d=e[0];for(e=e[1]||"";d.match(f);)d=d.replace(f,"$1"+
b+"$2");if(e.length>0)d+=c+U(e,"0",0,a-e.length);return d},hex:function(a){return this.pad(a||1,k,16)}});function V(){return"\t\n\u000b\u000c\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff"}function oa(a,b,c,d){var e=I(b).join("");e=e.replace(/all/,"").replace(/(\w)lphabet|umbers?|atakana|paces?|unctuation/g,"$1");return a.replace(c,function(f){return d[f]&&(!e||e.has(d[f].type))?d[f].to:f})}
var pa=[{type:"a",shift:65248,start:65,end:90},{type:"a",shift:65248,start:97,end:122},{type:"n",shift:65248,start:48,end:57},{type:"p",shift:65248,start:33,end:47},{type:"p",shift:65248,start:58,end:64},{type:"p",shift:65248,start:91,end:96},{type:"p",shift:65248,start:123,end:126}],qa={},ra={},sa=/[\u0020-\u00A5]|[\uFF61-\uFF9F][\uff9e\uff9f]?/g,ta=/[\u3000-\u301C]|[\u301A-\u30FC]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g,ua=/[\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c6\u30c8\u30cf\u30d2\u30d5\u30d8\u30db]/,
va=/[\u30cf\u30d2\u30d5\u30d8\u30db\u30f2]/;function W(a,b,c){qa[b]={type:a,to:c};ra[c]={type:a,to:b}}function U(a,b,c,d){var e=String(b);if(e!=b)e="";n.isNumber(c)||(c=1);n.isNumber(d)||(d=1);return e.repeat(c)+a+e.repeat(d)}var X,Y;
v(r,i,k,{escapeRegExp:function(){return p.escape(this)},escapeURL:function(a){return a?encodeURIComponent(this):encodeURI(this)},unescapeURL:function(a){return a?decodeURI(this):decodeURIComponent(this)},escapeHTML:function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},unescapeHTML:function(){return this.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")},encodeBase64:function(){return X(this)},decodeBase64:function(){return Y(this)},capitalize:function(a){return this.toLowerCase().replace(a?
/^\S|\s\S/g:/^\S/,function(b){return b.toUpperCase()})},pad:function(a,b){return U(this,a,b,b)},padLeft:function(a,b){return U(this,a,b,0)},padRight:function(a,b){return U(this,a,0,b)},repeat:function(a){var b="",c=0;if(n.isNumber(a)&&a>0)for(;c<a;){b+=this;c++}return b},each:function(a,b){if(n.isFunction(a)){b=a;a=/[\s\S]/g}else if(a)if(n.isString(a))a=p(p.escape(a),"gi");else{if(n.isRegExp(a))a=a.addFlag("g")}else a=/[\s\S]/g;var c=this.match(a)||[];if(b)for(var d=0;d<c.length;d++)c[d]=b.call(this,
c[d],d,c)||c[d];return c},shift:function(a){var b="";a=a||0;this.codes(function(c){b+=(c+a).chr()});return b},codes:function(a){for(var b=[],c=0;c<this.length;c++){var d=this.charCodeAt(c);b.push(d);a&&a.call(this,d,c)}return b},chars:function(a){return this.each(a)},words:function(a){return this.trim().each(/\S+/g,a)},lines:function(a){return this.trim().each(/^.*$/gm,a)},paragraphs:function(a){var b=this.trim().split(/[\r\n]{2,}/);return b=b.map(function(c){if(a)var d=a.call(c);return d?d:c})},
startsWith:function(a,b){if(H(b))b=i;var c=n.isRegExp(a)?a.source.replace("^",""):p.escape(a);return p("^"+c,b?"":"i").test(this)},endsWith:function(a,b){if(H(b))b=i;var c=n.isRegExp(a)?a.source.replace("$",""):p.escape(a);return p(c+"$",b?"":"i").test(this)},isBlank:function(){return this.trim().length===0},has:function(a){return this.search(n.isRegExp(a)?a:RegExp.escape(a))!==-1},add:function(a,b){return this.split("").add(a,b).join("")},remove:function(a){return this.replace(a,"")},hankaku:function(){return oa(this,
arguments,ta,ra)},zenkaku:function(){return oa(this,arguments,sa,qa)},hiragana:function(a){var b=this;if(a!==k)b=b.zenkaku("k");return b.replace(/[\u30A1-\u30F6]/g,function(c){return c.shift(-96)})},katakana:function(){return this.replace(/[\u3041-\u3096]/g,function(a){return a.shift(96)})},toNumber:function(a){var b=this.replace(/,/g,"");return b.match(/\./)?parseFloat(b):parseInt(b,a||10)},reverse:function(){return this.split("").reverse().join("")},compact:function(){return this.trim().replace(/([\r\n\s\u3000])+/g,
function(a,b){return b==="\u3000"?b:" "})},at:function(){return ba(this,arguments,i)},first:function(a){if(H(a))a=1;return this.substr(0,a)},last:function(a){if(H(a))a=1;return this.substr(this.length-a<0?0:this.length-a)},from:function(a){return this.slice(a)},to:function(a){if(H(a))a=this.length;return this.slice(0,a)},toDate:function(a){var b=this.toString();return q.create?q.create(b,a):new q(b)},dasherize:function(){return this.underscore().replace(/_/g,"-")},underscore:function(){return this.replace(/[-\s]+/g,
"_").replace(String.Inflector&&String.Inflector.acronymRegExp,function(a,b){return(b>0?"_":"")+a.toLowerCase()}).replace(/([A-Z\d]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").toLowerCase()},camelize:function(a){return this.underscore().replace(/(^|_)([^_]+)/g,function(b,c,d,e){b=r.Inflector&&r.Inflector.acronyms&&r.Inflector.acronyms[d];e=a!==k||e>0;if(b)return e?b:b.toLowerCase();return e?d.capitalize():d})},spacify:function(){return this.underscore().replace(/_/g," ")},stripTags:function(){var a=
this;z(arguments.length>0?arguments:[""],function(b){a=a.replace(p("</?"+b.escapeRegExp()+"[^<>]*>","gi"),"")});return a},removeTags:function(){var a=this;z(arguments.length>0?arguments:["\\S+"],function(b){b=p("<("+b+")[^<>]*(?:\\/>|>.*?<\\/\\1>)","gi");a=a.replace(b,"")});return a},truncate:function(a,b,c){var d;b=H(b)?"...":String(b);a-=b.length;if(this.length<=a)return this.toString();d=b.match(/^(.)\1+$/)?b.slice(0,1):"";for(d=p("[^"+V()+d+"]["+V()+d+"]");a>0&&!d.test(this.slice(a-1,a+1))&&c!==
i;)a--;return this.slice(0,a)+(a>0?b:"")},assign:function(){var a=n.extended();z(arguments,function(b,c){if(n.isObject(b))a.merge(b);else a[c+1]=b});return this.replace(/\{(.+?)\}/g,function(b,c){return n.prototype.hasOwnProperty.call(a,c)?a[c]:b})}});
v(r,i,function(a){return n.isRegExp(a)},{split:function(a,b){var c=[],d=0;a=p(a).addFlag("g");var e,f,g,h;p.c||(e=RegExp("^"+a.source+"$(?!\\s)",a.getFlags()));if(H(b)||b<0)b=Infinity;else{b|=0;if(!b)return[]}for(;f=a.exec(this);){g=f.index+f[0].length;if(g>d){c.push(this.slice(d,f.index));!p.c&&f.length>1&&f[0].replace(e,function(){for(var l=1;l<arguments.length-2;l++)if(H(arguments[l]))f[l]=void 0});f.length>1&&f.index<this.length&&o.prototype.push.apply(c,f.slice(1));h=f[0].length;d=g;if(c.length>=
b)break}a.lastIndex===f.index&&a.lastIndex++}if(d===this.length){if(h||!a.test(""))c.push("")}else c.push(this.slice(d));return c.length>b?c.slice(0,b):c}});v(r,i,k,{insert:r.prototype.add});p.c=H(p("()??").exec("")[1]);function Z(a,b){var c="";if(b=="g"||a.global)c+="g";if(b=="i"||a.ignoreCase)c+="i";if(b=="m"||a.multiline)c+="m";if(b=="y"||a.g)c+="y";return c}v(p,k,k,{escape:function(a){n.isString(a)||(a=String(a));return a.replace(/([\\/'*+?|()\[\]{}.^$])/g,"\\$1")}});
v(p,i,k,{getFlags:function(){return Z(this)},setFlags:function(a){return p(this.source,a)},addFlag:function(a){return this.setFlags(Z(this,a))},removeFlag:function(a){return this.setFlags(Z(this).replace(a,""))}});function $(a,b,c,d,e){if(!a.b)a.b=[];a.b.push(setTimeout(function(){a.b.removeAt(f);c.apply(d,e||[])},b));var f=a.b.length}
v(Function,i,k,{lazy:function(a,b){function c(){if(!(g||f.length==0)){for(var m=Math.max(f.length-l,0);f.length>m;)Function.prototype.apply.apply(e,f.shift());$(d,h,function(){g=k;c()});g=i}}function d(){if(!(g&&f.length>b-2)){f.push([this,arguments]);c()}}var e=this,f=[],g=k,h,l;a=a||1;b=b||Infinity;h=a.ceil();l=S(h/a);return d},delay:function(a){n.isNumber(a)||(a=0);var b=I(arguments,1);$(this,a,this,this,b);return this},debounce:function(a,b){var c=this;return b===k?this.lazy(a,1):function(){c.cancel();
$(c,a,c,this,arguments)}},cancel:function(){if(n.isArray(this.b))for(;this.b.length>0;)clearTimeout(this.b.shift());return this},after:function(a){var b=this,c=0,d=[];if(n.isNumber(a)){if(a===0){b.call();return b}}else a=1;return function(){var e;d.push(Array.create(arguments));c++;if(c==a){e=b.call(this,d);c=0;d=[];return e}}},once:function(){var a=this;return function(){return n.prototype.hasOwnProperty.call(a,"memo")?a.memo:a.memo=a.apply(this,arguments)}},fill:function(){var a=this,b=I(arguments);
return function(){var c=I(arguments);K(b,function(d,e){if(d!=j||e>=c.length)c.splice(e,0,d)});return a.apply(this,c)}}});(function(){var a={},b;K(["Array","Boolean","Date","Function","Number","String","RegExp"],function(c){b="is"+c;C.push(b);a[b]=function(d){return L(d,c)}});v(Object,k,k,a)})();A(D,M);
(function(a){if(this.btoa){X=this.btoa;Y=this.atob}var b=/[^A-Za-z0-9\+\/\=]/g;X=function(c){var d="",e,f,g,h,l,m,u=0;do{e=c.charCodeAt(u++);f=c.charCodeAt(u++);g=c.charCodeAt(u++);h=e>>2;e=(e&3)<<4|f>>4;l=(f&15)<<2|g>>6;m=g&63;if(isNaN(f))l=m=64;else if(isNaN(g))m=64;d=d+a.charAt(h)+a.charAt(e)+a.charAt(l)+a.charAt(m)}while(u<c.length);return d};Y=function(c){var d="",e,f,g,h,l,m=0;if(c.match(b))throw Error("String contains invalid base64 characters");c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{e=a.indexOf(c.charAt(m++));
f=a.indexOf(c.charAt(m++));h=a.indexOf(c.charAt(m++));l=a.indexOf(c.charAt(m++));e=e<<2|f>>4;f=(f&15)<<4|h>>2;g=(h&3)<<6|l;d+=e.chr();if(h!=64)d+=f.chr();if(l!=64)d+=g.chr()}while(m<c.length);return unescape(d)}})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
(function(){var a=V().match(/^\s+$/);try{r.prototype.trim.call([1])}catch(b){a=k}var c=p("^["+V()+"]+"),d=p("["+V()+"]+$");v(r,i,!a,{trim:function(){return this.toString().trimLeft().trimRight()},trimLeft:function(){return this.replace(c,"")},trimRight:function(){return this.replace(d,"")}})})();
(function(){var a;K(pa,function(b){b.start.upto(b.end,function(c){W(b.type,c.chr(),(c+b.shift).chr())})});"\u30a2\u30a4\u30a6\u30a8\u30aa\u30a1\u30a3\u30a5\u30a7\u30a9\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c3\u30c6\u30c8\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d2\u30d5\u30d8\u30db\u30de\u30df\u30e0\u30e1\u30e2\u30e4\u30e3\u30e6\u30e5\u30e8\u30e7\u30e9\u30ea\u30eb\u30ec\u30ed\u30ef\u30f2\u30f3\u30fc\u30fb".each(function(b,c){a="\uff71\uff72\uff73\uff74\uff75\uff67\uff68\uff69\uff6a\uff6b\uff76\uff77\uff78\uff79\uff7a\uff7b\uff7c\uff7d\uff7e\uff7f\uff80\uff81\uff82\uff6f\uff83\uff84\uff85\uff86\uff87\uff88\uff89\uff8a\uff8b\uff8c\uff8d\uff8e\uff8f\uff90\uff91\uff92\uff93\uff94\uff6c\uff95\uff6d\uff96\uff6e\uff97\uff98\uff99\uff9a\uff9b\uff9c\uff66\uff9d\uff70\uff65".charAt(c);
W("k",a,b);b.match(ua)&&W("k",a+"\uff9e",b.shift(1));b.match(va)&&W("k",a+"\uff9f",b.shift(2))});"\u3002\u3001\u300c\u300d\uffe5\uffe0\uffe1".each(function(b,c){W("p","\uff61\uff64\uff62\uff63\u00a5\u00a2\u00a3".charAt(c),b)});W("k","\uff73\uff9e","\u30f4");W("k","\uff66\uff9e","\u30fa");W("s"," ","\u3000")})();
[{a:["Arabic"],source:"\u0600-\u06ff"},{a:["Cyrillic"],source:"\u0400-\u04ff"},{a:["Devanagari"],source:"\u0900-\u097f"},{a:["Greek"],source:"\u0370-\u03ff"},{a:["Hangul"],source:"\uac00-\ud7af\u1100-\u11ff"},{a:["Han","Kanji"],source:"\u4e00-\u9fff\uf900-\ufaff"},{a:["Hebrew"],source:"\u0590-\u05ff"},{a:["Hiragana"],source:"\u3040-\u309f\u30fb-\u30fc"},{a:["Kana"],source:"\u3040-\u30ff\uff61-\uff9f"},{a:["Katakana"],source:"\u30a0-\u30ff\uff61-\uff9f"},{a:["Latin"],source:"\u0001-\u0080-\u00ff\u0100-\u017f\u0180-\u024f"},
{a:["Thai"],source:"\u0e00-\u0e7f"}].each(function(a){var b=p("^["+a.source+"\\s]+$"),c=p("["+a.source+"]");a.a.each(function(d){y(r.prototype,"is"+d,function(){return b.test(this.trim())});y(r.prototype,"has"+d,function(){return c.test(this)})})});
(function(){var a=k;if(Function.prototype.d){a=function(){};var b=a.d();a=new b instanceof b&&!(new a instanceof b)}v(Function,i,!a,{bind:function(c){var d=this,e=I(arguments,1),f,g;if(!n.isFunction(this))throw new TypeError("Function.prototype.bind called on a non-function");g=function(){return d.apply(d.prototype&&this instanceof d?this:c,e.concat(I(arguments)))};f=function(){};f.prototype=this.prototype;g.prototype=new f;return g}})})();
(function(){o.AlphanumericSortOrder="A\u00c1\u00c0\u00c2\u00c3\u0104BC\u0106\u010c\u00c7D\u010e\u00d0E\u00c9\u00c8\u011a\u00ca\u00cb\u0118FG\u011eH\u0131I\u00cd\u00cc\u0130\u00ce\u00cfJKL\u0141MN\u0143\u0147\u00d1O\u00d3\u00d2\u00d4PQR\u0158S\u015a\u0160\u015eT\u0164U\u00da\u00d9\u016e\u00db\u00dcVWXY\u00ddZ\u0179\u017b\u017d\u00de\u00c6\u0152\u00d8\u00d5\u00c5\u00c4\u00d6".split("").map(function(b){return b+b.toLowerCase()}).join("");var a={};"A\u00c1\u00c0\u00c2\u00c3\u00c4,C\u00c7,E\u00c9\u00c8\u00ca\u00cb,I\u00cd\u00cc\u0130\u00ce\u00cf,O\u00d3\u00d2\u00d4\u00d5\u00d6,S\u00df,U\u00da\u00d9\u00db\u00dc".split(",").each(function(b){var c=
b.charAt(0);b.slice(1).chars(function(d){a[d]=c;a[d.toLowerCase()]=c.toLowerCase()})});o[ja]=i;o[ma]=a})();w(q);Object.f=w;})(this);
(function(context){var j=true,k=false;function o(a){return function(){return a}}var p=RegExp,q=Object,s=Date,t=Number,u;function v(a){return a!==void 0}
var w=["hour","minute","second","millisecond","meridian","utc","offset_sign","offset_hours","offset_minutes"],x="\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d",y="\u5341\u767e\u5343\u4e07",z=p("["+x+y+"]","g"),A=[],B,C,D=[{src:"(\\d{4})",to:["year"]},{src:"([+-])?(\\d{4})[-.]?({month})[-.]?(\\d{1,2})?",to:["year_sign","year","month","date"]},{src:"(\\d{1,2})[-.\\/]({month})[-.\\/]?(\\d{2,4})?",to:["month","date","year"],h:j},{src:"\\/Date\\((\\d+(?:\\+\\d{4})?)\\)\\/",to:["timestamp"],s:k}],
E=[{b:"f{1,4}|ms|milliseconds",format:function(a){return a.getMilliseconds()}},{b:"ss?|seconds",format:function(a){return a.getSeconds()}},{b:"mm?|minutes",format:function(a){return a.getMinutes()}},{b:"hh?|hours|12hr",format:function(a){a=a.getHours(void 0);return a===0?12:a-(a/13|0)*12}},{b:"HH?|24hr",format:function(a){return a.getHours()}},{b:"dd?|date|day",format:function(a){return a.getDate()}},{b:"dow|weekday",i:j,format:function(a,b,d){return b.weekdays[a.getDay()+(d-1)*7]}},{b:"MM?",format:function(a){return a.getMonth()+
1}},{b:"mon|month",i:j,format:function(a,b,d){return b.months[a.getMonth()+(d-1)*12]}},{b:"y{2,4}|year",format:function(a){return a.getFullYear()}},{b:"[Tt]{1,2}",format:function(a,b,d,e){a=a.getHours(void 0)<12?"am":"pm";if(e.length===1)a=a.first();if(e.first()==="T")a=a.toUpperCase();return a}},{b:"z{1,4}|tz|timezone",text:j,format:function(a,b,d,e){a=a.getUTCOffset();if(e=="z"||e=="zz")a=a.replace(/(\d{2})(\d{2})/,function(g,f){return f.toNumber().pad(e.length)});return a}},{b:"iso(tz|timezone)",
format:function(a){return a.getUTCOffset(j)}},{b:"ord",format:function(a){return a.getDate().ordinalize()}}],F=[{a:"year",method:"FullYear",c:function(a){return(365+(a?a.isLeapYear()?1:0:0.25))*24*60*60*1E3}},{a:"month",method:"Month",c:function(a,b){var d=30.4375,e;if(a){e=a.daysInMonth();if(b<=e.days())d=e}return d*24*60*60*1E3}},{a:"week",method:"Week",c:o(6048E5)},{a:"day",method:"Date",c:o(864E5)},{a:"hour",method:"Hours",c:o(36E5)},{a:"minute",method:"Minutes",c:o(6E4)},{a:"second",method:"Seconds",
c:o(1E3)},{a:"millisecond",method:"Milliseconds",c:o(1)}],G={},H={en:"2;;January,February,March,April,May,June,July,August,September,October,November,December;Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday;millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s;one,two,three,four,five,six,seven,eight,nine,ten;a,an,the;the,st|nd|rd|th,of;{num} {unit} {sign},{num} {unit=4-5} {sign} {day},{weekday?} {month} {date}{1} {year?} {time?},{date} {month} {year},{month} {year},{shift?} {weekday} {time?},{shift} week {weekday} {time?},{shift} {unit=5-7},{0} {edge} of {shift?} {unit=4-7?}{month?}{year?},{weekday} {2} {shift} week,{0} {date}{1} of {month},{0}{month?} {date?}{1} of {shift} {unit=6-7},{day} at {time?},{time} {day};{Month} {d}, {yyyy};,yesterday,today,tomorrow;,ago|before,,from now|after|from;,last,the|this,next;last day,end,,first day|beginning",
ja:"1;\u6708;;\u65e5\u66dc\u65e5,\u6708\u66dc\u65e5,\u706b\u66dc\u65e5,\u6c34\u66dc\u65e5,\u6728\u66dc\u65e5,\u91d1\u66dc\u65e5,\u571f\u66dc\u65e5;\u30df\u30ea\u79d2,\u79d2,\u5206,\u6642\u9593,\u65e5,\u9031\u9593|\u9031,\u30f6\u6708|\u30f5\u6708|\u6708,\u5e74;;;;{num}{unit}{sign},{shift}{unit=5-7}{weekday?},{year}\u5e74{month?}\u6708?{date?}\u65e5?,{month}\u6708{date?}\u65e5?,{date}\u65e5;{yyyy}\u5e74{M}\u6708{d}\u65e5;\u4e00\u6628\u65e5,\u6628\u65e5,\u4eca\u65e5,\u660e\u65e5,\u660e\u5f8c\u65e5;,\u524d,,\u5f8c;,\u53bb|\u5148,,\u6765",
ko:"1;\uc6d4;;\uc77c\uc694\uc77c,\uc6d4\uc694\uc77c,\ud654\uc694\uc77c,\uc218\uc694\uc77c,\ubaa9\uc694\uc77c,\uae08\uc694\uc77c,\ud1a0\uc694\uc77c;\ubc00\ub9ac\ucd08,\ucd08,\ubd84,\uc2dc\uac04,\uc77c,\uc8fc,\uac1c\uc6d4|\ub2ec,\ub144;\uc77c|\ud55c,\uc774,\uc0bc,\uc0ac,\uc624,\uc721,\uce60,\ud314,\uad6c,\uc2ed;;;{num}{unit} {sign},{shift} {unit=5-7},{shift} {unit=5?} {weekday},{year}\ub144{month?}\uc6d4?{date?}\uc77c?,{month}\uc6d4{date?}\uc77c?,{date}\uc77c;{yyyy}\ub144{M}\uc6d4{d}\uc77c;\uadf8\uc800\uaed8,\uc5b4\uc81c,\uc624\ub298,\ub0b4\uc77c,\ubaa8\ub808;,\uc804,,\ud6c4;,\uc9c0\ub09c|\uc791,\uc774\ubc88,\ub2e4\uc74c|\ub0b4",
ru:"4;;\u042f\u043d\u0432\u0430\u0440:\u044f|\u044c,\u0424\u0435\u0432\u0440\u0430\u043b:\u044f|\u044c,\u041c\u0430\u0440\u0442:\u0430|,\u0410\u043f\u0440\u0435\u043b:\u044f|\u044c,\u041c\u0430:\u044f|\u0439,\u0418\u044e\u043d:\u044f|\u044c,\u0418\u044e\u043b:\u044f|\u044c,\u0410\u0432\u0433\u0443\u0441\u0442:\u0430|,\u0421\u0435\u043d\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041e\u043a\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041d\u043e\u044f\u0431\u0440:\u044f|\u044c,\u0414\u0435\u043a\u0430\u0431\u0440:\u044f|\u044c;\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435,\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a,\u0412\u0442\u043e\u0440\u043d\u0438\u043a,\u0421\u0440\u0435\u0434\u0430,\u0427\u0435\u0442\u0432\u0435\u0440\u0433,\u041f\u044f\u0442\u043d\u0438\u0446\u0430,\u0421\u0443\u0431\u0431\u043e\u0442\u0430;\u043c\u0438\u043b\u043b\u0438\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u043c\u0438\u043d\u0443\u0442:\u0430|\u0443|\u044b|,\u0447\u0430\u0441:||\u0430|\u043e\u0432,\u0434\u0435\u043d\u044c|\u0434\u0435\u043d\u044c|\u0434\u043d\u044f|\u0434\u043d\u0435\u0439,\u043d\u0435\u0434\u0435\u043b:\u044f|\u044e|\u0438|\u044c|\u0435,\u043c\u0435\u0441\u044f\u0446:||\u0430|\u0435\u0432|\u0435,\u0433\u043e\u0434|\u0433\u043e\u0434|\u0433\u043e\u0434\u0430|\u043b\u0435\u0442|\u0433\u043e\u0434\u0443;\u043e\u0434:\u0438\u043d|\u043d\u0443,\u0434\u0432:\u0430|\u0435,\u0442\u0440\u0438,\u0447\u0435\u0442\u044b\u0440\u0435,\u043f\u044f\u0442\u044c,\u0448\u0435\u0441\u0442\u044c,\u0441\u0435\u043c\u044c,\u0432\u043e\u0441\u0435\u043c\u044c,\u0434\u0435\u0432\u044f\u0442\u044c,\u0434\u0435\u0441\u044f\u0442\u044c;;\u0432|\u043d\u0430,\u0433\u043e\u0434\u0430;{num} {unit} {sign},{sign} {num} {unit},{date} {month} {year?} {1},{month} {year},{0} {shift} {unit=5-7};{d} {month} {yyyy} \u0433\u043e\u0434\u0430;\u043f\u043e\u0437\u0430\u0432\u0447\u0435\u0440\u0430,\u0432\u0447\u0435\u0440\u0430,\u0441\u0435\u0433\u043e\u0434\u043d\u044f,\u0437\u0430\u0432\u0442\u0440\u0430,\u043f\u043e\u0441\u043b\u0435\u0437\u0430\u0432\u0442\u0440\u0430;,\u043d\u0430\u0437\u0430\u0434,,\u0447\u0435\u0440\u0435\u0437;,\u043f\u0440\u043e\u0448\u043b\u043e:\u0439|\u043c,,\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435:\u0439|\u043c",
es:"6;;enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre;domingo,lunes,martes,mi\u00e9rcoles|miercoles,jueves,viernes,s\u00e1bado|sabado;milisegundo:|s,segundo:|s,minuto:|s,hora:|s,d\u00eda|d\u00edas|dia|dias,semana:|s,mes:|es,a\u00f1o|a\u00f1os|ano|anos;uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez;;el,de;{sign} {num} {unit},{num} {unit} {sign},{date?} {1} {month} {1} {year?},{0} {unit=5-7} {shift},{0} {shift} {unit=5-7};{d} de {month} de {yyyy};anteayer,ayer,hoy,ma\u00f1ana|manana;,hace,,de ahora;,pasad:o|a,,pr\u00f3ximo|pr\u00f3xima|proximo|proxima",
pt:"6;;janeiro,fevereiro,mar\u00e7o,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro;domingo,segunda-feira,ter\u00e7a-feira,quarta-feira,quinta-feira,sexta-feira,s\u00e1bado|sabado;milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,m\u00eas|m\u00eases|mes|meses,ano:|s;um,dois,tr\u00eas|tres,quatro,cinco,seis,sete,oito,nove,dez,uma,duas;;a,de;{num} {unit} {sign},{sign} {num} {unit},{date?} {1} {month} {1} {year?},{0} {unit=5-7} {shift},{0} {shift} {unit=5-7};{d} de {month} de {yyyy};anteontem,ontem,hoje,amanh:\u00e3|a;,atr\u00e1s|atras|h\u00e1|ha,,daqui a;,passad:o|a,,pr\u00f3ximo|pr\u00f3xima|proximo|proxima",
fr:"2;;janvier,f\u00e9vrier|fevrier,mars,avril,mai,juin,juillet,ao\u00fbt,septembre,octobre,novembre,d\u00e9cembre|decembre;dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi;milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|n\u00e9e|nee;un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix;;l'|la|le;{sign} {num} {unit},{sign} {num} {unit},{0} {date?} {month} {year?},{0} {unit=5-7} {shift};{d} {month} {yyyy};,hier,aujourd'hui,demain;,il y a,,dans|d'ici;,derni:er|\u00e8re|ere,,prochain:|e",
it:"2;;Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre;Domenica,Luned:\u00ec|i,Marted:\u00ec|i,Mercoled:\u00ec|i,Gioved:\u00ec|i,Venerd:\u00ec|i,Sabato;millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i;un:|'|a|o,due,tre,quattro,cinque,sei,sette,otto,nove,dieci;;l'|la|il;{num} {unit} {sign},{weekday?} {date?} {month} {year?},{0} {unit=5-7} {shift},{0} {shift} {unit=5-7};{d} {month} {yyyy};,ieri,oggi,domani,dopodomani;,fa,,da adesso;,scors:o|a,,prossim:o|a",
de:"2;;Januar,Februar,M\u00e4rz|Marz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember;Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag;Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en;ein:|e|er|em|en,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn;;der;{sign} {num} {unit},{num} {unit} {sign},{num} {unit} {sign},{sign} {num} {unit},{weekday?} {date?} {month} {year?},{shift} {unit=5-7};{d}. {Month} {yyyy};vorgestern,gestern,heute,morgen,\u00fcbermorgen|ubermorgen|uebermorgen;,vor:|her,,in;,letzte:|r|n|s,,n\u00e4chste:|r|n|s+naechste:|r|n|s",
"zh-TW":"1;\u6708;;\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d;\u6beb\u79d2,\u79d2\u9418,\u5206\u9418,\u5c0f\u6642,\u5929,\u500b\u661f\u671f|\u9031,\u500b\u6708,\u5e74;;;\u65e5|\u865f;{num}{unit}{sign},\u661f\u671f{weekday},{shift}{unit=5-7},{shift}{unit=5}{weekday},{year}\u5e74{month?}\u6708?{date?}{0},{month}\u6708{date?}{0},{date}{0};{yyyy}\u5e74{M}\u6708{d}\u65e5;\u524d\u5929,\u6628\u5929,\u4eca\u5929,\u660e\u5929,\u5f8c\u5929;,\u524d,,\u5f8c;,\u4e0a|\u53bb,\u9019,\u4e0b|\u660e","zh-CN":"1;\u6708;;\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d;\u6beb\u79d2,\u79d2\u949f,\u5206\u949f,\u5c0f\u65f6,\u5929,\u4e2a\u661f\u671f|\u5468,\u4e2a\u6708,\u5e74;;;\u65e5|\u53f7;{num}{unit}{sign},\u661f\u671f{weekday},{shift}{unit=5-7},{shift}{unit=5}{weekday},{year}\u5e74{month?}\u6708?{date?}{0},{month}\u6708{date?}{0},{date}{0};{yyyy}\u5e74{M}\u6708{d}\u65e5;\u524d\u5929,\u6628\u5929,\u4eca\u5929,\u660e\u5929,\u540e\u5929;,\u524d,,\u540e;,\u4e0a|\u53bb,\u8fd9,\u4e0b|\u660e"};
function I(a){var b=a.code;if(!a.m){J("("+a.months.compact().join("|")+")",["month"],b);J("("+a.weekdays.compact().join("|")+")",["weekday"],b);J("("+a.modifiers.filter(function(d){return d.name==="day"}).map("src").join("|")+")",["day"],b);a.formats.each(function(d){a.addFormat(d,b,k)});a.m=j}}function K(a,b,d){if(b&&(!q.isString(a)||!a))a=Date.currentLocale;if(a&&!G[a]||d)L(a,d);return G[a]}
function L(a,b){function d(f,h){f=f.split("+").map(function(c){return c.replace(/(.+):(.+)$/,function(i,m,l){return l.split("|").map(function(n){return m+n}).join("|")})}).join("|");return f.split("|").each(h)}function e(f,h,c){var i=[];if(b[f]){b[f].forEach(function(m,l){d(m,function(n,r){i[r*c+l]=n.toLowerCase()})});if(h)i=i.concat(b[f].map(function(m){return m.slice(0,3).toLowerCase()}));return b[f]=i}}function g(f,h){var c="[0-9\uff10-\uff19]"+(f?"{"+f+","+h+"}":"+");if(b.digits)c+="|["+b.digits+
"]+";return c}b=b||M(a);if(!b)throw Error("Invalid locale.");e("months",j,12);e("weekdays",j,7);e("units",k,8);e("numbers",k,10);b.code=a;b.date=g(1,2);b.year=g(4,4);b.num=function(){var f=[g()].concat(b.articles);b.digits||(f=f.concat(b.numbers));return f.compact().join("|")}();(function(){var f=[];b.f={};b.modifiers.each(function(h){d(h.src,function(c){b.f[c]=h;f.push({name:h.name,src:c,value:h.value})})});f.groupBy("name",function(h,c){c=c.map("src");if(h==="day")c=c.concat(b.weekdays);b[h]=c.join("|")});
b.modifiers=f})();if(b.monthSuffix){b.month=g(1,2);b.months=(1).upto(12).map(function(f){return f+b.monthSuffix})}G[a]=new N(b)}
function M(a){function b(g){return!!(e[0]&Math.pow(2,g-1))}if(a.slice(0,3)=="en-")a="en";if(!H[a])return null;var d={modifiers:[]},e=H[a].split(";");["months","weekdays","units","numbers","articles","optionals","formats"].each(function(g,f){d[g]=e[f+2]?e[f+2].split(","):[]});d.outputFormat=e[9];["day","sign","shift","edge"].each(function(g,f){e[f+10]&&e[f+10].split(",").each(function(h,c){h&&d.modifiers.push({name:g,src:h,value:c-2})})});if(b(1)){d.digits=x+y;if(d.numbers.length>0)d.digits+=d.numbers.join("");
else d.numbers=x.split("");d.monthSuffix=e[1]}d.capitalizeUnit=a=="de";d.hasPlural=b(2);d.pastRelativeFormat=d.formats[0];d.futureRelativeFormat=d.formats[b(3)?1:0];d.durationFormat=d.formats[0].replace(/\s*\{sign\}\s*/,"");return d}function P(a){a||(a=Date.currentLocale);return a!="en"&&a!="en-US"}function N(a){q.merge(this,a)}
q.merge(N.prototype,{getMonth:function(a){return q.isNumber(a)?a-1:this.months.findIndex(p(a,"i"))%12},l:function(a){return this.weekdays.findIndex(p(a,"i"))%7},k:function(a){var b;return q.isNumber(a)?a:a&&(b=this.numbers.indexOf(a))!==-1?(b+1)%10:1},o:function(a){var b=this;return a.replace(this.numbers[9],"").each(function(d){return b.k(d)}).join("")},n:function(a){return u.units[this.units.indexOf(a)%8]},r:function(a){return this.j(a,a[2]>0?"futureRelativeFormat":"pastRelativeFormat")},duration:function(a){return this.j(Q(a),
"durationFormat")},j:function(a,b){var d=a[0],e=a[1],g=a[2],f;if(this.code=="ru"){f=d.toString().from(-1);switch(j){case f==1:f=1;break;case f>=2&&f<=4:f=2;break;default:f=3}}else f=this.hasPlural&&d>1?1:0;f=this.units[f*8+e]||this.units[e];if(this.capitalizeUnit)f=f.capitalize();e=this.modifiers.find(function(h){return h.name=="sign"&&h.value==(g>0?1:-1)});return this[b].assign({num:d,unit:f,sign:e.src})},addFormat:function(a,b,d){var e=[],g=this;d!==k&&g.u.push(a);a=a.replace(/\s+/g,"[-,. ]*");
a=a.replace(/\{(.+?)\}/g,function(f,h){var c=h.match(/\?$/),i=h.match(/(\d)(?:-(\d))?/),m=h.match(/^\d+$/),l=h.replace(/[^a-z]+$/,""),n,r;if(l==="time"){e=e.concat(w);return c?"\\s*(?:(?:t|at |\\s+)(\\d{1,2}):?(\\d{2})?:?(\\d{2})?(?:\\.(\\d{1,6}))?(am|pm)?(?:(Z)|(?:([+-])(\\d{2})(?::?(\\d{2}))?)?)?)?":"(\\d{1,2}):?(\\d{2})?:?(\\d{2})?(?:\\.(\\d{1,6}))?(am|pm)?(?:(Z)|(?:([+-])(\\d{2})(?::?(\\d{2}))?)?)?"}if(m)n=g.optionals[m[0]];else if(g[l])n=g[l];else if(g[l+"s"]){n=g[l+"s"];if(i){r=[];n.forEach(function(Y,
Z){var O=Z%(g.units?8:n.length);if(O>=i[1]&&O<=(i[2]||i[1]))r.push(Y)});n=r}n=n.compact().join("|")}if(m)return"(?:"+n+")?";else{e.push(l);return"("+n+")"+(c?"?":"")}});J(a,e,b)}});function R(a){var b;if(q.isObject(a[0]))return a;else if(a.length==1&&q.isNumber(a[0]))return[a[0]];b={};B.each(function(d,e){b[d.a]=a[e]});return[b]}function S(a,b){if(b!="date"&&b!="month"&&b!="year")return a;return a.replace(z,function(d){return x.indexOf(d)+1||""})}
function aa(a,b){var d={},e,g;b.each(function(f,h){e=a[h+1];if(!(e===void 0||e==="")){e=S(e.hankaku("n"),f);if(f==="year")d.t=e;if(f==="millisecond")e*=Math.pow(10,3-e.length);g=parseFloat(e);d[f]=!isNaN(g)?g:e.toLowerCase()}});return d}
function T(a,b){var d=new s,e=k,g,f,h,c,i,m,l;if(q.isDate(a))d=a;else if(q.isNumber(a))d=new s(a);else if(q.isObject(a)){d=(new s).set(a,j);c=a}else if(q.isString(a)){I(K(b,j));f=P(b);a=a.trim().replace(/\.+$/,"").replace(/^now$/,"");A.each(function(n){var r=a.match(n.q);if(r){h=n;c=aa(r,h.to);g=K(h.p,j);if(c.timestamp){d.setTime(0);c={milliseconds:c.timestamp};return k}if(h.h&&!q.isString(c.month)&&(q.isString(c.date)||f)){l=c.month;c.month=c.date;c.date=l}if(c.year&&c.t.length===2)c.year=((new s).getFullYear()/
100).round()*100-(c.year/100).round()*100+c.year;if(c.month){c.month=g.getMonth(c.month);if(c.shift&&!c.unit)c.unit="year"}if(c.weekday&&c.date)delete c.weekday;else if(c.weekday){c.weekday=g.l(c.weekday);if(c.shift&&!c.unit)c.unit="week"}if(c.day&&(l=g.f[c.day])){c.day=l.value;d.resetTime();e=j}else if(c.day&&(l=g.l(c.day))>-1){delete c.day;c.weekday=l}if(c.date&&!q.isNumber(c.date))c.date=g.o(c.date);if(c.meridian)if(c.meridian==="pm"&&c.hour<12)c.hour+=12;if(c.offset_hours||c.offset_minutes){c.utc=
j;c.offset_minutes=c.offset_minutes||0;c.offset_minutes+=c.offset_hours*60;if(c.offset_sign==="-")c.offset_minutes*=-1;c.minute-=c.offset_minutes}if(c.unit){e=j;m=g.k(c.num);i=g.n(c.unit);if(c.shift||c.edge){m*=(l=g.f[c.shift])?l.value:0;if(i==="month"&&v(c.date)){d.set({day:c.date},j);delete c.date}if(i==="year"&&v(c.month)){d.set({month:c.month,day:c.date},j);delete c.month;delete c.date}}if(c.sign&&(l=g.f[c.sign]))m*=l.value;if(v(c.weekday)){d.set({weekday:c.weekday},j);delete c.weekday}c[i]=(c[i]||
0)+m}if(c.year_sign==="-")c.year*=-1;return k}});if(h)if(e)d.advance(c);else if(c.utc){d.resetTime();d.setUTC(c,j)}else d.set(c,j);else d=a?new s(a):new s;if(c&&c.edge){l=g.f[c.edge];C.slice(4).each(function(n){if(v(c[n.a])){i=n.a;return k}});if(i==="year")c.d="month";else if(i==="month"||i==="week")c.d="day";d[(l.value<0?"endOf":"beginningOf")+i.capitalize()]();l.value===-2&&d.resetTime()}}return{e:d,set:c}}
function U(a,b,d,e){var g,f=K(e,j),h=p(/^[A-Z]/);if(a.isValid())if(Date[b])b=Date[b];else{if(q.isFunction(b)){g=Q(a.millisecondsFromNow());b=b.apply(a,g.concat(f))}}else return"Invalid Date";if(!b&&!d)b=f.outputFormat;else if(!b&&d){g=g||Q(a.millisecondsFromNow());if(g[1]===0){g[1]=1;g[0]=1}return f.r(g)}E.each(function(c){b=b.replace(p("\\{("+c.b+")(\\d)?\\}",c.i?"i":""),function(i,m,l){i=c.format(a,f,l||1,m);l=m.length;var n=m.match(/^(.)\1+$/);if(c.i){if(l===3)i=i.to(3);if(n||m.match(h))i=i.capitalize()}else if(n&&
!c.text)i=(q.isNumber(i)?i.pad(l):i.toString()).last(l);return i})});return b}function ba(a,b,d){var e=T(b),g=0,f=b=0,h;if(d>0){b=f=d;h=j}if(!e.e.isValid())return k;if(e.set&&e.set.d){F.each(function(i){if(i.a===e.set.d)g=i.c(e.e,a-e.e)-1});if(e.set.edge||e.set.shift)e.e["beginningOf"+e.set.d.capitalize()]();if(!h&&e.set.sign&&e.set.d!="millisecond"){b=50;f=-50}}d=a.getTime();h=e.e.getTime();var c=h+g;if(e.set&&e.set.d=="week"&&(new Date(c+1)).getHours()!=0)c-=s.DSTOffset;return d>=h-b&&d<=c+f}
function V(a,b,d,e,g){if(q.isNumber(b)&&g)b={milliseconds:b};else if(q.isNumber(b)){a.setTime(b);return a}if(b.date)b.day=b.date;if(!g&&b.day===void 0&&v(b.weekday)){a["set"+(e?"UTC":"")+"Weekday"](b.weekday);b.day=a["get"+(e?"UTC":"")+"Date"](void 0);delete b.weekday}C.each(function(f){if(v(b[f.a])||v(b[f.a+"s"])){b.d=f.a;return k}else if(d&&f.a!=="week"&&f.a!=="year")a["set"+(e?"UTC":"")+f.method](f.a==="day"?1:0)});F.each(function(f){var h=f.a;f=f.method;var c=v(b[h])?b[h]:b[h+"s"];if(c!==void 0){if(g){if(h===
"week"){c=(b.day||0)+c*7;f="Date"}c=c*g+a["get"+f](void 0)}a["set"+(e?"UTC":"")+f](c);if(h==="month"){h=c;if(h<0)h+=12;h%12!=a.getMonth()&&a.setDate(0)}}});return a}function W(a){a.addDays(4-(a.getDay()||7)).resetTime();return 1+(a.daysSince(a.clone().beginningOfYear())/7|0)}function Q(a){var b,d=a.abs(),e=d,g=0;C.from(1).each(function(f,h){b=(d/f.c()*10).round()/10|0;if(b>=1){e=b;g=h+1}});return[e,g,a]}function X(a){var b;b=q.isNumber(a[1])?R(a)[0]:a[0];return T(b,a[1]).e}
function ca(a,b){function d(){return(this*b).round()}function e(){return X(arguments)[f](this)}function g(){return X(arguments)[f](-this)}var f="add"+a.capitalize()+"s",h={};h[a]=d;h[a+"s"]=d;h[a+"Before"]=g;h[a+"sBefore"]=g;h[a+"Ago"]=g;h[a+"sAgo"]=g;h[a+"After"]=e;h[a+"sAfter"]=e;h[a+"FromNow"]=e;h[a+"sFromNow"]=e;t.extend(h)}
function $(a){var b=new s(s.UTC(1999,11,31)),d={};if(!b[a]||b[a]()!=="1999-12-31T00:00:00.000Z"){d[a]=function(){return U(this.toUTC(),s.ISO8601_DATETIME)};s.extend(d,j)}}s.extend({create:function(){return X(arguments)},now:function(){return(new s).getTime()},setLocale:function(a,b){var d=K(a,k,b);if(d){Date.currentLocale=a;I(d);return d}},getLocale:function(a){return K(a,j)},addFormat:function(a,b,d,e){J(a,b,d,e,"unshift")}},k,k);
function J(a,b,d,e,g){g=g||"push";A[g]({h:e,p:d,q:p("^"+a+"$","i"),to:b})}
s.extend({set:function(){var a=R(arguments);return V(this,a[0],a[1])},setUTC:function(){var a=R(arguments);return V(this,a[0],a[1],j)},setWeekday:function(a){a===void 0||this.setDate(this.getDate()+a-this.getDay())},setUTCWeekday:function(a){a===void 0||this.setDate(this.getUTCDate()+a-this.getDay())},setWeek:function(a){if(a!==void 0){this.setMonth(0);this.setDate(a*7+1)}},setUTCWeek:function(a){if(a!==void 0){this.setMonth(0);this.setUTCDate(a*7+1)}},getWeek:function(){return W(this)},getUTCWeek:function(){return W(this.toUTC())},
getUTCOffset:function(a){var b=this.g?0:this.getTimezoneOffset(),d=a===j?":":"";if(!b&&a)return"Z";return(-b/60).round().pad(2,j)+d+(b%60).pad(2)},toUTC:function(){if(this.g)return this;var a=this.clone().addMinutes(this.getTimezoneOffset());a.g=j;return a},isUTC:function(){return this.g||this.getTimezoneOffset()===0},advance:function(){var a=R(arguments);return V(this,a[0],k,k,1,j)},rewind:function(){var a=R(arguments);return V(this,a[0],k,k,-1)},isValid:function(){return!isNaN(this.getTime())},
isAfter:function(a,b){return this.getTime()>s.create(a).getTime()-(b||0)},isBefore:function(a,b){return this.getTime()<s.create(a).getTime()+(b||0)},isBetween:function(a,b,d){var e=this.getTime();a=s.create(a).getTime();var g=s.create(b).getTime();b=Math.min(a,g);a=Math.max(a,g);d=d||0;return b-d<e&&a+d>e},isLeapYear:function(){var a=this.getFullYear();return a%4===0&&a%100!==0||a%400===0},daysInMonth:function(){return 32-(new s(this.getFullYear(),this.getMonth(),32)).getDate()},format:function(a,
b){return U(this,a,k,b)},relative:function(a,b){if(q.isString(a)){b=a;a=null}return U(this,a,j,b)},is:function(a,b){var d;if(q.isString(a)){a=a.trim().toLowerCase();switch(j){case a==="future":return this.getTime()>(new s).getTime();case a==="past":return this.getTime()<(new s).getTime();case a==="weekday":return this.getDay()>0&&this.getDay()<6;case a==="weekend":return this.getDay()===0||this.getDay()===6;case (d=u.weekdays.indexOf(a)%7)>-1:return this.getDay()===d;case (d=u.months.indexOf(a)%12)>
-1:return this.getMonth()===d}}return ba(this,a,b)},resetTime:function(){return this.set({hour:0,minute:0,second:0,millisecond:0})},clone:function(){return new s(this.getTime())}});s.extend({iso:function(){return this.toISOString()},getWeekday:s.prototype.getDay,getUTCWeekday:s.prototype.getUTCDay});t.extend({duration:function(a){return Date.getLocale(a).duration(this)}});u=s.setLocale("en");
(function(){var a={};F.each(function(b,d){function e(i,m){return((s.create(i,m).getTime()-this.getTime())/c).round()}function g(i,m){return((this.getTime()-s.create(i,m).getTime())/c).round()}var f=b.a,h=f.capitalize(),c=b.c();a[f+"sAgo"]=e;a[f+"sUntil"]=e;a[f+"sSince"]=g;a[f+"sFromNow"]=g;a["add"+h+"s"]=function(i){var m={};m[f]=i;return this.advance(m)};ca(f,c);d<3&&["Last","This","Next"].each(function(i){a["is"+i+h]=function(){return this.is(i+" "+f)}});if(d<4){a["beginningOf"+h]=function(){var i=
{};switch(f){case "year":i.year=this.getFullYear();break;case "month":i.month=this.getMonth();break;case "day":i.day=this.getDate();break;case "week":i.weekday=0}return this.set(i,j)};a["endOf"+h]=function(){var i={hours:23,minutes:59,seconds:59,milliseconds:999};switch(f){case "year":i.month=11;i.day=31;break;case "month":i.day=this.daysInMonth();break;case "week":i.weekday=6}return this.set(i,j)}}});s.extend(a)})();
(function(){B=F.clone().removeAt(2);C=F.clone().reverse();var a="\\d{1,2}|"+u.months.join("|");D.each(function(b){J(b.src.replace(/\{month\}/,a)+(b.s===k?"":"\\s*(?:(?:t|at |\\s+)(\\d{1,2}):?(\\d{2})?:?(\\d{2})?(?:\\.(\\d{1,6}))?(am|pm)?(?:(Z)|(?:([+-])(\\d{2})(?::?(\\d{2}))?)?)?)?"),b.to.concat(w),"en",b.h)});J("(\\d{1,2}):?(\\d{2})?:?(\\d{2})?(?:\\.(\\d{1,6}))?(am|pm)?(?:(Z)|(?:([+-])(\\d{2})(?::?(\\d{2}))?)?)?",w)})();
(function(){var a={},b=u.weekdays.slice(0,7),d=u.months.slice(0,12);["today","yesterday","tomorrow","weekday","weekend","future","past"].concat(b).concat(d).each(function(e){a["is"+e.capitalize()]=function(){return this.is(e)}});s.extend(a)})();$("toISOString");$("toJSON");
s.extend({DSTOffset:((new s(2E3,6,1)).getTimezoneOffset()-(new s(2E3,0,1)).getTimezoneOffset())*60*1E3,INTERNATIONAL_TIME:"{h}:{mm}:{ss}",RFC1123:"{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}",RFC1036:"{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}",ISO8601_DATE:"{yyyy}-{MM}-{dd}",ISO8601_DATETIME:"{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}"},k,k);})(this);
/*! jQuery v1.7.1 jquery.com | jquery.org/license */

(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);
/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-borderradius-boxshadow-hsla-hashchange-history-iepp-mq-cssclasses-teststyles-testprop-testallprops-hasevent-domprefixes-load
 */

;window.Modernizr=function(a,b,c){function D(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+n.join(c+" ")+c).split(" ");return C(d,b)}function C(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function B(a,b){return!!~(""+a).indexOf(b)}function A(a,b){return typeof a===b}function z(a,b){return y(prefixes.join(a+";")+(b||""))}function y(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l,m=Object.prototype.toString,n="Webkit Moz O ms Khtml".split(" "),o={},p={},q={},r=[],s=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},t=function(b){if(a.matchMedia)return matchMedia(b).matches;var c;s("@media "+b+" { #"+i+" { position: absolute; } }",function(b){c=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position=="absolute"});return c},u=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=A(e[d],"function"),A(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),v,w={}.hasOwnProperty,x;!A(w,c)&&!A(w.call,c)?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],c)},o.hashchange=function(){return u("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},o.history=function(){return!!a.history&&!!history.pushState},o.hsla=function(){y("background-color:hsla(120,40%,100%,.5)");return B(k.backgroundColor,"rgba")||B(k.backgroundColor,"hsla")},o.borderradius=function(){return D("borderRadius")},o.boxshadow=function(){return D("boxShadow")};for(var E in o)x(o,E)&&(v=E.toLowerCase(),e[v]=o[E](),r.push((e[v]?"":"no-")+v));y(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._domPrefixes=n,e.mq=t,e.hasEvent=u,e.testProp=function(a){return C([a])},e.testAllProps=D,e.testStyles=s,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+r.join(" "):"");return e}(this,this.document),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/* ===================================================
 * bootstrap-transition.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ) {

  $(function () {

    "use strict"

    /* CSS TRANSITION SUPPORT (https://gist.github.com/373874)
     * ======================================================= */

    $.support.transition = (function () {
      var thisBody = document.body || document.documentElement
        , thisStyle = thisBody.style
        , support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined

      return support && {
        end: (function () {
          var transitionEnd = "TransitionEnd"
          if ( $.browser.webkit ) {
          	transitionEnd = "webkitTransitionEnd"
          } else if ( $.browser.mozilla ) {
          	transitionEnd = "transitionend"
          } else if ( $.browser.opera ) {
          	transitionEnd = "oTransitionEnd"
          }
          return transitionEnd
        }())
      }
    })()

  })

}( window.jQuery );/* ==========================================================
 * bootstrap-alert.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ){

  "use strict"

 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function ( el ) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype = {

    constructor: Alert

  , close: function ( e ) {
      var $this = $(this)
        , selector = $this.attr('data-target')
        , $parent

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.trigger('close')

      e && e.preventDefault()

      $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

      $parent
        .trigger('close')
        .removeClass('in')

      function removeElement() {
        $parent
          .trigger('closed')
          .remove()
      }

      $.support.transition && $parent.hasClass('fade') ?
        $parent.on($.support.transition.end, removeElement) :
        removeElement()
    }

  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}( window.jQuery );/* ============================================================
 * bootstrap-button.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function ( element, options ) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype = {

      constructor: Button

    , setState: function ( state ) {
        var d = 'disabled'
          , $el = this.$element
          , data = $el.data()
          , val = $el.is('input') ? 'val' : 'html'

        state = state + 'Text'
        data.resetText || $el.data('resetText', $el[val]())

        $el[val](data[state] || this.options[state])

        // push to event loop to allow forms to submit
        setTimeout(function () {
          state == 'loadingText' ?
            $el.addClass(d).attr(d, d) :
            $el.removeClass(d).removeAttr(d)
        }, 0)
      }

    , toggle: function () {
        var $parent = this.$element.parent('[data-toggle="buttons-radio"]')

        $parent && $parent
          .find('.active')
          .removeClass('active')

        this.$element.toggleClass('active')
      }

  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  $.fn.button = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON DATA-API
  * =============== */

  $(function () {
    $('body').on('click.button.data-api', '[data-toggle^=button]', function ( e ) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      $btn.button('toggle')
    })
  })

}( window.jQuery );/* ==========================================================
 * bootstrap-carousel.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ){

  "use strict"

 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.carousel.defaults, options)
    this.options.slide && this.slide(this.options.slide)
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function () {
      this.interval = setInterval($.proxy(this.next, this), this.options.interval)
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function () {
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      if (!$.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger('slide')
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      } else {
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.trigger('slide')
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  $.fn.carousel = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = typeof option == 'object' && option
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (typeof option == 'string' || (option = options.slide)) data[option]()
      else data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL DATA-API
  * ================= */

  $(function () {
    $('body').on('click.carousel.data-api', '[data-slide]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
      $target.carousel(options)
      e.preventDefault()
    })
  })

}( window.jQuery );/* =============================================================
 * bootstrap-collapse.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

  var Collapse = function ( element, options ) {
  	this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options["parent"]) {
      this.$parent = $(this.options["parent"])
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension = this.dimension()
        , scroll = $.camelCase(['scroll', dimension].join('-'))
        , actives = this.$parent && this.$parent.find('.in')
        , hasData

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', 'show', 'shown')
      this.$element[dimension](this.$element[0][scroll])

    }

  , hide: function () {
      var dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', 'hide', 'hidden')
      this.$element[dimension](0)
    }

  , reset: function ( size ) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function ( method, startEvent, completeEvent ) {
      var that = this
        , complete = function () {
            if (startEvent == 'show') that.reset()
            that.$element.trigger(completeEvent)
          }

      this.$element
        .trigger(startEvent)
        [method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
  	}

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
  	}

  }

  /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function ( e ) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $(target).collapse(option)
    })
  })

}( window.jQuery );/* ============================================================
 * bootstrap-dropdown.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function( $ ){

  "use strict"

 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function ( element ) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function ( e ) {
      var $this = $(this)
        , selector = $this.attr('data-target')
        , $parent
        , isActive

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()
      !isActive && $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body').on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}( window.jQuery );/* =========================================================
 * bootstrap-modal.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function( $ ){

  "use strict"

 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function ( content, options ) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this

        if (this.isShown) return

        $('body').addClass('modal-open')

        this.isShown = true
        this.$element.trigger('show')

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          !that.$element.parent().length && that.$element.appendTo(document.body) //don't move modals dom position

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function ( e ) {
        e && e.preventDefault()

        if (!this.isShown) return

        var that = this
        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element
          .trigger('hide')
          .removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal( that ) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop( callback ) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.modal', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.modal(option)
    })
  })

}( window.jQuery );/* ===========================================================
 * bootstrap-tooltip.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function( $ ) {

  "use strict"

 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function ( element, options ) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function ( type, element, options ) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function ( options ) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) {
        self.show()
      } else {
        self.hoverState = 'in'
        setTimeout(function() {
          if (self.hoverState == 'in') {
            self.show()
          }
        }, self.options.delay.show)
      }
    }

  , leave: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.hide) {
        self.hide()
      } else {
        self.hoverState = 'out'
        setTimeout(function() {
          if (self.hoverState == 'out') {
            self.hide()
          }
        }, self.options.delay.hide)
      }
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
      $tip.find('.tooltip-inner').html(this.getTitle())
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      title = (title || '').toString().replace(/(^\s*|\s*$)/, "")

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , delay: 0
  , selector: false
  , placement: 'top'
  , trigger: 'hover'
  , title: ''
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  }

}( window.jQuery );/* ===========================================================
 * bootstrap-popover.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function( $ ) {

 "use strict"

  var Popover = function ( element, options ) {
    this.init('popover', element, options)
  }

  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[ $.type(title) == 'object' ? 'append' : 'html' ](title)
      $tip.find('.popover-content > *')[ $.type(content) == 'object' ? 'append' : 'html' ](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      content = content.toString().replace(/(^\s*|\s*$)/, "")

      return content
    }

  , tip: function() {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}( window.jQuery );/* =============================================================
 * bootstrap-scrollspy.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */

!function ( $ ) {

  "use strict"

  /* SCROLLSPY CLASS DEFINITION
   * ========================== */

  function ScrollSpy( element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body').on('click.scroll.data-api', this.selector, process)
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        this.targets = this.$body
          .find(this.selector)
          .map(function () {
            var href = $(this).attr('href')
            return /^#\w/.test(href) && $(href).length ? href : null
          })

        this.offsets = $.map(this.targets, function (id) {
          return $(id).position().top
        })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active

        this.activeTarget = target

        this.$body
          .find(this.selector).parent('.active')
          .removeClass('active')

        active = this.$body
          .find(this.selector + '[href="' + target + '"]')
          .parent('li')
          .addClass('active')

        if ( active.parent('.dropdown-menu') )  {
          active.closest('li.dropdown').addClass('active')
        }
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}( window.jQuery );/* ========================================================
 * bootstrap-tab.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function( $ ){

  "use strict"

 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function ( element ) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      $this.trigger({
        type: 'show'
      , relatedTarget: previous
      })

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}( window.jQuery );/* =============================================================
 * bootstrap-typeahead.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

  var Typeahead = function ( element, options ) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element.val(val)
      this.$element.change();
      return this.hide()
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query) {
        return this.shown ? this.hide() : this
      }

      items = $.grep(this.source, function (item) {
        if (that.matcher(item)) return item
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      return item.replace(new RegExp('(' + this.query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}( window.jQuery );
//     Underscore.js 1.3.1
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.1';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      if (index == 0) {
        shuffled[0] = value;
      } else {
        rand = Math.floor(Math.random() * (index + 1));
        shuffled[index] = shuffled[rand];
        shuffled[rand] = value;
      }
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return slice.call(iterable);
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var result = [];
    _.reduce(initial, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) {
        memo[memo.length] = el;
        result[result.length] = array[i];
      }
      return memo;
    }, []);
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        func.apply(context, args);
      }
      whenDone();
      throttling = true;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(/\\\\/g, '\\').replace(/\\'/g, "'");
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape || noMatch, function(match, code) {
           return "',_.escape(" + unescape(code) + "),'";
         })
         .replace(c.interpolate || noMatch, function(match, code) {
           return "'," + unescape(code) + ",'";
         })
         .replace(c.evaluate || noMatch, function(match, code) {
           return "');" + unescape(code).replace(/[\r\n\t]/g, ' ') + ";__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', '_', tmpl);
    if (data) return func(data, _);
    return function(data) {
      return func.call(this, data, _);
    };
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);
//     Backbone.js 0.9.1

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `global`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to slice/splice.
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.1';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  var $ = root.jQuery || root.Zepto || root.ender;

  // Set the JavaScript library that will be used for DOM manipulation and
  // Ajax calls (a.k.a. the `$` variable). By default Backbone will use: jQuery,
  // Zepto, or Ender; but the `setDomLibrary()` method lets you inject an
  // alternate JavaScript library (or a mock library for testing your views
  // outside of a browser).
  Backbone.setDomLibrary = function(lib) {
    $ = lib;
  };

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback functions
  // to an event; trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Backbone.Events = {

    // Bind an event, specified by a string name, `ev`, to a `callback`
    // function. Passing `"all"` will bind the callback to all events fired.
    on: function(events, callback, context) {
      var ev;
      events = events.split(/\s+/);
      var calls = this._callbacks || (this._callbacks = {});
      while (ev = events.shift()) {
        // Create an immutable callback list, allowing traversal during
        // modification.  The tail is an empty object that will always be used
        // as the next node.
        var list  = calls[ev] || (calls[ev] = {});
        var tail = list.tail || (list.tail = list.next = {});
        tail.callback = callback;
        tail.context = context;
        list.tail = tail.next = {};
      }
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all callbacks
    // with that function. If `callback` is null, removes all callbacks for the
    // event. If `ev` is null, removes all bound callbacks for all events.
    off: function(events, callback, context) {
      var ev, calls, node;
      if (!events) {
        delete this._callbacks;
      } else if (calls = this._callbacks) {
        events = events.split(/\s+/);
        while (ev = events.shift()) {
          node = calls[ev];
          delete calls[ev];
          if (!callback || !node) continue;
          // Create a new list, omitting the indicated event/context pairs.
          while ((node = node.next) && node.next) {
            if (node.callback === callback &&
              (!context || node.context === context)) continue;
            this.on(ev, node.callback, node.context);
          }
        }
      }
      return this;
    },

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls['all'];
      (events = events.split(/\s+/)).push(null);
      // Save references to the current heads & tails.
      while (event = events.shift()) {
        if (all) events.push({next: all.next, tail: all.tail, event: event});
        if (!(node = calls[event])) continue;
        events.push({next: node.next, tail: node.tail});
      }
      // Traverse each list, stopping when the saved tail is reached.
      rest = slice.call(arguments, 1);
      while (node = events.pop()) {
        tail = node.tail;
        args = node.event ? [node.event].concat(rest) : rest;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
      return this;
    }

  };

  // Aliases for backwards compatibility.
  Backbone.Events.bind   = Backbone.Events.on;
  Backbone.Events.unbind = Backbone.Events.off;

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (options && options.parse) attributes = this.parse(attributes);
    if (defaults = getValue(this, 'defaults')) {
      attributes = _.extend({}, defaults, attributes);
    }
    if (options && options.collection) this.collection = options.collection;
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    if (!this.set(attributes, {silent: true})) {
      throw new Error("Can't create an invalid model");
    }
    delete this._changed;
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Backbone.Model.prototype, Backbone.Events, {

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function() {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.attributes[attr];
      return this._escapedAttributes[attr] = _.escape(val == null ? '' : '' + val);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.attributes[attr] != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, value, options) {
      var attrs, attr, val;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      // Extract attributes and options.
      options || (options = {});
      if (!attrs) return this;
      if (attrs instanceof Backbone.Model) attrs = attrs.attributes;
      if (options.unset) for (attr in attrs) attrs[attr] = void 0;

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var now = this.attributes;
      var escaped = this._escapedAttributes;
      var prev = this._previousAttributes || {};
      var alreadySetting = this._setting;
      this._changed || (this._changed = {});
      this._setting = true;

      // Update attributes.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(now[attr], val)) delete escaped[attr];
        options.unset ? delete now[attr] : now[attr] = val;
        if (this._changing && !_.isEqual(this._changed[attr], val)) {
          this.trigger('change:' + attr, this, val, options);
          this._moreChanges = true;
        }
        delete this._changed[attr];
        if (!_.isEqual(prev[attr], val) || (_.has(now, attr) != _.has(prev, attr))) {
          this._changed[attr] = val;
        }
      }

      // Fire the `"change"` events, if the model has been changed.
      if (!alreadySetting) {
        if (!options.silent && this.hasChanged()) this.change(options);
        this._setting = false;
      }
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      (options || (options = {})).unset = true;
      return this.set(attr, null, options);
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      (options || (options = {})).unset = true;
      return this.set(_.clone(this.attributes), options);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = Backbone.wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, value, options) {
      var attrs, current;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      options = options ? _.clone(options) : {};
      if (options.wait) current = _.clone(this.attributes);
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var serverAttrs = model.parse(resp, xhr);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (!model.set(serverAttrs, options)) return false;
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
      if (options.wait) this.set(current, silentOptions);
      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var triggerDestroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      if (this.isNew()) return triggerDestroy();
      options.success = function(resp) {
        if (options.wait) triggerDestroy();
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var xhr = (this.sync || Backbone.sync).call(this, 'delete', this, options);
      if (!options.wait) triggerDestroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = getValue(this.collection, 'url') || getValue(this, 'urlRoot') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, xhr) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    change: function(options) {
      if (this._changing || !this.hasChanged()) return this;
      this._changing = true;
      this._moreChanges = true;
      for (var attr in this._changed) {
        this.trigger('change:' + attr, this, this._changed[attr], options);
      }
      while (this._moreChanges) {
        this._moreChanges = false;
        this.trigger('change', this, options);
      }
      this._previousAttributes = _.clone(this.attributes);
      delete this._changed;
      this._changing = false;
      return this;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (!arguments.length) return !_.isEmpty(this._changed);
      return this._changed && _.has(this._changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this._changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (!arguments.length || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Check if the model is currently in a valid state. It's only possible to
    // get into an *invalid* state if you're using silent changes.
    isValid: function() {
      return !this.validate(this.attributes);
    },

    // Run validation against a set of incoming attributes, returning `true`
    // if all is well. If a specific `error` callback has been passed,
    // call that instead of firing the general `"error"` event.
    _validate: function(attrs, options) {
      if (options.silent || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(attrs, options);
      if (!error) return true;
      if (options && options.error) {
        options.error(this, error, options);
      } else {
        this.trigger('error', this, error, options);
      }
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.comparator) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, {silent: true, parse: options.parse});
  };

  // Define the Collection's inheritable methods.
  _.extend(Backbone.Collection.prototype, Backbone.Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Backbone.Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function() {
      return this.map(function(model){ return model.toJSON(); });
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.
    add: function(models, options) {
      var i, index, length, model, cid, id, cids = {}, ids = {};
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];

      // Begin by turning bare objects into model references, and preventing
      // invalid models or duplicate models from being added.
      for (i = 0, length = models.length; i < length; i++) {
        if (!(model = models[i] = this._prepareModel(models[i], options))) {
          throw new Error("Can't add an invalid model to a collection");
        }
        if (cids[cid = model.cid] || this._byCid[cid] ||
          (((id = model.id) != null) && (ids[id] || this._byId[id]))) {
          throw new Error("Can't add the same model to a collection twice");
        }
        cids[cid] = ids[id] = model;
      }

      // Listen to added models' events, and index models for lookup by
      // `id` and by `cid`.
      for (i = 0; i < length; i++) {
        (model = models[i]).on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // Insert models into the collection, re-sorting if needed, and triggering
      // `add` events unless silenced.
      this.length += length;
      index = options.at != null ? options.at : this.models.length;
      splice.apply(this.models, [index, 0].concat(models));
      if (this.comparator) this.sort({silent: true});
      if (options.silent) return this;
      for (i = 0, length = this.models.length; i < length; i++) {
        if (!cids[(model = this.models[i]).cid]) continue;
        options.index = i;
        model.trigger('add', model, this, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.getByCid(models[i]) || this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Get a model from the set by id.
    get: function(id) {
      if (id == null) return null;
      return this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.
    getByCid: function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      var boundComparator = _.bind(this.comparator, this);
      if (this.comparator.length == 1) {
        this.models = this.sortBy(boundComparator);
      } else {
        this.models.sort(boundComparator);
      }
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      models  || (models = []);
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      this._reset();
      this.add(models, {silent: true, parse: options.parse});
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === undefined) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
        if (success) success(collection, resp);
      };
      options.error = Backbone.wrapError(options.error, collection, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      var coll = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) coll.add(model, options);
      var success = options.success;
      options.success = function(nextModel, resp, xhr) {
        if (options.wait) coll.add(nextModel, options);
        if (success) {
          success(nextModel, resp);
        } else {
          nextModel.trigger('sync', model, resp, options);
        }
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, xhr) {
      return resp;
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function () {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(model, options) {
      if (!(model instanceof Backbone.Model)) {
        var attrs = model;
        options.collection = this;
        model = new this.model(attrs, options);
        if (!model._validate(model.attributes, options)) model = false;
      } else if (!model.collection) {
        model.collection = this;
      }
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(ev, model, collection, options) {
      if ((ev == 'add' || ev == 'remove') && collection != this) return;
      if (ev == 'destroy') {
        this.remove(model, options);
      }
      if (model && ev === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
    'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
    'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
    'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
    'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Backbone.Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Backbone.Router.prototype, Backbone.Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      Backbone.history || (Backbone.history = new Backbone.History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        routes.unshift([route, this.routes[route]]);
      }
      for (var i = 0, l = routes.length; i < l; i++) {
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // Cached regex for cleaning leading hashes and slashes .
  var routeStripper = /^[#\/]/;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Has the history handling already been started?
  var historyStarted = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(Backbone.History.prototype, Backbone.Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || forcePushState) {
          fragment = window.location.pathname;
          var search = window.location.search;
          if (search) fragment += search;
        } else {
          fragment = window.location.hash;
        }
      }
      fragment = decodeURIComponent(fragment);
      if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      if (historyStarted) throw new Error("Backbone.history has already been started");
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
      if (oldIE) {
        this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      historyStarted = true;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = loc.hash.replace(routeStripper, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }

      if (!this.options.silent) {
        return this.loadUrl();
      }
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      historyStarted = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.iframe.location.hash);
      if (current == this.fragment || current == decodeURIComponent(this.fragment)) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(window.location.hash);
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you which to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!historyStarted) return false;
      if (!options || options === true) options = {trigger: options};
      var frag = (fragment || '').replace(routeStripper, '');
      if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this.fragment = frag;
        this._updateHash(window.location, frag, options.replace);
        if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a history entry on hash-tag change.
          // When replace is true, we don't want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, frag, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        window.location.assign(this.options.root + fragment);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        location.replace(location.toString().replace(/(javascript:|#).*$/, '') + '#' + fragment);
      } else {
        location.hash = fragment;
      }
    }
  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var eventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(Backbone.View.prototype, Backbone.Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view from the DOM. Note that the view isn't present in the
    // DOM by default, so calling this method may be a no-op.
    remove: function() {
      this.$el.remove();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      this.$el = $(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = getValue(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Event "' + events[key] + '" does not exist');
        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      for (var i = 0, l = viewOptions.length; i < l; i++) {
        var attr = viewOptions[i];
        if (options[attr]) this[attr] = options[attr];
      }
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = getValue(this, 'attributes') || {};
        if (this.id) attrs.id = this.id;
        if (this.className) attrs['class'] = this.className;
        this.setElement(this.make(this.tagName, attrs), false);
      } else {
        this.setElement(this.el, false);
      }
    }

  });

  // The self-propagating extend function that Backbone classes use.
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // Set up inheritance for the model, collection, and view.
  Backbone.Model.extend = Backbone.Collection.extend =
    Backbone.Router.extend = Backbone.View.extend = extend;

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = getValue(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!options.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data._method = type;
        params.type = 'POST';
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
        };
      }
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    return $.ajax(_.extend(params, options));
  };

  // Wrap an optional error callback with a fallback error event.
  Backbone.wrapError = function(onError, originalModel, options) {
    return function(model, resp) {
      resp = model === originalModel ? resp : model;
      if (onError) {
        onError(originalModel, resp, options);
      } else {
        originalModel.trigger('error', originalModel, resp, options);
      }
    };
  };

  // Helpers
  // -------

  // Shared empty constructor function to aid in prototype-chain creation.
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.
    if (staticProps) _.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a value from a Backbone object as a property
  // or as a function.
  var getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);
var Verlag = {};

Verlag.Model = {};
Verlag.Collection = {};
Verlag.View = {};

// TODO make a view
Verlag.notify = function(message, options){
  var options = options || {};
  var klass = options['class'] || 'message';
  var notice = jQuery('.notice');
  
  notice
    .html(message) 
    .addClass(klass)
    .fadeIn('fast', function(){
      setTimeout(function(){
        if (!options['persist']){
          notice.fadeOut('slow');
        }
      }, 1800);
    });
}; 
  
Verlag.hide_notice = function(){
  jQuery('.notice').fadeOut('slow');    
};



// ACE Editor modes depending on content type
Verlag.ace_modes = {
  'javascript' : require('ace/mode/javascript').Mode,
  'html'       : require('ace/mode/html').Mode,
  'css'        : require('ace/mode/css').Mode,
  'scss'       : require('ace/mode/scss').Mode,
  'sass'       : require('ace/mode/scss').Mode,
  // 'less'       : require('ace/mode/less').Mode,
  'textile'    : require('ace/mode/textile').Mode,
  // 'partial'    : require('ace/mode/scss').Mode,
  'none'       : require('ace/mode/scss').Mode
}
;
Verlag.Model.Asset = Backbone.Model.extend({
      
  urlRoot: '/api/v1/assets',
  
  isImage: function(){
    return this.get('file_type') && this.get('file_type').match(/image/);
  },
  
  imagePath: function(){
    return '/images/' + this.id + '/' + this.get('file_name');
  },
  
  adminPath: function(){
    return '/admin/folders/'+ this.get('folder_id') + '/assets/' + this.id;
  },
  
  upload: function(file, callback){
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    var asset = this;

    var generateUuid = function(){
      // http://www.ietf.org/rfc/rfc4122.txt
      var s = [];
      var hexDigits = '0123456789ABCDEF';
      for (var i = 0; i < 32; i++) { s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); }
      s[12] = '4';                                       // bits 12-15 of the time_hi_and_version field to 0010
      s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      return s.join(''); 
    };
  
    var onprogressHandler = function(evt){
      // var percent = evt.loaded / evt.total * 100;
      // $('#percent').text(percent + '%'); 
    };
  
    var onreadystatechangeHandler = function(evt){
      var status = null;
      try { status = evt.target.status; }
      catch(e) { return; }
  
      // readyState 4 means that the request is finished
      if (status == '200' && evt.target.readyState == 4 && evt.target.responseText) {
        var response = JSON.parse(evt.target.responseText);
        asset.set(response);
        callback(asset, response);
      }
    };
    
    asset.set('uuid', generateUuid());
    formData.append('file', file);
    formData.append('folder_id', this.get('folder_id'));  
    
    xhr.upload.addEventListener('progress', onprogressHandler, false);
    xhr.addEventListener('readystatechange', onreadystatechangeHandler, false);
    xhr.open('POST', asset.urlRoot + '.json', true);
    xhr.send(formData);
  }
  
  
});
Verlag.Model.Folder = Backbone.Model.extend({
  
  urlRoot: '/api/v1/folders',
  
  // fetchAssets: function(callback){
  //   var self = this;
  //   $.ajax({
  //     url: '/admin/folders/' + self.id + '/children.json',
  //     success: function(response){
  //       var assets = new Verlag.Collection.Assets(response);
  //       if(callback){
  //         callback.call(this, assets, response);
  //       }
  //     }
  //   });
  // },
  
  adminPath: function(){
    return '/admin/folders/' + this.id 
  }
  
  
});
Verlag.Model.Item = Backbone.Model.extend({
  
  urlRoot: '/api/v1/items',
  
  isImage: function(){
    return this.get('file_type') && this.get('file_type').match(/image/);
  },
  
  imagePath: function(){
    '/images/' + this.id + '/' + this.get('file_name') + '?w=240&amp;h=180&amp;c=t&amp;g=North';
  },
  
  adminPath: function(){
    var type = this.get('_type') ? this.get('_type').toLowerCase() + 's/'  : '';
    var path = '/admin/' + type + this.id;
    return path;
  }

});
Verlag.Model.Page = Backbone.Model.extend({
  
  urlRoot: '/api/v1/pages',
  
  children: function(){
    var self = this,
      children = Verlag.pages.select(function(page){
        return page.get('parent_id') == self.id;
      });
      
    return new Verlag.Collection.Pages(children);
  },
  
  childData: function(){
    return this.children().map(function(child){
      return child.pageData();
    });
  },
  
  pageData: function(){
    var attr = this.toJSON();
    
    attr['children'] = this.childData();
    return attr;
  },
  
  adminPath: function(){
    return '/admin/pages/' + this.id 
  }
  
  
});
Verlag.Model.PageType = Backbone.Model.extend({
  
  urlRoot: '/api/v1/page_types',

});
Verlag.Model.PartType = Backbone.Model.extend({
  
  urlRoot: '/api/v1/page_types',
  
});
Verlag.Model.Template = Backbone.Model.extend({
  
  urlRoot: '/api/v1/templates',
  
  adminPath: function(){
    return '/admin/templates/' + this.id 
  }
  
  
});
Verlag.Model.User = Backbone.Model.extend({
  
  urlRoot: '/api/v1/users',
  
  isAdmin: function(){
    return this.get('role').id >= 100;
  },
  
  isSuperUser: function(){
    return this.get('role').id >= 101;
  },
  
  adminPath: function(){
    return '/admin/folders/' + this.id 
  }
  
});
Verlag.Collection.Assets = Backbone.Collection.extend({
  
  model: Verlag.Model.Asset,

  url: '/api/v1/assets',
  
  // url: function(folder_id){
  //   return '/admin/folders/' + folder_id + '/assets.json'
  // },

  initialize: function() {
  
  },
  
  comparator: function(asset) {
    var date = new Date(asset.get('created_at')).getTime();
    return -date;
  }

});
Verlag.Collection.Folders = Backbone.Collection.extend({
  
  model: Verlag.Model.Folder,

  url: '/api/v1/folders'
  
});
Verlag.Collection.Items = Backbone.Collection.extend({
  
  urlRoot: '/api/v1/items'
  
});
Verlag.Collection.PageTypes = Backbone.Collection.extend({
  
  model: Verlag.Model.PageType,
  
  url: '/api/v1/page_types'
  
});
Verlag.Collection.Pages = Backbone.Collection.extend({
  
  model: Verlag.Model.Page,

  url: '/api/v1/pages',

  initialize: function() {
  
  }, 
  
  root: function(){
    return this.detect(function(page){
      return !page.get('parent_id');
    });
  },
  
  findByParentId: function(id){
    return this.select(function(page){
      return page.get('parent_id') == id;
    });
  },
  
  findByPath: function(path){
    return this.detect(function(page){
      return page.get('path') == path;
    });
  }
  
});
Verlag.Collection.Sites = Backbone.Collection.extend({
  
  // model: Verlag.Model.Site,

  url: '/api/v1/sites'

});
Verlag.Collection.Templates = Backbone.Collection.extend({
  
  model: Verlag.Model.Template,

  url: '/api/v1/templates',
  
  findByKlass: function(klass){
    return this.filter(function(template){
      return template.get('klass') === klass;
    });
  }

  
});
Verlag.Collection.Users = Backbone.Collection.extend({
  
  // model: Verlag.Model.User,

  url: '/api/v1/users'

});
Verlag.View.Assets = Backbone.View.extend({

  el: '#editor',
  tagName: 'section',

  events: {
    'click a.js-show-asset': 'show',
    'click a.js-remove': 'remove'
  },

  initialize: function(options) {
    var self = this;
    _.bindAll(this, 'render');
    $(this.el).undelegate();

    this.folder = Verlag.folders.get(options.id);  
    
    Verlag.assets = new Verlag.Collection.Assets();
    Verlag.assets.fetch({
      data: { folder_id: this.folder.id },
      success: function(){
        self.render();
        if(options.success){ 
          options.success(); 
        }
      }
    });
    
    Verlag.assets.on('add', this.render);
  },

  render: function(callback) {
    var self = this,
        template = HoganTemplates['assets/index'],
        partials = { 
          node: HoganTemplates['assets/node'],
          toolbar: HoganTemplates['assets/toolbar']
        },
        data = { 
          folder: this.folder.toJSON(),
          assets: Verlag.assets.map(function(a){
            attr = a.toJSON();
            attr.is_image = a.isImage();
            attr.image_path = a.imagePath();
            attr.admin_path = a.adminPath();
            
            return attr;
          })
        };
    
    $(self.el).html(template.render(data, partials));
    $(self.el).find('img').hide().on('load', function(){
      $(this).fadeIn('fast');
    });
    
    Verlag.sidebar = new Verlag.View.Folders();
    Verlag.header = new Verlag.View.ShowFolder({
      id: this.folder.id
    });

    $('a.tab').removeClass('active');
    $('a#assets-tab').addClass('active');
  }, 
  
  show: function(e){
    e.preventDefault();
    var path = $(e.currentTarget).attr('href'),
      folder_id = this.folder ? this.folder.id : null,
      id = $(e.currentTarget).data('id');;
      
    Verlag.router.navigate(path, { trigger: false });
    Verlag.modal = new Verlag.View.Asset({ folder_id: folder_id, id: id });
  }, 
  
  remove: function(e){
    e.preventDefault();
    var asset = Verlag.assets.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: asset, 
      domId: '#asset-' + asset.id,
      collection: 'assets'
    });
  }

});
Verlag.View.NewAsset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'change button.js-upload': 'create'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    
    this.folder = options.folder; // Verlag.folders.get(options.id);
    // this.asset = new Verlag.Asset({
    //   folder_id: options.id
    // })
    this.render();
  },

  render: function() {
    var template = HoganTemplates['assets/new'],
        data = {
          asset: {}
        };

    $(template.render(data)).hide().appendTo(this.$el).fadeIn('fast');
  },
  
  create: function(e){
    e.preventDefault();
    
    var self = this,
        form = document.getElementById('uploader'),
        fileInput = document.getElementById('file'),
        files = fileInput.files,
        parent_id = this.folder ? this.folder.id : null;

    Verlag.count = 0;
    Verlag.files = files.length;
        
    $.each(files, function(i, file){
      var asset = new Verlag.Model.Asset({ parent_id: parent_id });
      asset.upload(file, function(asset, response){
        Verlag.count++;
        Verlag.assets.add(asset);
        Verlag.notify('uploaded');
      
        if (Verlag.count == Verlag.files){
          Verlag.closeModal();   
        }
        $('#progress').text(Verlag.count);
        
      });
    });
  }
  
});



Verlag.View.Asset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',
  
  events: {
    'click button.js-update'  : 'update'
  },

  initialize: function(options) {
    _.bindAll(this, 'render');
    $(this.el).undelegate('button.js-update', 'click');
    
    this.folder = Verlag.folders.get(options.folder_id);
    this.asset = Verlag.assets.get(options.id);
    this.asset.fetch({ success: this.render });
  },

  render: function() {
    var asset = this.asset,
        template = HoganTemplates['assets/edit'],
        data = { 
          asset: function(){
            var attr = asset.toJSON();
            attr.is_image = asset.isImage();
            attr.asset_path = asset.imagePath() + '?w=240&amp;h=180&amp;c=t&amp;g=North';;
            attr.admin_path = asset.adminPath();
            return attr;
          }
        };
    
    $(template.render(data)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
      var path = '/admin/folders/' + asset.get('folder_id');
      Verlag.router.navigate(path, { 
        trigger: false 
      });
    });
    
    $('a.tab').removeClass('active');
    $('a#assets-tab').addClass('active');
  },
  
  update: function(e){
    e.preventDefault();

    var target = $(e.currentTarget),
        form = $('form#edit-asset'),
        attr = {},
        asset = this.asset;
        
    form.serializeArray().forEach(function(a){
      attr[a.name] = a.value;
    });
        
    asset = asset.save(attr, {
      success: function(model, response){
        console.log(response);
        Verlag.notify('Asset saved');
        Verlag.editor.render();
      },
      error: function(model, response){
        console.log(response.responseText);
        alert('error handling...')
      }
    });
  }

});
Verlag.View.DesignEdit = Backbone.View.extend({

  el: '#editor',

  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'showLayout',
    // 'click a.js-new-part': 'newPart',
    // 'submit form#edit-layout': 'update',
    'keyup #code-editor': 'saveOnKeyUp', 
    'click a.js-settings': 'showSettings',
    'click a.js-insert': 'insert',
    'click a.js-remove': 'remove'
  },

  initialize: function(options) {
    _.bindAll(this, 'render', 'aceSettings', 'update', 'saveOnKeyUp');
    var self = this; 
    
    this.model = Verlag.templates.get(options.id); 
    this.model.on('change', this.render); 
    this.model.fetch({
      success: function(model, response){
        self.aceSettings();
    
        
        if(Verlag.aceEditor){
          Verlag.aceEditor.destroy();
        }
        self.render();
      }
    });
    $(self.el).undelegate();
  },

  render: function() {
    var template = HoganTemplates['templates/edit'],
        data = {
          'layouts': Verlag.templates.findByKlass('Layout').map(function(l){
            return l.toJSON()
          }),
          'layout': this.model.toJSON(),
          'layout?': false
        };
    
    $(this.el).html(template.render(data)); 
    this.intitializeAce();
    $('a.tab').removeClass('active');
    $('a#templates-tab').addClass('active');
    
    
    Verlag.sidebar = new Verlag.View.DesignIndex({
      layout: this.model.get('klass') == 'Layout' ? this.model.toJSON() : null
    });
    
  },
  
  intitializeAce: function(){
    var layout = this.model,
        mode = layout.get('mode'),
        editorMode = Verlag.ace_modes[mode];
        
    Verlag.aceEditor = ace.edit('code-editor');
    Verlag.aceEditor.setTheme('ace/theme/textmate');
    Verlag.aceEditor.getSession().setMode(new editorMode);
    Verlag.aceEditor.session.setUseWrapMode(true);
    // Because Mustache screws up my liquid templates, 
    // I just set it manually, directly from the model
    // This also eleminates the FUC
    Verlag.aceEditor.getSession().setValue(layout.get('content'));  
  },
  
  saveOnKeyUp: function(e){
    // e.preventDefault();
    var self = this;
    
    if(this.timeOut){
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(function(){
      self.update();
    }, 720);
    
  },
  
  update: function(){
    var attributes = {
      content: Verlag.aceEditor.getSession().getValue()
    };
    
    if(this.timeOut){
      clearTimeout(this.timeOut);
    }
    
    this.model.save(attributes, {
      success: function(model, response){
        Verlag.notify('Layout saved')
      }
    });    
  }, 
  
  // newPart: function(e){
  //   e.preventDefault();
  //   var klass = $(e.target).data('klass');
  //   var partType = new Verlag.Model.PartType();
  //   
  //   Verlag.modal = new Verlag.View.New({ 
  //     model: partType, 
  //     collection: 'partType' 
  //   });
  // },
  
  insert: function(e){
    e.preventDefault();
    Verlag.modal = new Verlag.View.Insert({ 
      model: this.model
    });
  },
  
  showSettings: function(e){
    Verlag.modal = new Verlag.View.Settings({ 
      model: this.model,
      collection: this.model.get('klass').toLowerCase() + 's'
    });
  },
  
  showLayout: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    Verlag.router.navigate(path, { trigger: true });
  }, 

  remove: function(e){
    e.preventDefault();
    var template = this.model;
  
    Verlag.modal = new Verlag.View.Remove({ 
      model: template, 
      collection: 'templates' 
    });
  },  
  
  // ACE Editor keyboard shortcuts
  aceSettings: function(){
    var self = this;
    var canon = require('pilot/canon');  
    
    canon.addCommand({
      name: 'save',
      bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S',
        sender: 'editor'
      },
      exec: function() {
        self.update();
      }
    });
  }
  
  
  
  

});
Verlag.View.DesignIndex = Backbone.View.extend({

  el: '#sidebar',

  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'show',
    'click a.js-new': 'new'
  },

  initialize: function(options) {
    var self = this;
    Verlag.templates.on('all', function(){
      self.render();
    });
    this.currentLayout = options.layout || Verlag.templates.findByKlass('Layout')[0];
    $(this.el).undelegate();
    this.render();
  },
  
  data: function(){

    return {
      templates: [{
        title: 'Layouts',
        klass: 'Layout',
        models: Verlag.templates.findByKlass('Layout').map(function(l){
          return l.toJSON()
        })
      },{
        title: 'Partials',
        klass: 'Partial',
        models: Verlag.templates.findByKlass('Partial').map(function(l){
          return l.toJSON()
        })
      },{
        title: 'Stylesheets',
        klass: 'Stylesheet',
        models: Verlag.templates.findByKlass('Stylesheet').map(function(l){
          return l.toJSON()
        })
      },{
        title: 'Javascripts',
        klass: 'Javascript',
        models: Verlag.templates.findByKlass('Javascript').map(function(l){
          return l.toJSON()
        })
      }]
    }
  },

  render: function() {
    var template = HoganTemplates['templates/index'];
    
    $(this.el).html(template.render(this.data())); 
    $('a.tab').removeClass('active');
    $('a#templates-tab').addClass('active');
  },
  
  new: function(e){
    e.preventDefault();
    var klass = $(e.target).data('klass');
    var template = new Verlag.Model.Template({
      klass: klass,
      content: ' '
    });
    
    Verlag.modal = new Verlag.View.New({ 
      model: template, 
      collection: 'templates' 
    });
  },
  
  show: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    Verlag.router.navigate(path, { trigger: true });
  }
  
});
Verlag.View.Folders = Backbone.View.extend({

  el: '#sidebar',
  tagName: 'aside',
  
  events: {
    'click a.js-new-folder': 'new',
    'click a.js-show-folder': 'show'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    $(this.el).undelegate();
    
    Verlag.folders.on('all', this.render);
    this.render();
  },

  render: function() {
    var template = HoganTemplates['folders/index'],
        partials = { node: HoganTemplates['folders/node'] },
        data = { 
          folders: Verlag.folders.map(function(f){
            attr = f.toJSON();
            attr.admin_path = f.adminPath();
            return attr;
          })
        };
        
    $(this.el).html(template.render(data, partials));
    $('a.tab').removeClass('active');
    $('a#folders-tab').addClass('active');
  },
  
  show: function(e){
    e.preventDefault();
    var path = $(e.currentTarget).attr('href'),
      id = $(e.currentTarget).data('id');
    
    Verlag.router.navigate(path, { trigger: false });
    Verlag.editor = new Verlag.View.Assets({ id: id });
  },
  
  new: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    var model = new Verlag.Model.Folder();
    
    Verlag.modal = new Verlag.View.New({ model: model, collection: 'folders' });
  }

});
Verlag.View.ShowFolder = Backbone.View.extend({

  el: '#folder-info',
  tagName: 'header',
  
  events: {
    'click a.js-remove-folder': 'remove',
    'click a.js-settings': 'settings', 
    'change input.js-upload': 'create'
  },

  initialize: function(options) {
    _.bindAll(this, 'render');
    
    this.folder = Verlag.folders.get(options.id);
    this.folder.fetch({
      success: this.render
    });
    this.folder.on('change', this.render);
  },

  render: function() {
    var template = HoganTemplates['folders/show'],
        data = { 
          folder: this.folder.toJSON()
        };
        
    $(this.el).html(template.render(data));
  },

  
  remove: function(e){
    e.preventDefault();
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: this.folder, 
      collection: 'folders'
    });
  },
  
  settings: function(e){
    e.preventDefault();
    Verlag.modal = new Verlag.View.Settings({ 
      model: this.folder,
      collection: 'folders'
    });
  },
  
  create: function(e){
    e.preventDefault();
    
    var self = this,
        form = document.getElementById('uploader'),
        fileInput = document.getElementById('file'),
        files = fileInput.files,
        folder_id = this.folder ? this.folder.id : null;

    Verlag.count = 0;
    Verlag.files = files.length;
        
    $.each(files, function(i, file){
      var asset = new Verlag.Model.Asset({ folder_id: folder_id });
      asset.upload(file, function(asset, response){
        Verlag.count++;
        Verlag.assets.add(asset);
        Verlag.notify('uploaded');
      });
    });
  }

});
Verlag.View.EditPage = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  events: {
    'click a.js-settings': 'settings', 
    'click a.js-remove': 'remove',
    'click a.js-new-child': 'new'
  },

  initialize: function(options) {
    _.bindAll(this, 'render', 'settings');
    $(this.el).undelegate();
    
    this.page = Verlag.pages.get(options.id) || new Verlag.Model.Page({ id: options.id });
    // this.page.on('change', this.render);
    this.page.fetch({
      success: this.render
    });
  },

  render: function(id) {
    var page = this.page,
        template = HoganTemplates['pages/edit'],
        data = { page: page.toJSON() };
    
    // TODO settle on one...
    Verlag.page = this.page;

    $(this.el).html(template.render(data, HoganTemplates));
    
    Verlag.sidebar = new Verlag.View.PageIndex();
    
    Verlag.iframe = new Verlag.View.Iframe({
      page: page
    });
    
    // TODO Make this a view?
    // Verlag.iFramer.initialize('.preview iframe', function(){
    //   Verlag.Editor.initialize();
    // }); 
    
    $('a.tab').removeClass('active');
    $('a#pages-tab').addClass('active');
  },
  
  settings: function(e){
    e.preventDefault();
    var self = this; 
    Verlag.modal = new Verlag.View.Settings({ 
      model: this.page,
      collection: 'pages',
      success: function(){
        self.render();
      }
    });
  },

  new: function(e){
    e.preventDefault();

    var id = $(e.target).data('id');
    var parent = Verlag.pages.get(id);
    var model = new Verlag.Model.Page({
      parent_id: id
    });
    
    parent.set({ 'children?': true, 'open?': true });
    Verlag.modal = new Verlag.View.New({ 
      model: model, 
      collection: 'pages' 
    });
  },
  
  remove: function(e){
    e.preventDefault();
    var page = Verlag.pages.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: page, 
      collection: 'pages' 
    });
  }
  

});
Verlag.View.Iframe = Backbone.View.extend({

  el: '.preview',
  tagName:  'div',

  events: {

  },

  initialize: function(options) {
    _.bindAll(this, 'render', 'update', 'saveOnKeyup', 'editor');
    this.page = options.page;
    this.iframe = $(this.el).find('iframe');
    this.render();
  },

  render: function(id) {
    var self = this;
    var iframe = this.iframe;
        
    iframe.load(function(){  
      var contents = iframe.contents();
      
      // Sets the editable areas. This is the main editor
      self.editor(contents);
        
      // Gets the links and fires the correct verlag routes 
      self.setPageLinks(contents);
      
      self.hideToolbar(contents);
      
      // reposition editor
      // contents.on('scroll', function(){
      //   console.log('hey');
      // })
    });
  },
  
  saveOnKeyup: function(e){
    e.preventDefault();
    if(this.timeOut){
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(this.update, 700);
  },
  
  update: function(){
    var page = this.page,
        editableAreas = this.editableAreas,
        parts = page.get('parts');

    editableAreas.each(function(i, part){
      var id = $(part).attr('id').split('-')[1],
          content = $(part).html(),
          p = _.detect(parts, function(p){ return p.id == id });
      if(p) p.content = content;
    });
    
    page.save({ 
      parts: parts 
    },{
      success: function(model, response){
        Verlag.notify('Page saved')
      },
      error: function(reponse){
        console.log(response);
        alert('error');
      }
    });

  }, 
  
  editor: function(contents){
    var self = this; 
    var iframe = this.iframe;
    
    this.editableAreas = contents.find('div.editable');
    this.editableAreas
      .attr('contenteditable','true')
      .css({
        'background': 'hsla(1, 0%, 0%, 0.05)'
      })
      .on('click', function(e){
        e.stopPropagation();
      })
      .on('keyup', this.saveOnKeyup)
      .on('focus', function(e){
        $(this).css({

        });
        Verlag.toolbar = new Verlag.View.Toolbar({
          page: self.page,
          iframe: iframe,
          offset: $(e.target).offset()
        });
      })
      .on('blur', function(){
        $(this).css({
 
        });
      });
        
    // Command / Control S to save
    contents.on('keypress', function(e){
      if(e.keyCode == '115' && e.metaKey == true){
        e.preventDefault();
        self.update();
      }
    });
  },
  
  setPageLinks: function(contents){
    var links = contents.find('a');
    links.on('click', function(e){
      var path = $(this).attr('href');
      var page = Verlag.pages.findByPath(path);
      
      if (page){
        e.preventDefault();
        Verlag.router.navigate(page.get('admin_path'), { trigger: true });
      }
    });  
  }, 
  
  hideToolbar: function(contents){
    contents.on('click', function(e){
      if(Verlag.toolbar){
        Verlag.toolbar.leave();
      }
    });
  }
  
});
Verlag.View.PageIndex = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'show'
  },

  initialize: function() {
    var self = this;
    Verlag.pages.on('all', this.render);
    
    $(this.el).undelegate();
    this.render();
  },

  render: function() {
    var template = HoganTemplates['pages/index'],
        data ={ root: Verlag.pages.root().pageData() },
        partials = { 
         node: HoganTemplates['pages/node']
        };
        
    $(this.el).html(template.render(data, partials));
    $('a.tab').removeClass('active');
    $('a#pages-tab').addClass('active');
  }, 
  
  show: function(e){
    e.preventDefault();
    var href = $(e.target).attr('href'),
      id = href.split('/')[3];
    
    Verlag.router.navigate(href, { trigger: false });
    // Verlag.editor = new Verlag.View.PagePreview({ id: id });
    Verlag.editor = new Verlag.View.EditPage({ id: id });
  }

});
Verlag.View.Toolbar = Backbone.View.extend({

  el: 'body',

  // The DOM events specific to an item.
  events: {
    'click': 'hide',
    'click .toolbar': 'toolbar',
    'click .toolbar input': 'buttonCmd'
  },

  initialize: function(options) {
    _.bindAll(this, 'render', 'buttonCmd');
    $(this.el).undelegate();
    this.iframe = options.iframe;
    this.page = options.page;
    this.left = options.offset.left + this.iframe.offset().left;
    this.top = options.offset.top + this.iframe.offset().top;
    this.render();
  },

  render: function() {
    var template = HoganTemplates['pages/toolbar'];
    
    $(template.render()).hide().appendTo($(this.el)).fadeIn('fast');
    
    $(this.el).find('.toolbar').css({
      top: this.top - 42 + 'px',
      left: this.left + 'px'
    });
  },
  
  leave: function(){
    this.off;
    
    $('.toolbar').fadeOut('fast', function(){
      $(this).remove();
    });  
  },
  
  hide: function(e){
    this.leave();
  }, 
  
  toolbar: function(e){
    e.stopPropagation();
  },
  
  buttonCmd: function(e){
    e.stopPropagation();
    e.preventDefault();
    
    var target = $(e.target),
        cmd = target.data('cmd'),
        bool = false,
        value = target.data('value'),
        iframe = this.iframe[0];
      
    if (value == 'promptUser'){
      value = prompt(target.data('text'));
    }
    if(cmd){
      iframe.contentDocument.execCommand(cmd, bool, value);
      if(this.timeout){
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(function(){
        Verlag.iframe.update();
      }, 500);
      
    }
  },
  
  textilize: function(html, escape){
    html = html.replace(/\s*<p>((.|[\r\n])*?)<\/p>\s*/gi, "\n\n$1\n\n\n");
    // html = html.replace(/<br ?\/?>/gi, "\n");
    html = html.replace(/\s*<h1>((.|[\r\n])*?)<\/h1>\s*/gi, "h1. $1\n\n");
    html = html.replace(/\s*<h2>((.|[\r\n])*?)<\/h2>\s*/gi, "h2. $1\n\n");
    html = html.replace(/\s*<h3>((.|[\r\n])*?)<\/h3>\s*/gi, "h3. $1\n\n");
    html = html.replace(/\s*<h4>((.|[\r\n])*?)<\/h4>\s*/gi, "h4. $1\n\n");
    html = html.replace(/\s*<h5>((.|[\r\n])*?)<\/h5>\s*/gi, "h5. $1\n\n");
    html = html.replace(/\s*<h6>((.|[\r\n])*?)<\/h6>\s*/gi, "h6. $1\n\n");
    html = html.replace(/<(?:b|strong)>((.|[\r\n])*?)<\/(?:b|strong)>/gi, '*$1*');
    html = html.replace(/<(?:i|em)>((.|[\r\n])*?)<\/(?:i|em)>/gi, '_$1_');
    html = html.replace(/<(?:strike|del)>((.|[\r\n])*?)<\/(?:strike|del)>/gi, '-$1-');
    html = html.replace(/<(?:u|ins)>((.|[\r\n])*?)<\/(?:u|ins)>/gi, '+$1+');
    html = html.replace(/<a href="(.*?)">((.|[\r\n])*?)<\/a>/gi, '"$2":$1');
    html = html.replace(/<code.*?>((.|[\r\n])*?)<\/code>/gi, '@$1@');
    if (escape){
      html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');//Escape any remaining HTML
    }
    html = html.replace(/(\r\n|\n){3,}/g, "\n\n");
    html = html.replace(/^[\r\n]+|[\r\n]+$/g, '');
    return html;
  }
  

});
Verlag.View.SiteSettings = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-new': 'new',
    'click a.js-remove': 'remove'
  },

  initialize: function() {
    $(this.el).undelegate();
    var self = this;
    
    $.ajax({
      url: '/api/v1/page_types.json',
      success: function(response){
        Verlag.page_types = new Verlag.Collection.PageTypes(response);
        Verlag.page_types.on('all', function(){
          self.render();
        });
        self.render();
      }
    });
  },
  
  data: function(){
    return {
      page_types: Verlag.page_types.toJSON(),
      users: Verlag.users.toJSON(),
      sites: Verlag.sites.toJSON()
    };
  },

  render: function() {
    var template = HoganTemplates['settings/index'];

    $(this.el).html(template.render(this.data()));
    $('a.tab').removeClass('active');
    $('a#settings-tab').addClass('active');
    
  }, 

  new: function(e){
    e.preventDefault();

    var model = new Verlag.Model.PageType();
    
    Verlag.modal = new Verlag.View.New({ 
      model: model, 
      collection: 'page_types' 
    });

  },
  
  show: function(e){
    e.preventDefault();

  },
  
  remove: function(e){
    e.preventDefault();
    var pageTypes = Verlag.page_types.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: pageTypes, 
      collection: 'page_types' 
    });

  }

});
Verlag.View.Base = Backbone.View.extend({

  el: 'body',

  events: {
    // 'click button.js-create': 'create'
  },

  initialize: function(options) {

  },

  render: function() {

  }
  
});
Verlag.View.Insert = Backbone.View.extend({

  el: 'body',

  events: {
    
  },

  initialize: function(options) {
    // $(this.el).undelegate();
    this.model = options.model;
    this.render();
  },

  render: function(id) {
    var model = this.model,
        template = HoganTemplates['shared/insert'],
        partials = {},
        data = { 
          model: model.toJSON()
        };
        
    $(template.render(data, partials)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
    });
  }
  

});
Verlag.View.Loader = Backbone.View.extend({

  el: 'body',

  initialize: function(options) {
    this.render();
    this.loader = (this.$el).find('#loader');
  },

  render: function() {
    $(HoganTemplates['shared/loader'].render()).appendTo(this.$el);
  },
  
  hide: function(){
    this.loader.hide();
  },
  
  show: function(){
    this.loader.show();
  }  
  
});
Verlag.View.New = Backbone.View.extend({

  el: 'body',

  events: {
    'click button.js-create': 'create'
  },

  initialize: function(options) {
    $(this.el).undelegate('button.js-create', 'click');
    
    this.model = options.model;
    this.parent = options.parent;
    this.collection = options.collection;
    this.render();
  },

  render: function() {
    var template = HoganTemplates['shared/new'],
        partials = {
          form: HoganTemplates[this.collection + '/form']
        },
        data = {
          model: this.model ? this.model.toJSON() : {},
          layouts: Verlag.templates.findByKlass('Layout').map(function(l){
            return l.toJSON();
          })
        };
    $(template.render(data, partials)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
    });
  },
  
  create: function(e){
    e.preventDefault();
    var self = this;
    var form = $(e.target).parents('form');
    var attr = {};
    
    form.serializeArray().forEach(function(a){
      attr[a.name] = a.value;
    });
    
    this.model.save(attr, {
      success: function(model, response){
        Verlag.notify('created');
        if(Verlag[self.collection]){
          Verlag[self.collection].add(model);
        }
        Verlag.router.navigate(model.adminPath(), { trigger: true });
        $('.modal').modal('hide');  
      }
    });
  }
  
});
Verlag.View.Notice = Backbone.View.extend({

  el: 'body',

  events: {
   
  },

  initialize: function(options) {
    this.render();
  },

  render: function() {
    
    var template = HoganTemplates['shared/notice'],
        data = { 
          
        };

  },
  
  leave: function(e){

  }
  
});
Verlag.View.Remove = Backbone.View.extend({

  el: 'body',

  events: {
    'click button.js-delete': 'delete'
  },

  initialize: function(options) {
    $(this.el).undelegate('button.js-delete', 'click');
    
    this.model = options.model;
    this.domId = options.domId;
    this.collection = options.collection;
    this.render();
  },

  render: function() {
    
    var template = HoganTemplates['shared/remove'],
        data = { 
          model: this.model.toJSON()
        };

    $(template.render(data)).appendTo(this.$el).modal().on('hidden', function () {
      $(this).remove();
    });
  },
  
  delete: function(e){
    var self = this;
    
    if(this.domId){
      $(this.domId).fadeOut('fast', function(){
        $(this).remove();
      })
    }

    e.preventDefault();
    this.model.destroy({
      success: function(){
        Verlag.notify('removed');
        $('.modal').modal('hide');  
        Verlag.router.navigate('/admin/' + self.collection, { trigger: true });                       
      }
    });

  }
  
});
Verlag.View.Settings = Backbone.View.extend({

  el: 'body',

  events: {
    'submit form.js-update': 'update'
  },

  initialize: function(options) {
    $(this.el).undelegate('form.js-update', 'submit');
    this.model = options.model;
    this.render();
    this.success = options.success;
  },

  render: function(id) {
    var model = this.model,
        template = HoganTemplates['shared/settings'],
        partials = { form: HoganTemplates[this.collection + '/form'] },
        data = { 
          model: model.toJSON(),
          layouts: Verlag.templates.findByKlass('Layout').map(function(l){
            return l.toJSON();
          })
        };


    $(template.render(data, partials)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
    });
  },
  
  update: function(e){
    e.preventDefault();
    
    console.log(this.model)
    
    var form = $(e.target),
        callback = this.success,
        attr = {};
    
    form.serializeArray().forEach(function(a){
      attr[a.name] = a.value;
    });
    
    this.model.save(attr, {
      success: function(model, response){
        Verlag.notify('Saved');
        if(callback){
          callback(model, response);
        }
          
        $('.modal').modal('hide');      
      }, 
      error: function(model, response){
        alert('error')
        console.log(response.responseText);
      }
    });
  }

});
// Backbone router
Verlag.Router = Backbone.Router.extend({
  
  routes: {
    '':                                     'show_index', 
    'admin/':                               'show_index',
    'admin/pages':                          'pagesIndex',
    'admin/pages/:id':                      'showPage',
    'admin/folders':                        'foldersIndex',
    'admin/folders/:id':                    'showFolder',
    'admin/folders/:folder_id/assets/:id':  'showAsset',
    'admin/templates':                      'templates_index',
    'admin/templates/:id':                  'show_template',
    'admin/settings':                       'show_settings'
  },
  
  show_index: function(){
    // console.log('started');
  },
  
  // Pages
  // ------------------------------------------------------------ //
  pagesIndex: function(){
    var id = Verlag.pages.first().id,
        path = document.location.pathname + '/' + id;
        
    Verlag.router.navigate(path, { trigger: true });
  },
  
  showPage: function(id){
    // this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
        
    // Verlag.sidebar = new Verlag.View.PageIndex();
    // Verlag.editor = new Verlag.View.PagePreview({ id: id });
    Verlag.editor = new Verlag.View.EditPage({ id: id });
  }, 
  
  // Folders
  // ------------------------------------------------------------ //
  foldersIndex: function(){
    var id = Verlag.folders.first().id,
        path = document.location.pathname + '/' + id;
        
    Verlag.router.navigate(path, { trigger: true });
  },
  
  showFolder: function(id){
    this.cleanup(Verlag.editor);
    
    Verlag.editor = new Verlag.View.Assets({ 
      id: id
    });
  },
  
  // Assets
  // ------------------------------------------------------------ //
  showAsset: function(folder_id, id){
    this.cleanup(Verlag.editor);
    
    Verlag.editor = new Verlag.View.Assets({ 
      id: folder_id,
      success: function(){
        Verlag.modal = new Verlag.View.Asset({ 
          id: id,
          folder_id: folder_id
        });
      }
    });

  },
  
  // Design / Templates
  // ------------------------------------------------------------ //
  templates_index: function(){
    var id = Verlag.templates.findByKlass('Layout')[0].id,
        path = document.location.pathname + '/' + id;
        
    Verlag.router.navigate(path, { trigger: true });
  },
  
  show_template: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.editor = new Verlag.View.DesignEdit({ id: id });
  },
  
  show_settings: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.editor = new Verlag.View.SiteSettings();
  },
  
  // Shared
  // ------------------------------------------------------------ //
  cleanup: function(view){
    if(view){
      view.off();
      $(view.el).undelegate();
    }
  }
  
});
$(document).ready(function(){
  
  $.ajax({
    url: '/api/v1/sites/current',
    success: function(response){
      Verlag.pages = new Verlag.Collection.Pages(response.pages);
      Verlag.folders = new Verlag.Collection.Folders(response.folders);
      Verlag.templates = new Verlag.Collection.Templates(response.templates);
      Verlag.sites = new Verlag.Collection.Sites(response.sites);
      Verlag.users = new Verlag.Collection.Sites(response.users);
      Verlag.current_user = new Verlag.Model.User(response.current_user);

      Verlag.router = new Verlag.Router();
      Backbone.history.start({ pushState: true });
    }
  });
  
  // Main navigation - perhaps needs to be moved to a view
  $('div.nav a.tab').on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    
    Verlag.router.navigate(href, { trigger: true });
  });  
  
  // Key Bindings
  $('body').on('keypress', function(e){
    if(e.keyCode == '115' && e.metaKey == true){
      e.preventDefault();
      // console.log(e.metaKey)
      // console.log('Hijacked Command+S or Ctrl+S, damn!');
          
      var form = $('form.command-save');
      if (form.length){
        form.find('input#save').trigger('click');
      }
    }
  });
  
  // Global ajax indicator
  Verlag.loader = new Verlag.View.Loader();
  jQuery('body')
    .ajaxStart(function() {
      Verlag.loader.show();
    }).ajaxSuccess(function() {
      Verlag.loader.hide();
    });

  
});
