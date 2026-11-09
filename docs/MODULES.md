# 主进程模块依赖图

> 由 AST/正则从 `src/main` 静态 import 提取，箭头 A → B 表示 A 依赖 B。

```mermaid
graph LR
  lib_app-language_js["lib/app-language.js"] --> services_settings_repository_js["services/settings.repository.js"]
  main_js["main.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  main_js["main.js"] --> services_settings_repository_js["services/settings.repository.js"]
  main_js["main.js"] --> services_telemetry_service_js["services/telemetry.service.js"]
  main_js["main.js"] --> services_native-active-context-collector_service_js["services/native-active-context-collector.service.js"]
  main_js["main.js"] --> services_work-record_repository_js["services/work-record.repository.js"]
  main_js["main.js"] --> lib_app-language_js["lib/app-language.js"]
  main_js["main.js"] --> services_xiaohei-bot-schedule_service_js["services/xiaohei-bot-schedule.service.js"]
  main_js["main.js"] --> services_auth_service_js["services/auth.service.js"]
  main_js["main.js"] --> services_window-messaging_js["services/window-messaging.js"]
  main_js["main.js"] --> services_clipboard-assistant_service_js["services/clipboard-assistant.service.js"]
  main_js["main.js"] --> services_screenshot-beautifier_service_js["services/screenshot-beautifier.service.js"]
  main_js["main.js"] --> services_web-account-scheduler_service_js["services/web-account-scheduler.service.js"]
  main_js["main.js"] --> services_web-account-auth_service_js["services/web-account-auth.service.js"]
  main_js["main.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  main_js["main.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  main_js["main.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  main_js["main.js"] --> lib_types_js["lib/types.js"]
  main_js["main.js"] --> vendors_music-metadata_ID3v2Token_js["vendors/music-metadata/ID3v2Token.js"]
  main_js["main.js"] --> vendors_music-metadata_ID3v1Parser_js["vendors/music-metadata/ID3v1Parser.js"]
  services_auth_service_js["services/auth.service.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  services_auth_service_js["services/auth.service.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_auth_service_js["services/auth.service.js"] --> services_telemetry_service_js["services/telemetry.service.js"]
  services_auth_service_js["services/auth.service.js"] --> services_work-record_repository_js["services/work-record.repository.js"]
  services_auth_service_js["services/auth.service.js"] --> lib_app-language_js["lib/app-language.js"]
  services_auth_service_js["services/auth.service.js"] --> services_xiaohei-bot-schedule_service_js["services/xiaohei-bot-schedule.service.js"]
  services_auth_service_js["services/auth.service.js"] --> services_window-messaging_js["services/window-messaging.js"]
  services_auth_service_js["services/auth.service.js"] --> services_clipboard-assistant_service_js["services/clipboard-assistant.service.js"]
  services_auth_service_js["services/auth.service.js"] --> services_screenshot-beautifier_service_js["services/screenshot-beautifier.service.js"]
  services_clipboard-assistant_service_js["services/clipboard-assistant.service.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  services_clipboard-assistant_service_js["services/clipboard-assistant.service.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_clipboard-assistant_service_js["services/clipboard-assistant.service.js"] --> services_work-record_repository_js["services/work-record.repository.js"]
  services_clipboard-assistant_service_js["services/clipboard-assistant.service.js"] --> services_window-messaging_js["services/window-messaging.js"]
  services_screenshot-beautifier_service_js["services/screenshot-beautifier.service.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  services_screenshot-beautifier_service_js["services/screenshot-beautifier.service.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_screenshot-beautifier_service_js["services/screenshot-beautifier.service.js"] --> services_native-active-context-collector_service_js["services/native-active-context-collector.service.js"]
  services_screenshot-beautifier_service_js["services/screenshot-beautifier.service.js"] --> lib_app-language_js["lib/app-language.js"]
  services_screenshot-beautifier_service_js["services/screenshot-beautifier.service.js"] --> services_window-messaging_js["services/window-messaging.js"]
  services_telemetry_service_js["services/telemetry.service.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  services_telemetry_service_js["services/telemetry.service.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_telemetry_service_js["services/telemetry.service.js"] --> services_native-active-context-collector_service_js["services/native-active-context-collector.service.js"]
  services_telemetry_service_js["services/telemetry.service.js"] --> services_work-record_repository_js["services/work-record.repository.js"]
  services_telemetry_service_js["services/telemetry.service.js"] --> lib_app-language_js["lib/app-language.js"]
  services_web-account-auth_service_js["services/web-account-auth.service.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_web-account-auth_service_js["services/web-account-auth.service.js"] --> services_web-account-scheduler_service_js["services/web-account-scheduler.service.js"]
  services_web-account-recognition_service_js["services/web-account-recognition.service.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_web-account-recognition_service_js["services/web-account-recognition.service.js"] --> services_web-account-scheduler_service_js["services/web-account-scheduler.service.js"]
  services_web-account-recognition_service_js["services/web-account-recognition.service.js"] --> services_web-account-auth_service_js["services/web-account-auth.service.js"]
  services_web-account-scheduler_service_js["services/web-account-scheduler.service.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_work-record_repository_js["services/work-record.repository.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_work-record_repository_js["services/work-record.repository.js"] --> lib_app-language_js["lib/app-language.js"]
  services_xiaohei-bot-management_service_js["services/xiaohei-bot-management.service.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_xiaohei-bot-management_service_js["services/xiaohei-bot-management.service.js"] --> services_telemetry_service_js["services/telemetry.service.js"]
  services_xiaohei-bot-management_service_js["services/xiaohei-bot-management.service.js"] --> services_xiaohei-bot-schedule_service_js["services/xiaohei-bot-schedule.service.js"]
  services_xiaohei-bot-management_service_js["services/xiaohei-bot-management.service.js"] --> services_auth_service_js["services/auth.service.js"]
  services_xiaohei-bot-memory-tools_js["services/xiaohei-bot-memory-tools.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_xiaohei-bot-memory-tools_js["services/xiaohei-bot-memory-tools.js"] --> services_auth_service_js["services/auth.service.js"]
  services_xiaohei-bot-schedule_service_js["services/xiaohei-bot-schedule.service.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_xiaohei-bot-schedule_service_js["services/xiaohei-bot-schedule.service.js"] --> services_telemetry_service_js["services/telemetry.service.js"]
  services_xiaohei-bot-schedule_service_js["services/xiaohei-bot-schedule.service.js"] --> lib_app-language_js["lib/app-language.js"]
  services_xiaohei-bot-share-tools_js["services/xiaohei-bot-share-tools.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_xiaohei-bot-share-tools_js["services/xiaohei-bot-share-tools.js"] --> services_telemetry_service_js["services/telemetry.service.js"]
  services_xiaohei-bot-share-tools_js["services/xiaohei-bot-share-tools.js"] --> services_xiaohei-bot-schedule_service_js["services/xiaohei-bot-schedule.service.js"]
  services_xiaohei-bot-shared-workspace-tools_js["services/xiaohei-bot-shared-workspace-tools.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_xiaohei-bot-shared-workspace-tools_js["services/xiaohei-bot-shared-workspace-tools.js"] --> services_auth_service_js["services/auth.service.js"]
  services_xiaohei-bot-user-profile-tools_js["services/xiaohei-bot-user-profile-tools.js"] --> services_settings_repository_js["services/settings.repository.js"]
  services_xiaohei-bot-user-profile-tools_js["services/xiaohei-bot-user-profile-tools.js"] --> services_auth_service_js["services/auth.service.js"]
  vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_AbstractID3Parser_js["vendors/music-metadata/AbstractID3Parser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_AbstractID3Parser_js["vendors/music-metadata/AbstractID3Parser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_AbstractID3Parser_js["vendors/music-metadata/AbstractID3Parser.js"] --> vendors_music-metadata_ID3v2Token_js["vendors/music-metadata/ID3v2Token.js"]
  vendors_music-metadata_AbstractID3Parser_js["vendors/music-metadata/AbstractID3Parser.js"] --> vendors_music-metadata_ID3v1Parser_js["vendors/music-metadata/ID3v1Parser.js"]
  vendors_music-metadata_AbstractID3Parser_js["vendors/music-metadata/AbstractID3Parser.js"] --> vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"]
  vendors_music-metadata_AiffParser_js["vendors/music-metadata/AiffParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_AiffParser_js["vendors/music-metadata/AiffParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_AiffParser_js["vendors/music-metadata/AiffParser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_AiffParser_js["vendors/music-metadata/AiffParser.js"] --> vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"]
  vendors_music-metadata_AsfParser_js["vendors/music-metadata/AsfParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_AsfParser_js["vendors/music-metadata/AsfParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_AsfParser_js["vendors/music-metadata/AsfParser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_AsfParser_js["vendors/music-metadata/AsfParser.js"] --> lib_types_js["lib/types.js"]
  vendors_music-metadata_AsfParser_js["vendors/music-metadata/AsfParser.js"] --> vendors_music-metadata_ID3v2Token_js["vendors/music-metadata/ID3v2Token.js"]
  vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_DsdiffParser_js["vendors/music-metadata/DsdiffParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_DsdiffParser_js["vendors/music-metadata/DsdiffParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_DsdiffParser_js["vendors/music-metadata/DsdiffParser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_DsdiffParser_js["vendors/music-metadata/DsdiffParser.js"] --> vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"]
  vendors_music-metadata_DsfParser_js["vendors/music-metadata/DsfParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_DsfParser_js["vendors/music-metadata/DsfParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_DsfParser_js["vendors/music-metadata/DsfParser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_DsfParser_js["vendors/music-metadata/DsfParser.js"] --> vendors_music-metadata_ID3v2Token_js["vendors/music-metadata/ID3v2Token.js"]
  vendors_music-metadata_DsfParser_js["vendors/music-metadata/DsfParser.js"] --> vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"]
  vendors_music-metadata_DsfParser_js["vendors/music-metadata/DsfParser.js"] --> vendors_music-metadata_AbstractID3Parser_js["vendors/music-metadata/AbstractID3Parser.js"]
  vendors_music-metadata_FlacParser_js["vendors/music-metadata/FlacParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_FlacParser_js["vendors/music-metadata/FlacParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_FlacParser_js["vendors/music-metadata/FlacParser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_FlacParser_js["vendors/music-metadata/FlacParser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_FlacParser_js["vendors/music-metadata/FlacParser.js"] --> vendors_music-metadata_ID3v2Token_js["vendors/music-metadata/ID3v2Token.js"]
  vendors_music-metadata_FlacParser_js["vendors/music-metadata/FlacParser.js"] --> vendors_music-metadata_AbstractID3Parser_js["vendors/music-metadata/AbstractID3Parser.js"]
  vendors_music-metadata_ID3v1Parser_js["vendors/music-metadata/ID3v1Parser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_ID3v1Parser_js["vendors/music-metadata/ID3v1Parser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_ID3v1Parser_js["vendors/music-metadata/ID3v1Parser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_ID3v1Parser_js["vendors/music-metadata/ID3v1Parser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"] --> vendors_music-metadata_ID3v2Token_js["vendors/music-metadata/ID3v2Token.js"]
  vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"] --> vendors_music-metadata_ID3v1Parser_js["vendors/music-metadata/ID3v1Parser.js"]
  vendors_music-metadata_ID3v2Token_js["vendors/music-metadata/ID3v2Token.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_ID3v2Token_js["vendors/music-metadata/ID3v2Token.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_MP4Parser_js["vendors/music-metadata/MP4Parser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_MP4Parser_js["vendors/music-metadata/MP4Parser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_MP4Parser_js["vendors/music-metadata/MP4Parser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_MP4Parser_js["vendors/music-metadata/MP4Parser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_MP4Parser_js["vendors/music-metadata/MP4Parser.js"] --> lib_types_js["lib/types.js"]
  vendors_music-metadata_MP4Parser_js["vendors/music-metadata/MP4Parser.js"] --> vendors_music-metadata_ID3v1Parser_js["vendors/music-metadata/ID3v1Parser.js"]
  vendors_music-metadata_MatroskaParser_js["vendors/music-metadata/MatroskaParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_MatroskaParser_js["vendors/music-metadata/MatroskaParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_MatroskaParser_js["vendors/music-metadata/MatroskaParser.js"] --> lib_types_js["lib/types.js"]
  vendors_music-metadata_MpegParser_js["vendors/music-metadata/MpegParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_MpegParser_js["vendors/music-metadata/MpegParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_MpegParser_js["vendors/music-metadata/MpegParser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_MpegParser_js["vendors/music-metadata/MpegParser.js"] --> vendors_music-metadata_AbstractID3Parser_js["vendors/music-metadata/AbstractID3Parser.js"]
  vendors_music-metadata_MusepackParser_js["vendors/music-metadata/MusepackParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_MusepackParser_js["vendors/music-metadata/MusepackParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_MusepackParser_js["vendors/music-metadata/MusepackParser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_MusepackParser_js["vendors/music-metadata/MusepackParser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_MusepackParser_js["vendors/music-metadata/MusepackParser.js"] --> vendors_music-metadata_AbstractID3Parser_js["vendors/music-metadata/AbstractID3Parser.js"]
  vendors_music-metadata_OggParser_js["vendors/music-metadata/OggParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_OggParser_js["vendors/music-metadata/OggParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_OggParser_js["vendors/music-metadata/OggParser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_OggParser_js["vendors/music-metadata/OggParser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_OggParser_js["vendors/music-metadata/OggParser.js"] --> vendors_music-metadata_FlacParser_js["vendors/music-metadata/FlacParser.js"]
  vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_WavPackParser_js["vendors/music-metadata/WavPackParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_WavPackParser_js["vendors/music-metadata/WavPackParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_WavPackParser_js["vendors/music-metadata/WavPackParser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_WavPackParser_js["vendors/music-metadata/WavPackParser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_WaveParser_js["vendors/music-metadata/WaveParser.js"] --> lib_rolldown-runtime_js["lib/rolldown-runtime.js"]
  vendors_music-metadata_WaveParser_js["vendors/music-metadata/WaveParser.js"] --> vendors_music-metadata_BasicParser_js["vendors/music-metadata/BasicParser.js"]
  vendors_music-metadata_WaveParser_js["vendors/music-metadata/WaveParser.js"] --> vendors_music-metadata_APEv2Parser_js["vendors/music-metadata/APEv2Parser.js"]
  vendors_music-metadata_WaveParser_js["vendors/music-metadata/WaveParser.js"] --> vendors_music-metadata_Util_js["vendors/music-metadata/Util.js"]
  vendors_music-metadata_WaveParser_js["vendors/music-metadata/WaveParser.js"] --> vendors_music-metadata_ID3v2Parser_js["vendors/music-metadata/ID3v2Parser.js"]
```

