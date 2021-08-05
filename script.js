const inputButton = document.getElementById("input-button");


inputButton.addEventListener("click", function () {
    const mealValue = document.getElementById("input-meal").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealValue}`)
        .then(res => res.json())
        .then(data => showMeals(data));


    const itemsDiv = document.getElementById("items");
    const showMeals = meal => {
        console.log(meal);
        const mealList = meal.meals;
        for (let i = 0; i < mealList.length; i++) {
            const singleMeal = mealList[i];
            console.log("this is console ", singleMeal);
            const mealName = singleMeal.strMeal;
            const img = mealList[i].strMealThumb;
            const itemDiv = document.createElement("div");
            itemDiv.className = "Show-item";
            itemDiv.innerHTML =
                `<img class = "item-img" src = ${img} />
           <h2 class = "detail-info">${mealName}</h2> 
           <button class = "btn btn-danger" onclick = "showDetails('${mealName}')">Show Details</button>`
            itemsDiv.appendChild(itemDiv);
            console.log(mealList);
        }

    }

})

const showDetails = (item) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const mainItem = data.meals[0];
            const itemDetails = document.getElementById("item-details");
            itemDetails.classList.add("detail-info");


            const detailInfo = `
        <img src = "${mainItem.strMealThumb}"/>
        <h3>${mainItem.strMeal}</h3>
        <h4>Ingredients:</h4> 
        <p>${mainItem.strIngredient1}</p>
        <p>${mainItem.strIngredient2}</p>
        <p>${mainItem.strIngredient3}</p>
        <p>${mainItem.strIngredient4}</p>
        <p>${mainItem.strIngredient5}</p>
        `

            itemDetails.innerHTML = detailInfo;

        })
}




