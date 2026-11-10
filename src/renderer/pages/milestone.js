import { Dt as e, Ot as t, jt as n, r, wt as i } from "../ui/Switch.js";
import { $n as a, An as o, Et as s, Lt as c, O as l, S as u, St as d, Wt as f, Yt as p, Zt as m, b as h, bn as g, c as _, gt as v, j as y, k as b, n as ee, nr as x, ot as S, rr as C, rt as w, tt as T, ut as E, v as D, vn as O, x as k, y as A } from "../chunks/vue-i18n.runtime.js";
import { C as te, E as j, T as M, r as N } from "../i18n/en-US-player.js";
import { t as ne } from "../ui/icons/lucide-icons.js";
import { i as P, n as F, r as I } from "../chunks/purify.es.js";
import { t as L } from "../chunks/check.js";
import { t as R } from "../chunks/chevron-up.js";
import { _ as re, v as z } from "../chunks/screenshot-beautifier.js";
import { t as B } from "../chunks/flag.js";
import { n as V, t as H } from "../ui/DropdownMenuItem.js";
import { t as ie } from "./ToolboxWorkspaceHeader.js";
import { n as U, r as W, t as ae } from "../ui/DropdownMenuTrigger.js";
import { a as oe, i as se, n as G, r as ce, t as le } from "../chunks/dialog.js";
import { a as ue, c as de, i as fe, n as pe, o as me, r as he, s as ge, t as _e } from "../ui/alert-dialog.js";
import { a as ve } from "../chunks/useAuth.js";
import { t as ye } from "../chunks/useGrowthTelemetry.js";
import { At as K, Bn as be, Bt as q, Cn as xe, Dn as Se, Dt as Ce, Et as J, Ft as we, Gt as Y, It as Te, Kt as Ee, Lt as De, Mt as Oe, Nt as ke, Ot as Ae, Pt as X, Rn as je, Rt as Me, Sn as Ne, St as Pe, Tt as Z, Vn as Fe, Vt as Q, _t as Ie, bt as Le, ct as Re, dt as ze, gn as Be, jt as Ve, kt as He, lt as Ue, pt as We, un as Ge, vn as Ke, vt as qe, wt as Je, xt as Ye, yt as Xe, zt as Ze } from "../chunks/main.js";
import { t as $ } from "./ToolDropzone.js";
var Qe = [`id`],
  $e = {
    class: `relative pt-2.5 text-right`
  },
  et = {
    class: `block text-xs leading-4 text-muted-foreground`
  },
  tt = {
    key: 0,
    class: `block text-xs leading-4 tabular-nums text-muted-foreground`
  },
  nt = {
    class: `min-w-0 pb-2.5`
  },
  rt = {
    class: `flex items-start gap-2.5 px-3.5 pt-2.5`
  },
  it = [`disabled`, `title`, `aria-label`, `aria-pressed`],
  at = [`aria-expanded`, `title`],
  ot = {
    class: `line-clamp-2 break-words`
  },
  st = [`title`, `aria-label`],
  ct = {
    key: 0,
    class: `flex items-center gap-1.5 text-xs text-muted-foreground`
  },
  lt = [`innerHTML`],
  ut = {
    key: 2,
    class: `text-xs text-muted-foreground`
  },
  dt = {
    key: 0,
    class: `flex min-w-0 flex-1 items-center gap-2`
  },
  ft = {
    class: `shrink-0 tabular-nums`
  },
  pt = [`title`],
  mt = {
    key: 0,
    class: `overflow-hidden rounded-lg border border-border`
  },
  ht = [`onClick`],
  gt = {
    key: 2,
    class: `max-w-[45%] shrink-0 truncate text-[11px] text-muted-foreground`
  },
  _t = {
    key: 1,
    class: `space-y-0.5`
  },
  vt = {
    class: `min-w-0 flex-1 truncate`
  },
  yt = [`title`, `aria-label`, `onClick`],
  bt = {
    class: `-mx-1.5 flex items-center justify-between`
  },
  xt = {
    key: 0,
    class: `flex items-center gap-2 text-muted-foreground`
  },
  St = {
    class: `min-w-0 flex-1 truncate`
  },
  Ct = [`title`],
  wt = [`onClick`],
  Tt = [`title`, `aria-label`, `onClick`],
  Et = y({
    __name: `MilestoneCard`,
    props: {
      item: {},
      status: {},
      today: {},
      expanded: {
        type: Boolean
      },
      highlighted: {
        type: Boolean
      },
      detailLoading: {
        type: Boolean
      },
      toggling: {
        type: Boolean
      },
      uploads: {},
      first: {
        type: Boolean
      },
      last: {
        type: Boolean
      }
    },
    emits: [`toggleExpand`, `edit`, `delete`, `toggleComplete`, `openTodo`, `download`, `cancelUploads`, `retryUpload`, `dismissUpload`],
    setup(event, {
      emit: s
    }) {
      let c = event,
        f = s,
        {
          t: m,
          locale: g
        } = ee(),
        y = D(() => c.status === `completed`),
        S = D(() => Oe(c.item) && !c.item.completedAt),
        w = D(() => q(c.item)),
        T = D(() => He(c.item.date, g.value)),
        E = D(() => K(c.item.time)),
        O = D(() => c.item.date === c.today),
        te = D(() => w.value ? `pl-10 pr-3.5` : `px-3.5`),
        j = D(() => c.item.content ? Y(Me(c.item.content)) : ``),
        M = D(() => c.item.todoCount > 0 ? Math.round(c.item.completedTodoCount / c.item.todoCount * 100) : 0),
        N = D(() => {
          let e = De(c.status);
          if (c.status === `completed`) return {
            label: m(`milestoneTool.status.completed`),
            className: e
          };
          if (c.status === `overdue`) return {
            label: m(`milestoneTool.relative.overdueDays`, {
              days: Z(c.item.date, c.today)
            }),
            className: e
          };
          let t = Z(c.today, c.item.date);
          return t === 0 ? {
            label: m(`milestoneTool.relative.today`),
            className: `bg-foreground/[0.08] font-semibold text-foreground`
          } : t === 1 ? {
            label: m(`milestoneTool.relative.tomorrow`),
            className: e
          } : {
            label: m(`milestoneTool.relative.daysLeft`, {
              days: t
            }),
            className: e
          };
        }),
        P = D(() => c.status === `completed` ? `border-primary bg-primary` : c.status === `overdue` ? `border-destructive bg-destructive` : O.value ? `border-primary bg-background` : `border-muted-foreground/45 bg-background`),
        F = D(() => c.uploads.filter(item => item.status !== `failed`)),
        B = D(() => c.uploads.filter(item => item.status === `failed`)),
        V = D(() => F.value.length ? Math.round(F.value.reduce((acc, cur) => acc + cur.progress, 0) / F.value.length) : 0);
      function ie(e) {
        return [e.project || e.assignee.remark || e.assignee.nickname, e.dueDate, e.archived ? m(`milestoneTool.card.archived`) : ``].filter(Boolean).join(` · `);
      }
      function oe(e) {
        window.getSelection()?.toString() || e.target?.closest(`button, a, [role="menuitem"], [data-no-toggle]`) || f(`toggleExpand`);
      }
      return (s, c) => (v(), u(`article`, {
        id: `milestone-card-${event.item.id}`,
        class: `relative grid grid-cols-[68px_minmax(0,1fr)] gap-x-5`
      }, [A(`span`, {
        class: a([`pointer-events-none absolute left-[78px] w-px -translate-x-1/2 bg-border`, [event.first ? `top-[18px]` : `top-0`, event.last ? `h-[18px]` : `bottom-0`]]),
        style: x(event.first && event.last ? `display: none` : undefined)
      }, null, 6), A(`div`, $e, [A(`strong`, {
        class: a([`block text-[13px] font-semibold leading-5 tabular-nums`, O.value ? `text-primary` : `text-foreground`])
      }, C(T.value.day), 3), A(`span`, et, C(T.value.weekday), 1), E.value ? (v(), u(`span`, tt, C(E.value), 1)) : k(``, true), A(`span`, {
        class: a([`absolute -right-[15px] top-[13.5px] z-[1] size-2.5 rounded-full border-2`, P.value])
      }, null, 2)]), A(`div`, nt, [A(`div`, {
        class: a([`cursor-pointer rounded-[10px] border bg-card transition-[border-color,box-shadow]`, event.highlighted ? `border-primary/60 ring-3 ring-primary/10` : `border-border hover:border-foreground/15`]),
        onClick: oe
      }, [A(`header`, rt, [w.value ? (v(), u(`button`, {
        key: 0,
        type: `button`,
        class: a([`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border transition-colors disabled:cursor-default`, y.value ? `border-primary bg-primary text-primary-foreground` : `border-muted-foreground/40 text-transparent hover:border-primary hover:text-primary`]),
        disabled: S.value || event.toggling,
        title: S.value ? o(m)(`milestoneTool.card.autoCompleted`) : y.value ? o(m)(`milestoneTool.card.markIncomplete`) : o(m)(`milestoneTool.card.markComplete`),
        "aria-label": y.value ? o(m)(`milestoneTool.card.markIncomplete`) : o(m)(`milestoneTool.card.markComplete`),
        "aria-pressed": y.value,
        onClick: c[0] ||= e => f(`toggleComplete`)
      }, [event.toggling ? (v(), h(o(re), {
        key: 0,
        size: 10,
        class: `animate-spin text-current`
      })) : (v(), h(o(L), {
        key: 1,
        size: 10,
        "stroke-width": 3
      }))], 10, it)) : k(``, true), A(`button`, {
        type: `button`,
        class: a([`min-w-0 flex-1 text-left text-sm font-medium leading-5 outline-none focus-visible:underline`, y.value ? `text-muted-foreground` : `text-foreground`]),
        "aria-expanded": event.expanded,
        title: event.expanded ? o(m)(`milestoneTool.card.collapse`) : o(m)(`milestoneTool.card.expand`),
        onClick: c[1] ||= e => f(`toggleExpand`)
      }, [A(`span`, ot, C(event.item.title), 1)], 10, at), A(`span`, {
        class: a([`mt-px shrink-0 rounded-md px-1.5 text-[11px] font-medium leading-[18px]`, N.value.className])
      }, C(N.value.label), 3), b(o(W), null, {
        default: p(() => [b(o(ae), {
          "as-child": ``
        }, {
          default: p(() => [A(`button`, {
            type: `button`,
            class: `-mr-1.5 grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: o(m)(`milestoneTool.card.more`),
            "aria-label": o(m)(`milestoneTool.card.more`)
          }, [b(o(I), {
            size: 15
          })], 8, st)]),
          _: 1
        }), b(o(U), {
          align: `end`,
          class: `min-w-36`
        }, {
          default: p(() => [b(o(H), {
            class: `text-xs`,
            onSelect: c[2] ||= e => f(`edit`)
          }, {
            default: p(() => [b(o(t)), l(C(o(m)(`milestoneTool.card.edit`)), 1)]),
            _: 1
          }), w.value && !S.value ? (v(), h(o(H), {
            key: 0,
            class: `text-xs`,
            disabled: event.toggling,
            onSelect: c[3] ||= e => f(`toggleComplete`)
          }, {
            default: p(() => [y.value ? (v(), h(o(n), {
              key: 0
            })) : (v(), h(o(Fe), {
              key: 1
            })), l(` ` + C(y.value ? o(m)(`milestoneTool.card.markIncomplete`) : o(m)(`milestoneTool.card.markComplete`)), 1)]),
            _: 1
          }, 8, [`disabled`])) : k(``, true), b(o(Ue)), b(o(H), {
            variant: `destructive`,
            class: `text-xs`,
            onSelect: c[4] ||= e => f(`delete`)
          }, {
            default: p(() => [b(o(i)), l(C(o(m)(`milestoneTool.card.delete`)), 1)]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      })]), !event.expanded && event.item.contentSummary ? (v(), u(`p`, {
        key: 0,
        class: a([`mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground`, te.value])
      }, C(event.item.contentSummary), 3)) : k(``, true), event.expanded ? (v(), u(`div`, {
        key: 1,
        "data-no-toggle": ``,
        class: a([`mt-1.5 cursor-auto`, te.value])
      }, [event.detailLoading && event.item.content === null ? (v(), u(`div`, ct, [b(o(re), {
        size: 13,
        class: `animate-spin`
      }), l(C(o(m)(`milestoneTool.loading`)), 1)])) : j.value ? (v(), u(`div`, {
        key: 1,
        class: `break-words text-sm leading-relaxed text-foreground [&_h1]:my-1 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:my-1 [&_h2]:font-semibold [&_h3]:my-1 [&_h3]:font-semibold [&_hr]:my-2 [&_hr]:border-border [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5`,
        innerHTML: j.value
      }, null, 8, lt)) : event.item.contentSummary ? k(``, true) : (v(), u(`p`, ut, C(o(m)(`milestoneTool.card.noDetail`)), 1))], 2)) : k(``, true), event.item.todoCount > 0 || event.item.attachmentCount > 0 && !event.expanded ? (v(), u(`div`, {
        key: 2,
        class: a([`mt-2 flex items-center gap-3 text-[11px] text-muted-foreground`, te.value])
      }, [event.item.todoCount > 0 ? (v(), u(`span`, dt, [b(o(Re), {
        "model-value": M.value,
        class: `h-1 max-w-[160px]`
      }, null, 8, [`model-value`]), A(`span`, ft, C(o(m)(`milestoneTool.card.todoProgress`, {
        done: event.item.completedTodoCount,
        total: event.item.todoCount
      })), 1)])) : k(``, true), event.item.attachmentCount > 0 && !event.expanded ? (v(), u(`span`, {
        key: 1,
        class: `ml-auto inline-flex shrink-0 items-center gap-1 tabular-nums`,
        title: o(m)(`milestoneTool.card.attachments`, {
          count: event.item.attachmentCount
        })
      }, [b(o(Se), {
        size: 11
      }), l(C(event.item.attachmentCount), 1)], 8, pt)) : k(``, true)], 2)) : k(``, true), event.expanded ? (v(), u(`div`, {
        key: 3,
        "data-no-toggle": ``,
        class: a([`mt-2.5 cursor-auto space-y-2.5`, te.value])
      }, [event.item.todos.length ? (v(), u(`ul`, mt, [(v(true), u(_, null, d(event.item.todos, e => (v(), u(`li`, {
        key: e.id,
        class: `border-b border-border last:border-b-0`
      }, [A(`button`, {
        type: `button`,
        class: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left transition-colors hover:bg-muted/60`,
        onClick: t => f(`openTodo`, e.id)
      }, [e.status === `done` ? (v(), h(o(Fe), {
        key: 0,
        size: 14,
        class: `shrink-0 text-primary`
      })) : (v(), h(o(n), {
        key: 1,
        size: 14,
        class: `shrink-0 text-muted-foreground/60`
      })), A(`span`, {
        class: a([`min-w-0 flex-1 truncate text-xs`, e.status === `done` ? `text-muted-foreground line-through` : `text-foreground`])
      }, C(e.title), 3), ie(e) ? (v(), u(`span`, gt, C(ie(e)), 1)) : k(``, true)], 8, ht)]))), 128))])) : k(``, true), event.item.attachments.length ? (v(), u(`ul`, _t, [(v(true), u(_, null, d(event.item.attachments, e => (v(), u(`li`, {
        key: e.id,
        class: `flex items-center gap-2 text-xs text-muted-foreground`
      }, [b(o(Se), {
        size: 12,
        class: `shrink-0`
      }), A(`span`, vt, C(e.name) + ` · ` + C(o(Ae)(e.size)), 1), A(`button`, {
        type: `button`,
        class: `grid size-6 shrink-0 place-items-center rounded-md transition-colors hover:bg-muted hover:text-foreground`,
        title: o(m)(`milestoneTool.card.download`),
        "aria-label": o(m)(`milestoneTool.card.download`),
        onClick: t => f(`download`, e)
      }, [b(o(z), {
        size: 13
      })], 8, yt)]))), 128))])) : k(``, true), A(`div`, bt, [b(o(r), {
        variant: `ghost`,
        size: `xs`,
        class: `text-muted-foreground`,
        onClick: c[5] ||= e => f(`toggleExpand`)
      }, {
        default: p(() => [b(o(R)), l(C(o(m)(`milestoneTool.card.collapse`)), 1)]),
        _: 1
      }), b(o(r), {
        variant: `ghost`,
        size: `xs`,
        class: `text-muted-foreground`,
        onClick: c[6] ||= e => f(`edit`)
      }, {
        default: p(() => [b(o(t)), l(C(o(m)(`milestoneTool.card.edit`)), 1)]),
        _: 1
      })])], 2)) : k(``, true), c[8] ||= A(`div`, {
        class: `h-2.5`
      }, null, -1), event.uploads.length ? (v(), u(`div`, {
        key: 4,
        "data-no-toggle": ``,
        class: a([`-mt-0.5 cursor-auto space-y-1 border-t border-border py-2 text-xs`, te.value])
      }, [F.value.length ? (v(), u(`div`, xt, [b(o(re), {
        size: 13,
        class: `shrink-0 animate-spin`
      }), A(`span`, St, C(o(m)(`milestoneTool.card.uploading`, {
        count: F.value.length,
        percent: V.value
      })), 1), A(`button`, {
        type: `button`,
        class: `shrink-0 font-medium hover:text-foreground`,
        onClick: c[7] ||= e => f(`cancelUploads`)
      }, C(o(m)(`milestoneTool.card.cancelUpload`)), 1)])) : k(``, true), (v(true), u(_, null, d(B.value, e => (v(), u(`div`, {
        key: e.id,
        class: `flex items-center gap-2 text-destructive`
      }, [b(o(Ke), {
        size: 13,
        class: `shrink-0`
      }), A(`span`, {
        class: `min-w-0 flex-1 truncate`,
        title: e.error
      }, C(o(m)(`milestoneTool.card.uploadFailed`, {
        name: e.file.name,
        message: e.error
      })), 9, Ct), A(`button`, {
        type: `button`,
        class: `inline-flex shrink-0 items-center gap-1 font-medium hover:underline`,
        onClick: t => f(`retryUpload`, e.id)
      }, [b(o(xe), {
        size: 12
      }), l(C(o(m)(`milestoneTool.card.retryUpload`)), 1)], 8, wt), A(`button`, {
        type: `button`,
        class: `grid size-5 shrink-0 place-items-center rounded text-muted-foreground hover:text-foreground`,
        title: o(m)(`milestoneTool.card.dismissUpload`),
        "aria-label": o(m)(`milestoneTool.card.dismissUpload`),
        onClick: t => f(`dismissUpload`, e.id)
      }, [b(o(ne), {
        size: 12
      })], 8, Tt)]))), 128))], 2)) : k(``, true)], 2)])], 8, Qe));
    }
  }),
  Dt = {
    class: `flex items-center gap-0.5 border-b border-border px-1.5 py-1`
  },
  Ot = [`title`, `aria-label`, `aria-pressed`, `onMousedown`],
  kt = {
    class: `relative`
  },
  At = [`contenteditable`, `aria-label`],
  jt = {
    key: 0,
    class: `pointer-events-none absolute left-2.5 top-2 text-sm text-muted-foreground`
  },
  Mt = y({
    __name: `MilestoneRichTextField`,
    props: T({
      placeholder: {},
      disabled: {
        type: Boolean
      }
    }, {
      modelValue: {
        required: true
      },
      modelModifiers: {}
    }),
    emits: [`update:modelValue`],
    setup(event) {
      let t = event,
        n = c(event, `modelValue`),
        {
          t: r
        } = ee(),
        i = g(null),
        l = g(true),
        p = g(new Set());
      function m() {
        let e = i.value?.innerHTML ?? ``;
        return ke(e) ? `` : e;
      }
      function y() {
        let value = i.value;
        value && m() !== n.value && (value.innerHTML = Y(Me(n.value)), l.value = ke(value.innerHTML));
      }
      function b() {
        let e = m();
        l.value = e === ``, e !== n.value && (n.value = e);
      }
      function x() {
        if (document.activeElement !== i.value) {
          p.value = new Set();
          return;
        }
        let e = new Set();
        for (let t of [`bold`, `insertUnorderedList`, `insertOrderedList`]) try {
          document.queryCommandState(t) && e.add(t);
        } catch {}
        p.value = e;
      }
      function S(e) {
        t.disabled || (i.value?.focus(), document.execCommand(e), b(), requestAnimationFrame(x));
      }
      function w(e) {
        e.preventDefault();
        let t = e.clipboardData?.getData(`text/html`);
        t ? document.execCommand(`insertHTML`, false, Y(t)) : document.execCommand(`insertText`, false, e.clipboardData?.getData(`text/plain`) ?? ``), b();
      }
      let T = [{
        command: `bold`,
        icon: P,
        label: `milestoneTool.richText.bold`
      }, {
        command: `insertUnorderedList`,
        icon: F,
        label: `milestoneTool.richText.bulletList`
      }, {
        command: `insertOrderedList`,
        icon: V,
        label: `milestoneTool.richText.orderedList`
      }];
      return E(y), f(n, y), (t, n) => (v(), u(`div`, {
        class: a([`overflow-hidden rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30`, event.disabled ? `pointer-events-none opacity-50` : ``])
      }, [A(`div`, Dt, [(v(), u(_, null, d(T, e => A(`button`, {
        key: e.command,
        type: `button`,
        class: a([`grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`, p.value.has(e.command) ? `bg-muted text-foreground` : ``]),
        title: o(r)(e.label),
        "aria-label": o(r)(e.label),
        "aria-pressed": p.value.has(e.command),
        onMousedown: j(t => S(e.command), [`prevent`])
      }, [(v(), h(s(e.icon), {
        size: 13
      }))], 42, Ot)), 64))]), A(`div`, kt, [A(`div`, {
        ref_key: `editorRef`,
        ref: i,
        contenteditable: !event.disabled,
        role: `textbox`,
        "aria-multiline": `true`,
        "aria-label": event.placeholder,
        class: `max-h-[200px] min-h-[88px] overflow-y-auto px-2.5 py-2 text-sm leading-relaxed text-foreground outline-none [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5`,
        onInput: b,
        onBlur: x,
        onFocus: x,
        onKeyup: x,
        onMouseup: x,
        onPaste: w
      }, null, 40, At), l.value && event.placeholder ? (v(), u(`span`, jt, C(event.placeholder), 1)) : k(``, true)])], 2));
    }
  }),
  Nt = {
    class: `flex items-center gap-2 px-4 pt-3`
  },
  Pt = {
    class: `flex h-8 min-w-0 flex-1 items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 text-muted-foreground focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30`
  },
  Ft = [`placeholder`],
  It = [`aria-label`],
  Lt = {
    key: 0,
    class: `mx-4 mt-2.5 flex items-center gap-2 rounded-lg bg-destructive/5 px-2.5 py-2 text-xs text-destructive`
  },
  Rt = {
    class: `min-w-0 flex-1`
  },
  zt = [`aria-pressed`, `onClick`],
  Bt = {
    class: `min-w-0 flex-1`
  },
  Vt = {
    class: `mt-0.5 block truncate text-xs text-muted-foreground`
  },
  Ht = {
    key: 0,
    class: `flex items-center justify-center gap-1.5 py-6 text-xs text-muted-foreground`
  },
  Ut = {
    key: 1,
    class: `py-10 text-center text-xs text-muted-foreground`
  },
  Wt = {
    class: `text-xs text-muted-foreground`
  },
  Gt = {
    class: `flex items-center gap-2`
  },
  Kt = y({
    __name: `MilestoneTodoPicker`,
    props: T({
      selected: {}
    }, {
      open: {
        type: Boolean,
        required: true
      },
      openModifiers: {}
    }),
    emits: T([`confirm`], [`update:open`]),
    setup(event, {
      emit: t
    }) {
      let n = event,
        i = c(event, `open`),
        s = t,
        {
          t: y
        } = ee(),
        x = g(new Map()),
        S = g([]),
        w = g(false),
        T = g(``),
        E = g(``),
        O = g(``),
        j = g(`open`),
        M = g(1),
        N = g(false),
        P = 0,
        F = null,
        I = D(() => [{
          value: `open`,
          label: y(`milestoneTool.todoPicker.filters.open`)
        }, {
          value: `in_progress`,
          label: y(`milestoneTool.todoPicker.filters.inProgress`)
        }, {
          value: `done`,
          label: y(`milestoneTool.todoPicker.filters.done`)
        }, {
          value: `archived`,
          label: y(`milestoneTool.todoPicker.filters.archived`)
        }, {
          value: `all`,
          label: y(`milestoneTool.todoPicker.filters.all`)
        }]);
      function R(e) {
        return e.status === `done` ? y(`milestoneTool.todoPicker.todoStatus.done`) : e.status === `in-progress` ? y(`milestoneTool.todoPicker.todoStatus.inProgress`) : e.status === `overdue` ? y(`milestoneTool.todoPicker.todoStatus.overdue`) : y(`milestoneTool.todoPicker.todoStatus.todo`);
      }
      function z(e) {
        return [R(e), e.project || e.assignee.remark || e.assignee.nickname, e.dueDate, e.archived ? y(`milestoneTool.card.archived`) : ``].filter(Boolean).join(` · `);
      }
      async function B(e = false) {
        if (e && (w.value || !N.value)) return;
        let t = ++P,
          n = e ? M.value + 1 : 1;
        w.value = true, T.value = ``;
        try {
          let r = await Q.todoOptions({
            keyword: O.value.trim(),
            status: j.value,
            page: n
          });
          if (t !== P) return;
          S.value = e ? [...S.value, ...r.items] : r.items, M.value = n, N.value = r.hasMore;
        } catch (e) {
          if (t !== P) return;
          T.value = e instanceof Error ? e.message : y(`milestoneTool.errors.generic`);
        } finally {
          t === P && (w.value = false);
        }
      }
      function V() {
        F !== null && window.clearTimeout(F), F = window.setTimeout(() => {
          F = null, B();
        }, 300);
      }
      function H(e) {
        typeof e == `string` && e !== j.value && (j.value = e, B());
      }
      function ie() {
        O.value = ``, B();
      }
      function U(e) {
        let currentTarget = e.currentTarget;
        currentTarget.scrollHeight - currentTarget.scrollTop - currentTarget.clientHeight <= 80 && B(true);
      }
      function W(e) {
        let t = new Map(x.value);
        if (E.value = ``, t.has(e.id)) t.delete(e.id);else if (t.size >= 100) {
          E.value = y(`milestoneTool.todoPicker.limit`, {
            count: 100
          });
          return;
        } else t.set(e.id, e);
        x.value = t;
      }
      function ae() {
        s(`confirm`, [...x.value.values()]), i.value = false;
      }
      return f(i, e => {
        if (!e) {
          F !== null && window.clearTimeout(F), F = null, P += 1;
          return;
        }
        x.value = new Map(n.selected.map(item => [item.id, item])), O.value = ``, j.value = `open`, S.value = [], E.value = ``, B();
      }), (e, t) => (v(), h(o(oe), {
        open: i.value,
        "onUpdate:open": t[3] ||= e => i.value = e
      }, {
        default: p(() => [b(o(se), {
          class: `flex max-h-[min(640px,calc(100vh-48px))] flex-col gap-0 overflow-hidden p-0 sm:max-w-[520px]`
        }, {
          default: p(() => [b(o(G), {
            class: `border-b border-border px-5 py-3.5 pr-12`
          }, {
            default: p(() => [b(o(le), {
              class: `text-base font-semibold`
            }, {
              default: p(() => [l(C(o(y)(`milestoneTool.todoPicker.title`)), 1)]),
              _: 1
            }), b(o(Be), {
              class: `sr-only`
            }, {
              default: p(() => [l(C(o(y)(`milestoneTool.todoPicker.search`)), 1)]),
              _: 1
            })]),
            _: 1
          }), A(`div`, Nt, [A(`label`, Pt, [b(o(Ne), {
            size: 14,
            class: `shrink-0`
          }), m(A(`input`, {
            "onUpdate:modelValue": t[0] ||= e => O.value = e,
            type: `text`,
            class: `min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground`,
            placeholder: o(y)(`milestoneTool.todoPicker.search`),
            onInput: V
          }, null, 40, Ft), [[te, O.value]]), O.value ? (v(), u(`button`, {
            key: 0,
            type: `button`,
            class: `grid size-5 place-items-center rounded text-muted-foreground hover:text-foreground`,
            "aria-label": o(y)(`milestoneTool.clearSearch`),
            onClick: ie
          }, [b(o(ne), {
            size: 13
          })], 8, It)) : k(``, true)]), b(o(Ye), {
            "model-value": j.value,
            "onUpdate:modelValue": H
          }, {
            default: p(() => [b(o(qe), {
              class: `w-[108px] shrink-0 text-xs`,
              "aria-label": o(y)(`milestoneTool.todoPicker.statusFilter`)
            }, {
              default: p(() => [b(o(Ie))]),
              _: 1
            }, 8, [`aria-label`]), b(o(Le), {
              position: `popper`,
              align: `end`
            }, {
              default: p(() => [(v(true), u(_, null, d(I.value, state => (v(), h(o(Xe), {
                key: state.value,
                value: state.value,
                class: `text-xs`
              }, {
                default: p(() => [l(C(state.label), 1)]),
                _: 2
              }, 1032, [`value`]))), 128))]),
              _: 1
            })]),
            _: 1
          }, 8, [`model-value`])]), T.value || E.value ? (v(), u(`div`, Lt, [b(o(Ke), {
            size: 14,
            class: `shrink-0`
          }), A(`span`, Rt, C(T.value || E.value), 1), T.value ? (v(), u(`button`, {
            key: 0,
            type: `button`,
            class: `shrink-0 font-medium hover:underline`,
            onClick: t[1] ||= e => B()
          }, C(o(y)(`milestoneTool.retry`)), 1)) : k(``, true)])) : k(``, true), A(`div`, {
            class: `mt-2 min-h-[240px] flex-1 overflow-y-auto px-2 pb-2`,
            onScrollPassive: U
          }, [(v(true), u(_, null, d(S.value, e => (v(), u(`button`, {
            key: e.id,
            type: `button`,
            class: `flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted`,
            "aria-pressed": x.value.has(e.id),
            onClick: t => W(e)
          }, [A(`span`, {
            class: a([`mt-0.5 grid size-4 shrink-0 place-items-center rounded-[5px] border transition-colors`, x.value.has(e.id) ? `border-primary bg-primary text-primary-foreground` : `border-muted-foreground/40`])
          }, [x.value.has(e.id) ? (v(), h(o(L), {
            key: 0,
            size: 11
          })) : k(``, true)], 2), A(`span`, Bt, [A(`span`, {
            class: a([`block text-sm leading-snug`, e.status === `done` ? `text-muted-foreground line-through` : `text-foreground`])
          }, C(e.title), 3), A(`span`, Vt, C(z(e)), 1)])], 8, zt))), 128)), w.value ? (v(), u(`div`, Ht, [b(o(re), {
            class: `animate-spin`,
            size: 14
          }), l(C(o(y)(`milestoneTool.loading`)), 1)])) : !S.value.length && !T.value ? (v(), u(`p`, Ut, C(o(y)(`milestoneTool.todoPicker.empty`)), 1)) : k(``, true)], 32), b(o(ce), {
            class: `m-0 flex-row items-center justify-between rounded-none px-5 py-3 sm:justify-between`
          }, {
            default: p(() => [A(`span`, Wt, C(o(y)(`milestoneTool.todoPicker.selected`, {
              count: x.value.size
            })), 1), A(`div`, Gt, [b(o(r), {
              variant: `outline`,
              size: `sm`,
              onClick: t[2] ||= e => i.value = false
            }, {
              default: p(() => [l(C(o(y)(`milestoneTool.todoPicker.cancel`)), 1)]),
              _: 1
            }), b(o(r), {
              size: `sm`,
              class: `min-w-16`,
              onClick: ae
            }, {
              default: p(() => [l(C(o(y)(`milestoneTool.todoPicker.confirm`)), 1)]),
              _: 1
            })])]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`]));
    }
  }),
  qt = {
    key: 0,
    class: `flex min-h-[320px] flex-1 items-center justify-center gap-2 text-xs text-muted-foreground`
  },
  Jt = {
    key: 1,
    class: `flex min-h-[320px] flex-1 flex-col items-center justify-center gap-3 px-8 text-center`
  },
  Yt = {
    class: `text-sm text-muted-foreground`
  },
  Xt = {
    key: 2,
    class: `min-h-0 flex-1 overflow-y-auto px-5 py-4`
  },
  Zt = {
    key: 0,
    class: `mb-3.5 flex items-start gap-2 rounded-lg bg-destructive/5 px-3 py-2 text-xs leading-relaxed text-destructive`
  },
  Qt = {
    class: `min-w-0 flex-1`
  },
  $t = {
    class: `block`
  },
  en = {
    class: `mb-1.5 flex items-center justify-between text-xs font-medium text-foreground`
  },
  tn = {
    key: 0,
    class: `font-normal tabular-nums text-muted-foreground`
  },
  nn = {
    class: `mt-4`
  },
  rn = {
    class: `mb-1.5 block text-xs font-medium text-foreground`
  },
  an = {
    class: `flex flex-wrap items-center gap-2`
  },
  on = {
    key: 2,
    class: `text-xs text-muted-foreground`
  },
  sn = {
    class: `mt-1.5 flex flex-wrap gap-1`
  },
  cn = [`onClick`],
  ln = {
    class: `mt-4`
  },
  un = {
    class: `mb-1.5 block text-xs font-medium text-foreground`
  },
  dn = {
    class: `mt-4`
  },
  fn = {
    class: `flex items-center justify-between gap-3`
  },
  pn = {
    class: `text-xs font-medium text-foreground`
  },
  mn = {
    key: 0,
    class: `ml-1 font-normal text-muted-foreground`
  },
  hn = {
    key: 0,
    class: `mt-2 max-h-[176px] overflow-y-auto rounded-lg border border-border`
  },
  gn = [`title`, `aria-label`, `onClick`],
  _n = {
    key: 1,
    class: `mt-1.5 text-xs text-muted-foreground`
  },
  vn = {
    class: `mt-4`
  },
  yn = {
    class: `flex items-center justify-between gap-3`
  },
  bn = {
    class: `text-xs font-medium text-foreground`
  },
  xn = {
    class: `ml-1 font-normal tabular-nums text-muted-foreground`
  },
  Sn = [`accept`],
  Cn = {
    key: 0,
    class: `mt-2 space-y-1.5`
  },
  wn = {
    class: `grid size-7 shrink-0 place-items-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground`
  },
  Tn = {
    class: `min-w-0 flex-1`
  },
  En = {
    class: `block text-xs text-muted-foreground`
  },
  Dn = [`title`, `aria-label`, `onClick`],
  On = [`title`, `aria-label`, `onClick`],
  kn = {
    class: `grid size-7 shrink-0 place-items-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground`
  },
  An = {
    class: `min-w-0 flex-1`
  },
  jn = {
    class: `block truncate text-sm text-foreground`
  },
  Mn = [`title`, `aria-label`, `onClick`],
  Nn = {
    class: `grid size-7 shrink-0 place-items-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground`
  },
  Pn = {
    class: `min-w-0 flex-1`
  },
  Fn = {
    class: `block truncate text-sm text-foreground`
  },
  In = [`title`, `aria-label`, `onClick`],
  Ln = {
    key: 1
  },
  Rn = {
    class: `flex items-center gap-2`
  },
  zn = y({
    __name: `MilestoneEditorDialog`,
    props: T({
      milestoneId: {},
      user: {},
      config: {},
      uploads: {}
    }, {
      open: {
        type: Boolean,
        required: true
      },
      openModifiers: {}
    }),
    emits: T([`saved`, `delete`, `download`, `cancelUpload`], [`update:open`]),
    setup(options, {
      emit: s
    }) {
      let m = options,
        y = c(options, `open`),
        x = s,
        {
          t: S,
          locale: T
        } = ee(),
        E = g(null),
        te = g(null),
        j = g(null),
        M = g(false),
        N = g(``),
        P = g(false),
        F = g(``),
        I = g(false),
        L = g(false),
        R = g(false),
        B = g(false),
        V = O({
          title: ``,
          content: ``,
          date: ``,
          time: ``
        }),
        H = g([]),
        ie = g([]),
        U = g(new Set()),
        W = g([]),
        ae = ``,
        ve = 0,
        ye = D(() => m.milestoneId !== null),
        q = D(() => !!window.electronAPI?.todos?.readPendingClipboardAttachment),
        Se = typeof navigator < `u` && /mac/i.test(navigator.platform) ? `⌘↵` : `Ctrl+Enter`,
        we = D(() => H.value.filter(item => item.status === `done`).length),
        Y = D(() => ie.value.filter(item => !U.value.has(item.id)).length + m.uploads.filter(item => item.status !== `failed`).length + W.value.filter(item => !item.error).length),
        Te = D(() => Y.value >= m.config.attachmentLimit),
        De = D(() => Array.from(V.title).length > 400),
        Oe = D(() => {
          let e = X();
          return [{
            label: S(`milestoneTool.editor.quickToday`),
            value: e
          }, {
            label: S(`milestoneTool.editor.quickTomorrow`),
            value: Ze(e, {
              days: 1
            })
          }, {
            label: S(`milestoneTool.editor.quickNextWeek`),
            value: Ze(e, {
              days: 7
            })
          }, {
            label: S(`milestoneTool.editor.quickNextMonth`),
            value: Ze(e, {
              months: 1
            })
          }];
        }),
        ke = D(() => {
          if (!V.date) return ``;
          let {
              weekday: e
            } = He(V.date, T.value),
            t = Z(X(), V.date);
          return t === 0 ? `${e} · ${S(`milestoneTool.relative.today`)}` : t === 1 ? `${e} · ${S(`milestoneTool.relative.tomorrow`)}` : t > 1 ? `${e} · ${S(`milestoneTool.relative.daysLeft`, {
            days: t
          })}` : e;
        });
      function Me() {
        return JSON.stringify({
          ...V,
          todoIds: H.value.map(item => item.id),
          removed: [...U.value],
          files: W.value.length
        });
      }
      let Ne = D(() => Me() !== ae);
      function Ie(e) {
        return e instanceof Error && e.message ? e.message : S(`milestoneTool.errors.generic`);
      }
      function Le() {
        Object.assign(V, {
          title: ``,
          content: ``,
          date: X(),
          time: ``
        }), H.value = [], ie.value = [], U.value = new Set(), W.value = [], j.value = null, F.value = ``, I.value = false, N.value = ``;
      }
      function Re(e) {
        j.value = e, Object.assign(V, {
          title: e.title,
          content: e.content || ``,
          date: e.date,
          time: K(e.time)
        }), H.value = [...e.todos], ie.value = [...e.attachments], U.value = new Set(), ae = Me();
      }
      async function Ue() {
        if (m.milestoneId === null) return;
        let e = ++ve;
        M.value = true, N.value = ``, F.value = ``, I.value = false;
        try {
          let t = await Q.get(m.milestoneId, X());
          if (e !== ve) return;
          Re(t), M.value = false, await w(), We();
        } catch (t) {
          e === ve && (N.value = S(`milestoneTool.editor.loadFailed`, {
            message: Ie(t)
          }));
        } finally {
          e === ve && (M.value = false);
        }
      }
      function We() {
        let e = E.value?.$el;
        e instanceof HTMLInputElement && e.focus();
      }
      f(y, e => {
        ve += 1, L.value = false, R.value = false, e && (Le(), ae = Me(), m.milestoneId !== null && Ue());
      });
      function qe() {
        if (!P.value) {
          if (Ne.value && !M.value && !N.value) {
            R.value = true;
            return;
          }
          y.value = false;
        }
      }
      function Je(e) {
        e || qe();
      }
      function Ye() {
        R.value = false, y.value = false;
      }
      function Xe(e) {
        H.value = H.value.filter(item => item.id !== e);
      }
      function Qe(e) {
        F.value = ``;
        let t = 0,
          n = [...W.value],
          value = Y.value;
        for (let i of e) {
          let e = ``;
          if (Ve(i.name) ? i.size > m.config.attachmentMaxBytes && (e = S(`milestoneTool.errors.fileTooLarge`, {
            size: Ae(m.config.attachmentMaxBytes)
          })) : e = S(`milestoneTool.errors.fileType`), !e && value >= m.config.attachmentLimit) {
            t += 1;
            continue;
          }
          e || (value += 1), n.push({
            id: crypto.randomUUID(),
            file: i,
            error: e
          });
        }
        W.value = n, t && (F.value = S(`milestoneTool.errors.fileLimit`, {
          count: m.config.attachmentLimit,
          skipped: t
        }));
      }
      function $e(event) {
        let target = event.target;
        Qe(Array.from(target.files || [])), target.value = ``;
      }
      function et(e) {
        W.value = W.value.filter(item => item.id !== e);
      }
      function tt(e) {
        let t = new Set(U.value);
        t.has(e) ? t.delete(e) : t.add(e), U.value = t;
      }
      async function nt() {
        if (B.value || !q.value) return;
        B.value = true, F.value = ``;
        let e = ``;
        try {
          let pendingClipboardAttachment = await Ee.readPendingClipboardAttachment();
          if (e = pendingClipboardAttachment.token, !pendingClipboardAttachment.contentBase64) throw Error(S(`milestoneTool.editor.pasteHint`));
          let n = atob(pendingClipboardAttachment.contentBase64),
            r = new Uint8Array(n.length);
          for (let e = 0; e < n.length; e += 1) r[e] = n.charCodeAt(e);
          let i = pendingClipboardAttachment.mimeType || `application/octet-stream`;
          Qe([new File([r], pendingClipboardAttachment.name, {
            type: i
          })]);
        } catch (e) {
          F.value = Ie(e);
        } finally {
          e && (await Ee.clearPendingAttachment(e).catch(() => {})), B.value = false;
        }
      }
      function rt(e) {
        return e.status === `failed` ? e.error : e.status === `queued` ? S(`milestoneTool.editor.queuedFile`) : S(`milestoneTool.editor.uploadingFile`, {
          percent: e.progress
        });
      }
      async function it() {
        if (P.value || M.value || N.value) return;
        if (!m.user) {
          F.value = S(`milestoneTool.errors.signInExpired`);
          return;
        }
        F.value = ``, I.value = false;
        let e = V.title.trim();
        if (!e) {
          F.value = S(`milestoneTool.errors.titleRequired`), We();
          return;
        }
        if (!V.date) {
          F.value = S(`milestoneTool.errors.dateRequired`);
          return;
        }
        if (V.content.length > 2e4) {
          F.value = S(`milestoneTool.errors.contentTooLong`);
          return;
        }
        if (H.value.length > 100) {
          F.value = S(`milestoneTool.errors.todoLimit`, {
            count: 100
          });
          return;
        }
        if (Y.value > m.config.attachmentLimit) {
          F.value = S(`milestoneTool.errors.attachmentCountExceeded`, {
            count: m.config.attachmentLimit
          });
          return;
        }
        P.value = true;
        try {
          let csrfToken = m.user.csrfToken,
            n = X(),
            r = {
              id: j.value?.id,
              version: j.value?.version,
              title: e,
              content: V.content,
              date: V.date,
              time: V.time,
              todoIds: H.value.map(item => item.id)
            },
            i = j.value ? await Q.update(csrfToken, r, n) : await Q.create(csrfToken, r, n),
            a = [];
          for (let e of U.value) try {
            await Q.attachmentDelete(csrfToken, e);
          } catch (e) {
            a.push(Ie(e));
          }
          x(`saved`, {
            item: i,
            files: W.value.filter(item => !item.error).map(item => item.file),
            isNew: !j.value,
            warning: a.length ? S(`milestoneTool.errors.attachmentDeleteFailed`, {
              message: a[0]
            }) : ``
          }), y.value = false;
        } catch (e) {
          I.value = J(e) === `MILESTONE_VERSION_CONFLICT`, F.value = I.value ? S(`milestoneTool.editor.conflict`) : Ie(e);
        } finally {
          P.value = false;
        }
      }
      function at(event) {
        event.key === `Enter` && (event.metaKey || event.ctrlKey) && !event.isComposing && (event.preventDefault(), it());
      }
      function ot(event) {
        Ne.value && (event.preventDefault(), P.value || (R.value = true));
      }
      function st() {
        j.value && !P.value && x(`delete`, j.value);
      }
      return (s, c) => (v(), u(_, null, [b(o(oe), {
        open: y.value,
        "onUpdate:open": Je
      }, {
        default: p(() => [b(o(se), {
          class: `flex max-h-[min(700px,calc(100vh-48px))] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px]`,
          onKeydown: at,
          onInteractOutside: ot
        }, {
          default: p(() => [b(o(G), {
            class: `border-b border-border px-5 py-3.5 pr-12`
          }, {
            default: p(() => [b(o(le), {
              class: `text-base font-semibold`
            }, {
              default: p(() => [l(C(ye.value ? o(S)(`milestoneTool.editor.editTitle`) : o(S)(`milestoneTool.editor.newTitle`)), 1)]),
              _: 1
            }), b(o(Be), {
              class: `sr-only`
            }, {
              default: p(() => [l(C(o(S)(`milestoneTool.editor.description`)), 1)]),
              _: 1
            })]),
            _: 1
          }), M.value ? (v(), u(`div`, qt, [b(o(re), {
            class: `animate-spin`,
            size: 16
          }), l(C(o(S)(`milestoneTool.loading`)), 1)])) : N.value ? (v(), u(`div`, Jt, [A(`p`, Yt, C(N.value), 1), b(o(r), {
            variant: `outline`,
            size: `sm`,
            onClick: Ue
          }, {
            default: p(() => [b(o(xe)), l(C(o(S)(`milestoneTool.retry`)), 1)]),
            _: 1
          })])) : (v(), u(`div`, Xt, [F.value ? (v(), u(`div`, Zt, [b(o(Ke), {
            size: 14,
            class: `mt-px shrink-0`
          }), A(`span`, Qt, C(F.value), 1), I.value ? (v(), u(`button`, {
            key: 0,
            type: `button`,
            class: `shrink-0 font-medium hover:underline`,
            onClick: Ue
          }, C(o(S)(`milestoneTool.editor.reload`)), 1)) : k(``, true)])) : k(``, true), A(`label`, $t, [A(`span`, en, [A(`span`, null, [l(C(o(S)(`milestoneTool.editor.title`)) + ` `, 1), c[11] ||= A(`em`, {
            class: `not-italic text-destructive`
          }, `*`, -1)]), De.value ? (v(), u(`span`, tn, C(Array.from(V.title).length) + `/` + C(o(500)), 1)) : k(``, true)]), b(o(Ge), {
            ref_key: `titleInput`,
            ref: E,
            modelValue: V.title,
            "onUpdate:modelValue": c[0] ||= e => V.title = e,
            maxlength: o(500),
            placeholder: o(S)(`milestoneTool.editor.titlePlaceholder`),
            class: `text-sm`
          }, null, 8, [`modelValue`, `maxlength`, `placeholder`])]), A(`div`, nn, [A(`span`, rn, [l(C(o(S)(`milestoneTool.editor.date`)) + ` `, 1), c[12] ||= A(`em`, {
            class: `not-italic text-destructive`
          }, `*`, -1)]), A(`div`, an, [b(ze, {
            modelValue: V.date,
            "onUpdate:modelValue": c[1] ||= e => V.date = e,
            label: o(S)(`milestoneTool.editor.date`),
            mode: `date`,
            "value-format": `date`,
            align: `start`,
            "show-quick-dates": false,
            "trigger-class": `!h-8 !w-[136px] !text-sm`
          }, null, 8, [`modelValue`, `label`]), V.time ? (v(), u(_, {
            key: 0
          }, [b(ze, {
            modelValue: V.time,
            "onUpdate:modelValue": c[2] ||= e => V.time = e,
            label: o(S)(`milestoneTool.editor.time`),
            mode: `time`,
            precision: `minute`,
            "value-format": `time`,
            align: `start`,
            "trigger-class": `!h-8 !w-[88px] !text-sm`
          }, null, 8, [`modelValue`, `label`]), b(o(r), {
            variant: `ghost`,
            size: `icon-sm`,
            class: `text-muted-foreground`,
            title: o(S)(`milestoneTool.editor.clearTime`),
            "aria-label": o(S)(`milestoneTool.editor.clearTime`),
            onClick: c[3] ||= e => V.time = ``
          }, {
            default: p(() => [b(o(ne))]),
            _: 1
          }, 8, [`title`, `aria-label`])], 64)) : (v(), h(o(r), {
            key: 1,
            variant: `ghost`,
            size: `sm`,
            class: `text-xs text-muted-foreground`,
            onClick: c[4] ||= e => V.time = `09:00`
          }, {
            default: p(() => [b(o(je)), l(C(o(S)(`milestoneTool.editor.addTime`)), 1)]),
            _: 1
          })), ke.value ? (v(), u(`span`, on, C(ke.value), 1)) : k(``, true)]), A(`div`, sn, [(v(true), u(_, null, d(Oe.value, state => (v(), u(`button`, {
            key: state.label,
            type: `button`,
            class: a([`h-6 rounded-md px-2 text-xs transition-colors`, V.date === state.value ? `bg-primary/10 font-medium text-primary` : `text-muted-foreground hover:bg-muted hover:text-foreground`]),
            onClick: t => V.date = state.value
          }, C(state.label), 11, cn))), 128))])]), A(`div`, ln, [A(`span`, un, C(o(S)(`milestoneTool.editor.content`)), 1), b(Mt, {
            modelValue: V.content,
            "onUpdate:modelValue": c[5] ||= e => V.content = e,
            placeholder: o(S)(`milestoneTool.editor.contentPlaceholder`)
          }, null, 8, [`modelValue`, `placeholder`])]), A(`section`, dn, [A(`div`, fn, [A(`span`, pn, [l(C(o(S)(`milestoneTool.editor.todos`)) + ` `, 1), H.value.length ? (v(), u(`span`, mn, C(o(S)(`milestoneTool.editor.todoSummary`, {
            done: we.value,
            total: H.value.length
          })), 1)) : k(``, true)]), b(o(r), {
            variant: `outline`,
            size: `xs`,
            onClick: c[6] ||= e => L.value = true
          }, {
            default: p(() => [b(o(e)), l(C(o(S)(`milestoneTool.editor.chooseTodos`)), 1)]),
            _: 1
          })]), H.value.length ? (v(), u(`ul`, hn, [(v(true), u(_, null, d(H.value, e => (v(), u(`li`, {
            key: e.id,
            class: `flex items-center gap-2 border-b border-border px-2.5 py-1.5 last:border-b-0`
          }, [e.status === `done` ? (v(), h(o(Fe), {
            key: 0,
            size: 15,
            class: `shrink-0 text-primary`
          })) : (v(), h(o(n), {
            key: 1,
            size: 15,
            class: `shrink-0 text-muted-foreground/60`
          })), A(`span`, {
            class: a([`min-w-0 flex-1 truncate text-sm`, e.status === `done` ? `text-muted-foreground line-through` : `text-foreground`])
          }, C(e.title), 3), A(`button`, {
            type: `button`,
            class: `grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: o(S)(`milestoneTool.editor.removeTodo`),
            "aria-label": o(S)(`milestoneTool.editor.removeTodo`),
            onClick: t => Xe(e.id)
          }, [b(o(ne), {
            size: 13
          })], 8, gn)]))), 128))])) : (v(), u(`p`, _n, C(o(S)(`milestoneTool.editor.noTodos`)), 1))]), A(`section`, vn, [A(`div`, yn, [A(`span`, bn, [l(C(o(S)(`milestoneTool.editor.attachments`)) + ` `, 1), A(`span`, xn, C(Y.value) + `/` + C(options.config.attachmentLimit), 1)]), b(o(r), {
            variant: `ghost`,
            size: `xs`,
            class: `text-muted-foreground`,
            disabled: B.value || !q.value || Te.value,
            title: q.value ? o(S)(`milestoneTool.editor.pasteHint`) : o(S)(`milestoneTool.editor.pasteUnavailable`),
            onClick: nt
          }, {
            default: p(() => [B.value ? (v(), h(o(re), {
              key: 0,
              class: `animate-spin`
            })) : (v(), h(o(be), {
              key: 1
            })), l(` ` + C(B.value ? o(S)(`milestoneTool.editor.pasting`) : o(S)(`milestoneTool.editor.paste`)), 1)]),
            _: 1
          }, 8, [`disabled`, `title`])]), A(`input`, {
            ref_key: `fileInput`,
            ref: te,
            type: `file`,
            multiple: ``,
            hidden: ``,
            accept: o(Pe),
            onChange: $e
          }, null, 40, Sn), b($, {
            class: `mt-2`,
            title: o(S)(`milestoneTool.editor.dropTitle`),
            hint: o(S)(`milestoneTool.editor.dropHint`, {
              count: options.config.attachmentLimit,
              size: o(Ae)(options.config.attachmentMaxBytes)
            }),
            disabled: Te.value,
            onSelect: c[7] ||= e => te.value?.click(),
            onDrop: Qe
          }, null, 8, [`title`, `hint`, `disabled`]), ie.value.length || options.uploads.length || W.value.length ? (v(), u(`ul`, Cn, [(v(true), u(_, null, d(ie.value, e => (v(), u(`li`, {
            key: `saved-${e.id}`,
            class: `flex items-center gap-2 rounded-lg border border-border px-2 py-1.5`
          }, [A(`span`, wn, C(o(Ce)(e.name)), 1), A(`span`, Tn, [A(`span`, {
            class: a([`block truncate text-sm`, U.value.has(e.id) ? `text-muted-foreground line-through` : `text-foreground`])
          }, C(e.name), 3), A(`span`, En, C(U.value.has(e.id) ? o(S)(`milestoneTool.editor.removeOnSave`) : o(Ae)(e.size)), 1)]), U.value.has(e.id) ? (v(), h(o(r), {
            key: 0,
            variant: `ghost`,
            size: `xs`,
            class: `text-muted-foreground`,
            onClick: t => tt(e.id)
          }, {
            default: p(() => [b(o(xe)), l(C(o(S)(`milestoneTool.editor.undo`)), 1)]),
            _: 1
          }, 8, [`onClick`])) : (v(), u(_, {
            key: 1
          }, [A(`button`, {
            type: `button`,
            class: `grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: o(S)(`milestoneTool.card.download`),
            "aria-label": o(S)(`milestoneTool.card.download`),
            onClick: t => x(`download`, e)
          }, [b(o(z), {
            size: 14
          })], 8, Dn), A(`button`, {
            type: `button`,
            class: `grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive`,
            title: o(S)(`milestoneTool.editor.removeFile`),
            "aria-label": o(S)(`milestoneTool.editor.removeFile`),
            onClick: t => tt(e.id)
          }, [b(o(i), {
            size: 14
          })], 8, On)], 64))]))), 128)), (v(true), u(_, null, d(options.uploads, e => (v(), u(`li`, {
            key: e.id,
            class: `flex items-center gap-2 rounded-lg border border-border px-2 py-1.5`
          }, [A(`span`, kn, C(o(Ce)(e.file.name)), 1), A(`span`, An, [A(`span`, jn, C(e.file.name), 1), A(`span`, {
            class: a([`block truncate text-xs`, e.status === `failed` ? `text-destructive` : `text-muted-foreground`])
          }, C(rt(e)), 3)]), A(`button`, {
            type: `button`,
            class: `grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: o(S)(`milestoneTool.card.cancelUpload`),
            "aria-label": o(S)(`milestoneTool.card.cancelUpload`),
            onClick: t => x(`cancelUpload`, e.id)
          }, [b(o(ne), {
            size: 14
          })], 8, Mn)]))), 128)), (v(true), u(_, null, d(W.value, e => (v(), u(`li`, {
            key: e.id,
            class: a([`flex items-center gap-2 rounded-lg border px-2 py-1.5`, e.error ? `border-destructive/30 bg-destructive/5` : `border-border`])
          }, [A(`span`, Nn, C(o(Ce)(e.file.name)), 1), A(`span`, Pn, [A(`span`, Fn, C(e.file.name), 1), A(`span`, {
            class: a([`block truncate text-xs`, e.error ? `text-destructive` : `text-muted-foreground`])
          }, C(e.error || `${o(Ae)(e.file.size)} · ${o(S)(`milestoneTool.editor.waitingUpload`)}`), 3)]), A(`button`, {
            type: `button`,
            class: `grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: o(S)(`milestoneTool.editor.removePending`),
            "aria-label": o(S)(`milestoneTool.editor.removePending`),
            onClick: t => et(e.id)
          }, [b(o(ne), {
            size: 14
          })], 8, In)], 2))), 128))])) : k(``, true)])])), b(o(ce), {
            class: `m-0 flex-row items-center justify-between rounded-none px-5 py-3 sm:justify-between`
          }, {
            default: p(() => [ye.value && j.value ? (v(), h(o(r), {
              key: 0,
              variant: `ghost`,
              size: `sm`,
              class: `text-destructive hover:bg-destructive/10 hover:text-destructive`,
              disabled: P.value,
              onClick: st
            }, {
              default: p(() => [b(o(i)), l(C(o(S)(`milestoneTool.editor.delete`)), 1)]),
              _: 1
            }, 8, [`disabled`])) : (v(), u(`span`, Ln)), A(`div`, Rn, [b(o(r), {
              variant: `outline`,
              size: `sm`,
              disabled: P.value,
              onClick: qe
            }, {
              default: p(() => [l(C(o(S)(`milestoneTool.editor.cancel`)), 1)]),
              _: 1
            }, 8, [`disabled`]), b(o(r), {
              size: `sm`,
              class: `min-w-16`,
              disabled: P.value || M.value || !!N.value,
              title: o(S)(`milestoneTool.editor.saveShortcut`, {
                shortcut: o(Se)
              }),
              onClick: it
            }, {
              default: p(() => [P.value ? (v(), h(o(re), {
                key: 0,
                class: `animate-spin`
              })) : k(``, true), l(` ` + C(P.value ? o(S)(`milestoneTool.editor.saving`) : o(S)(`milestoneTool.editor.save`)), 1)]),
              _: 1
            }, 8, [`disabled`, `title`])])]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`]), b(Kt, {
        open: L.value,
        "onUpdate:open": c[8] ||= e => L.value = e,
        selected: H.value,
        onConfirm: c[9] ||= e => H.value = e
      }, null, 8, [`open`, `selected`]), b(o(de), {
        open: R.value,
        "onUpdate:open": c[10] ||= e => R.value = e
      }, {
        default: p(() => [b(o(ue), {
          size: `sm`
        }, {
          default: p(() => [b(o(pe), null, {
            default: p(() => [b(o(_e), null, {
              default: p(() => [l(C(o(S)(`milestoneTool.editor.discardTitle`)), 1)]),
              _: 1
            }), b(o(fe), null, {
              default: p(() => [l(C(o(S)(`milestoneTool.editor.discardText`)), 1)]),
              _: 1
            })]),
            _: 1
          }), b(o(he), null, {
            default: p(() => [b(o(me), null, {
              default: p(() => [l(C(o(S)(`milestoneTool.editor.keepEditing`)), 1)]),
              _: 1
            }), b(o(ge), {
              variant: `destructive`,
              onClick: Ye
            }, {
              default: p(() => [l(C(o(S)(`milestoneTool.editor.discard`)), 1)]),
              _: 1
            })]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`])], 64));
    }
  });
function Bn(e) {
  let t = g([]),
    n = false,
    r = D(() => t.value.some(item => item.status !== `failed`));
  function i(e) {
    t.value = t.value.filter(item => item.id !== e);
  }
  function a(e) {
    return t.value.filter(item => item.milestoneId === e);
  }
  async function o() {
    if (!n) {
      n = true;
      try {
        for (;;) {
          let n = t.value.find(item => item.status === `queued`);
          if (!n) break;
          let r = e.csrfToken();
          if (!r) {
            t.value.forEach(item => {
              item.status === `queued` && (item.status = `failed`, item.error = e.errorMessage(null));
            });
            break;
          }
          n.status = `uploading`, n.progress = 0, n.error = ``;
          try {
            await Q.uploadFile(r, n.milestoneId, n.file, e => {
              n.progress = e;
            }, () => n.cancelRequested), i(n.id), e.onUploaded(n.milestoneId);
          } catch (t) {
            n.cancelRequested || J(t) === `UPLOAD_CANCELLED` ? i(n.id) : (n.status = `failed`, n.error = e.errorMessage(t));
          }
        }
      } finally {
        n = false;
      }
    }
  }
  function s(e, items) {
    items.length && (t.value = [...t.value, ...items.map(item => ({
      id: crypto.randomUUID(),
      milestoneId: e,
      file: item,
      progress: 0,
      status: `queued`,
      error: ``,
      cancelRequested: false
    }))], o());
  }
  function c(e) {
    let n = t.value.find(item => item.id === e);
    n && (n.status === `uploading` ? n.cancelRequested = true : i(e));
  }
  function l(e) {
    let n = t.value.find(item => item.id === e);
    n && n.status === `failed` && (n.status = `queued`, n.error = ``, n.progress = 0, n.cancelRequested = false, o());
  }
  function u(e) {
    a(e).forEach(item => c(item.id));
  }
  function d() {
    t.value.forEach(item => {
      item.cancelRequested = true;
    }), t.value = t.value.filter(item => item.status === `uploading`);
  }
  return {
    tasks: t,
    busy: r,
    tasksFor: a,
    enqueue: s,
    cancel: c,
    retry: l,
    dismiss: i,
    cancelFor: u,
    cancelAll: d
  };
}
var Vn = {
    class: `relative flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground`
  },
  Hn = {
    key: 0,
    class: `flex min-h-[220px] flex-1 flex-col items-center justify-center gap-3 p-7 text-center`
  },
  Un = {
    class: `grid size-11 place-items-center rounded-[10px] bg-muted text-muted-foreground`
  },
  Wn = {
    class: `text-sm text-muted-foreground`
  },
  Gn = {
    key: 0,
    class: `mb-3 flex items-start gap-2 rounded-[10px] bg-destructive/5 px-3 py-2 text-xs leading-relaxed text-destructive`
  },
  Kn = {
    class: `min-w-0 flex-1`
  },
  qn = [`aria-label`],
  Jn = {
    key: 1,
    class: `mb-3 rounded-[10px] bg-black/[0.02] px-3 py-2 text-xs text-muted-foreground dark:bg-white/[0.03]`
  },
  Yn = {
    class: `rounded-[10px] bg-black/[0.02] p-3 dark:bg-white/[0.03]`
  },
  Xn = {
    class: `flex flex-wrap items-center gap-2`
  },
  Zn = {
    class: `tabular-nums opacity-70`
  },
  Qn = {
    class: `ml-auto flex min-w-0 items-center gap-2`
  },
  $n = {
    class: `flex h-7 w-[200px] min-w-0 items-center gap-1.5 rounded-lg border border-input bg-background px-2 text-muted-foreground transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30`
  },
  er = [`placeholder`, `aria-label`],
  tr = [`aria-label`],
  nr = {
    key: 0,
    class: `mt-2 px-1 text-xs text-muted-foreground`
  },
  rr = {
    key: 3,
    class: `flex min-h-[260px] items-center justify-center gap-2 text-xs text-muted-foreground`
  },
  ir = {
    key: 4,
    class: `flex min-h-[320px] flex-col items-center justify-center gap-2 p-7 text-center`
  },
  ar = {
    class: `mb-1 grid size-11 place-items-center rounded-[10px] bg-muted text-muted-foreground`
  },
  or = {
    class: `text-sm font-semibold text-foreground`
  },
  sr = {
    class: `mb-2 max-w-[360px] text-xs leading-relaxed text-muted-foreground`
  },
  cr = {
    key: 5,
    class: `flex min-h-[220px] flex-col items-center justify-center gap-2.5 text-center`
  },
  lr = {
    class: `text-xs text-muted-foreground`
  },
  ur = {
    key: 0,
    class: `mb-1 text-[13px] font-semibold text-foreground`
  },
  dr = {
    class: `sticky top-0 z-[2] bg-background py-1.5 text-xs font-medium text-muted-foreground`
  },
  fr = {
    key: 0,
    class: `mt-4 text-center text-xs text-muted-foreground`
  },
  pr = {
    key: 0,
    class: `absolute bottom-5 left-1/2 z-[70] flex max-w-[calc(100%-48px)] -translate-x-1/2 items-center gap-3 rounded-full bg-foreground px-4 py-2 text-xs text-background shadow-lg`,
    role: `status`
  },
  mr = {
    class: `min-w-0 truncate`
  },
  hr = 3e4,
  gr = y({
    __name: `MilestoneWorkspace`,
    props: {
      tool: {},
      user: {},
      creditsBalance: {},
      creditsPolicy: {},
      active: {
        type: Boolean
      },
      openRequest: {}
    },
    emits: [`back`, `openTodo`, `openRequestHandled`],
    setup(t, {
      expose: n,
      emit: i
    }) {
      let a = t,
        s = i,
        {
          t: c,
          locale: y
        } = ee(),
        {
          captureGrowthObservation: x
        } = ye(),
        T = g(null),
        O = g([]),
        P = g(false),
        F = g(false),
        I = g(false),
        L = g(``),
        R = g(false),
        z = g(X()),
        V = g(`all`),
        H = g(``),
        U = g(``),
        W = g(new Set()),
        ae = g(new Set()),
        oe = g(new Set()),
        se = g(null),
        G = g(Me()),
        ce = g(false),
        le = g(null),
        K = g(null),
        be = g(false),
        q = g(null),
        xe = 0,
        Se = null,
        Ce = 0,
        J = null,
        Y = null,
        Ee = null,
        De = 0,
        Oe = null,
        ke = null,
        Ae,
        je = null;
      function Me() {
        let milestoneConfig = a.tool.milestoneConfig;
        return {
          createEnabled: milestoneConfig?.createEnabled !== false,
          attachmentLimit: milestoneConfig?.attachmentLimit ?? 10,
          attachmentMaxBytes: milestoneConfig?.attachmentMaxBytes ?? 314572800,
          campaignText: milestoneConfig?.campaignText ?? ``
        };
      }
      function Pe(e) {
        return e instanceof Error && e.message ? e.message : c(`milestoneTool.errors.generic`);
      }
      let Z = Bn({
          csrfToken: () => a.user?.csrfToken ?? null,
          onUploaded: e => {
            $e(e);
          },
          errorMessage: Pe
        }),
        Fe = D(() => new Map(O.value.map(item => [item.id, Te(item, z.value)]))),
        Ie = D(() => {
          let e = {
            all: 0,
            upcoming: 0,
            overdue: 0,
            completed: 0
          };
          for (let t of Fe.value.values()) e.all += 1, we(t, `upcoming`) ? e.upcoming += 1 : t === `overdue` ? e.overdue += 1 : t === `completed` && (e.completed += 1);
          return e;
        }),
        Le = D(() => [`all`, `upcoming`, `overdue`, `completed`].map(item => ({
          value: item,
          label: c(`milestoneTool.tabs.${item}`),
          count: Ie.value[item]
        }))),
        Re = D(() => O.value.filter(item => we(Fe.value.get(item.id) ?? `planned`, V.value))),
        ze = D(() => Je(Re.value, V.value, z.value, y.value)),
        Be = D(() => {
          let e = O.value.reduce((acc, cur) => acc + cur.todoCount, 0),
            t = O.value.reduce((acc, cur) => acc + cur.completedTodoCount, 0);
          return {
            total: e,
            done: t,
            rate: e ? Math.round(t / e * 100) : 0
          };
        }),
        Ve = D(() => I.value && (O.value.length > 0 || U.value !== ``)),
        He = D(() => le.value === null ? [] : Z.tasksFor(le.value)),
        Ue = D(() => U.value ? c(`milestoneTool.empty.search`, {
          keyword: U.value
        }) : V.value === `upcoming` ? c(`milestoneTool.empty.upcoming`) : V.value === `overdue` ? c(`milestoneTool.empty.overdue`) : c(`milestoneTool.empty.completed`));
      function Ge(state, t, n) {
        let r = new Set(state.value);
        n ? r.add(t) : r.delete(t), state.value = r;
      }
      function qe(e) {
        return e.content === null && e.contentSummary !== `` || e.todoCount > e.todos.length || e.attachmentCount > e.attachments.length;
      }
      function Ye(e, t = false) {
        let n = O.value.findIndex(item => item.id === e.id);
        if (n >= 0) {
          let t = [...O.value];
          t[n] = e, O.value = t;
        } else t && (O.value = [...O.value, e]);
      }
      function Xe(e, t) {
        let n = O.value.find(item => item.id === e);
        n && Ye({
          ...n,
          ...t
        });
      }
      function Ze(items) {
        let t = new Map(O.value.map(item => [item.id, item]));
        return items.map(item => {
          let n = t.get(item.id);
          return !n || n.version !== item.version || n.content === null || !W.value.has(item.id) ? item : {
            ...item,
            content: n.content
          };
        });
      }
      function $(e = {}) {
        let t = Qe(e);
        return Se = t, t;
      }
      async function Qe(e) {
        let t = x();
        if (!a.user) return false;
        let n = ++xe,
          r = !!e.quiet;
        z.value = X(), r || (P.value = true, L.value = ``);
        try {
          let [i, o] = await Promise.all([Q.summary(z.value).catch(() => null), Q.listAll({
            keyword: U.value,
            today: z.value
          })]);
          if (n !== xe) return false;
          i?.config && (G.value = {
            createEnabled: i.config.createEnabled !== false,
            attachmentLimit: i.config.attachmentLimit,
            attachmentMaxBytes: i.config.attachmentMaxBytes,
            campaignText: i.config.campaignText || ``
          }), O.value = Ze(o.items), R.value = o.truncated;
          let s = new Set(o.items.map(item => item.id));
          W.value = new Set([...W.value].filter(item => s.has(item)));
          for (let e of O.value) W.value.has(e.id) && qe(e) && et(e.id);
          return Ce = Date.now(), I.value = true, L.value = ``, (e.observeView ?? !r) && a.active && t(`tool_view_loaded`, {
            panel: `milestone`
          }), true;
        } catch (e) {
          return n === xe && (!r || O.value.length === 0) && (L.value = Pe(e)), false;
        } finally {
          n === xe && (P.value = false, F.value = false);
        }
      }
      async function $e(e) {
        try {
          let t = await Q.get(e, X());
          return Ye(t), t;
        } catch {
          return null;
        }
      }
      async function et(e) {
        if (!ae.value.has(e)) {
          Ge(ae, e, true);
          try {
            await $e(e);
          } finally {
            Ge(ae, e, false);
          }
        }
      }
      function tt(e) {
        if (W.value.has(e)) {
          Ge(W, e, false);
          return;
        }
        Ge(W, e, true);
        let t = O.value.find(item => item.id === e);
        t && qe(t) && et(e);
      }
      function nt() {
        J !== null && window.clearTimeout(J), J = window.setTimeout(() => {
          J = null;
          let e = H.value.trim();
          e !== U.value && (U.value = e, F.value = true, $({
            quiet: true
          }));
        }, 300);
      }
      function rt(e = true) {
        J !== null && window.clearTimeout(J), J = null, H.value = ``, U.value && (U.value = ``, e && (F.value = true, $({
          quiet: true
        })));
      }
      function it(e, t) {
        Y !== null && window.clearTimeout(Y);
        let n = ++De;
        q.value = {
          id: n,
          text: e,
          undo: t
        }, Y = window.setTimeout(() => {
          q.value?.id === n && (q.value = null);
        }, 5e3);
      }
      function at() {
        let e = q.value?.undo;
        q.value = null, e?.();
      }
      function ot() {
        a.user && G.value.createEnabled && (le.value = null, ce.value = true);
      }
      function st(e) {
        le.value = e.id, ce.value = true;
      }
      async function ct(e) {
        Ye(e.item, true), e.files.length && Z.enqueue(e.item.id, e.files), e.warning && (L.value = e.warning), await $({
          quiet: true
        }), await ht(e.item.id);
      }
      function lt(e) {
        ce.value = false, K.value = e;
      }
      function ut(e) {
        if (e) return;
        let value = K.value;
        queueMicrotask(() => {
          K.value === value && (K.value = null);
        });
      }
      async function dt() {
        let value = K.value;
        if (K.value = null, value && a.user) {
          Z.cancelFor(value.id), O.value = O.value.filter(item => item.id !== value.id), Ge(W, value.id, false);
          try {
            await Q.delete(a.user.csrfToken, value.id);
          } catch (t) {
            Ye(value, true), L.value = Pe(t);
          }
        }
      }
      async function ft(e, t, n = true) {
        if (!a.user || oe.value.has(e.id) || e.completedAt === undefined) return;
        let r = e.completedAt ?? null;
        Ge(oe, e.id, true), Xe(e.id, {
          completedAt: t ? new Date().toISOString() : null
        });
        try {
          let r = await Q.setCompleted(a.user.csrfToken, e.id, t, X()),
            i = O.value.find(item => item.id === e.id);
          Ye(i && i.content !== null && r.content === null ? {
            ...r,
            content: i.content
          } : r), n && it(c(t ? `milestoneTool.notice.completed` : `milestoneTool.notice.reopened`, {
            title: r.title
          }), () => {
            ft(r, !t, false);
          });
        } catch (t) {
          Xe(e.id, {
            completedAt: r
          }), L.value = Pe(t);
        } finally {
          Ge(oe, e.id, false);
        }
      }
      function pt(e) {
        ft(e, Fe.value.get(e.id) !== `completed`);
      }
      async function mt(e) {
        try {
          await Q.attachmentDownload(e.id);
        } catch (e) {
          it(Pe(e));
        }
      }
      async function ht(e) {
        Se && (await Se);
        let t = O.value.find(item => item.id === e);
        if (!t && U.value && (rt(false), await $({
          quiet: true
        }), t = O.value.find(item => item.id === e)), !t) {
          let n = await Q.get(e, X()).catch(() => null);
          if (!n) return;
          Ye(n, true), t = n;
        }
        we(Te(t, z.value), V.value) || (V.value = `all`), W.value.has(e) || (Ge(W, e, true), qe(t) && et(e)), se.value = e, await w(), T.value?.querySelector(`#milestone-card-${e}`)?.scrollIntoView({
          behavior: `smooth`,
          block: `center`
        }), Ee !== null && window.clearTimeout(Ee), Ee = window.setTimeout(() => {
          se.value === e && (se.value = null);
        }, 2500);
      }
      function gt(e) {
        let t = Oe;
        Oe = null, be.value = false, e && Z.cancelAll(), t?.(e);
      }
      function _t(e) {
        e || queueMicrotask(() => {
          Oe && gt(false);
        });
      }
      async function vt() {
        return !Z.busy.value || (Oe && gt(false), be.value = true, await new Promise(e => {
          Oe = e;
        }));
      }
      return n({
        requestClose: vt
      }), f(() => a.user?.id, () => {
        Z.cancelAll(), xe += 1, O.value = [], W.value = new Set(), I.value = false, ce.value = false, K.value = null, rt(false), a.user && $();
      }), f(() => a.active, e => {
        if (e) {
          if (Date.now() - Ce > hr) $({
            quiet: O.value.length > 0,
            observeView: true
          });else if (Ce > 0 && !L.value) {
            let e = x();
            w(() => {
              a.active && e(`tool_view_loaded`, {
                panel: `milestone`
              });
            });
          }
        }
      }), a.user && $(), f(() => [a.openRequest?.requestId, a.user?.id], async () => {
        let openRequest = a.openRequest;
        if (openRequest && a.user) try {
          await ht(openRequest.milestoneId);
        } finally {
          s(`openRequestHandled`, openRequest.requestId);
        }
      }, {
        immediate: true
      }), E(() => {
        je = () => {
          z.value = X(), a.active && document.visibilityState === `visible` && Date.now() - Ce > hr && $({
            quiet: true
          });
        }, window.addEventListener(`focus`, je), Ae = window.electronAPI?.todos?.onChanged?.(() => {
          a.active ? $({
            quiet: true
          }) : Ce = 0;
        }), ke = ve(`milestones`, () => $({
          quiet: true
        }), {
          active: () => a.active
        });
      }), S(() => {
        Z.cancelAll(), J !== null && window.clearTimeout(J), Y !== null && window.clearTimeout(Y), Ee !== null && window.clearTimeout(Ee), je && window.removeEventListener(`focus`, je), Ae?.(), ke?.(), Oe && gt(true);
      }), (n, i) => (v(), u(`div`, Vn, [b(ie, {
        tool: t.tool,
        user: t.user,
        "credits-balance": t.creditsBalance,
        "voice-tool": false,
        "show-history": false,
        "show-balance": false,
        onBack: i[0] ||= e => s(`back`)
      }, null, 8, [`tool`, `user`, `credits-balance`]), t.user ? (v(), u(`div`, {
        key: 1,
        ref_key: `scrollRef`,
        ref: T,
        class: `min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-7 pb-10 pt-1`
      }, [L.value ? (v(), u(`div`, Gn, [b(o(Ke), {
        size: 14,
        class: `mt-px shrink-0`
      }), A(`span`, Kn, C(L.value), 1), A(`button`, {
        type: `button`,
        class: `shrink-0 font-medium hover:underline`,
        onClick: i[1] ||= e => $({
          quiet: O.value.length > 0
        })
      }, C(o(c)(`milestoneTool.retry`)), 1), A(`button`, {
        type: `button`,
        class: `grid size-4 shrink-0 place-items-center opacity-70 hover:opacity-100`,
        "aria-label": o(c)(`milestoneTool.dismiss`),
        onClick: i[2] ||= e => L.value = ``
      }, [b(o(ne), {
        size: 12
      })], 8, qn)])) : k(``, true), G.value.campaignText ? (v(), u(`p`, Jn, C(G.value.campaignText), 1)) : k(``, true), Ve.value ? (v(), u(_, {
        key: 2
      }, [A(`section`, Yn, [A(`div`, Xn, [b(o(We), null, {
        default: p(() => [(v(true), u(_, null, d(Le.value, state => (v(), h(o(r), {
          key: state.value,
          size: `sm`,
          variant: V.value === state.value ? `default` : `outline`,
          class: `text-xs`,
          "aria-pressed": V.value === state.value,
          onClick: t => V.value = state.value
        }, {
          default: p(() => [l(C(state.label) + ` `, 1), A(`span`, Zn, C(state.count), 1)]),
          _: 2
        }, 1032, [`variant`, `aria-pressed`, `onClick`]))), 128))]),
        _: 1
      }), A(`div`, Qn, [A(`label`, $n, [F.value ? (v(), h(o(re), {
        key: 0,
        size: 13,
        class: `shrink-0 animate-spin`
      })) : (v(), h(o(Ne), {
        key: 1,
        size: 13,
        class: `shrink-0`
      })), m(A(`input`, {
        "onUpdate:modelValue": i[3] ||= e => H.value = e,
        type: `text`,
        class: `min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground`,
        placeholder: o(c)(`milestoneTool.searchPlaceholder`),
        "aria-label": o(c)(`milestoneTool.searchPlaceholder`),
        onInput: nt,
        onKeydown: i[4] ||= M(j(e => rt(), [`prevent`]), [`esc`])
      }, null, 40, er), [[te, H.value]]), H.value ? (v(), u(`button`, {
        key: 2,
        type: `button`,
        class: `grid size-4 shrink-0 place-items-center rounded text-muted-foreground hover:text-foreground`,
        "aria-label": o(c)(`milestoneTool.clearSearch`),
        onClick: i[5] ||= e => rt()
      }, [b(o(ne), {
        size: 12
      })], 8, tr)) : k(``, true)]), b(o(r), {
        size: `sm`,
        class: `text-xs`,
        disabled: !G.value.createEnabled,
        title: G.value.createEnabled ? undefined : o(c)(`milestoneTool.createDisabled`),
        onClick: ot
      }, {
        default: p(() => [b(o(e)), l(C(o(c)(`milestoneTool.add`)), 1)]),
        _: 1
      }, 8, [`disabled`, `title`])])])]), Be.value.total ? (v(), u(`p`, nr, C(o(c)(`milestoneTool.todoRate`, {
        total: Be.value.total,
        done: Be.value.done,
        rate: Be.value.rate
      })), 1)) : k(``, true)], 64)) : k(``, true), P.value && !I.value ? (v(), u(`section`, rr, [b(o(re), {
        class: `animate-spin`,
        size: 16
      }), l(C(o(c)(`milestoneTool.loading`)), 1)])) : I.value && !O.value.length && !U.value ? (v(), u(`section`, ir, [A(`span`, ar, [b(o(B), {
        size: 20
      })]), A(`strong`, or, C(o(c)(`milestoneTool.empty.title`)), 1), A(`p`, sr, C(o(c)(`milestoneTool.empty.text`)), 1), b(o(r), {
        size: `sm`,
        class: `text-xs`,
        disabled: !G.value.createEnabled,
        title: G.value.createEnabled ? undefined : o(c)(`milestoneTool.createDisabled`),
        onClick: ot
      }, {
        default: p(() => [b(o(e)), l(C(o(c)(`milestoneTool.add`)), 1)]),
        _: 1
      }, 8, [`disabled`, `title`])])) : I.value && !Re.value.length ? (v(), u(`section`, cr, [A(`p`, lr, C(Ue.value), 1), U.value ? (v(), h(o(r), {
        key: 0,
        variant: `outline`,
        size: `sm`,
        class: `text-xs`,
        onClick: i[6] ||= e => rt()
      }, {
        default: p(() => [l(C(o(c)(`milestoneTool.clearSearch`)), 1)]),
        _: 1
      })) : k(``, true)])) : I.value ? (v(), u(_, {
        key: 6
      }, [(v(true), u(_, null, d(ze.value, event => (v(), u(`div`, {
        key: event.key,
        class: `mt-5`
      }, [event.titleKey ? (v(), u(`h2`, ur, C(o(c)(event.titleKey)), 1)) : k(``, true), (v(true), u(_, null, d(event.months, e => (v(), u(`div`, {
        key: e.key
      }, [A(`h3`, dr, C(e.label), 1), (v(true), u(_, null, d(e.items, (t, n) => (v(), h(Et, {
        key: t.id,
        item: t,
        status: Fe.value.get(t.id) ?? `planned`,
        today: z.value,
        expanded: W.value.has(t.id),
        highlighted: se.value === t.id,
        "detail-loading": ae.value.has(t.id),
        toggling: oe.value.has(t.id),
        uploads: o(Z).tasksFor(t.id),
        first: n === 0,
        last: n === e.items.length - 1,
        onToggleExpand: e => tt(t.id),
        onEdit: e => st(t),
        onDelete: e => lt(t),
        onToggleComplete: e => pt(t),
        onOpenTodo: i[7] ||= e => s(`openTodo`, e),
        onDownload: mt,
        onCancelUploads: e => o(Z).cancelFor(t.id),
        onRetryUpload: o(Z).retry,
        onDismissUpload: o(Z).dismiss
      }, null, 8, [`item`, `status`, `today`, `expanded`, `highlighted`, `detail-loading`, `toggling`, `uploads`, `first`, `last`, `onToggleExpand`, `onEdit`, `onDelete`, `onToggleComplete`, `onCancelUploads`, `onRetryUpload`, `onDismissUpload`]))), 128))]))), 128))]))), 128)), R.value ? (v(), u(`p`, fr, C(o(c)(`milestoneTool.truncated`, {
        count: O.value.length
      })), 1)) : k(``, true)], 64)) : k(``, true)], 512)) : (v(), u(`section`, Hn, [A(`span`, Un, [b(o(B), {
        size: 20
      })]), A(`p`, Wn, C(o(c)(`milestoneTool.signIn`)), 1)])), b(N, {
        "enter-active-class": `transition duration-150 ease-out`,
        "enter-from-class": `translate-y-2 opacity-0`,
        "leave-active-class": `transition duration-100 ease-in`,
        "leave-to-class": `translate-y-2 opacity-0`
      }, {
        default: p(() => [q.value ? (v(), u(`div`, pr, [A(`span`, mr, C(q.value.text), 1), q.value.undo ? (v(), u(`button`, {
          key: 0,
          type: `button`,
          class: `shrink-0 font-semibold text-primary hover:underline`,
          onClick: at
        }, C(o(c)(`milestoneTool.notice.undo`)), 1)) : k(``, true)])) : k(``, true)]),
        _: 1
      }), b(zn, {
        open: ce.value,
        "onUpdate:open": i[8] ||= e => ce.value = e,
        "milestone-id": le.value,
        user: t.user,
        config: G.value,
        uploads: He.value,
        onSaved: ct,
        onDelete: lt,
        onDownload: mt,
        onCancelUpload: o(Z).cancel
      }, null, 8, [`open`, `milestone-id`, `user`, `config`, `uploads`, `onCancelUpload`]), b(o(de), {
        open: !!K.value,
        "onUpdate:open": ut
      }, {
        default: p(() => [b(o(ue), {
          size: `sm`
        }, {
          default: p(() => [b(o(pe), null, {
            default: p(() => [b(o(_e), null, {
              default: p(() => [l(C(o(c)(`milestoneTool.confirm.deleteTitle`)), 1)]),
              _: 1
            }), b(o(fe), {
              class: `break-words`
            }, {
              default: p(() => [l(C(o(c)(`milestoneTool.confirm.deleteText`, {
                title: K.value?.title ?? ``
              })), 1)]),
              _: 1
            })]),
            _: 1
          }), b(o(he), null, {
            default: p(() => [b(o(me), null, {
              default: p(() => [l(C(o(c)(`milestoneTool.confirm.cancel`)), 1)]),
              _: 1
            }), b(o(ge), {
              variant: `destructive`,
              onClick: dt
            }, {
              default: p(() => [l(C(o(c)(`milestoneTool.confirm.delete`)), 1)]),
              _: 1
            })]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`]), b(o(de), {
        open: be.value,
        "onUpdate:open": _t
      }, {
        default: p(() => [b(o(ue), {
          size: `sm`
        }, {
          default: p(() => [b(o(pe), null, {
            default: p(() => [b(o(_e), null, {
              default: p(() => [l(C(o(c)(`milestoneTool.confirm.leaveTitle`)), 1)]),
              _: 1
            }), b(o(fe), null, {
              default: p(() => [l(C(o(c)(`milestoneTool.confirm.leaveText`)), 1)]),
              _: 1
            })]),
            _: 1
          }), b(o(he), null, {
            default: p(() => [b(o(me), {
              onClick: i[9] ||= e => gt(false)
            }, {
              default: p(() => [l(C(o(c)(`milestoneTool.confirm.stay`)), 1)]),
              _: 1
            }), b(o(ge), {
              variant: `destructive`,
              onClick: i[10] ||= e => gt(true)
            }, {
              default: p(() => [l(C(o(c)(`milestoneTool.confirm.leave`)), 1)]),
              _: 1
            })]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`])]));
    }
  });
export { gr as default };