## 依赖明细

- **lib/app-language.js**
  - `services/settings.repository.js`
- **main.js**
  - `lib/rolldown-runtime.js`
  - `services/settings.repository.js`
  - `services/telemetry.service.js`
  - `services/native-active-context-collector.service.js`
  - `services/work-record.repository.js`
  - `lib/app-language.js`
  - `services/xiaohei-bot-schedule.service.js`
  - `services/auth.service.js`
  - `services/window-messaging.js`
  - `services/clipboard-assistant.service.js`
  - `services/screenshot-beautifier.service.js`
  - `services/web-account-scheduler.service.js`
  - `services/web-account-auth.service.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/Util.js`
  - `lib/types.js`
  - `vendors/music-metadata/ID3v2Token.js`
  - `vendors/music-metadata/ID3v1Parser.js`
- **services/auth.service.js**
  - `lib/rolldown-runtime.js`
  - `services/settings.repository.js`
  - `services/telemetry.service.js`
  - `services/work-record.repository.js`
  - `lib/app-language.js`
  - `services/xiaohei-bot-schedule.service.js`
  - `services/window-messaging.js`
  - `services/clipboard-assistant.service.js`
  - `services/screenshot-beautifier.service.js`
- **services/clipboard-assistant.service.js**
  - `lib/rolldown-runtime.js`
  - `services/settings.repository.js`
  - `services/work-record.repository.js`
  - `services/window-messaging.js`
