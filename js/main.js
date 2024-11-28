let bookmarksList = JSON.parse(localStorage.getItem("bookmarks")) || []

const siteNameInput = document.getElementById("siteName")
const siteUrlInput = document.getElementById('siteUrl')
const tableBody = document.getElementById('tableBody')
const nameValidation = document.getElementById('nameValidation')
const urlValidation = document.getElementById('urlValidation')


display()

function nameValidationFunc(input) {
  if(input.value.length < 3) {
    nameValidation.classList.remove('d-none')
    return false;
  }else{
    nameValidation.classList.add('d-none')
  }
  return true;
}

function urlValidationFunc(input) {
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
  if(! urlPattern.test(input.value)) {
    urlValidation.classList.remove('d-none')
    return false;
  }else{
    urlValidation.classList.add('d-none')
  }
  return true
}

function addSiteToList(e) {

  e.preventDefault();
  if(!(nameValidationFunc(siteNameInput) && urlValidationFunc(siteUrlInput))) {
    return
  }
  

  if(!siteUrlInput.value.startsWith('https://')) {
    urlValidation.classList.remove('d-none')
    return;
  }else{
    urlValidation.classList.add('d-none')
  }
  const newSite = {
    id: Date.now(),
    name: siteNameInput.value,
    url: siteUrlInput.value
  }
  bookmarksList.push(newSite)
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksList))
  display()
}

function display() {
  let box = ``
  for(let i = 0; i < bookmarksList.length ; i++ ){
    box += ` <tr>
              <td valign="middle">${i+1}</td>
              <td valign="middle" class="text-capitalize">${bookmarksList[i].name}</td>
              <td>
                <a href="${bookmarksList[i].url}" target="_blank"
                  ><button class="btn visit-btn text-white">
                    <i class="fa-solid fa-eye text-white"></i>
                    Visit
                  </button></a
                >
              </td>
              <td>
                <button class="btn delete-btn text-white" onclick="deleteSite(${bookmarksList[i].id})">
                  <i class="fa-solid fa-trash-can text-white"></i>
                  Delete
                </button>
              </td>
            </tr>`
  }
  tableBody.innerHTML = box
}

function deleteSite(id) {
  bookmarksList = bookmarksList.filter(site => site.id !== id)
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksList))
  display()
}

