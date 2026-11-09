import { Dt as uiSwitchDt, Ot as uiSwitchOt, jt as uiSwitchJt, r as uiSwitchR, wt as uiSwitchWt } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, Et as vueEt, Lt as vueLt, O as vueO, S as vueS, St as vueSt, Wt as vueWt, Yt as vueYt, Zt as vueZt, b as vueB, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, k as vueK, n as ee, nr as vueNr, ot as vueOt, rr as vueRr, rt as vueRt, tt as vueTt, ut as vueUt, v as vueV, vn as vueVn, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { C as playerC, E as playerE, T as playerT, r as playerR } from "../i18n/en-US-player.js";
import { t as lucideT } from "../ui/icons/lucide-icons.js";
import { i as purifyI, n as purifyN, r as purifyR } from "../chunks/purify.es.js";
import { t as checkT } from "../chunks/check.js";
import { t as chevronupT } from "../chunks/chevron-up.js";
import { _ as beautifier, v as beautifierV } from "../chunks/screenshot-beautifier.js";
import { t as flagT } from "../chunks/flag.js";
import { n as DropdownMenuItemN, t as DropdownMenuItemT } from "../ui/DropdownMenuItem.js";
import { t as ToolboxWorkspaceHeaderT } from "./ToolboxWorkspaceHeader.js";
import { n as DropdownMenuTriggerN, r as DropdownMenuTriggerR, t as DropdownMenuTriggerT } from "../ui/DropdownMenuTrigger.js";
import { a as dialogA, i as dialogI, n as dialogN, r as dialogR, t as dialogT } from "../chunks/dialog.js";
import { a as alertDialogA, c as alertDialogC, i as alertDialogI, n as alertDialogN, o as alertDialogO, r as alertDialogR, s as alertDialogS, t as alertDialogT } from "../ui/alert-dialog.js";
import { a as useAuthA } from "../chunks/useAuth.js";
import { t as growthTelT } from "../chunks/useGrowthTelemetry.js";
import { At as mainAt, Bn as mainBn, Bt as mainBt, Cn as mainCn, Dn as mainDn, Dt as mainDt, Et as mainEt, Ft as mainFt, Gt as mainGt, It as mainIt, Kt as mainKt, Lt as mainLt, Mt as mainMt, Nt as mainNt, Ot as mainOt, Pt as mainPt, Rn as mainRn, Rt as mainRt, Sn as mainSn, St as mainSt, Tt as mainTt, Vn as mainVn, Vt as mainVt, _t as mainT, bt as Le, ct as mainCt, dt as ze, gn as mainGn, jt as mainJt, kt as He, lt as Ue, pt as We, un as mainUn, vn as Ke, vt as qe, wt as mainWt, xt as mainXt, yt as mainYt, zt as mainZt } from "../chunks/main.js";
import { t as ToolDropzoneT } from "./ToolDropzone.js";
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
  Et = vueJ({
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
      emit: emit
    }) {
      let eventAlias = event,
        emitAlias = emit,
        {
          t: translate,
          locale: g
        } = ee(),
        y = vueV(() => eventAlias.status === `completed`),
        S = vueV(() => mainMt(eventAlias.item) && !eventAlias.item.completedAt),
        w = vueV(() => mainBt(eventAlias.item)),
        T = vueV(() => He(eventAlias.item.date, g.value)),
        E = vueV(() => mainAt(eventAlias.item.time)),
        O = vueV(() => eventAlias.item.date === eventAlias.today),
        te = vueV(() => w.value ? `pl-10 pr-3.5` : `px-3.5`),
        j = vueV(() => eventAlias.item.content ? mainGt(mainRt(eventAlias.item.content)) : ``),
        M = vueV(() => eventAlias.item.todoCount > 0 ? Math.round(eventAlias.item.completedTodoCount / eventAlias.item.todoCount * 100) : 0),
        N = vueV(() => {
          let e = mainLt(eventAlias.status);
          if (eventAlias.status === `completed`) return {
            label: translate(`milestoneTool.status.completed`),
            className: e
          };
          if (eventAlias.status === `overdue`) return {
            label: translate(`milestoneTool.relative.overdueDays`, {
              days: mainTt(eventAlias.item.date, eventAlias.today)
            }),
            className: e
          };
          let t = mainTt(eventAlias.today, eventAlias.item.date);
          return t === 0 ? {
            label: translate(`milestoneTool.relative.today`),
            className: `bg-foreground/[0.08] font-semibold text-foreground`
          } : t === 1 ? {
            label: translate(`milestoneTool.relative.tomorrow`),
            className: e
          } : {
            label: translate(`milestoneTool.relative.daysLeft`, {
              days: t
            }),
            className: e
          };
        }),
        P = vueV(() => eventAlias.status === `completed` ? `border-primary bg-primary` : eventAlias.status === `overdue` ? `border-destructive bg-destructive` : O.value ? `border-primary bg-background` : `border-muted-foreground/45 bg-background`),
        F = vueV(() => eventAlias.uploads.filter(item => item.status !== `failed`)),
        B = vueV(() => eventAlias.uploads.filter(item => item.status === `failed`)),
        V = vueV(() => F.value.length ? Math.round(F.value.reduce((acc, cur) => acc + cur.progress, 0) / F.value.length) : 0);
      function ie(e) {
        return [e.project || e.assignee.remark || e.assignee.nickname, e.dueDate, e.archived ? translate(`milestoneTool.card.archived`) : ``].filter(Boolean).join(` · `);
      }
      function oe(e) {
        window.getSelection()?.toString() || e.target?.closest(`button, a, [role="menuitem"], [data-no-toggle]`) || emitAlias(`toggleExpand`);
      }
      return (ctx, renderCache) => (vueGt(), vueS(`article`, {
        id: `milestone-card-${event.item.id}`,
        class: `relative grid grid-cols-[68px_minmax(0,1fr)] gap-x-5`
      }, [vueY(`span`, {
        class: vueN([`pointer-events-none absolute left-[78px] w-px -translate-x-1/2 bg-border`, [event.first ? `top-[18px]` : `top-0`, event.last ? `h-[18px]` : `bottom-0`]]),
        style: vueNr(event.first && event.last ? `display: none` : undefined)
      }, null, 6), vueY(`div`, $e, [vueY(`strong`, {
        class: vueN([`block text-[13px] font-semibold leading-5 tabular-nums`, O.value ? `text-primary` : `text-foreground`])
      }, vueRr(T.value.day), 3), vueY(`span`, et, vueRr(T.value.weekday), 1), E.value ? (vueGt(), vueS(`span`, tt, vueRr(E.value), 1)) : vueX(``, true), vueY(`span`, {
        class: vueN([`absolute -right-[15px] top-[13.5px] z-[1] size-2.5 rounded-full border-2`, P.value])
      }, null, 2)]), vueY(`div`, nt, [vueY(`div`, {
        class: vueN([`cursor-pointer rounded-[10px] border bg-card transition-[border-color,box-shadow]`, event.highlighted ? `border-primary/60 ring-3 ring-primary/10` : `border-border hover:border-foreground/15`]),
        onClick: oe
      }, [vueY(`header`, rt, [w.value ? (vueGt(), vueS(`button`, {
        key: 0,
        type: `button`,
        class: vueN([`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border transition-colors disabled:cursor-default`, y.value ? `border-primary bg-primary text-primary-foreground` : `border-muted-foreground/40 text-transparent hover:border-primary hover:text-primary`]),
        disabled: S.value || event.toggling,
        title: S.value ? vueAn(translate)(`milestoneTool.card.autoCompleted`) : y.value ? vueAn(translate)(`milestoneTool.card.markIncomplete`) : vueAn(translate)(`milestoneTool.card.markComplete`),
        "aria-label": y.value ? vueAn(translate)(`milestoneTool.card.markIncomplete`) : vueAn(translate)(`milestoneTool.card.markComplete`),
        "aria-pressed": y.value,
        onClick: renderCache[0] ||= e => emitAlias(`toggleComplete`)
      }, [event.toggling ? (vueGt(), vueB(vueAn(beautifier), {
        key: 0,
        size: 10,
        class: `animate-spin text-current`
      })) : (vueGt(), vueB(vueAn(checkT), {
        key: 1,
        size: 10,
        "stroke-width": 3
      }))], 10, it)) : vueX(``, true), vueY(`button`, {
        type: `button`,
        class: vueN([`min-w-0 flex-1 text-left text-sm font-medium leading-5 outline-none focus-visible:underline`, y.value ? `text-muted-foreground` : `text-foreground`]),
        "aria-expanded": event.expanded,
        title: event.expanded ? vueAn(translate)(`milestoneTool.card.collapse`) : vueAn(translate)(`milestoneTool.card.expand`),
        onClick: renderCache[1] ||= e => emitAlias(`toggleExpand`)
      }, [vueY(`span`, ot, vueRr(event.item.title), 1)], 10, at), vueY(`span`, {
        class: vueN([`mt-px shrink-0 rounded-md px-1.5 text-[11px] font-medium leading-[18px]`, N.value.className])
      }, vueRr(N.value.label), 3), vueK(vueAn(DropdownMenuTriggerR), null, {
        default: vueYt(() => [vueK(vueAn(DropdownMenuTriggerT), {
          "as-child": ``
        }, {
          default: vueYt(() => [vueY(`button`, {
            type: `button`,
            class: `-mr-1.5 grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: vueAn(translate)(`milestoneTool.card.more`),
            "aria-label": vueAn(translate)(`milestoneTool.card.more`)
          }, [vueK(vueAn(purifyR), {
            size: 15
          })], 8, st)]),
          _: 1
        }), vueK(vueAn(DropdownMenuTriggerN), {
          align: `end`,
          class: `min-w-36`
        }, {
          default: vueYt(() => [vueK(vueAn(DropdownMenuItemT), {
            class: `text-xs`,
            onSelect: renderCache[2] ||= e => emitAlias(`edit`)
          }, {
            default: vueYt(() => [vueK(vueAn(uiSwitchOt)), vueO(vueRr(vueAn(translate)(`milestoneTool.card.edit`)), 1)]),
            _: 1
          }), w.value && !S.value ? (vueGt(), vueB(vueAn(DropdownMenuItemT), {
            key: 0,
            class: `text-xs`,
            disabled: event.toggling,
            onSelect: renderCache[3] ||= e => emitAlias(`toggleComplete`)
          }, {
            default: vueYt(() => [y.value ? (vueGt(), vueB(vueAn(uiSwitchJt), {
              key: 0
            })) : (vueGt(), vueB(vueAn(mainVn), {
              key: 1
            })), vueO(` ` + vueRr(y.value ? vueAn(translate)(`milestoneTool.card.markIncomplete`) : vueAn(translate)(`milestoneTool.card.markComplete`)), 1)]),
            _: 1
          }, 8, [`disabled`])) : vueX(``, true), vueK(vueAn(Ue)), vueK(vueAn(DropdownMenuItemT), {
            variant: `destructive`,
            class: `text-xs`,
            onSelect: renderCache[4] ||= e => emitAlias(`delete`)
          }, {
            default: vueYt(() => [vueK(vueAn(uiSwitchWt)), vueO(vueRr(vueAn(translate)(`milestoneTool.card.delete`)), 1)]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      })]), !event.expanded && event.item.contentSummary ? (vueGt(), vueS(`p`, {
        key: 0,
        class: vueN([`mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground`, te.value])
      }, vueRr(event.item.contentSummary), 3)) : vueX(``, true), event.expanded ? (vueGt(), vueS(`div`, {
        key: 1,
        "data-no-toggle": ``,
        class: vueN([`mt-1.5 cursor-auto`, te.value])
      }, [event.detailLoading && event.item.content === null ? (vueGt(), vueS(`div`, ct, [vueK(vueAn(beautifier), {
        size: 13,
        class: `animate-spin`
      }), vueO(vueRr(vueAn(translate)(`milestoneTool.loading`)), 1)])) : j.value ? (vueGt(), vueS(`div`, {
        key: 1,
        class: `break-words text-sm leading-relaxed text-foreground [&_h1]:my-1 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:my-1 [&_h2]:font-semibold [&_h3]:my-1 [&_h3]:font-semibold [&_hr]:my-2 [&_hr]:border-border [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5`,
        innerHTML: j.value
      }, null, 8, lt)) : event.item.contentSummary ? vueX(``, true) : (vueGt(), vueS(`p`, ut, vueRr(vueAn(translate)(`milestoneTool.card.noDetail`)), 1))], 2)) : vueX(``, true), event.item.todoCount > 0 || event.item.attachmentCount > 0 && !event.expanded ? (vueGt(), vueS(`div`, {
        key: 2,
        class: vueN([`mt-2 flex items-center gap-3 text-[11px] text-muted-foreground`, te.value])
      }, [event.item.todoCount > 0 ? (vueGt(), vueS(`span`, dt, [vueK(vueAn(mainCt), {
        "model-value": M.value,
        class: `h-1 max-w-[160px]`
      }, null, 8, [`model-value`]), vueY(`span`, ft, vueRr(vueAn(translate)(`milestoneTool.card.todoProgress`, {
        done: event.item.completedTodoCount,
        total: event.item.todoCount
      })), 1)])) : vueX(``, true), event.item.attachmentCount > 0 && !event.expanded ? (vueGt(), vueS(`span`, {
        key: 1,
        class: `ml-auto inline-flex shrink-0 items-center gap-1 tabular-nums`,
        title: vueAn(translate)(`milestoneTool.card.attachments`, {
          count: event.item.attachmentCount
        })
      }, [vueK(vueAn(mainDn), {
        size: 11
      }), vueO(vueRr(event.item.attachmentCount), 1)], 8, pt)) : vueX(``, true)], 2)) : vueX(``, true), event.expanded ? (vueGt(), vueS(`div`, {
        key: 3,
        "data-no-toggle": ``,
        class: vueN([`mt-2.5 cursor-auto space-y-2.5`, te.value])
      }, [event.item.todos.length ? (vueGt(), vueS(`ul`, mt, [(vueGt(true), vueS(vueC, null, vueSt(event.item.todos, e => (vueGt(), vueS(`li`, {
        key: e.id,
        class: `border-b border-border last:border-b-0`
      }, [vueY(`button`, {
        type: `button`,
        class: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left transition-colors hover:bg-muted/60`,
        onClick: t => emitAlias(`openTodo`, e.id)
      }, [e.status === `done` ? (vueGt(), vueB(vueAn(mainVn), {
        key: 0,
        size: 14,
        class: `shrink-0 text-primary`
      })) : (vueGt(), vueB(vueAn(uiSwitchJt), {
        key: 1,
        size: 14,
        class: `shrink-0 text-muted-foreground/60`
      })), vueY(`span`, {
        class: vueN([`min-w-0 flex-1 truncate text-xs`, e.status === `done` ? `text-muted-foreground line-through` : `text-foreground`])
      }, vueRr(e.title), 3), ie(e) ? (vueGt(), vueS(`span`, gt, vueRr(ie(e)), 1)) : vueX(``, true)], 8, ht)]))), 128))])) : vueX(``, true), event.item.attachments.length ? (vueGt(), vueS(`ul`, _t, [(vueGt(true), vueS(vueC, null, vueSt(event.item.attachments, count => (vueGt(), vueS(`li`, {
        key: count.id,
        class: `flex items-center gap-2 text-xs text-muted-foreground`
      }, [vueK(vueAn(mainDn), {
        size: 12,
        class: `shrink-0`
      }), vueY(`span`, vt, vueRr(count.name) + ` · ` + vueRr(vueAn(mainOt)(count.size)), 1), vueY(`button`, {
        type: `button`,
        class: `grid size-6 shrink-0 place-items-center rounded-md transition-colors hover:bg-muted hover:text-foreground`,
        title: vueAn(translate)(`milestoneTool.card.download`),
        "aria-label": vueAn(translate)(`milestoneTool.card.download`),
        onClick: t => emitAlias(`download`, count)
      }, [vueK(vueAn(beautifierV), {
        size: 13
      })], 8, yt)]))), 128))])) : vueX(``, true), vueY(`div`, bt, [vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `xs`,
        class: `text-muted-foreground`,
        onClick: renderCache[5] ||= e => emitAlias(`toggleExpand`)
      }, {
        default: vueYt(() => [vueK(vueAn(chevronupT)), vueO(vueRr(vueAn(translate)(`milestoneTool.card.collapse`)), 1)]),
        _: 1
      }), vueK(vueAn(uiSwitchR), {
        variant: `ghost`,
        size: `xs`,
        class: `text-muted-foreground`,
        onClick: renderCache[6] ||= e => emitAlias(`edit`)
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchOt)), vueO(vueRr(vueAn(translate)(`milestoneTool.card.edit`)), 1)]),
        _: 1
      })])], 2)) : vueX(``, true), renderCache[8] ||= vueY(`div`, {
        class: `h-2.5`
      }, null, -1), event.uploads.length ? (vueGt(), vueS(`div`, {
        key: 4,
        "data-no-toggle": ``,
        class: vueN([`-mt-0.5 cursor-auto space-y-1 border-t border-border py-2 text-xs`, te.value])
      }, [F.value.length ? (vueGt(), vueS(`div`, xt, [vueK(vueAn(beautifier), {
        size: 13,
        class: `shrink-0 animate-spin`
      }), vueY(`span`, St, vueRr(vueAn(translate)(`milestoneTool.card.uploading`, {
        count: F.value.length,
        percent: V.value
      })), 1), vueY(`button`, {
        type: `button`,
        class: `shrink-0 font-medium hover:text-foreground`,
        onClick: renderCache[7] ||= e => emitAlias(`cancelUploads`)
      }, vueRr(vueAn(translate)(`milestoneTool.card.cancelUpload`)), 1)])) : vueX(``, true), (vueGt(true), vueS(vueC, null, vueSt(B.value, e => (vueGt(), vueS(`div`, {
        key: e.id,
        class: `flex items-center gap-2 text-destructive`
      }, [vueK(vueAn(Ke), {
        size: 13,
        class: `shrink-0`
      }), vueY(`span`, {
        class: `min-w-0 flex-1 truncate`,
        title: e.error
      }, vueRr(vueAn(translate)(`milestoneTool.card.uploadFailed`, {
        name: e.file.name,
        message: e.error
      })), 9, Ct), vueY(`button`, {
        type: `button`,
        class: `inline-flex shrink-0 items-center gap-1 font-medium hover:underline`,
        onClick: t => emitAlias(`retryUpload`, e.id)
      }, [vueK(vueAn(mainCn), {
        size: 12
      }), vueO(vueRr(vueAn(translate)(`milestoneTool.card.retryUpload`)), 1)], 8, wt), vueY(`button`, {
        type: `button`,
        class: `grid size-5 shrink-0 place-items-center rounded text-muted-foreground hover:text-foreground`,
        title: vueAn(translate)(`milestoneTool.card.dismissUpload`),
        "aria-label": vueAn(translate)(`milestoneTool.card.dismissUpload`),
        onClick: t => emitAlias(`dismissUpload`, e.id)
      }, [vueK(vueAn(lucideT), {
        size: 12
      })], 8, Tt)]))), 128))], 2)) : vueX(``, true)], 2)])], 8, Qe));
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
  Mt = vueJ({
    __name: `MilestoneRichTextField`,
    props: vueTt({
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
      let eventAlias = event,
        n = vueLt(event, `modelValue`),
        {
          t: r
        } = ee(),
        i = vueBn(null),
        l = vueBn(true),
        p = vueBn(new Set());
      function m() {
        let fallbackValue = i.value?.innerHTML ?? ``;
        return mainNt(fallbackValue) ? `` : fallbackValue;
      }
      function y() {
        let e = i.value;
        e && m() !== n.value && (e.innerHTML = mainGt(mainRt(n.value)), l.value = mainNt(e.innerHTML));
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
        for (let count of [`bold`, `insertUnorderedList`, `insertOrderedList`]) try {
          document.queryCommandState(count) && e.add(count);
        } catch {}
        p.value = e;
      }
      function S(e) {
        eventAlias.disabled || (i.value?.focus(), document.execCommand(e), b(), requestAnimationFrame(x));
      }
      function w(e) {
        e.preventDefault();
        let t = e.clipboardData?.getData(`text/html`);
        t ? document.execCommand(`insertHTML`, false, mainGt(t)) : document.execCommand(`insertText`, false, e.clipboardData?.getData(`text/plain`) ?? ``), b();
      }
      let T = [{
        command: `bold`,
        icon: purifyI,
        label: `milestoneTool.richText.bold`
      }, {
        command: `insertUnorderedList`,
        icon: purifyN,
        label: `milestoneTool.richText.bulletList`
      }, {
        command: `insertOrderedList`,
        icon: DropdownMenuItemN,
        label: `milestoneTool.richText.orderedList`
      }];
      return vueUt(y), vueWt(n, y), (t, n) => (vueGt(), vueS(`div`, {
        class: vueN([`overflow-hidden rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30`, event.disabled ? `pointer-events-none opacity-50` : ``])
      }, [vueY(`div`, Dt, [(vueGt(), vueS(vueC, null, vueSt(T, e => vueY(`button`, {
        key: e.command,
        type: `button`,
        class: vueN([`grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`, p.value.has(e.command) ? `bg-muted text-foreground` : ``]),
        title: vueAn(r)(e.label),
        "aria-label": vueAn(r)(e.label),
        "aria-pressed": p.value.has(e.command),
        onMousedown: playerE(t => S(e.command), [`prevent`])
      }, [(vueGt(), vueB(vueEt(e.icon), {
        size: 13
      }))], 42, Ot)), 64))]), vueY(`div`, kt, [vueY(`div`, {
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
      }, null, 40, At), l.value && event.placeholder ? (vueGt(), vueS(`span`, jt, vueRr(event.placeholder), 1)) : vueX(``, true)])], 2));
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
  Kt = vueJ({
    __name: `MilestoneTodoPicker`,
    props: vueTt({
      selected: {}
    }, {
      open: {
        type: Boolean,
        required: true
      },
      openModifiers: {}
    }),
    emits: vueTt([`confirm`], [`update:open`]),
    setup(event, {
      emit: emit
    }) {
      let eventAlias = event,
        i = vueLt(event, `open`),
        emitAlias = emit,
        {
          t: y
        } = ee(),
        x = vueBn(new Map()),
        S = vueBn([]),
        w = vueBn(false),
        T = vueBn(``),
        E = vueBn(``),
        O = vueBn(``),
        j = vueBn(`open`),
        M = vueBn(1),
        N = vueBn(false),
        P = 0,
        F = null,
        I = vueV(() => [{
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
          let todoOptions = await mainVt.todoOptions({
            keyword: O.value.trim(),
            status: j.value,
            page: n
          });
          if (t !== P) return;
          S.value = e ? [...S.value, ...todoOptions.items] : todoOptions.items, M.value = n, N.value = todoOptions.hasMore;
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
        let t = e.currentTarget;
        t.scrollHeight - t.scrollTop - t.clientHeight <= 80 && B(true);
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
        emitAlias(`confirm`, [...x.value.values()]), i.value = false;
      }
      return vueWt(i, e => {
        if (!e) {
          F !== null && window.clearTimeout(F), F = null, P += 1;
          return;
        }
        x.value = new Map(eventAlias.selected.map(item => [item.id, item])), O.value = ``, j.value = `open`, S.value = [], E.value = ``, B();
      }), (e, renderCache) => (vueGt(), vueB(vueAn(dialogA), {
        open: i.value,
        "onUpdate:open": renderCache[3] ||= e => i.value = e
      }, {
        default: vueYt(() => [vueK(vueAn(dialogI), {
          class: `flex max-h-[min(640px,calc(100vh-48px))] flex-col gap-0 overflow-hidden p-0 sm:max-w-[520px]`
        }, {
          default: vueYt(() => [vueK(vueAn(dialogN), {
            class: `border-b border-border px-5 py-3.5 pr-12`
          }, {
            default: vueYt(() => [vueK(vueAn(dialogT), {
              class: `text-base font-semibold`
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(y)(`milestoneTool.todoPicker.title`)), 1)]),
              _: 1
            }), vueK(vueAn(mainGn), {
              class: `sr-only`
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(y)(`milestoneTool.todoPicker.search`)), 1)]),
              _: 1
            })]),
            _: 1
          }), vueY(`div`, Nt, [vueY(`label`, Pt, [vueK(vueAn(mainSn), {
            size: 14,
            class: `shrink-0`
          }), vueZt(vueY(`input`, {
            "onUpdate:modelValue": renderCache[0] ||= e => O.value = e,
            type: `text`,
            class: `min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground`,
            placeholder: vueAn(y)(`milestoneTool.todoPicker.search`),
            onInput: V
          }, null, 40, Ft), [[playerC, O.value]]), O.value ? (vueGt(), vueS(`button`, {
            key: 0,
            type: `button`,
            class: `grid size-5 place-items-center rounded text-muted-foreground hover:text-foreground`,
            "aria-label": vueAn(y)(`milestoneTool.clearSearch`),
            onClick: ie
          }, [vueK(vueAn(lucideT), {
            size: 13
          })], 8, It)) : vueX(``, true)]), vueK(vueAn(mainXt), {
            "model-value": j.value,
            "onUpdate:modelValue": H
          }, {
            default: vueYt(() => [vueK(vueAn(qe), {
              class: `w-[108px] shrink-0 text-xs`,
              "aria-label": vueAn(y)(`milestoneTool.todoPicker.statusFilter`)
            }, {
              default: vueYt(() => [vueK(vueAn(mainT))]),
              _: 1
            }, 8, [`aria-label`]), vueK(vueAn(Le), {
              position: `popper`,
              align: `end`
            }, {
              default: vueYt(() => [(vueGt(true), vueS(vueC, null, vueSt(I.value, state => (vueGt(), vueB(vueAn(mainYt), {
                key: state.value,
                value: state.value,
                class: `text-xs`
              }, {
                default: vueYt(() => [vueO(vueRr(state.label), 1)]),
                _: 2
              }, 1032, [`value`]))), 128))]),
              _: 1
            })]),
            _: 1
          }, 8, [`model-value`])]), T.value || E.value ? (vueGt(), vueS(`div`, Lt, [vueK(vueAn(Ke), {
            size: 14,
            class: `shrink-0`
          }), vueY(`span`, Rt, vueRr(T.value || E.value), 1), T.value ? (vueGt(), vueS(`button`, {
            key: 0,
            type: `button`,
            class: `shrink-0 font-medium hover:underline`,
            onClick: renderCache[1] ||= e => B()
          }, vueRr(vueAn(y)(`milestoneTool.retry`)), 1)) : vueX(``, true)])) : vueX(``, true), vueY(`div`, {
            class: `mt-2 min-h-[240px] flex-1 overflow-y-auto px-2 pb-2`,
            onScrollPassive: U
          }, [(vueGt(true), vueS(vueC, null, vueSt(S.value, e => (vueGt(), vueS(`button`, {
            key: e.id,
            type: `button`,
            class: `flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted`,
            "aria-pressed": x.value.has(e.id),
            onClick: t => W(e)
          }, [vueY(`span`, {
            class: vueN([`mt-0.5 grid size-4 shrink-0 place-items-center rounded-[5px] border transition-colors`, x.value.has(e.id) ? `border-primary bg-primary text-primary-foreground` : `border-muted-foreground/40`])
          }, [x.value.has(e.id) ? (vueGt(), vueB(vueAn(checkT), {
            key: 0,
            size: 11
          })) : vueX(``, true)], 2), vueY(`span`, Bt, [vueY(`span`, {
            class: vueN([`block text-sm leading-snug`, e.status === `done` ? `text-muted-foreground line-through` : `text-foreground`])
          }, vueRr(e.title), 3), vueY(`span`, Vt, vueRr(z(e)), 1)])], 8, zt))), 128)), w.value ? (vueGt(), vueS(`div`, Ht, [vueK(vueAn(beautifier), {
            class: `animate-spin`,
            size: 14
          }), vueO(vueRr(vueAn(y)(`milestoneTool.loading`)), 1)])) : !S.value.length && !T.value ? (vueGt(), vueS(`p`, Ut, vueRr(vueAn(y)(`milestoneTool.todoPicker.empty`)), 1)) : vueX(``, true)], 32), vueK(vueAn(dialogR), {
            class: `m-0 flex-row items-center justify-between rounded-none px-5 py-3 sm:justify-between`
          }, {
            default: vueYt(() => [vueY(`span`, Wt, vueRr(vueAn(y)(`milestoneTool.todoPicker.selected`, {
              count: x.value.size
            })), 1), vueY(`div`, Gt, [vueK(vueAn(uiSwitchR), {
              variant: `outline`,
              size: `sm`,
              onClick: renderCache[2] ||= e => i.value = false
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(y)(`milestoneTool.todoPicker.cancel`)), 1)]),
              _: 1
            }), vueK(vueAn(uiSwitchR), {
              size: `sm`,
              class: `min-w-16`,
              onClick: ae
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(y)(`milestoneTool.todoPicker.confirm`)), 1)]),
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
  zn = vueJ({
    __name: `MilestoneEditorDialog`,
    props: vueTt({
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
    emits: vueTt([`saved`, `delete`, `download`, `cancelUpload`], [`update:open`]),
    setup(options, {
      emit: emit
    }) {
      let optionsAlias = options,
        y = vueLt(options, `open`),
        emitAlias = emit,
        {
          t: S,
          locale: T
        } = ee(),
        E = vueBn(null),
        te = vueBn(null),
        j = vueBn(null),
        M = vueBn(false),
        N = vueBn(``),
        P = vueBn(false),
        F = vueBn(``),
        I = vueBn(false),
        L = vueBn(false),
        R = vueBn(false),
        B = vueBn(false),
        V = vueVn({
          title: ``,
          content: ``,
          date: ``,
          time: ``
        }),
        H = vueBn([]),
        ie = vueBn([]),
        U = vueBn(new Set()),
        W = vueBn([]),
        ae = ``,
        ve = 0,
        ye = vueV(() => optionsAlias.milestoneId !== null),
        q = vueV(() => !!window.electronAPI?.todos?.readPendingClipboardAttachment),
        Se = typeof navigator < `u` && /mac/i.test(navigator.platform) ? `⌘↵` : `Ctrl+Enter`,
        we = vueV(() => H.value.filter(item => item.status === `done`).length),
        Y = vueV(() => ie.value.filter(item => !U.value.has(item.id)).length + optionsAlias.uploads.filter(item => item.status !== `failed`).length + W.value.filter(item => !item.error).length),
        Te = vueV(() => Y.value >= optionsAlias.config.attachmentLimit),
        De = vueV(() => Array.from(V.title).length > 400),
        Oe = vueV(() => {
          let e = mainPt();
          return [{
            label: S(`milestoneTool.editor.quickToday`),
            value: e
          }, {
            label: S(`milestoneTool.editor.quickTomorrow`),
            value: mainZt(e, {
              days: 1
            })
          }, {
            label: S(`milestoneTool.editor.quickNextWeek`),
            value: mainZt(e, {
              days: 7
            })
          }, {
            label: S(`milestoneTool.editor.quickNextMonth`),
            value: mainZt(e, {
              months: 1
            })
          }];
        }),
        ke = vueV(() => {
          if (!V.date) return ``;
          let {
              weekday: e
            } = He(V.date, T.value),
            t = mainTt(mainPt(), V.date);
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
      let Ne = vueV(() => Me() !== ae);
      function Ie(e) {
        return e instanceof Error && e.message ? e.message : S(`milestoneTool.errors.generic`);
      }
      function Le() {
        Object.assign(V, {
          title: ``,
          content: ``,
          date: mainPt(),
          time: ``
        }), H.value = [], ie.value = [], U.value = new Set(), W.value = [], j.value = null, F.value = ``, I.value = false, N.value = ``;
      }
      function Re(e) {
        j.value = e, Object.assign(V, {
          title: e.title,
          content: e.content || ``,
          date: e.date,
          time: mainAt(e.time)
        }), H.value = [...e.todos], ie.value = [...e.attachments], U.value = new Set(), ae = Me();
      }
      async function Ue() {
        if (optionsAlias.milestoneId === null) return;
        let e = ++ve;
        M.value = true, N.value = ``, F.value = ``, I.value = false;
        try {
          let t = await mainVt.get(optionsAlias.milestoneId, mainPt());
          if (e !== ve) return;
          Re(t), M.value = false, await vueRt(), We();
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
      vueWt(y, e => {
        ve += 1, L.value = false, R.value = false, e && (Le(), ae = Me(), optionsAlias.milestoneId !== null && Ue());
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
          r = Y.value;
        for (let i of e) {
          let e = ``;
          if (mainJt(i.name) ? i.size > optionsAlias.config.attachmentMaxBytes && (e = S(`milestoneTool.errors.fileTooLarge`, {
            size: mainOt(optionsAlias.config.attachmentMaxBytes)
          })) : e = S(`milestoneTool.errors.fileType`), !e && r >= optionsAlias.config.attachmentLimit) {
            t += 1;
            continue;
          }
          e || (r += 1), n.push({
            id: crypto.randomUUID(),
            file: i,
            error: e
          });
        }
        W.value = n, t && (F.value = S(`milestoneTool.errors.fileLimit`, {
          count: optionsAlias.config.attachmentLimit,
          skipped: t
        }));
      }
      function $e(event) {
        let t = event.target;
        Qe(Array.from(t.files || [])), t.value = ``;
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
          let pendingClipboardAttachment = await mainKt.readPendingClipboardAttachment();
          if (e = pendingClipboardAttachment.token, !pendingClipboardAttachment.contentBase64) throw Error(S(`milestoneTool.editor.pasteHint`));
          let n = atob(pendingClipboardAttachment.contentBase64),
            uint8Array = new Uint8Array(n.length);
          for (let e = 0; e < n.length; e += 1) uint8Array[e] = n.charCodeAt(e);
          let fallbackValue = pendingClipboardAttachment.mimeType || `application/octet-stream`;
          Qe([new File([uint8Array], pendingClipboardAttachment.name, {
            type: fallbackValue
          })]);
        } catch (e) {
          F.value = Ie(e);
        } finally {
          e && (await mainKt.clearPendingAttachment(e).catch(() => {})), B.value = false;
        }
      }
      function rt(e) {
        return e.status === `failed` ? e.error : e.status === `queued` ? S(`milestoneTool.editor.queuedFile`) : S(`milestoneTool.editor.uploadingFile`, {
          percent: e.progress
        });
      }
      async function it() {
        if (P.value || M.value || N.value) return;
        if (!optionsAlias.user) {
          F.value = S(`milestoneTool.errors.signInExpired`);
          return;
        }
        F.value = ``, I.value = false;
        let trimmed = V.title.trim();
        if (!trimmed) {
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
        if (Y.value > optionsAlias.config.attachmentLimit) {
          F.value = S(`milestoneTool.errors.attachmentCountExceeded`, {
            count: optionsAlias.config.attachmentLimit
          });
          return;
        }
        P.value = true;
        try {
          let csrfToken = optionsAlias.user.csrfToken,
            n = mainPt(),
            record = {
              id: j.value?.id,
              version: j.value?.version,
              title: trimmed,
              content: V.content,
              date: V.date,
              time: V.time,
              todoIds: H.value.map(item => item.id)
            },
            i = j.value ? await mainVt.update(csrfToken, record, n) : await mainVt.create(csrfToken, record, n),
            emptyItems = [];
          for (let token of U.value) try {
            await mainVt.attachmentDelete(csrfToken, token);
          } catch (e) {
            emptyItems.push(Ie(e));
          }
          emitAlias(`saved`, {
            item: i,
            files: W.value.filter(item => !item.error).map(item => item.file),
            isNew: !j.value,
            warning: emptyItems.length ? S(`milestoneTool.errors.attachmentDeleteFailed`, {
              message: emptyItems[0]
            }) : ``
          }), y.value = false;
        } catch (e) {
          I.value = mainEt(e) === `MILESTONE_VERSION_CONFLICT`, F.value = I.value ? S(`milestoneTool.editor.conflict`) : Ie(e);
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
        j.value && !P.value && emitAlias(`delete`, j.value);
      }
      return (ctx, renderCache) => (vueGt(), vueS(vueC, null, [vueK(vueAn(dialogA), {
        open: y.value,
        "onUpdate:open": Je
      }, {
        default: vueYt(() => [vueK(vueAn(dialogI), {
          class: `flex max-h-[min(700px,calc(100vh-48px))] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px]`,
          onKeydown: at,
          onInteractOutside: ot
        }, {
          default: vueYt(() => [vueK(vueAn(dialogN), {
            class: `border-b border-border px-5 py-3.5 pr-12`
          }, {
            default: vueYt(() => [vueK(vueAn(dialogT), {
              class: `text-base font-semibold`
            }, {
              default: vueYt(() => [vueO(vueRr(ye.value ? vueAn(S)(`milestoneTool.editor.editTitle`) : vueAn(S)(`milestoneTool.editor.newTitle`)), 1)]),
              _: 1
            }), vueK(vueAn(mainGn), {
              class: `sr-only`
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(S)(`milestoneTool.editor.description`)), 1)]),
              _: 1
            })]),
            _: 1
          }), M.value ? (vueGt(), vueS(`div`, qt, [vueK(vueAn(beautifier), {
            class: `animate-spin`,
            size: 16
          }), vueO(vueRr(vueAn(S)(`milestoneTool.loading`)), 1)])) : N.value ? (vueGt(), vueS(`div`, Jt, [vueY(`p`, Yt, vueRr(N.value), 1), vueK(vueAn(uiSwitchR), {
            variant: `outline`,
            size: `sm`,
            onClick: Ue
          }, {
            default: vueYt(() => [vueK(vueAn(mainCn)), vueO(vueRr(vueAn(S)(`milestoneTool.retry`)), 1)]),
            _: 1
          })])) : (vueGt(), vueS(`div`, Xt, [F.value ? (vueGt(), vueS(`div`, Zt, [vueK(vueAn(Ke), {
            size: 14,
            class: `mt-px shrink-0`
          }), vueY(`span`, Qt, vueRr(F.value), 1), I.value ? (vueGt(), vueS(`button`, {
            key: 0,
            type: `button`,
            class: `shrink-0 font-medium hover:underline`,
            onClick: Ue
          }, vueRr(vueAn(S)(`milestoneTool.editor.reload`)), 1)) : vueX(``, true)])) : vueX(``, true), vueY(`label`, $t, [vueY(`span`, en, [vueY(`span`, null, [vueO(vueRr(vueAn(S)(`milestoneTool.editor.title`)) + ` `, 1), renderCache[11] ||= vueY(`em`, {
            class: `not-italic text-destructive`
          }, `*`, -1)]), De.value ? (vueGt(), vueS(`span`, tn, vueRr(Array.from(V.title).length) + `/` + vueRr(vueAn(500)), 1)) : vueX(``, true)]), vueK(vueAn(mainUn), {
            ref_key: `titleInput`,
            ref: E,
            modelValue: V.title,
            "onUpdate:modelValue": renderCache[0] ||= e => V.title = e,
            maxlength: vueAn(500),
            placeholder: vueAn(S)(`milestoneTool.editor.titlePlaceholder`),
            class: `text-sm`
          }, null, 8, [`modelValue`, `maxlength`, `placeholder`])]), vueY(`div`, nn, [vueY(`span`, rn, [vueO(vueRr(vueAn(S)(`milestoneTool.editor.date`)) + ` `, 1), renderCache[12] ||= vueY(`em`, {
            class: `not-italic text-destructive`
          }, `*`, -1)]), vueY(`div`, an, [vueK(ze, {
            modelValue: V.date,
            "onUpdate:modelValue": renderCache[1] ||= e => V.date = e,
            label: vueAn(S)(`milestoneTool.editor.date`),
            mode: `date`,
            "value-format": `date`,
            align: `start`,
            "show-quick-dates": false,
            "trigger-class": `!h-8 !w-[136px] !text-sm`
          }, null, 8, [`modelValue`, `label`]), V.time ? (vueGt(), vueS(vueC, {
            key: 0
          }, [vueK(ze, {
            modelValue: V.time,
            "onUpdate:modelValue": renderCache[2] ||= e => V.time = e,
            label: vueAn(S)(`milestoneTool.editor.time`),
            mode: `time`,
            precision: `minute`,
            "value-format": `time`,
            align: `start`,
            "trigger-class": `!h-8 !w-[88px] !text-sm`
          }, null, 8, [`modelValue`, `label`]), vueK(vueAn(uiSwitchR), {
            variant: `ghost`,
            size: `icon-sm`,
            class: `text-muted-foreground`,
            title: vueAn(S)(`milestoneTool.editor.clearTime`),
            "aria-label": vueAn(S)(`milestoneTool.editor.clearTime`),
            onClick: renderCache[3] ||= e => V.time = ``
          }, {
            default: vueYt(() => [vueK(vueAn(lucideT))]),
            _: 1
          }, 8, [`title`, `aria-label`])], 64)) : (vueGt(), vueB(vueAn(uiSwitchR), {
            key: 1,
            variant: `ghost`,
            size: `sm`,
            class: `text-xs text-muted-foreground`,
            onClick: renderCache[4] ||= e => V.time = `09:00`
          }, {
            default: vueYt(() => [vueK(vueAn(mainRn)), vueO(vueRr(vueAn(S)(`milestoneTool.editor.addTime`)), 1)]),
            _: 1
          })), ke.value ? (vueGt(), vueS(`span`, on, vueRr(ke.value), 1)) : vueX(``, true)]), vueY(`div`, sn, [(vueGt(true), vueS(vueC, null, vueSt(Oe.value, state => (vueGt(), vueS(`button`, {
            key: state.label,
            type: `button`,
            class: vueN([`h-6 rounded-md px-2 text-xs transition-colors`, V.date === state.value ? `bg-primary/10 font-medium text-primary` : `text-muted-foreground hover:bg-muted hover:text-foreground`]),
            onClick: t => V.date = state.value
          }, vueRr(state.label), 11, cn))), 128))])]), vueY(`div`, ln, [vueY(`span`, un, vueRr(vueAn(S)(`milestoneTool.editor.content`)), 1), vueK(Mt, {
            modelValue: V.content,
            "onUpdate:modelValue": renderCache[5] ||= e => V.content = e,
            placeholder: vueAn(S)(`milestoneTool.editor.contentPlaceholder`)
          }, null, 8, [`modelValue`, `placeholder`])]), vueY(`section`, dn, [vueY(`div`, fn, [vueY(`span`, pn, [vueO(vueRr(vueAn(S)(`milestoneTool.editor.todos`)) + ` `, 1), H.value.length ? (vueGt(), vueS(`span`, mn, vueRr(vueAn(S)(`milestoneTool.editor.todoSummary`, {
            done: we.value,
            total: H.value.length
          })), 1)) : vueX(``, true)]), vueK(vueAn(uiSwitchR), {
            variant: `outline`,
            size: `xs`,
            onClick: renderCache[6] ||= e => L.value = true
          }, {
            default: vueYt(() => [vueK(vueAn(uiSwitchDt)), vueO(vueRr(vueAn(S)(`milestoneTool.editor.chooseTodos`)), 1)]),
            _: 1
          })]), H.value.length ? (vueGt(), vueS(`ul`, hn, [(vueGt(true), vueS(vueC, null, vueSt(H.value, e => (vueGt(), vueS(`li`, {
            key: e.id,
            class: `flex items-center gap-2 border-b border-border px-2.5 py-1.5 last:border-b-0`
          }, [e.status === `done` ? (vueGt(), vueB(vueAn(mainVn), {
            key: 0,
            size: 15,
            class: `shrink-0 text-primary`
          })) : (vueGt(), vueB(vueAn(uiSwitchJt), {
            key: 1,
            size: 15,
            class: `shrink-0 text-muted-foreground/60`
          })), vueY(`span`, {
            class: vueN([`min-w-0 flex-1 truncate text-sm`, e.status === `done` ? `text-muted-foreground line-through` : `text-foreground`])
          }, vueRr(e.title), 3), vueY(`button`, {
            type: `button`,
            class: `grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: vueAn(S)(`milestoneTool.editor.removeTodo`),
            "aria-label": vueAn(S)(`milestoneTool.editor.removeTodo`),
            onClick: t => Xe(e.id)
          }, [vueK(vueAn(lucideT), {
            size: 13
          })], 8, gn)]))), 128))])) : (vueGt(), vueS(`p`, _n, vueRr(vueAn(S)(`milestoneTool.editor.noTodos`)), 1))]), vueY(`section`, vn, [vueY(`div`, yn, [vueY(`span`, bn, [vueO(vueRr(vueAn(S)(`milestoneTool.editor.attachments`)) + ` `, 1), vueY(`span`, xn, vueRr(Y.value) + `/` + vueRr(options.config.attachmentLimit), 1)]), vueK(vueAn(uiSwitchR), {
            variant: `ghost`,
            size: `xs`,
            class: `text-muted-foreground`,
            disabled: B.value || !q.value || Te.value,
            title: q.value ? vueAn(S)(`milestoneTool.editor.pasteHint`) : vueAn(S)(`milestoneTool.editor.pasteUnavailable`),
            onClick: nt
          }, {
            default: vueYt(() => [B.value ? (vueGt(), vueB(vueAn(beautifier), {
              key: 0,
              class: `animate-spin`
            })) : (vueGt(), vueB(vueAn(mainBn), {
              key: 1
            })), vueO(` ` + vueRr(B.value ? vueAn(S)(`milestoneTool.editor.pasting`) : vueAn(S)(`milestoneTool.editor.paste`)), 1)]),
            _: 1
          }, 8, [`disabled`, `title`])]), vueY(`input`, {
            ref_key: `fileInput`,
            ref: te,
            type: `file`,
            multiple: ``,
            hidden: ``,
            accept: vueAn(mainSt),
            onChange: $e
          }, null, 40, Sn), vueK(ToolDropzoneT, {
            class: `mt-2`,
            title: vueAn(S)(`milestoneTool.editor.dropTitle`),
            hint: vueAn(S)(`milestoneTool.editor.dropHint`, {
              count: options.config.attachmentLimit,
              size: vueAn(mainOt)(options.config.attachmentMaxBytes)
            }),
            disabled: Te.value,
            onSelect: renderCache[7] ||= e => te.value?.click(),
            onDrop: Qe
          }, null, 8, [`title`, `hint`, `disabled`]), ie.value.length || options.uploads.length || W.value.length ? (vueGt(), vueS(`ul`, Cn, [(vueGt(true), vueS(vueC, null, vueSt(ie.value, count => (vueGt(), vueS(`li`, {
            key: `saved-${count.id}`,
            class: `flex items-center gap-2 rounded-lg border border-border px-2 py-1.5`
          }, [vueY(`span`, wn, vueRr(vueAn(mainDt)(count.name)), 1), vueY(`span`, Tn, [vueY(`span`, {
            class: vueN([`block truncate text-sm`, U.value.has(count.id) ? `text-muted-foreground line-through` : `text-foreground`])
          }, vueRr(count.name), 3), vueY(`span`, En, vueRr(U.value.has(count.id) ? vueAn(S)(`milestoneTool.editor.removeOnSave`) : vueAn(mainOt)(count.size)), 1)]), U.value.has(count.id) ? (vueGt(), vueB(vueAn(uiSwitchR), {
            key: 0,
            variant: `ghost`,
            size: `xs`,
            class: `text-muted-foreground`,
            onClick: t => tt(count.id)
          }, {
            default: vueYt(() => [vueK(vueAn(mainCn)), vueO(vueRr(vueAn(S)(`milestoneTool.editor.undo`)), 1)]),
            _: 1
          }, 8, [`onClick`])) : (vueGt(), vueS(vueC, {
            key: 1
          }, [vueY(`button`, {
            type: `button`,
            class: `grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: vueAn(S)(`milestoneTool.card.download`),
            "aria-label": vueAn(S)(`milestoneTool.card.download`),
            onClick: t => emitAlias(`download`, count)
          }, [vueK(vueAn(beautifierV), {
            size: 14
          })], 8, Dn), vueY(`button`, {
            type: `button`,
            class: `grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive`,
            title: vueAn(S)(`milestoneTool.editor.removeFile`),
            "aria-label": vueAn(S)(`milestoneTool.editor.removeFile`),
            onClick: t => tt(count.id)
          }, [vueK(vueAn(uiSwitchWt), {
            size: 14
          })], 8, On)], 64))]))), 128)), (vueGt(true), vueS(vueC, null, vueSt(options.uploads, e => (vueGt(), vueS(`li`, {
            key: e.id,
            class: `flex items-center gap-2 rounded-lg border border-border px-2 py-1.5`
          }, [vueY(`span`, kn, vueRr(vueAn(mainDt)(e.file.name)), 1), vueY(`span`, An, [vueY(`span`, jn, vueRr(e.file.name), 1), vueY(`span`, {
            class: vueN([`block truncate text-xs`, e.status === `failed` ? `text-destructive` : `text-muted-foreground`])
          }, vueRr(rt(e)), 3)]), vueY(`button`, {
            type: `button`,
            class: `grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: vueAn(S)(`milestoneTool.card.cancelUpload`),
            "aria-label": vueAn(S)(`milestoneTool.card.cancelUpload`),
            onClick: t => emitAlias(`cancelUpload`, e.id)
          }, [vueK(vueAn(lucideT), {
            size: 14
          })], 8, Mn)]))), 128)), (vueGt(true), vueS(vueC, null, vueSt(W.value, e => (vueGt(), vueS(`li`, {
            key: e.id,
            class: vueN([`flex items-center gap-2 rounded-lg border px-2 py-1.5`, e.error ? `border-destructive/30 bg-destructive/5` : `border-border`])
          }, [vueY(`span`, Nn, vueRr(vueAn(mainDt)(e.file.name)), 1), vueY(`span`, Pn, [vueY(`span`, Fn, vueRr(e.file.name), 1), vueY(`span`, {
            class: vueN([`block truncate text-xs`, e.error ? `text-destructive` : `text-muted-foreground`])
          }, vueRr(e.error || `${vueAn(mainOt)(e.file.size)} · ${vueAn(S)(`milestoneTool.editor.waitingUpload`)}`), 3)]), vueY(`button`, {
            type: `button`,
            class: `grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`,
            title: vueAn(S)(`milestoneTool.editor.removePending`),
            "aria-label": vueAn(S)(`milestoneTool.editor.removePending`),
            onClick: t => et(e.id)
          }, [vueK(vueAn(lucideT), {
            size: 14
          })], 8, In)], 2))), 128))])) : vueX(``, true)])])), vueK(vueAn(dialogR), {
            class: `m-0 flex-row items-center justify-between rounded-none px-5 py-3 sm:justify-between`
          }, {
            default: vueYt(() => [ye.value && j.value ? (vueGt(), vueB(vueAn(uiSwitchR), {
              key: 0,
              variant: `ghost`,
              size: `sm`,
              class: `text-destructive hover:bg-destructive/10 hover:text-destructive`,
              disabled: P.value,
              onClick: st
            }, {
              default: vueYt(() => [vueK(vueAn(uiSwitchWt)), vueO(vueRr(vueAn(S)(`milestoneTool.editor.delete`)), 1)]),
              _: 1
            }, 8, [`disabled`])) : (vueGt(), vueS(`span`, Ln)), vueY(`div`, Rn, [vueK(vueAn(uiSwitchR), {
              variant: `outline`,
              size: `sm`,
              disabled: P.value,
              onClick: qe
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(S)(`milestoneTool.editor.cancel`)), 1)]),
              _: 1
            }, 8, [`disabled`]), vueK(vueAn(uiSwitchR), {
              size: `sm`,
              class: `min-w-16`,
              disabled: P.value || M.value || !!N.value,
              title: vueAn(S)(`milestoneTool.editor.saveShortcut`, {
                shortcut: vueAn(Se)
              }),
              onClick: it
            }, {
              default: vueYt(() => [P.value ? (vueGt(), vueB(vueAn(beautifier), {
                key: 0,
                class: `animate-spin`
              })) : vueX(``, true), vueO(` ` + vueRr(P.value ? vueAn(S)(`milestoneTool.editor.saving`) : vueAn(S)(`milestoneTool.editor.save`)), 1)]),
              _: 1
            }, 8, [`disabled`, `title`])])]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`]), vueK(Kt, {
        open: L.value,
        "onUpdate:open": renderCache[8] ||= e => L.value = e,
        selected: H.value,
        onConfirm: renderCache[9] ||= e => H.value = e
      }, null, 8, [`open`, `selected`]), vueK(vueAn(alertDialogC), {
        open: R.value,
        "onUpdate:open": renderCache[10] ||= e => R.value = e
      }, {
        default: vueYt(() => [vueK(vueAn(alertDialogA), {
          size: `sm`
        }, {
          default: vueYt(() => [vueK(vueAn(alertDialogN), null, {
            default: vueYt(() => [vueK(vueAn(alertDialogT), null, {
              default: vueYt(() => [vueO(vueRr(vueAn(S)(`milestoneTool.editor.discardTitle`)), 1)]),
              _: 1
            }), vueK(vueAn(alertDialogI), null, {
              default: vueYt(() => [vueO(vueRr(vueAn(S)(`milestoneTool.editor.discardText`)), 1)]),
              _: 1
            })]),
            _: 1
          }), vueK(vueAn(alertDialogR), null, {
            default: vueYt(() => [vueK(vueAn(alertDialogO), null, {
              default: vueYt(() => [vueO(vueRr(vueAn(S)(`milestoneTool.editor.keepEditing`)), 1)]),
              _: 1
            }), vueK(vueAn(alertDialogS), {
              variant: `destructive`,
              onClick: Ye
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(S)(`milestoneTool.editor.discard`)), 1)]),
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
  let t = vueBn([]),
    n = false,
    r = vueV(() => t.value.some(item => item.status !== `failed`));
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
          let found = t.value.find(item => item.status === `queued`);
          if (!found) break;
          let csrfToken = e.csrfToken();
          if (!csrfToken) {
            t.value.forEach(item => {
              item.status === `queued` && (item.status = `failed`, item.error = e.errorMessage(null));
            });
            break;
          }
          found.status = `uploading`, found.progress = 0, found.error = ``;
          try {
            await mainVt.uploadFile(csrfToken, found.milestoneId, found.file, e => {
              found.progress = e;
            }, () => found.cancelRequested), i(found.id), e.onUploaded(found.milestoneId);
          } catch (t) {
            found.cancelRequested || mainEt(t) === `UPLOAD_CANCELLED` ? i(found.id) : (found.status = `failed`, found.error = e.errorMessage(t));
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
    let found = t.value.find(item => item.id === e);
    found && (found.status === `uploading` ? found.cancelRequested = true : i(e));
  }
  function l(e) {
    let found = t.value.find(item => item.id === e);
    found && found.status === `failed` && (found.status = `queued`, found.error = ``, found.progress = 0, found.cancelRequested = false, o());
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
  options = {
    key: 0,
    class: `absolute bottom-5 left-1/2 z-[70] flex max-w-[calc(100%-48px)] -translate-x-1/2 items-center gap-3 rounded-full bg-foreground px-4 py-2 text-xs text-background shadow-lg`,
    role: `status`
  },
  mr = {
    class: `min-w-0 truncate`
  },
  hr = 3e4,
  gr = vueJ({
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
    setup(props, {
      expose: expose,
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        {
          t: c,
          locale: y
        } = ee(),
        {
          captureGrowthObservation: x
        } = growthTelT(),
        T = vueBn(null),
        O = vueBn([]),
        P = vueBn(false),
        F = vueBn(false),
        I = vueBn(false),
        L = vueBn(``),
        R = vueBn(false),
        z = vueBn(mainPt()),
        V = vueBn(`all`),
        H = vueBn(``),
        U = vueBn(``),
        W = vueBn(new Set()),
        ae = vueBn(new Set()),
        oe = vueBn(new Set()),
        se = vueBn(null),
        G = vueBn(Me()),
        ce = vueBn(false),
        le = vueBn(null),
        K = vueBn(null),
        be = vueBn(false),
        q = vueBn(null),
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
        let milestoneConfig = propsAlias.tool.milestoneConfig;
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
          csrfToken: () => propsAlias.user?.csrfToken ?? null,
          onUploaded: e => {
            $e(e);
          },
          errorMessage: Pe
        }),
        Fe = vueV(() => new Map(O.value.map(item => [item.id, mainIt(item, z.value)]))),
        Ie = vueV(() => {
          let e = {
            all: 0,
            upcoming: 0,
            overdue: 0,
            completed: 0
          };
          for (let count of Fe.value.values()) e.all += 1, mainFt(count, `upcoming`) ? e.upcoming += 1 : count === `overdue` ? e.overdue += 1 : count === `completed` && (e.completed += 1);
          return e;
        }),
        Le = vueV(() => [`all`, `upcoming`, `overdue`, `completed`].map(item => ({
          value: item,
          label: c(`milestoneTool.tabs.${item}`),
          count: Ie.value[item]
        }))),
        Re = vueV(() => O.value.filter(item => mainFt(Fe.value.get(item.id) ?? `planned`, V.value))),
        ze = vueV(() => mainWt(Re.value, V.value, z.value, y.value)),
        Be = vueV(() => {
          let reduced = O.value.reduce((acc, cur) => acc + cur.todoCount, 0),
            t = O.value.reduce((acc, cur) => acc + cur.completedTodoCount, 0);
          return {
            total: reduced,
            done: t,
            rate: reduced ? Math.round(t / reduced * 100) : 0
          };
        }),
        Ve = vueV(() => I.value && (O.value.length > 0 || U.value !== ``)),
        He = vueV(() => le.value === null ? [] : Z.tasksFor(le.value)),
        Ue = vueV(() => U.value ? c(`milestoneTool.empty.search`, {
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
        let indexResult = O.value.findIndex(item => item.id === e.id);
        if (indexResult >= 0) {
          let t = [...O.value];
          t[indexResult] = e, O.value = t;
        } else t && (O.value = [...O.value, e]);
      }
      function Xe(e, t) {
        let found = O.value.find(item => item.id === e);
        found && Ye({
          ...found,
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
        if (!propsAlias.user) return false;
        let n = ++xe,
          r = !!e.quiet;
        z.value = mainPt(), r || (P.value = true, L.value = ``);
        try {
          let [i, o] = await Promise.all([mainVt.summary(z.value).catch(() => null), mainVt.listAll({
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
          for (let token of O.value) W.value.has(token.id) && qe(token) && et(token.id);
          return Ce = Date.now(), I.value = true, L.value = ``, (e.observeView ?? !r) && propsAlias.active && t(`tool_view_loaded`, {
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
          let t = await mainVt.get(e, mainPt());
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
        let found = O.value.find(item => item.id === e);
        found && qe(found) && et(e);
      }
      function nt() {
        J !== null && window.clearTimeout(J), J = window.setTimeout(() => {
          J = null;
          let trimmed = H.value.trim();
          trimmed !== U.value && (U.value = trimmed, F.value = true, $({
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
        propsAlias.user && G.value.createEnabled && (le.value = null, ce.value = true);
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
        let t = K.value;
        queueMicrotask(() => {
          K.value === t && (K.value = null);
        });
      }
      async function dt() {
        let e = K.value;
        if (K.value = null, e && propsAlias.user) {
          Z.cancelFor(e.id), O.value = O.value.filter(item => item.id !== e.id), Ge(W, e.id, false);
          try {
            await mainVt.delete(propsAlias.user.csrfToken, e.id);
          } catch (t) {
            Ye(e, true), L.value = Pe(t);
          }
        }
      }
      async function ft(e, t, n = true) {
        if (!propsAlias.user || oe.value.has(e.id) || e.completedAt === undefined) return;
        let fallbackValue = e.completedAt ?? null;
        Ge(oe, e.id, true), Xe(e.id, {
          completedAt: t ? new Date().toISOString() : null
        });
        try {
          let setCompleted = await mainVt.setCompleted(propsAlias.user.csrfToken, e.id, t, mainPt()),
            found = O.value.find(item => item.id === e.id);
          Ye(found && found.content !== null && setCompleted.content === null ? {
            ...setCompleted,
            content: found.content
          } : setCompleted), n && it(c(t ? `milestoneTool.notice.completed` : `milestoneTool.notice.reopened`, {
            title: setCompleted.title
          }), () => {
            ft(setCompleted, !t, false);
          });
        } catch (t) {
          Xe(e.id, {
            completedAt: fallbackValue
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
          await mainVt.attachmentDownload(e.id);
        } catch (e) {
          it(Pe(e));
        }
      }
      async function ht(e) {
        Se && (await Se);
        let found = O.value.find(item => item.id === e);
        if (!found && U.value && (rt(false), await $({
          quiet: true
        }), found = O.value.find(item => item.id === e)), !found) {
          let n = await mainVt.get(e, mainPt()).catch(() => null);
          if (!n) return;
          Ye(n, true), found = n;
        }
        mainFt(mainIt(found, z.value), V.value) || (V.value = `all`), W.value.has(e) || (Ge(W, e, true), qe(found) && et(e)), se.value = e, await vueRt(), T.value?.querySelector(`#milestone-card-${e}`)?.scrollIntoView({
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
      return expose({
        requestClose: vt
      }), vueWt(() => propsAlias.user?.id, () => {
        Z.cancelAll(), xe += 1, O.value = [], W.value = new Set(), I.value = false, ce.value = false, K.value = null, rt(false), propsAlias.user && $();
      }), vueWt(() => propsAlias.active, e => {
        if (e) {
          if (Date.now() - Ce > hr) $({
            quiet: O.value.length > 0,
            observeView: true
          });else if (Ce > 0 && !L.value) {
            let e = x();
            vueRt(() => {
              propsAlias.active && e(`tool_view_loaded`, {
                panel: `milestone`
              });
            });
          }
        }
      }), propsAlias.user && $(), vueWt(() => [propsAlias.openRequest?.requestId, propsAlias.user?.id], async () => {
        let openRequest = propsAlias.openRequest;
        if (openRequest && propsAlias.user) try {
          await ht(openRequest.milestoneId);
        } finally {
          emitAlias(`openRequestHandled`, openRequest.requestId);
        }
      }, {
        immediate: true
      }), vueUt(() => {
        je = () => {
          z.value = mainPt(), propsAlias.active && document.visibilityState === `visible` && Date.now() - Ce > hr && $({
            quiet: true
          });
        }, window.addEventListener(`focus`, je), Ae = window.electronAPI?.todos?.onChanged?.(() => {
          propsAlias.active ? $({
            quiet: true
          }) : Ce = 0;
        }), ke = useAuthA(`milestones`, () => $({
          quiet: true
        }), {
          active: () => propsAlias.active
        });
      }), vueOt(() => {
        Z.cancelAll(), J !== null && window.clearTimeout(J), Y !== null && window.clearTimeout(Y), Ee !== null && window.clearTimeout(Ee), je && window.removeEventListener(`focus`, je), Ae?.(), ke?.(), Oe && gt(true);
      }), (n, i) => (vueGt(), vueS(`div`, Vn, [vueK(ToolboxWorkspaceHeaderT, {
        tool: props.tool,
        user: props.user,
        "credits-balance": props.creditsBalance,
        "voice-tool": false,
        "show-history": false,
        "show-balance": false,
        onBack: i[0] ||= e => emitAlias(`back`)
      }, null, 8, [`tool`, `user`, `credits-balance`]), props.user ? (vueGt(), vueS(`div`, {
        key: 1,
        ref_key: `scrollRef`,
        ref: T,
        class: `min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-7 pb-10 pt-1`
      }, [L.value ? (vueGt(), vueS(`div`, Gn, [vueK(vueAn(Ke), {
        size: 14,
        class: `mt-px shrink-0`
      }), vueY(`span`, Kn, vueRr(L.value), 1), vueY(`button`, {
        type: `button`,
        class: `shrink-0 font-medium hover:underline`,
        onClick: i[1] ||= e => $({
          quiet: O.value.length > 0
        })
      }, vueRr(vueAn(c)(`milestoneTool.retry`)), 1), vueY(`button`, {
        type: `button`,
        class: `grid size-4 shrink-0 place-items-center opacity-70 hover:opacity-100`,
        "aria-label": vueAn(c)(`milestoneTool.dismiss`),
        onClick: i[2] ||= e => L.value = ``
      }, [vueK(vueAn(lucideT), {
        size: 12
      })], 8, qn)])) : vueX(``, true), G.value.campaignText ? (vueGt(), vueS(`p`, Jn, vueRr(G.value.campaignText), 1)) : vueX(``, true), Ve.value ? (vueGt(), vueS(vueC, {
        key: 2
      }, [vueY(`section`, Yn, [vueY(`div`, Xn, [vueK(vueAn(We), null, {
        default: vueYt(() => [(vueGt(true), vueS(vueC, null, vueSt(Le.value, state => (vueGt(), vueB(vueAn(uiSwitchR), {
          key: state.value,
          size: `sm`,
          variant: V.value === state.value ? `default` : `outline`,
          class: `text-xs`,
          "aria-pressed": V.value === state.value,
          onClick: t => V.value = state.value
        }, {
          default: vueYt(() => [vueO(vueRr(state.label) + ` `, 1), vueY(`span`, Zn, vueRr(state.count), 1)]),
          _: 2
        }, 1032, [`variant`, `aria-pressed`, `onClick`]))), 128))]),
        _: 1
      }), vueY(`div`, Qn, [vueY(`label`, $n, [F.value ? (vueGt(), vueB(vueAn(beautifier), {
        key: 0,
        size: 13,
        class: `shrink-0 animate-spin`
      })) : (vueGt(), vueB(vueAn(mainSn), {
        key: 1,
        size: 13,
        class: `shrink-0`
      })), vueZt(vueY(`input`, {
        "onUpdate:modelValue": i[3] ||= e => H.value = e,
        type: `text`,
        class: `min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground`,
        placeholder: vueAn(c)(`milestoneTool.searchPlaceholder`),
        "aria-label": vueAn(c)(`milestoneTool.searchPlaceholder`),
        onInput: nt,
        onKeydown: i[4] ||= playerT(playerE(e => rt(), [`prevent`]), [`esc`])
      }, null, 40, er), [[playerC, H.value]]), H.value ? (vueGt(), vueS(`button`, {
        key: 2,
        type: `button`,
        class: `grid size-4 shrink-0 place-items-center rounded text-muted-foreground hover:text-foreground`,
        "aria-label": vueAn(c)(`milestoneTool.clearSearch`),
        onClick: i[5] ||= e => rt()
      }, [vueK(vueAn(lucideT), {
        size: 12
      })], 8, tr)) : vueX(``, true)]), vueK(vueAn(uiSwitchR), {
        size: `sm`,
        class: `text-xs`,
        disabled: !G.value.createEnabled,
        title: G.value.createEnabled ? undefined : vueAn(c)(`milestoneTool.createDisabled`),
        onClick: ot
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchDt)), vueO(vueRr(vueAn(c)(`milestoneTool.add`)), 1)]),
        _: 1
      }, 8, [`disabled`, `title`])])])]), Be.value.total ? (vueGt(), vueS(`p`, nr, vueRr(vueAn(c)(`milestoneTool.todoRate`, {
        total: Be.value.total,
        done: Be.value.done,
        rate: Be.value.rate
      })), 1)) : vueX(``, true)], 64)) : vueX(``, true), P.value && !I.value ? (vueGt(), vueS(`section`, rr, [vueK(vueAn(beautifier), {
        class: `animate-spin`,
        size: 16
      }), vueO(vueRr(vueAn(c)(`milestoneTool.loading`)), 1)])) : I.value && !O.value.length && !U.value ? (vueGt(), vueS(`section`, ir, [vueY(`span`, ar, [vueK(vueAn(flagT), {
        size: 20
      })]), vueY(`strong`, or, vueRr(vueAn(c)(`milestoneTool.empty.title`)), 1), vueY(`p`, sr, vueRr(vueAn(c)(`milestoneTool.empty.text`)), 1), vueK(vueAn(uiSwitchR), {
        size: `sm`,
        class: `text-xs`,
        disabled: !G.value.createEnabled,
        title: G.value.createEnabled ? undefined : vueAn(c)(`milestoneTool.createDisabled`),
        onClick: ot
      }, {
        default: vueYt(() => [vueK(vueAn(uiSwitchDt)), vueO(vueRr(vueAn(c)(`milestoneTool.add`)), 1)]),
        _: 1
      }, 8, [`disabled`, `title`])])) : I.value && !Re.value.length ? (vueGt(), vueS(`section`, cr, [vueY(`p`, lr, vueRr(Ue.value), 1), U.value ? (vueGt(), vueB(vueAn(uiSwitchR), {
        key: 0,
        variant: `outline`,
        size: `sm`,
        class: `text-xs`,
        onClick: i[6] ||= e => rt()
      }, {
        default: vueYt(() => [vueO(vueRr(vueAn(c)(`milestoneTool.clearSearch`)), 1)]),
        _: 1
      })) : vueX(``, true)])) : I.value ? (vueGt(), vueS(vueC, {
        key: 6
      }, [(vueGt(true), vueS(vueC, null, vueSt(ze.value, event => (vueGt(), vueS(`div`, {
        key: event.key,
        class: `mt-5`
      }, [event.titleKey ? (vueGt(), vueS(`h2`, ur, vueRr(vueAn(c)(event.titleKey)), 1)) : vueX(``, true), (vueGt(true), vueS(vueC, null, vueSt(event.months, e => (vueGt(), vueS(`div`, {
        key: e.key
      }, [vueY(`h3`, dr, vueRr(e.label), 1), (vueGt(true), vueS(vueC, null, vueSt(e.items, (t, n) => (vueGt(), vueB(Et, {
        key: t.id,
        item: t,
        status: Fe.value.get(t.id) ?? `planned`,
        today: z.value,
        expanded: W.value.has(t.id),
        highlighted: se.value === t.id,
        "detail-loading": ae.value.has(t.id),
        toggling: oe.value.has(t.id),
        uploads: vueAn(Z).tasksFor(t.id),
        first: n === 0,
        last: n === e.items.length - 1,
        onToggleExpand: e => tt(t.id),
        onEdit: e => st(t),
        onDelete: e => lt(t),
        onToggleComplete: e => pt(t),
        onOpenTodo: i[7] ||= e => emitAlias(`openTodo`, e),
        onDownload: mt,
        onCancelUploads: e => vueAn(Z).cancelFor(t.id),
        onRetryUpload: vueAn(Z).retry,
        onDismissUpload: vueAn(Z).dismiss
      }, null, 8, [`item`, `status`, `today`, `expanded`, `highlighted`, `detail-loading`, `toggling`, `uploads`, `first`, `last`, `onToggleExpand`, `onEdit`, `onDelete`, `onToggleComplete`, `onCancelUploads`, `onRetryUpload`, `onDismissUpload`]))), 128))]))), 128))]))), 128)), R.value ? (vueGt(), vueS(`p`, fr, vueRr(vueAn(c)(`milestoneTool.truncated`, {
        count: O.value.length
      })), 1)) : vueX(``, true)], 64)) : vueX(``, true)], 512)) : (vueGt(), vueS(`section`, Hn, [vueY(`span`, Un, [vueK(vueAn(flagT), {
        size: 20
      })]), vueY(`p`, Wn, vueRr(vueAn(c)(`milestoneTool.signIn`)), 1)])), vueK(playerR, {
        "enter-active-class": `transition duration-150 ease-out`,
        "enter-from-class": `translate-y-2 opacity-0`,
        "leave-active-class": `transition duration-100 ease-in`,
        "leave-to-class": `translate-y-2 opacity-0`
      }, {
        default: vueYt(() => [q.value ? (vueGt(), vueS(`div`, options, [vueY(`span`, mr, vueRr(q.value.text), 1), q.value.undo ? (vueGt(), vueS(`button`, {
          key: 0,
          type: `button`,
          class: `shrink-0 font-semibold text-primary hover:underline`,
          onClick: at
        }, vueRr(vueAn(c)(`milestoneTool.notice.undo`)), 1)) : vueX(``, true)])) : vueX(``, true)]),
        _: 1
      }), vueK(zn, {
        open: ce.value,
        "onUpdate:open": i[8] ||= e => ce.value = e,
        "milestone-id": le.value,
        user: props.user,
        config: G.value,
        uploads: He.value,
        onSaved: ct,
        onDelete: lt,
        onDownload: mt,
        onCancelUpload: vueAn(Z).cancel
      }, null, 8, [`open`, `milestone-id`, `user`, `config`, `uploads`, `onCancelUpload`]), vueK(vueAn(alertDialogC), {
        open: !!K.value,
        "onUpdate:open": ut
      }, {
        default: vueYt(() => [vueK(vueAn(alertDialogA), {
          size: `sm`
        }, {
          default: vueYt(() => [vueK(vueAn(alertDialogN), null, {
            default: vueYt(() => [vueK(vueAn(alertDialogT), null, {
              default: vueYt(() => [vueO(vueRr(vueAn(c)(`milestoneTool.confirm.deleteTitle`)), 1)]),
              _: 1
            }), vueK(vueAn(alertDialogI), {
              class: `break-words`
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(c)(`milestoneTool.confirm.deleteText`, {
                title: K.value?.title ?? ``
              })), 1)]),
              _: 1
            })]),
            _: 1
          }), vueK(vueAn(alertDialogR), null, {
            default: vueYt(() => [vueK(vueAn(alertDialogO), null, {
              default: vueYt(() => [vueO(vueRr(vueAn(c)(`milestoneTool.confirm.cancel`)), 1)]),
              _: 1
            }), vueK(vueAn(alertDialogS), {
              variant: `destructive`,
              onClick: dt
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(c)(`milestoneTool.confirm.delete`)), 1)]),
              _: 1
            })]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      }, 8, [`open`]), vueK(vueAn(alertDialogC), {
        open: be.value,
        "onUpdate:open": _t
      }, {
        default: vueYt(() => [vueK(vueAn(alertDialogA), {
          size: `sm`
        }, {
          default: vueYt(() => [vueK(vueAn(alertDialogN), null, {
            default: vueYt(() => [vueK(vueAn(alertDialogT), null, {
              default: vueYt(() => [vueO(vueRr(vueAn(c)(`milestoneTool.confirm.leaveTitle`)), 1)]),
              _: 1
            }), vueK(vueAn(alertDialogI), null, {
              default: vueYt(() => [vueO(vueRr(vueAn(c)(`milestoneTool.confirm.leaveText`)), 1)]),
              _: 1
            })]),
            _: 1
          }), vueK(vueAn(alertDialogR), null, {
            default: vueYt(() => [vueK(vueAn(alertDialogO), {
              onClick: i[9] ||= e => gt(false)
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(c)(`milestoneTool.confirm.stay`)), 1)]),
              _: 1
            }), vueK(vueAn(alertDialogS), {
              variant: `destructive`,
              onClick: i[10] ||= e => gt(true)
            }, {
              default: vueYt(() => [vueO(vueRr(vueAn(c)(`milestoneTool.confirm.leave`)), 1)]),
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