- **services/screenshot-beautifier.service.js**
  - `lib/rolldown-runtime.js`
  - `services/settings.repository.js`
  - `services/native-active-context-collector.service.js`
  - `lib/app-language.js`
  - `services/window-messaging.js`
- **services/telemetry.service.js**
  - `lib/rolldown-runtime.js`
  - `services/settings.repository.js`
  - `services/native-active-context-collector.service.js`
  - `services/work-record.repository.js`
  - `lib/app-language.js`
- **services/web-account-auth.service.js**
  - `services/settings.repository.js`
  - `services/web-account-scheduler.service.js`
- **services/web-account-recognition.service.js**
  - `services/settings.repository.js`
  - `services/web-account-scheduler.service.js`
  - `services/web-account-auth.service.js`
- **services/web-account-scheduler.service.js**
  - `services/settings.repository.js`
- **services/work-record.repository.js**
  - `services/settings.repository.js`
  - `lib/app-language.js`
- **services/xiaohei-bot-management.service.js**
  - `services/settings.repository.js`
  - `services/telemetry.service.js`
  - `services/xiaohei-bot-schedule.service.js`
  - `services/auth.service.js`
- **services/xiaohei-bot-memory-tools.js**
  - `services/settings.repository.js`
  - `services/auth.service.js`
