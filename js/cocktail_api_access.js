/*

cocktail_api_access.js
Copyright 2020 Riley Lannon

API access functions

*/

// API URL constant
const API_URL = "http://localhost:5000/api/v1"   // since it's locally hosted for now, use localhost

async function get_data(url)
{
    /*

    get_data
    Fetches data from an API and returns JSON objects

    @param  url The API path we are fetching data from

    */
    
    url = API_URL + url;    // add the API path to the end of the API url

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

async function name_query(name)
{
    /*

    name_query
    Queries the API for cocktails of a given name, returning JSON

    */
    
    return await get_data(`/cocktail/${name}`)
}

async function ingredient_query(table) {
    /*

    ingredient_query
    Queries the API for cocktails with the specified ingredients

    */

    // todo: differentiate between the different ingredient inclusions of 'any', 'all', and 'only'
    let ingredients_string = "/ingredients/";
    let tbody = table.querySelector('tbody');
    for (let i = 0; i < tbody.children.length; i++) {
        // get the ingredient name
        let name = tbody.children[i].firstChild.innerText;  // tbody->trow->first tcol->text
        ingredients_string += name;
        if (i < (tbody.children.length - 1)) {
            ingredients_string += "+";
        }
    }

    // make the API call
    let recipes = await get_data(ingredients_string);
    return recipes;
}

async function garnish_query(table) {
    // query the api by garnish
    let recipes = [];
    let tbody = table.querySelector('tbody');
    for (let i = 0; i < tbody.children.length; i++) {
        let garnish_name = tbody.children[i].firstChild.innerText;
        let fetched = await get_data(`/garnish/${garnish_name}`);

        for (let recipe of fetched) {
            recipes.push(recipe);
        }
    }
    return recipes;
}

async function drinkware_query(table)
{
    /*

    drinkware_query
    Formulates a drinkware query

    @param  table   The table that contains all of the data

    */
    
    let recipes = [];

    let tbody = table.querySelector('tbody');
    for (let i = 0; i < tbody.children.length; i++) {
        // get the drinkware name
        let trow = tbody.children[i];
        let tcol = trow.firstChild;
        let drinkware_name = tcol.innerText;

        // now, use our API to get the data we want
        let fetched = await get_data(`/drinkware/${drinkware_name}`);

        // now, iterate over 'fetched' and add the returned recipes to 'recipes'
        for (let recipe of fetched) {
            recipes.push(recipe);
        }
    }

    // return all of our fetched recipes
    return recipes;
}

async function served_query(table) {
    // Query by serving method
    let recipes = [];
    let tbody = table.querySelector('tbody');
    for (let i = 0; i < tbody.children.length; i++) {
        // get the name
        let served_name = tbody.children[i].firstChild.innerText;
        let fetched = await get_data(`/served/${served_name}`);
        for (let recipe of fetched) {
            recipes.push(recipe);
        }
    }
    return recipes;
}
