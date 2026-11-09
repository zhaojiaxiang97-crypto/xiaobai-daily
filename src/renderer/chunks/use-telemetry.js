var e = `today-work`,
  t = null,
  n = null,
  r = null,
  i = {
    report_generate_impression: `feature_map_report_expose`,
    report_generate_click: `feature_map_report_click`,
    timeline_filter_click: `feature_map_timeline_click`,
    todo_create_impression: `feature_map_todo_expose`,
    todo_create_click: `feature_map_todo_click`,
    report_template_impression: `feature_map_template_expose`,
    report_template_select: `feature_map_template_click`,
    history_report_impression: `feature_map_history_expose`,
    app_usage_chart_impression: `feature_map_usage_expose`,
    app_usage_filter_click: `feature_map_usage_click`,
    heatmap_impression: `feature_map_heat_expose`,
    heatmap_cell_click: `feature_map_heat_click`,
    invite_reward_impression: `feature_map_invite_expose`,
    invite_link_copy_click: `feature_map_invite_click`,
    plan_card_impression: `feature_map_subscribe_expose`,
    plan_select: `feature_map_subscribe_click`,
    order_create_success: `feature_map_subscribe_result`,
    capture_toggle_impression: `feature_map_settings_expose`,
    capture_toggle_click: `feature_map_settings_click`,
    capture_toggle_success: `feature_map_settings_result`,
    credit_package_select: `feature_map_recharge_click`,
    tool_card_click: `feature_map_toolbox_click`,
    update_dialog_impression: `feature_map_update_expose`,
    update_action_click: `feature_map_update_click`
  };
function a(t, n, r) {
  let a = {
    type: t,
    name: n,
    eventId: crypto.randomUUID(),
    eventName: n,
    eventSource: `desktop`,
    schemaVersion: 1,
    occurredAt: new Date().toISOString(),
    page: e,
    elementId: typeof r?.elementId == `string` ? r.elementId : void 0,
    props: r,
    ts: Date.now()
  };
  window.electronAPI?.telemetry?.track(a);
  let o = n === `page_view` ? r?.title === `timeline` ? `feature_map_timeline_expose` : r?.title === `toolbox` ? `feature_map_toolbox_expose` : `` : n === `report_copy_success` ? r?.entry === `history` ? `feature_map_history_result` : `` : n === `report_template_select` && r?.template_source !== `template_market` ? `` : i[n];
  o && window.electronAPI?.telemetry?.track({
    ...a,
    type: `action`,
    name: o,
    eventId: crypto.randomUUID(),
    eventName: o,
    props: {
      entry: n
    }
  });
  let s = n === `order_create_start` ? `journey_subscribe_order_start` : n === `report_copy_success` && r?.entry === `generate_report` ? `journey_report_copy` : ``;
  s && window.electronAPI?.telemetry?.track({
    ...a,
    type: `action`,
    name: s,
    eventId: crypto.randomUUID(),
    eventName: s,
    props: {
      entry: n,
      report_request_id: r?.report_request_id
    }
  });
}
function o(t) {
  e = t || `unknown`, a(`page_view`, `page_view`, {
    title: e
  });
}
function s(i = `today-work`) {
  return e = i, t = event => {
    let t = event.target?.closest(`button, a, [role="button"], [data-track], [data-sidebar], .nav-item`);
    t && a(`click`, `ui_click`, {
      tag: t.tagName.toLowerCase(),
      elementId: t.dataset.track || t.id || null
    });
  }, document.addEventListener(`click`, t, !0), n = () => a(`lifecycle`, `focus`), r = () => a(`lifecycle`, `blur`), window.addEventListener(`focus`, n), window.addEventListener(`blur`, r), o(e), () => {
    t && document.removeEventListener(`click`, t, !0), n && window.removeEventListener(`focus`, n), r && window.removeEventListener(`blur`, r), t = null, n = null, r = null;
  };
}
export { s as n, a as r, o as t };