- **services/xiaohei-bot-schedule.service.js**
  - `services/settings.repository.js`
  - `services/telemetry.service.js`
  - `lib/app-language.js`
- **services/xiaohei-bot-share-tools.js**
  - `services/settings.repository.js`
  - `services/telemetry.service.js`
  - `services/xiaohei-bot-schedule.service.js`
- **services/xiaohei-bot-shared-workspace-tools.js**
  - `services/settings.repository.js`
  - `services/auth.service.js`
- **services/xiaohei-bot-user-profile-tools.js**
  - `services/settings.repository.js`
  - `services/auth.service.js`
- **vendors/music-metadata/APEv2Parser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/Util.js`
- **vendors/music-metadata/AbstractID3Parser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/ID3v2Token.js`
  - `vendors/music-metadata/ID3v1Parser.js`
  - `vendors/music-metadata/ID3v2Parser.js`
- **vendors/music-metadata/AiffParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/ID3v2Parser.js`
- **vendors/music-metadata/AsfParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/Util.js`
  - `lib/types.js`
  - `vendors/music-metadata/ID3v2Token.js`
- **vendors/music-metadata/BasicParser.js**
  - `lib/rolldown-runtime.js`
- **vendors/music-metadata/DsdiffParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/ID3v2Parser.js`
- **vendors/music-metadata/DsfParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/ID3v2Token.js`
  - `vendors/music-metadata/ID3v2Parser.js`
  - `vendors/music-metadata/AbstractID3Parser.js`
