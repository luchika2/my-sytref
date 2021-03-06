;/*
jbForm v0.81 2013-2015
by Jet Bit - http://JetBit.ru

For more information, visit:
http://jetbit.ru/market/jbcallme
http://jbCallMe.ru/
*/
!(function(a, b, c, d) {
   function f(j, k) {
       this.element = j,
       this.options = a.extend({}, h, k),
       this._defaults = h,
       this._name = g,
       this.init()
   }
   var g = 'jbform'
     , h = {
       title: '\u041E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 \u0437\u0432\u043E\u043D\u043E\u043A',
       progress: '\u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435 \u0441\u0435\u043A\u0443\u043D\u0434\u043E\u0447\u043A\u0443',
       success: '\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E',
       fail: '\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E',
       modal: !0,
       clickout: !1,
       delay: 4e3,
       fields: {},
       onShow: function() {},
       onSendSuccess: function() {},
       onSendFail: function() {},
       copyright: !0,
       captcha: !1,
       dev_mode: !0,
       key: 'null',
       postfix: 'default'
   };
   f.prototype.init = function() {
       return this.build()
   }
   ,
   f.prototype.build = function() {
       var j = this;
       if (!a('#jbForm_overlay').length && j.options.modal && (a('<div id="jbForm_overlay" class="jbForm_overlay" style="display:none"></div>').appendTo(a('body')),
       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && a('body').addClass('jbIsMobile')),
       !a('#jbForm_' + j.options.postfix).length) {
           var k = 'jbIframe_' + Math.random().toString(36).substring(5)
             , l = '<div id="jbForm_' + j.options.postfix + '" class="jbForm' + (j.options.modal ? '' : ' jbInbuilt') + '"><div class="jb_inset"><div class="jb_title">' + j.options.title + '</div>' + (j.options.modal ? '<a title="\u0417\u0430\u043A\u0440\u044B\u0442\u044C" class="jb_close">\xD7</a>' : '') + '<form class="jb_form" action="' + ('https:' == location.protocol ? 'https:' : 'http:') + '//jbcallme.ru/api/" enctype="multipart/form-data" accept-charset="utf-8" method="POST" target="' + k + '"></form><div class="jb_success">' + j.options.success + '</div><div class="jb_progress">' + j.options.progress + '</div><div class="jb_fail">' + j.options.fail + '</div></div></div>';
           j.options.modal ? a(l).appendTo(a('body')) : a(j.element).html(l),
           j.$container = a('#jbForm_' + j.options.postfix),
           j.$success = j.$container.find('.jb_success').hide().hide(),
           j.$fail = j.$container.find('.jb_fail').hide(),
           j.$progress = j.$container.find('.jb_progress').hide(),
           j.$overlay = a('#jbForm_overlay'),
           j.$inset = j.$container.find('.jb_inset'),
           j.options.copyright && j.$inset.append(a('<a/>').html('\xA9 jbCallMe.ru').attr('href', 'http://jbcallme.ru').attr('target', '_blank').addClass('jb_dev')),
           j.$form = j.$container.find('.jb_form'),
           a.each(j.options.fields, function(m, n) {
               var o = '';
               if (n.type && 'textarea' == n.type)
                   o = '<textarea ' + (n.required ? 'required="required" ' : '') + (n.readonly ? 'readonly="readonly" ' : '') + (n.input_class ? 'class="' + n.input_class + '" ' : '') + (n.placeholder ? 'placeholder="' + n.placeholder + '" ' : '') + 'name="' + m + '">' + (n.value ? n.value : '') + '</textarea>';
               else if (n.type && 'select' == n.type) {
                   o = '<select ' + (n.input_class ? 'class="' + n.input_class + '" ' : '') + (n.readonly ? 'readonly="readonly" ' : '') + 'name="' + m + '">',
                   o += n.placeholder ? '<option disabled selected hidden>' + n.placeholder + '</option>' : '';
                   for (var p = 0; p < n.options.length; p++)
                       o += '<option value="' + n.options[p] + '"' + (n.value && n.value == n.options[p] ? ' selected="selected"' : '') + '>' + n.options[p] + '</option>';
                   o += '</select>'
               } else if (n.type && 'checkbox' == n.type)
                   o = '<label class="jbForCheckbox"><input ' + (n.input_class ? 'class="' + n.input_class + '" ' : '') + (n.readonly ? 'readonly="readonly" ' : '') + (n.required ? 'required="required" ' : '') + (n.checked ? 'checked="checked" ' : '') + 'type="checkbox" value="' + (n.value ? n.value : 'Yes') + '" name="' + m + '"/> ' + n.label + '</label>';
               else if (n.type && 'radio' == n.type) {
                   o = '<div class="jb_ingroup">';
                   for (var p = 0; p < n.options.length; p++)
                       o += '<label class="jbForRadio"><input ' + (n.input_class ? 'class="' + n.input_class + '" ' : '') + (n.required ? 'required="required" ' : '') + (n.readonly ? 'readonly="readonly" ' : '') + 'type="radio" value="' + n.options[p] + '" name="' + m + '"' + (n.value && n.value == n.options[p] ? ' checked="checked"' : '') + '/> ' + n.options[p] + '</label>';
                   o += '</div>'
               } else
                   n.type && 'file' == n.type ? o = '<div class="jbFileUpload"><span>' + (n.placeholder ? n.placeholder : '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B') + '</span><input onchange="this.innerHTML=this.innerHTML;var fname=jQuery(this).parents(\'.jb_input\').find(\'.jbFileName\').text(\'\');if(window.File && window.FileReader && window.FileList){for(var i=0;i<this.files.length;i++){fname.append(\'<span>\'+this.files[i].name+\'</span>\')}}else{\'<span>\'+fname.append($(this).val()+\'</span>\')}" ' + (n.required ? 'required="required" ' : '') + (n.multiple ? 'multiple="multiple" ' : '') + 'type="file" name="' + m + '[]" /></div><div class="jbFileName"></div>' : (n.input_class = 0 <= jQuery.inArray(n.type, ['date', 'time', 'datetime']) ? 'jb_type_' + n.type + (n.input_class ? ' ' + n.input_class : '') : n.input_class,
                   o = '<input ' + (n.required ? 'required="required" ' : '') + (n.readonly ? 'readonly="readonly" ' : '') + (n.pattern ? 'pattern="' + n.pattern + '" ' : '') + (n.placeholder ? 'placeholder="' + n.placeholder + '" ' : '') + (n.input_class ? 'class="' + n.input_class + '" ' : '') + (n.value ? 'value="' + n.value + '" ' : '') + 'type="' + (n.type && 0 <= jQuery.inArray(n.type, ['submit', 'hidden', 'text', 'email', 'number', 'tel']) ? n.type : 'text') + '" name="' + m + '" />');
               'submit' == n.type && j.options.captcha && !j.$form.find('.jb_captcha')[0] && a('<div class="jb_input jb_captcha"><img onClick="javascript:this.src=\'' + ('https:' == location.protocol ? 'https:' : 'http:') + '//jbcallme.ru/api/captcha.png?\'+Math.random();" alt=""/><input type="text" class="jb_captcha_text" name="jb_captcha" required="required" value=""/></div>').appendTo(j.$form),
               a(('hidden' == n.type ? '' : '<div class="jb_input' + (n.wrapper_class ? ' ' + n.wrapper_class : '') + '">' + (n.label && 'checkbox' != n.type ? '<label>' + n.label + '</label>' : '')) + o + ('hidden' == n.type ? '' : '</div>')).appendTo(j.$form)
           }),
           a('<input type="hidden" name="jb_API_key" value="' + j.options.key + '"/>').appendTo(j.$form),
           'placeholder'in c.createElement('input') || j.$form.find('[placeholder]').focus(function() {
               var m = a(this);
               m.val() == m.attr('placeholder') && (m.val(''),
               m.removeClass('placeholder'))
           }).blur(function() {
               var m = a(this);
               ('' == m.val() || m.val() == m.attr('placeholder')) && (m.addClass('placeholder'),
               m.val(m.attr('placeholder')))
           }),
           j.options.modal ? (a(c).bind('keydown', function(m) {
               if (27 == m.which)
                   return j.end(),
                   !1
           }),
           j.$container.hide().find('.jb_close').on('click', function() {
               return j.end(),
               !1
           }),
           j.options.modal && j.options.clickout && j.$container.on("click", function(b) {
               if (a(b.target).hasClass("jbForm"))
                   return j.end(),
                   !1
           }),
           j.$overlay.hide()) : j.show(),
           j.$form.on('submit', function(m) {
               var n = a('<iframe/>', {
                   id: k,
                   name: k,
                   src: 'javascript:;',
                   width: '0',
                   height: '0',
                   tabindex: '-1',
                   style: 'display:none;border:0px none'
               });
               j.$form.append(n);
               var o = {};
               n.load(function() {
                   setTimeout(function() {
                       a('#' + k).remove();
                       var p = o[k];
                       if (p === d)
                           j.$progress.hide(),
                           j.$fail.html('<div class="error_msg">\u0424\u043E\u0440\u043C\u0430 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0441\u0430\u0439\u0442\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0443\u043A\u0430\u0437\u0430\u043B\u0438 \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445.</div> <br/><small>\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u0431\u044B\u043B\u0430 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043E\u043C.</small>').show(),
                           j.options.onSendFail.call();
                       else if (p.length) {
                           j.$progress.hide();
                           var q;
                           try {
                               q = jQuery.parseJSON(p)
                           } catch (r) {
                               q = jQuery.parseJSON('{"result":"fail"}')
                           }
                           if ('success' == q.result)
                               j.$success.show(),
                               j.options.onSendSuccess.call();
                           else {
                               if ('wrong captcha' == q.message)
                                   return j.$form.find('.jb_captcha img').attr('src', ('https:' == location.protocol ? 'https:' : 'http:') + '//jbcallme.ru/api/captcha.png?' + Math.random()),
                                   j.$container.find('form').show(),
                                   j.$form.find('.jb_captcha_text').addClass('jbError').val(''),
                                   a(b).resize(),
                                   !1;
                               q.message && j.options.dev_mode && j.$fail.html('<div class="error_msg">' + q.message + '</div>').show(),
                               j.$fail.show(),
                               j.options.onSendFail.call()
                           }
                       }
                       setTimeout(function() {
                           j.$fail.html(j.options.fail),
                           j.end()
                       }, j.options.delay),
                       delete o[k]
                   }, 100)
               }),
               a(b).on('message', function(p) {
                   p.originalEvent.origin == ('https:' == location.protocol ? 'https:' : 'http:') + '//jbcallme.ru' && (o[k] = p.originalEvent.data)
               }),
               j.submit() || m.preventDefault()
           })
       }
       j.options.modal && a(j.element).on('click', function() {
           return j.show(),
           !1
       })
   }
   ,
   f.prototype.submit = function() {
       var j = this
         , k = 0;
       return (j.$container = a('#jbForm_' + j.options.postfix),
       j.$container.find('.jbError').removeClass('jbError'),
       j.$container.find('input[type=text],input[type=email],input[type=number],input[type=tel],textarea').each(function() {
           a(this).val(a.trim(a(this).val()))
       }),
       j.$container.find('input[required], select[required], textarea[required]').each(function() {
           var l = a(this);
           '' != l.val() && l.val() != l.attr('placeholder') && ('checkbox' != l.prop('type') || l.prop('checked')) || (l.addClass('jbError').focus(function() {
               a(this).removeClass('jbError')
           }),
           k++)
       }),
       !k) && (j.$container.find('[placeholder]').each(function() {
           var l = a(this);
           l.val() == l.attr('placeholder') && l.val('')
       }),
       j.$container.find('.jb_progress').show(),
       j.$container.find('form').hide(),
       a(b).resize(),
       !0)
   }
   ,
   f.prototype.end = function() {
       var j = this;
       j.$container = a('#jbForm_' + j.options.postfix),
       a('#jbForm_' + j.options.postfix).find('iframe').remove(),
       j.options.modal ? (j.$overlay = a('#jbForm_overlay').fadeOut(),
       j.$container.hide(),
       a('body').removeClass('jbNoScroll')) : (j.$form[0].reset(),
       j.$container.find('[type=file]').each(function() {
           a(this)[0].innerHTML = a(this)[0].innerHTML
       }),
       a('.jbForm .jb_success, .jbForm .jb_fail, .jbForm .jb_progress').hide(),
       j.$form = j.$container.find('.jb_form').show())
   }
   ,
   f.prototype.getCookie = function(j) {
       var k = ' ' + c.cookie
         , l = ' ' + j + '='
         , m = null
         , n = 0
         , o = 0;
       return 0 < k.length && (n = k.indexOf(l),
       -1 != n && (n += l.length,
       o = k.indexOf(';', n),
       -1 == o && (o = k.length),
       m = unescape(k.substring(n, o)))),
       m
   }
   ,
   f.prototype.show = function() {
       var j = this;
       j.$container = a('#jbForm_' + j.options.postfix),
       j.$inset = j.$container.find('.jb_inset'),
       j.$form = j.$container.find('.jb_form').show(),
       j.$overlay = a('#jbForm_overlay'),
       j.$form[0].reset(),
       j.$other = a('.jbForm:not(#jbForm_' + j.options.postfix + '):not(.jbInbuilt)').hide(),
       a('.jbForm:not(.jbInbuilt) .jb_success, .jbForm:not(.jbInbuilt) .jb_fail, .jbForm:not(.jbInbuilt) .jb_progress').hide(),
       j.$container.find('[placeholder]').blur(),
       j.$container.find('[type=file]').each(function() {
           a(this)[0].innerHTML = a(this)[0].innerHTML
       }),
       j.options.captcha && j.$form.find('.jb_captcha img').attr('src', ('https:' == location.protocol ? 'https:' : 'http:') + '//jbcallme.ru/api/captcha.png?' + Math.random()),
       j.$container.find('.jbFileName').html(''),
       j.$container.find('input,textarea,select').each(function() {
           a(j.element).attr('data-' + a(this).attr('name')) && a(this).val(a(j.element).data(a(this).attr('name')))
       }),
       j.options.modal && (a('body').addClass('jbNoScroll'),
       j.$overlay.fadeIn()),
       j.$container.show(),
       j.$container.find('.jbError').removeClass('jbError'),
       a(b).resize(function() {
           if (j.options.modal) {
               var k = a(b).height() - j.$inset.outerHeight();
               0 < k && !a('body').hasClass('jbIsMobile') ? j.$inset.css('margin-top', parseInt(k / 2)) : j.$inset.css('margin-top', 0)
           }
       }),
       a(b).resize(),
       j.options.onShow.call()
   }
   ,
   a.fn[g] = function(j) {
       return this.each(function() {
           a.data(this, 'plugin_' + g) || a.data(this, 'plugin_' + g, new f(this,j))
       })
   }
}
)(jQuery, window, document);
