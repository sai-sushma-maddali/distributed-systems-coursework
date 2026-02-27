# Meals MCP Server

A local MCP (Model Context Protocol) server that fetches recipes from [TheMealDB](https://www.themealdb.com) API and exposes them as tools for Claude Desktop.

## Requirements

- Python 3.10+
- Anaconda (or any Python environment)

## Installation

```bash
pip install "mcp[cli]" httpx
```

## Files

```
meals_server.py   # MCP server with all tools
```

## Tools

| Tool | Description | Inputs |
|------|-------------|--------|
| `search_meals_by_name` | Search recipes by name | `query: str`, `limit: int (1-25)` |
| `meals_by_ingredient` | Find recipes by ingredient | `ingredient: str`, `limit: int` |
| `meal_details` | Get full recipe details by ID | `id: str` |
| `random_meal` | Get a random recipe | none |
| `meals_by_first_letter` | List recipes by first letter | `letter: str` |
| `list_categories` | List all meal categories | none |

## Running with MCP Inspector (for testing)

```bash
cd C:\meals
mcp dev meals_server.py
```

Open the browser URL shown in terminal. Set:
- **Command:** `C:\Users\<your_username>\anaconda3\python.exe`
- **Arguments:** `C:\meals\meals_server.py`

Click **Connect**, then **List Tools** to see all tools.

## Connecting to Claude Desktop

1. Find the config file at:
```
C:\Users\<your_username>\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json
```

2. Add the following under `mcpServers`:
```json
{
  "mcpServers": {
    "meals": {
      "command": "C:\\Users\\<your_username>\\anaconda3\\python.exe",
      "args": [
        "C:\\meals\\meals_server.py"
      ]
    }
  }
}
```

3. Fully restart Claude Desktop.

4. Go to **Settings → Connectors** — you should see the `meals` server with all 6 tools listed.

## Sample Prompts to Try in Claude

```
Give me one random meal with ingredients and measures.
```
```
Find 3 Italian pasta recipes by name and show short summaries with images.
```
```
List meals that use avocado as a main ingredient; include meal IDs so I can ask for details.
```
```
Show full details for meal id 52870.
```

## API Reference

All data is fetched from [TheMealDB](https://www.themealdb.com/api.php) using the free dev key `1`.

| Endpoint | URL |
|----------|-----|
| Search by name | `/search.php?s=<query>` |
| Filter by ingredient | `/filter.php?i=<ingredient>` |
| Lookup by ID | `/lookup.php?i=<id>` |
| Random meal | `/random.php` |
| Search by letter | `/search.php?f=<letter>` |
| List categories | `/categories.php` |