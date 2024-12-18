const fetched = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const ai = data.data.tools;
    //console.log(ai);
    gadgets(ai);
}

let aiItems = [];
const gadgets = ai =>{
    //console.log(ai);
    aiItems = ai;
    const cardElement = document.getElementById('card-container');
    cardElement.innerHTML = '';

    ai.forEach(item => {
        //console.log(item);
        const cardItem = document.createElement('div');
        cardItem.classList = `card card-compact bg-grey-100 w-96 p-4 shadow-xl rounded-lg`;
        cardItem.innerHTML = `
                    <figure>
                        <img
                        src="${item.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title font-bold">Features</h2>
                        <ol class="list-decimal pl-3 mb-3 space-y-1">
                            <li>${item.features[0]}</li>
                            <li>${item.features[1]}</li>
                            <li>${item.features[2]}</li>
                        </ol>
                        <hr>
                        <p class='font-bold text-lg'>${item.name}</p>
                        <p>${item.published_in}</p>
                        <button onClick = "handleShowDetail('${item.id}')" class="btn btn-error rounded-lg">Show More Details <button/>
                    </div>`     
              cardElement.appendChild(cardItem);
    });          
    }

const handleShowDetail = async (id) => {
    //console.log('clicked show detail',id);

    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    //console.log(data);
    const phone = data.data;
    //console.log(phone);
    showPhoneDetails(phone);
}   

const showPhoneDetails = (phone) =>{
    //console.log(phone);

    const showDetailContainer = document.getElementById('show_detail_container');
    showDetailContainer.innerHTML = `
    <div class= "flex items-center justify-center gap-10 p-5">
        <div class="space-y-6 rounded-lg shadow-xl p-8">
            <h3 class="text-2xl font-bold">${phone.description}</h3>
            <div class="flex items-center justify-around gap-10 font-semibold">
                <div><span>${phone.pricing[0].price}</span><br><span>${phone.pricing[0].plan}</span></div>
                <div><span>${phone.pricing[1].price}</span><br><span>${phone.pricing[1].plan}</span></div>
                <div><span>${phone.pricing[2].price}</span><br><span>${phone.pricing[2].plan}</span></div>
            </div>

            <div class= "flex items-center justify-between gap-4">
                <div class='space-y-2'>
                 <h3 class="text-2xl font-bold">Features</h3>
                 <ul class='list-disc pl-3'>
                    <li>${phone.features[1].feature_name}</li>
                    <li>${phone.features[2].feature_name}</li>
                    <li>${phone.features[3].feature_name}</li>
                 </ul>
                </div>
                <div class='space-y-2'>
                    <h3 class="text-2xl font-bold">Integrations</h3>
                    <ul class='list-disc pl-3'>
                        <li>${phone.integrations[0]}</li>
                        <li>${phone.integrations[1]}</li>
                        <li>${phone.integrations[2]}</li>
                    </ul>
                </div>
            </div>
        </div>    
        <div class='space-y-3'>
            <figure>
                <img
                src="${phone.image_link[0]}"
                class="max-w-full"
                alt="Shoes" />
            </figure>
            <p class='text-center font-semibold text-xl'>${phone.input_output_examples[0].input}</p>
            <p class='text-center'>${phone.input_output_examples[0].output}</p>
        </div>
    </div>
    `;
    showDetails_modal.showModal();
}

    const sortByDateElement = document.getElementById('sort-date-btn');
    sortByDateElement.addEventListener('click', () => {
    const sortedItems = aiItems.sort((a, b) => {
        const dateA = new Date(a.published_in.split("-").reverse().join("-"));
        const dateB = new Date(b.published_in.split("-").reverse().join("-"));
        return dateA - dateB; // Ascending order
    });
    gadgets(sortedItems); // Re-render cards in sorted order
});



fetched();