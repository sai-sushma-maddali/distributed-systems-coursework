from mcp.server.fastmcp import FastMCP
import logging
import sys
import httpx

logging.basicConfig(stream=sys.stderr, level=logging.INFO)
logger = logging.getLogger("meals")

mcp = FastMCP("meals")

@mcp.tool()
def search_meals_by_name(query: str, limit: int = 5) -> list:
    """Search meals by name and return up to limit results."""
    
    if not (1 <= limit <= 25):
        raise ValueError("limit must be between 1 and 25")
    
    logger.info(f"Searching meals for: {query}")
    try:                                              
        with httpx.Client() as client:
            response = client.get(
                "https://www.themealdb.com/api/json/v1/1/search.php",
                params={"s": query}
            )
            response.raise_for_status()              
            data = response.json()
    except httpx.HTTPError as e:
        raise RuntimeError(f"Network error: {e}")
    except Exception as e:
        raise RuntimeError(f"Unexpected error: {e}")

    meals = data.get("meals")
    if not meals:
        return [{"message": "no matches"}]          

    results = []
    for meal in meals[:limit]:
        results.append({
            "id": meal["idMeal"],
            "name": meal["strMeal"],
            "area": meal["strArea"],
            "category": meal["strCategory"],
            "thumb": meal["strMealThumb"]
        })
    return results


@mcp.tool()
def meals_by_ingredient(ingredient: str, limit: int = 12) -> list:
    """Search meals by ingredient and return up to limit results."""
    logger.info(f"Finding meals with ingredient: {ingredient}")
    try:
        with httpx.Client() as client:
            response = client.get(
                "https://www.themealdb.com/api/json/v1/1/filter.php",
                params={"i": ingredient}
            )
            response.raise_for_status()
            data = response.json()
    except httpx.HTTPError as e:
        raise RuntimeError(f"Network error: {e}")
    except Exception as e:
        raise RuntimeError(f"Unexpected error: {e}")

    meals = data.get("meals")
    if not meals:
        return [{"message": "no matches"}]         

    results = []
    for meal in meals[:limit]:
        results.append({
            "id": meal["idMeal"],
            "name": meal["strMeal"],
            "thumb": meal["strMealThumb"]
        })
    return results


@mcp.tool()
def meal_details(id: str) -> dict:                  
    """Get full recipe details for a meal using its ID."""
    logger.info(f"Fetching details for meal id: {id}")
    try:
        with httpx.Client() as client:
            response = client.get(
                "https://www.themealdb.com/api/json/v1/1/lookup.php",
                params={"i": id}                  
            )
            response.raise_for_status()
            data = response.json()
        print(data)
    except httpx.HTTPError as e:
        raise RuntimeError(f"Network error: {e}")
    except Exception as e:
        raise RuntimeError(f"Unexpected error: {e}")

    meals = data.get("meals")
    if not meals:
        return {"message": f"no matches for id '{id}'"} 

    meal = meals[0]
    ingredients = []
    for i in range(1, 21):
        name = (meal.get(f"strIngredient{i}") or "").strip()
        measure = (meal.get(f"strMeasure{i}") or "").strip()
        if name:
            ingredients.append({"name": name, "measure": measure})

    return {
        "id": meal["idMeal"],
        "name": meal["strMeal"],
        "category": meal["strCategory"],
        "area": meal["strArea"],
        "instructions": meal["strInstructions"],
        "image": meal["strMealThumb"],
        "source": meal.get("strSource", ""),
        "youtube": meal.get("strYoutube", ""),
        "ingredients": ingredients
    }


@mcp.tool()
def random_meal() -> dict:
    """Get a random meal with full details and ingredients."""
    logger.info("Fetching a random meal")
    try:
        with httpx.Client() as client:
            response = client.get(
                "https://www.themealdb.com/api/json/v1/1/random.php"
            )
            response.raise_for_status()
            data = response.json()
    except httpx.HTTPError as e:
        raise RuntimeError(f"Network error: {e}")
    except Exception as e:
        raise RuntimeError(f"Unexpected error: {e}")

    meals = data.get("meals")
    if not meals:
        return {"message": "no matches"}

    meal = meals[0]
    ingredients = []
    for i in range(1, 21):
        name = (meal.get(f"strIngredient{i}") or "").strip()
        measure = (meal.get(f"strMeasure{i}") or "").strip()
        if name:
            ingredients.append({"name": name, "measure": measure})

    return {
        "id": meal["idMeal"],
        "name": meal["strMeal"],
        "category": meal["strCategory"],
        "area": meal["strArea"],
        "instructions": meal["strInstructions"],
        "image": meal["strMealThumb"],
        "source": meal.get("strSource", ""),
        "youtube": meal.get("strYoutube", ""),
        "ingredients": ingredients
    }

@mcp.tool()
def meals_by_first_letter(letter: str) -> list:
    """Get all meals that start with a given letter (a-z)."""
    # Validate: must be a single letter
    if len(letter) != 1 or not letter.isalpha():
        raise ValueError("Input must be a single letter (a-z)")
    
    logger.info(f"Fetching meals starting with: {letter}")
    try:
        with httpx.Client() as client:
            response = client.get(
                "https://www.themealdb.com/api/json/v1/1/search.php",
                params={"f": letter.lower()}
            )
            response.raise_for_status()
            data = response.json()
    except httpx.HTTPError as e:
        raise RuntimeError(f"Network error: {e}")
    except Exception as e:
        raise RuntimeError(f"Unexpected error: {e}")

    meals = data.get("meals")
    if not meals:
        return [{"message": f"no matches for letter '{letter}'"}]

    results = []
    for meal in meals:
        results.append({
            "id": meal["idMeal"],
            "name": meal["strMeal"],
            "area": meal["strArea"],
            "category": meal["strCategory"],
            "thumb": meal["strMealThumb"]
        })
    return results


@mcp.tool()
def list_categories() -> list:
    """Get all meal categories available in TheMealDB."""
    logger.info("Fetching all meal categories")
    try:
        with httpx.Client() as client:
            response = client.get(
                "https://www.themealdb.com/api/json/v1/1/categories.php"
            )
            response.raise_for_status()
            data = response.json()
    except httpx.HTTPError as e:
        raise RuntimeError(f"Network error: {e}")
    except Exception as e:
        raise RuntimeError(f"Unexpected error: {e}")

    categories = data.get("categories")
    if not categories:
        return [{"message": "no categories found"}]

    results = []
    for cat in categories:
        results.append({
            "id": cat["idCategory"],
            "name": cat["strCategory"],
            "thumb": cat["strCategoryThumb"],
            "description": cat["strCategoryDescription"]
        })
    return results

if __name__ == "__main__":
    mcp.run()