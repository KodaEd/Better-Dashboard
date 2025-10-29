mod jira;

use jira::get_jira_tickets;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![get_jira_tickets])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
