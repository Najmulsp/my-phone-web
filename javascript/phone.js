const loadPhone = async (searchText,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones =data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) =>{
    // console.log(phones)
//step 1: get the phone container
const phoneContainer =document.getElementById('phone-container');
// make phone container empty when search another one
phoneContainer.textContent ='';

// display show all button if there are more than 9 phone
const showAllButton =document.getElementById('show-all-button');
if(phones.length > 9 && !isShowAll){
    showAllButton.classList.remove('hidden')
}
else{
    showAllButton.classList.add('hidden')

}

// display only first nine phone
if(!isShowAll){
    phones =phones.slice(0,9);
}

    phones.forEach(phone =>{
        // console.log(phone);
        //step 2: create a div
        const phoneCard =document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
        //step 3: set inner html
        phoneCard.innerHTML=`
        <figure class="px-10 pt-10">
              <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <p class="font-bold text-2xl">$999</p>
             <div class="card-actions">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
          </div>
        `
    //step 4: append child
    phoneContainer.appendChild(phoneCard)

    });

    // hide search spinner
    togglerLoadingSpinner(false)

}

// modal of show details
const handleShowDetail = async(id) =>{
// console.log('i get id', id);
// load single phone data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
console.log(data)
const phone =data.data;
showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName =document.getElementById('show-detail-phone-name');
    phoneName.innerText=phone.name;
    const showDetailContainer =document.getElementById('show-detail-container');

    showDetailContainer.innerHTML=`
        <img src="${phone.image}" alt="phone" class="rounded-xl mx-auto mb-4" />
        <p><span class="text-xl font-bold">Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span class="text-xl font-bold">Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="text-xl font-bold">Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="text-xl font-bold">Memory:</span>${phone?.mainFeatures?.memory}</p>
        <p><span class="text-xl font-bold">Slug:</span>${phone?.mainFeatures?.slug}</p>
        <p><span class="text-xl font-bold">Release data:</span>
        ${phone?.mainFeatures?.releasedata}
        </p>
        <p><span class="text-xl font-bold">Brand:</span>${phone?.mainFeatures?.brand}</p>
        <p><span class="text-xl font-bold">GPS:</span>${phone?.others?.GPS || 'No gps available'}</p>

    `
    // show the modal
    show_details_modal.showModal()
}

const handleSearch = (isShowAll) =>{
    togglerLoadingSpinner(true)
    const searchField =document.getElementById('search-field');
    const searchText =searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}

const togglerLoadingSpinner = (isLoading) =>{
    const loadingSpinner =document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
        
    }
}

const handleShowAll = () =>{
    handleSearch(true);
}


