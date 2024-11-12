const fetched = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const ai = data.data.tools;
    //console.log(ai);
    gadgets(ai);
}

const gadgets = ai =>{
    //console.log(ai);
    for (item of ai){
        console.log(item);
        const cardElement = document.getElementById('card-container');
        const cardItem = document.createElement('div');
        cardItem.classList = `card card-compact bg-grey-100 p-4 shadow-xl`;
        cardItem.innerHTML = `
                    <figure>
                        <img
                        src="${item.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Features</h2>
                        <ul class="mb-3">
                        <li>${item.features[0]}</li>
                        <li>${item.features[1]}</li>
                        <li>${item.features[2]}</li>
                        </ul>
                        <hr>
                        <p>${item.name}</p>
                        <p>${item.published_in}</p>
                        </div>
                    </div>`     
              cardElement.appendChild(cardItem);      
    }
}



fetched();