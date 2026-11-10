// 自动提取自 main bundle（round-0413）
// 组件: AlertTitle
// 外部依赖: 8 个自由变量
// e, openBlock, createElementBlock, normalizeClass, unref, je, t, withCtx
var __component = {
    __name: `AlertTitle`,
    props: {
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    setup(e) {
      let t = e;
      return (e, n) => (openBlock(), createElementBlock(`div`, {
        "data-slot": `alert-title`,
        class: normalizeClass(unref(je)(`font-medium group-has-[>svg]/alert:col-start-2 cn-font-heading [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground`, t.class))
      }, [withCtx(e.$slots, `default`)], 2));
    }
  };
export default __component;
