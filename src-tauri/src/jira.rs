use tauri::AppHandle;
use tauri_plugin_store::StoreExt;

fn get_store_value(
    store: &tauri_plugin_store::Store<tauri::Wry>,
    key: &str
) -> Result<String, String> {
    store
        .get(key)
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .ok_or_else(|| format!("{} not found", key))
}

#[tauri::command]
pub async fn get_jira_tickets(app: AppHandle) -> Result<(), String> {
    let store = app.store("settings.json").map_err(|e| e.to_string())?;

    println!("{:?}", store.entries());

    let domain = get_store_value(&store, "domain")?;
    let email = get_store_value(&store, "email")?;
    let api_key = get_store_value(&store, "apiKey")?;
    let search_query = get_store_value(&store, "searchQuery")?;

    let client = reqwest::Client::new();
    let response = client
        .get(format!("https://{}.atlassian.net/rest/api/3/search/jql", domain))
        .query(&[("jql", "assignee = currentUser() and status not in (Done, Closed, Resolved) and resolution = Unresolved")])
        .query(&[("fields", "*all")])
        .basic_auth(email, Some(api_key))
        // .header("Authorization", format!("Basic {}:{}", email, api_key))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let json: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;
    let pretty_json = serde_json::to_string_pretty(&json).map_err(|e| e.to_string())?;
    
    println!("{}", pretty_json);
    Ok(())
}
