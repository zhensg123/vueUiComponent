(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@/utils/utils')) :
  typeof define === 'function' && define.amd ? define(['exports', '@/utils/utils'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IconFont = {}, global.utils));
})(this, (function (exports, utils) { 'use strict';

  //

  var script = {
    name: "IconButton",
    props: {
      button: {
        type: Object,
        default: () => ({
          type: "primary", // 按钮类型 默认为普通按钮, 'primary' - 蓝色背景按钮, 'dropdown' - 带下拉列表的按钮
          iconType: "iconfont",
          icon: "",
          text: "111",
          loading: false,
          noLine: false
        })
      },
      // 下拉菜单列表
      dropdownList: {
        type: Array,
        default: () => []
      },
      // 当前高亮的菜单item
      activeDropdownItem: {
        type: String,
        default: ""
      },
      // 下拉列表字段映射
      dropdownMaps: {
        type: Object,
        default: () => null
      }
    },
    filters: {
      /*
        @func timeFormat
        @desc 时间格式化
        @params {int|string} timestamp 时间戳
      */
      timeFormat: function(timestamp) {
        return utils.formatDate(+timestamp, "YYYY-MM-DD")
      }
    },
    data() {
      return {
        // 菜单是否显示
        isDropdownMenuShow: false,
        dropdownListMapped: []
      }
    },
    watch: {
      dropdownList() {
        this.dropdownListMapped = [];
        this.mapDropdown();
      }
    },
    created() {},
    methods: {
      /**
       * @func
       * @desc 下拉列表字段映射
       */
      mapDropdown() {
        if (!this.dropdownMaps) {
          this.dropdownListMapped = this.dropdownList;
          return
        }

        const maps = this.dropdownMaps;
        Object.keys(maps).forEach(key => {
          const mapKey = maps[key];
          this.dropdownList.forEach(item => {
            let dropdown = { ...item };
            dropdown[key] = dropdown[mapKey];
            this.dropdownListMapped.push(dropdown);
          });
        });
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.button.type === "dropdown"
      ? _c(
          "el-dropdown",
          _vm._g(
            _vm._b(
              {
                staticClass: "icon-button-dropdown",
                attrs: { trigger: "click" },
                on: {
                  "visible-change": function ($event) {
                    _vm.isDropdownMenuShow = $event;
                  },
                },
              },
              "el-dropdown",
              _vm.$attrs,
              false
            ),
            _vm.$listeners
          ),
          [
            _c(
              "div",
              {
                class: [
                  "icon-button-container",
                  { active: _vm.isDropdownMenuShow },
                  { "no-line": _vm.button.noLine },
                ],
              },
              [
                _c("el-button", { staticClass: "icon-button" }, [
                  _vm.button.icon && _vm.button.iconType !== "element"
                    ? _c(
                        "svg",
                        {
                          class: ["iconfont", { "no-text": !_vm.button.text }],
                          attrs: { "aria-hidden": "true" },
                        },
                        [
                          _c("use", {
                            attrs: { "xlink:href": "#" + _vm.button.icon },
                          }),
                        ]
                      )
                    : _c("i", {
                        class: [_vm.button.icon, { "no-text": !_vm.button.text }],
                      }),
                  _vm._v("\n      " + _vm._s(_vm.button.text) + "\n    "),
                ]),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-dropdown-menu",
              {
                staticClass: "icon-button-dropdown-menu",
                attrs: { slot: "dropdown" },
                slot: "dropdown",
              },
              [
                _vm.button.loading
                  ? _c("div", { staticClass: "loading-container" }, [
                      _c("i", { staticClass: "el-icon-loading" }),
                    ])
                  : _vm.dropdownListMapped.length
                  ? _vm._l(_vm.dropdownListMapped, function (item) {
                      return _c(
                        "el-dropdown-item",
                        { key: item.version, attrs: { command: item } },
                        [
                          _c("div", { staticClass: "menu-item" }, [
                            _c(
                              "div",
                              {
                                class: {
                                  active: _vm.activeDropdownItem === item.version,
                                },
                              },
                              [
                                _vm._v(
                                  "\n          " +
                                    _vm._s(item.version) +
                                    "\n        "
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "version-time" }, [
                              _vm._v(
                                _vm._s(_vm._f("timeFormat")(item.createdTime))
                              ),
                            ]),
                          ]),
                        ]
                      )
                    })
                  : _c("div", { staticClass: "no-data" }, [_vm._v("暂无数据")]),
              ],
              2
            ),
          ],
          1
        )
      : _c(
          "div",
          { class: ["icon-button-container", { "no-line": _vm.button.noLine }] },
          [
            _c(
              "el-button",
              _vm._g(
                _vm._b(
                  {
                    staticClass: "icon-button",
                    attrs: { loading: _vm.button.loading },
                  },
                  "el-button",
                  _vm.$attrs,
                  false
                ),
                _vm.$listeners
              ),
              [
                _vm.button.icon &&
                _vm.button.iconType !== "element" &&
                !_vm.button.loading
                  ? _c(
                      "svg",
                      {
                        class: ["iconfont", { "no-text": !_vm.button.text }],
                        attrs: { "aria-hidden": "true" },
                      },
                      [
                        _c("use", {
                          attrs: { "xlink:href": "#" + _vm.button.icon },
                        }),
                      ]
                    )
                  : _vm.button.icon && !_vm.button.loading
                  ? _c("i", { class: _vm.button.icon })
                  : _vm._e(),
                _vm._v("\n    " + _vm._s(_vm.button.text) + "\n  "),
              ]
            ),
          ],
          1
        )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-24df6c32_0", { source: "@charset \"UTF-8\";\n/*\n  主色调变量, 无需手动引入\n*/\n.icon-button .no-text, .icon-button.el-button i.no-text, .icon-button.el-button .iconfont.no-text {\n  margin-right: 0;\n}\n.icon-button-container {\n  display: inline-flex;\n  align-items: center;\n  vertical-align: middle;\n}\n.icon-button-container + .icon-button-container.no-line, .icon-button-container + .icon-button-dropdown.no-line {\n  margin-left: 24px;\n}\n.icon-button-container + .icon-button-container:not(.no-line)::before, .icon-button-container + .icon-button-dropdown:not(.no-line)::before {\n  content: \"\";\n  display: inline-block;\n  width: 1px;\n  height: 12px;\n  margin: 0 24px;\n  background-color: #dcdee6;\n}\n.icon-button-container + .icon-button-dropdown:not(.no-line)::before {\n  margin-right: 20px;\n}\n.icon-button.el-button {\n  display: inline-flex;\n  align-items: center;\n  padding: 0;\n  border: 0;\n  background-color: transparent;\n  color: #313137;\n}\n.icon-button.el-button > span {\n  display: flex;\n  align-items: center;\n}\n.icon-button.el-button .iconfont {\n  width: 16px;\n  height: 16px;\n  margin-right: 6px;\n}\n.icon-button.el-button i {\n  font-size: 16px;\n  margin-right: 6px;\n}\n.icon-button.el-button:hover {\n  color: #2460e0;\n}\n.icon-button.el-button.el-button--primary {\n  padding: 8px 16px;\n  line-height: 20px;\n  color: #fff;\n  background-color: #2460e0;\n}\n.icon-button.el-button.el-button--primary:hover {\n  background-color: #5080e6;\n}\n.icon-button.el-button.el-button--primary:active {\n  background-color: #2056ca;\n}\n.icon-button-dropdown {\n  display: inline-flex;\n  align-items: center;\n  vertical-align: middle;\n}\n.icon-button-dropdown .icon-button-container {\n  padding: 4px;\n  border-radius: 2px;\n  cursor: pointer;\n}\n.icon-button-dropdown .icon-button-container.active {\n  background-color: #e4e8f3;\n}\n.icon-button-dropdown .icon-button-container.active .icon-button {\n  color: #2460e0;\n}\n.icon-button-dropdown + .icon-button-container.no-line {\n  margin-left: 24px;\n}\n.icon-button-dropdown + .icon-button-container:not(.no-line)::before {\n  content: \"\";\n  display: inline-block;\n  width: 1px;\n  height: 12px;\n  margin: 0 24px 0 20px;\n  background-color: #dcdee6;\n}\n.icon-button-dropdown-menu.el-dropdown-menu {\n  max-height: 300px;\n  padding: 8px 0;\n  border: 0;\n  overflow: auto;\n  box-shadow: 0px 2px 8px 0px rgba(45, 48, 59, 0.1);\n}\n.icon-button-dropdown-menu.el-dropdown-menu .el-dropdown-menu__item {\n  padding: 0;\n}\n.icon-button-dropdown-menu.el-dropdown-menu.el-popper[x-placement^=bottom] {\n  margin-top: 4px;\n}\n.icon-button-dropdown-menu.el-dropdown-menu.el-popper[x-placement^=right] {\n  margin-left: 4px;\n}\n.icon-button-dropdown-menu.el-dropdown-menu.el-popper .popper__arrow {\n  display: none;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .menu-item {\n  min-width: 160px;\n  padding: 6px 16px;\n  line-height: 20px;\n  font-size: 14px;\n  color: #2d303b;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .menu-item:hover {\n  background-color: #f5f6f9;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .menu-item .active {\n  font-weight: 500;\n  color: #2460e0;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .version-time {\n  font-size: 12px;\n  opacity: 0.5;\n  transform: scale(0.83);\n  transform-origin: left;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .loading-container, .icon-button-dropdown-menu.el-dropdown-menu .no-data {\n  width: 160px;\n  height: 20px;\n  line-height: 20px;\n  text-align: center;\n  color: #2d303b;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .no-data {\n  font-size: 12px;\n}\n\n/*# sourceMappingURL=icon-button.vue.map */", map: {"version":3,"sources":["icon-button.vue","C:\\Users\\zhenshigang\\Desktop\\myworkplace\\monorepo\\packages\\components\\src\\icon-button\\icon-button.vue"],"names":[],"mappings":"AAAA,gBAAgB;AAChB;;CAEC;AC8JD;EACA,eAAA;AD5JA;AC8JA;EACA,oBAAA;EACA,mBAAA;EACA,sBAAA;AD5JA;AC+JA;EACA,iBAAA;AD7JA;AC+JA;EACA,WAAA;EACA,qBAAA;EACA,UAAA;EACA,YAAA;EACA,cAAA;EACA,yBAAA;AD7JA;ACiKA;EACA,kBAAA;AD/JA;ACmKA;EACA,oBAAA;EACA,mBAAA;EACA,UAAA;EACA,SAAA;EACA,6BAAA;EACA,cAAA;ADjKA;ACkKA;EACA,aAAA;EACA,mBAAA;ADhKA;ACkKA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;ADhKA;ACqKA;EACA,eAAA;EACA,iBAAA;ADnKA;ACwKA;EACA,cAAA;ADtKA;ACwKA;EACA,iBAAA;EACA,iBAAA;EACA,WAAA;EACA,yBAAA;ADtKA;ACuKA;EACA,yBAAA;ADrKA;ACuKA;EACA,yBAAA;ADrKA;ACyKA;EACA,oBAAA;EACA,mBAAA;EACA,sBAAA;ADvKA;ACwKA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;ADtKA;ACuKA;EAIA,yBAAA;ADxKA;ACqKA;EACA,cAAA;ADnKA;ACyKA;EACA,iBAAA;ADvKA;ACyKA;EACA,WAAA;EACA,qBAAA;EACA,UAAA;EACA,YAAA;EACA,qBAAA;EACA,yBAAA;ADvKA;AC2KA;EACA,iBAAA;EACA,cAAA;EACA,SAAA;EACA,cAAA;EACA,iDAAA;ADzKA;AC0KA;EACA,UAAA;ADxKA;AC2KA;EACA,eAAA;ADzKA;AC2KA;EACA,gBAAA;ADzKA;AC2KA;EACA,aAAA;ADzKA;AC4KA;EACA,gBAAA;EACA,iBAAA;EACA,iBAAA;EACA,eAAA;EACA,cAAA;AD1KA;AC2KA;EACA,yBAAA;ADzKA;AC2KA;EACA,gBAAA;EACA,cAAA;ADzKA;AC4KA;EACA,eAAA;EACA,YAAA;EACA,sBAAA;EACA,sBAAA;AD1KA;AC4KA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,cAAA;AD1KA;AC4KA;EAEA,eAAA;AD3KA;;AAEA,0CAA0C","file":"icon-button.vue","sourcesContent":["@charset \"UTF-8\";\n/*\n  主色调变量, 无需手动引入\n*/\n.icon-button .no-text, .icon-button.el-button i.no-text, .icon-button.el-button .iconfont.no-text {\n  margin-right: 0;\n}\n.icon-button-container {\n  display: inline-flex;\n  align-items: center;\n  vertical-align: middle;\n}\n.icon-button-container + .icon-button-container.no-line, .icon-button-container + .icon-button-dropdown.no-line {\n  margin-left: 24px;\n}\n.icon-button-container + .icon-button-container:not(.no-line)::before, .icon-button-container + .icon-button-dropdown:not(.no-line)::before {\n  content: \"\";\n  display: inline-block;\n  width: 1px;\n  height: 12px;\n  margin: 0 24px;\n  background-color: #dcdee6;\n}\n.icon-button-container + .icon-button-dropdown:not(.no-line)::before {\n  margin-right: 20px;\n}\n.icon-button.el-button {\n  display: inline-flex;\n  align-items: center;\n  padding: 0;\n  border: 0;\n  background-color: transparent;\n  color: #313137;\n}\n.icon-button.el-button > span {\n  display: flex;\n  align-items: center;\n}\n.icon-button.el-button .iconfont {\n  width: 16px;\n  height: 16px;\n  margin-right: 6px;\n}\n.icon-button.el-button i {\n  font-size: 16px;\n  margin-right: 6px;\n}\n.icon-button.el-button:hover {\n  color: #2460e0;\n}\n.icon-button.el-button.el-button--primary {\n  padding: 8px 16px;\n  line-height: 20px;\n  color: #fff;\n  background-color: #2460e0;\n}\n.icon-button.el-button.el-button--primary:hover {\n  background-color: #5080e6;\n}\n.icon-button.el-button.el-button--primary:active {\n  background-color: #2056ca;\n}\n.icon-button-dropdown {\n  display: inline-flex;\n  align-items: center;\n  vertical-align: middle;\n}\n.icon-button-dropdown .icon-button-container {\n  padding: 4px;\n  border-radius: 2px;\n  cursor: pointer;\n}\n.icon-button-dropdown .icon-button-container.active {\n  background-color: #e4e8f3;\n}\n.icon-button-dropdown .icon-button-container.active .icon-button {\n  color: #2460e0;\n}\n.icon-button-dropdown + .icon-button-container.no-line {\n  margin-left: 24px;\n}\n.icon-button-dropdown + .icon-button-container:not(.no-line)::before {\n  content: \"\";\n  display: inline-block;\n  width: 1px;\n  height: 12px;\n  margin: 0 24px 0 20px;\n  background-color: #dcdee6;\n}\n.icon-button-dropdown-menu.el-dropdown-menu {\n  max-height: 300px;\n  padding: 8px 0;\n  border: 0;\n  overflow: auto;\n  box-shadow: 0px 2px 8px 0px rgba(45, 48, 59, 0.1);\n}\n.icon-button-dropdown-menu.el-dropdown-menu .el-dropdown-menu__item {\n  padding: 0;\n}\n.icon-button-dropdown-menu.el-dropdown-menu.el-popper[x-placement^=bottom] {\n  margin-top: 4px;\n}\n.icon-button-dropdown-menu.el-dropdown-menu.el-popper[x-placement^=right] {\n  margin-left: 4px;\n}\n.icon-button-dropdown-menu.el-dropdown-menu.el-popper .popper__arrow {\n  display: none;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .menu-item {\n  min-width: 160px;\n  padding: 6px 16px;\n  line-height: 20px;\n  font-size: 14px;\n  color: #2d303b;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .menu-item:hover {\n  background-color: #f5f6f9;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .menu-item .active {\n  font-weight: 500;\n  color: #2460e0;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .version-time {\n  font-size: 12px;\n  opacity: 0.5;\n  transform: scale(0.83);\n  transform-origin: left;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .loading-container, .icon-button-dropdown-menu.el-dropdown-menu .no-data {\n  width: 160px;\n  height: 20px;\n  line-height: 20px;\n  text-align: center;\n  color: #2d303b;\n}\n.icon-button-dropdown-menu.el-dropdown-menu .no-data {\n  font-size: 12px;\n}\n\n/*# sourceMappingURL=icon-button.vue.map */","<template>\r\n  <!-- 下拉菜单 -->\r\n  <el-dropdown\r\n    v-if=\"button.type === 'dropdown'\"\r\n    class=\"icon-button-dropdown\"\r\n    trigger=\"click\"\r\n    @visible-change=\"isDropdownMenuShow = $event\"\r\n    v-bind=\"$attrs\"\r\n    v-on=\"$listeners\"\r\n  >\r\n    <!-- icon按钮 -->\r\n    <div\r\n      :class=\"[\r\n        'icon-button-container',\r\n        { active: isDropdownMenuShow },\r\n        { 'no-line': button.noLine }\r\n      ]\"\r\n    >\r\n      <el-button class=\"icon-button\">\r\n        <svg\r\n          v-if=\"button.icon && button.iconType !== 'element'\"\r\n          :class=\"['iconfont', { 'no-text': !button.text }]\"\r\n          aria-hidden=\"true\"\r\n        >\r\n          <use :xlink:href=\"`#${button.icon}`\" />\r\n        </svg>\r\n        <i v-else :class=\"[button.icon, { 'no-text': !button.text }]\"></i>\r\n        {{ button.text }}\r\n      </el-button>\r\n    </div>\r\n    <!-- 历史版本列表 -->\r\n    <el-dropdown-menu slot=\"dropdown\" class=\"icon-button-dropdown-menu\">\r\n      <!-- 加载中 -->\r\n      <div v-if=\"button.loading\" class=\"loading-container\">\r\n        <i class=\"el-icon-loading\"></i>\r\n      </div>\r\n      <!-- 历史列表每一项 -->\r\n      <el-dropdown-item\r\n        v-for=\"item in dropdownListMapped\"\r\n        v-else-if=\"dropdownListMapped.length\"\r\n        :key=\"item.version\"\r\n        :command=\"item\"\r\n      >\r\n        <div class=\"menu-item\">\r\n          <div :class=\"{ active: activeDropdownItem === item.version }\">\r\n            {{ item.version }}\r\n          </div>\r\n          <div class=\"version-time\">{{ item.createdTime | timeFormat }}</div>\r\n        </div>\r\n      </el-dropdown-item>\r\n      <div v-else class=\"no-data\">暂无数据</div>\r\n    </el-dropdown-menu>\r\n  </el-dropdown>\r\n\r\n  <!-- 普通带文字按钮 -->\r\n  <div v-else :class=\"['icon-button-container', { 'no-line': button.noLine }]\">\r\n    <el-button\r\n      class=\"icon-button\"\r\n      :loading=\"button.loading\"\r\n      v-bind=\"$attrs\"\r\n      v-on=\"$listeners\"\r\n    >\r\n      <svg\r\n        v-if=\"button.icon && button.iconType !== 'element' && !button.loading\"\r\n        :class=\"['iconfont', { 'no-text': !button.text }]\"\r\n        aria-hidden=\"true\"\r\n      >\r\n        <use :xlink:href=\"`#${button.icon}`\" />\r\n      </svg>\r\n      <i v-else-if=\"button.icon && !button.loading\" :class=\"button.icon\"></i>\r\n      {{ button.text }}\r\n    </el-button>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { formatDate } from \"@/utils/utils\"\r\n\r\nexport default {\r\n  name: \"IconButton\",\r\n  props: {\r\n    button: {\r\n      type: Object,\r\n      default: () => ({\r\n        type: \"\", // 按钮类型 默认为普通按钮, 'primary' - 蓝色背景按钮, 'dropdown' - 带下拉列表的按钮\r\n        iconType: \"iconfont\",\r\n        icon: \"\",\r\n        text: \"\",\r\n        loading: false,\r\n        noLine: false\r\n      })\r\n    },\r\n    // 下拉菜单列表\r\n    dropdownList: {\r\n      type: Array,\r\n      default: () => []\r\n    },\r\n    // 当前高亮的菜单item\r\n    activeDropdownItem: {\r\n      type: String,\r\n      default: \"\"\r\n    },\r\n    // 下拉列表字段映射\r\n    dropdownMaps: {\r\n      type: Object,\r\n      default: () => null\r\n    }\r\n  },\r\n  filters: {\r\n    /*\r\n      @func timeFormat\r\n      @desc 时间格式化\r\n      @params {int|string} timestamp 时间戳\r\n    */\r\n    timeFormat: function(timestamp) {\r\n      return formatDate(+timestamp, \"YYYY-MM-DD\")\r\n    }\r\n  },\r\n  data() {\r\n    return {\r\n      // 菜单是否显示\r\n      isDropdownMenuShow: false,\r\n      dropdownListMapped: []\r\n    }\r\n  },\r\n  watch: {\r\n    dropdownList() {\r\n      this.dropdownListMapped = []\r\n      this.mapDropdown()\r\n    }\r\n  },\r\n  created() {},\r\n  methods: {\r\n    /**\r\n     * @func\r\n     * @desc 下拉列表字段映射\r\n     */\r\n    mapDropdown() {\r\n      if (!this.dropdownMaps) {\r\n        this.dropdownListMapped = this.dropdownList\r\n        return\r\n      }\r\n\r\n      const maps = this.dropdownMaps\r\n      Object.keys(maps).forEach(key => {\r\n        const mapKey = maps[key]\r\n        this.dropdownList.forEach(item => {\r\n          let dropdown = { ...item }\r\n          dropdown[key] = dropdown[mapKey]\r\n          this.dropdownListMapped.push(dropdown)\r\n        })\r\n      })\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import \"../../../assets/src/scss/var.scss\";\r\n\r\n.icon-button {\r\n  .no-text {\r\n    margin-right: 0;\r\n  }\r\n  &-container {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    vertical-align: middle;\r\n    & + &,\r\n    & + .icon-button-dropdown {\r\n      &.no-line {\r\n        margin-left: 24px;\r\n      }\r\n      &:not(.no-line)::before {\r\n        content: \"\";\r\n        display: inline-block;\r\n        width: 1px;\r\n        height: 12px;\r\n        margin: 0 24px;\r\n        background-color: #dcdee6;\r\n      }\r\n    }\r\n    & + .icon-button-dropdown:not(.no-line) {\r\n      &::before {\r\n        margin-right: 20px;\r\n      }\r\n    }\r\n  }\r\n  &.el-button {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    padding: 0;\r\n    border: 0;\r\n    background-color: transparent;\r\n    color: #313137;\r\n    > span {\r\n      display: flex;\r\n      align-items: center;\r\n    }\r\n    .iconfont {\r\n      width: 16px;\r\n      height: 16px;\r\n      margin-right: 6px;\r\n      &.no-text {\r\n        @extend .no-text;\r\n      }\r\n    }\r\n    i {\r\n      font-size: 16px;\r\n      margin-right: 6px;\r\n      &.no-text {\r\n        @extend .no-text;\r\n      }\r\n    }\r\n    &:hover {\r\n      color: $primaryColor;\r\n    }\r\n    &.el-button--primary {\r\n      padding: 8px 16px;\r\n      line-height: 20px;\r\n      color: #fff;\r\n      background-color: $primaryColor;\r\n      &:hover {\r\n        background-color: #5080e6;\r\n      }\r\n      &:active {\r\n        background-color: #2056ca;\r\n      }\r\n    }\r\n  }\r\n  &-dropdown {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    vertical-align: middle;\r\n    .icon-button-container {\r\n      padding: 4px;\r\n      border-radius: 2px;\r\n      cursor: pointer;\r\n      &.active {\r\n        .icon-button {\r\n          color: $primaryColor;\r\n        }\r\n        background-color: #e4e8f3;\r\n      }\r\n    }\r\n    & + .icon-button-container {\r\n      &.no-line {\r\n        margin-left: 24px;\r\n      }\r\n      &:not(.no-line)::before {\r\n        content: \"\";\r\n        display: inline-block;\r\n        width: 1px;\r\n        height: 12px;\r\n        margin: 0 24px 0 20px;\r\n        background-color: #dcdee6;\r\n      }\r\n    }\r\n  }\r\n  &-dropdown-menu.el-dropdown-menu {\r\n    max-height: 300px;\r\n    padding: 8px 0;\r\n    border: 0;\r\n    overflow: auto;\r\n    box-shadow: 0px 2px 8px 0px rgba(45, 48, 59, 0.1);\r\n    .el-dropdown-menu__item {\r\n      padding: 0;\r\n    }\r\n    &.el-popper {\r\n      &[x-placement^=\"bottom\"] {\r\n        margin-top: 4px;\r\n      }\r\n      &[x-placement^=\"right\"] {\r\n        margin-left: 4px;\r\n      }\r\n      .popper__arrow {\r\n        display: none;\r\n      }\r\n    }\r\n    .menu-item {\r\n      min-width: 160px;\r\n      padding: 6px 16px;\r\n      line-height: 20px;\r\n      font-size: 14px;\r\n      color: $textColorPrimary;\r\n      &:hover {\r\n        background-color: #f5f6f9;\r\n      }\r\n      .active {\r\n        font-weight: 500;\r\n        color: $primaryColor;\r\n      }\r\n    }\r\n    .version-time {\r\n      font-size: 12px;\r\n      opacity: 0.5;\r\n      transform: scale(0.83);\r\n      transform-origin: left;\r\n    }\r\n    .loading-container {\r\n      width: 160px;\r\n      height: 20px;\r\n      line-height: 20px;\r\n      text-align: center;\r\n      color: $textColorPrimary;\r\n    }\r\n    .no-data {\r\n      @extend .loading-container;\r\n      font-size: 12px;\r\n    }\r\n  }\r\n}\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  __vue_component__.install = function (Vue) {
    Vue.component(__vue_component__.name, __vue_component__);
  };

  // Import vue component
  // import IconTooltip from "./icon-tooltip/index"
  // import LayoutHeader from "./layout-header/index"
  // import LayoutSidebar from "./layout-sidebar/index"
  // import PageIntroduce from "./page-introduce/index"
  // import TextHiddenTooltip from "./text-hidden-tooltip/index"
  // import VTable from "./v-table/index"
  // Declare install function executed by Vue.use()

  /* export function install(Vue) {
    if (install.installed) return
    install.installed = true
    Vue.component(IconFont.name, component)
  }

  // Create module definition for Vue.use()
  const plugin = {
    install
  } */

  const components = [__vue_component__]; // will install the plugin only once

  const install = function (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  };

  if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
  } // Auto-install when vue is found (eg. in browser via <script> tag)

  /* let GlobalVue = null
  if (typeof window !== "undefined") {
    GlobalVue = window.Vue
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue
  }
  if (GlobalVue) {
    GlobalVue.use(IconFont)
  } */
  // To allow use as module (npm/webpack/etc.) export component


  var index = {
    install,
    IconButton: __vue_component__
  }; // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  exports["default"] = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