- **vendors/music-metadata/FlacParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/Util.js`
  - `vendors/music-metadata/ID3v2Token.js`
  - `vendors/music-metadata/AbstractID3Parser.js`
- **vendors/music-metadata/ID3v1Parser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/Util.js`
- **vendors/music-metadata/ID3v2Parser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/Util.js`
  - `vendors/music-metadata/ID3v2Token.js`
  - `vendors/music-metadata/ID3v1Parser.js`
- **vendors/music-metadata/ID3v2Token.js**
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/Util.js`
- **vendors/music-metadata/MP4Parser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/Util.js`
  - `lib/types.js`
  - `vendors/music-metadata/ID3v1Parser.js`
- **vendors/music-metadata/MatroskaParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `lib/types.js`
- **vendors/music-metadata/MpegParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/Util.js`
  - `vendors/music-metadata/AbstractID3Parser.js`
- **vendors/music-metadata/MusepackParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/Util.js`
  - `vendors/music-metadata/AbstractID3Parser.js`
- **vendors/music-metadata/OggParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/Util.js`
  - `vendors/music-metadata/FlacParser.js`
- **vendors/music-metadata/Util.js**
  - `vendors/music-metadata/BasicParser.js`
- **vendors/music-metadata/WavPackParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/Util.js`
- **vendors/music-metadata/WaveParser.js**
  - `lib/rolldown-runtime.js`
  - `vendors/music-metadata/BasicParser.js`
  - `vendors/music-metadata/APEv2Parser.js`
  - `vendors/music-metadata/Util.js`
  - `vendors/music-metadata/ID3v2Parser.js`

## 无内部依赖（叶子模块）

- `lib/rolldown-runtime.js`
- `lib/types.js`
- `preload/clipboard-picker-preload.cjs`
- `preload/keyboard-sound-audio-preload.cjs`
- `preload/preload.cjs`
- `preload/screenshot-tool-preload.cjs`
- `preload/todo-floating-preload.cjs`
- `preload/wooden-fish-preload.cjs`
- `preload/work-motivator-preload.cjs`
- `services/native-active-context-collector.service.js`
- `services/settings.repository.js`
- `services/window-messaging.js`