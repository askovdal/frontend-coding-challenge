const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const birthInput = document.getElementById("birth-input");
const brandsInput = document.getElementById("brands-input");
const brandsDiv = document.getElementById("brands-div");
const categorySelector = document.getElementById("category-selector");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const birthError = document.getElementById("birth-error");
const brandsError = document.getElementById("brands-error");
const categoryError = document.getElementById("category-error");

birthInput.addEventListener("keydown", formatDate);
brandsInput.addEventListener("keydown", addBrand);

function formatDate(e) {
    if (e.key == "Backspace") {
        // When the input box has 'dd/' or 'dd/mm/' and the user wants to
        // delete a number, delete the last two characters in the input box.
        // This also prevents the user from deleting only the forward slash.
        if (birthInput.value.length == 3 || birthInput.value.length == 6) {
            e.preventDefault();
            birthInput.value = birthInput.value.slice(0, -2);
        }

    } else if (isNaN(e.key)) {
        e.preventDefault();
        
    } else {
        // Add a forward slash after the day and month have been inputted
        birthInput.addEventListener("keyup", () => {
            if (birthInput.value.length == 2 || birthInput.value.length == 5) {
                birthInput.value += "/";
            }
        });
    }
}

function addBrand(e) {
    // When the user presses comma, add a new div to the 'brands-div', add
    // the 'brand' class to it, make it's text what the user has inputted,
    // and clear the input so that the user can type in a new brand
    if (e.key == "," && brandsDiv.childElementCount < 5) {
        e.preventDefault();
        
        const brand = document.createElement("div");
        brand.classList.add("brand");
        brand.innerText = brandsInput.value;
        brandsInput.value = "";
        brandsDiv.appendChild(brand);

        // Remove the error message in case it's there
        brandsInput.style.border = "1px solid #ccc";
        brandsError.innerHTML = "&#8203;";

        brand.addEventListener('click', removeBrand);
    }
}

function removeBrand() {
    this.parentNode.removeChild(this);
}

function validateForm() {
    // Resetting the elements to their original state
    for (const i of [nameError, emailError, birthError, brandsError, categoryError]) {
        // The zero-width space is there to make the paragraph visible so it 
        // has a height, but without actually displaying anything in it
        i.innerHTML = "&#8203;";
    }
    for (const i of [nameInput, emailInput, birthInput, brandsInput, categorySelector]) {
        i.style.border = "1px solid #ccc";   
    }

    if (nameInput.value == ""){
        // If the name input is empty
        nameInput.style.border = "1px solid #f51414";
        nameError.innerText = "Please enter your full name";

    } else if (/\d/.test(nameInput.value)) {
        // If the name input contains a digit
        nameInput.style.border = "1px solid #f51414";
        nameError.innerText = "Only letters are allowed";
    
    } else if (!/\s/.test(nameInput.value)) {
        // If the name input doesn't contain a whitespace
        nameInput.style.border = "1px solid #f51414";
        nameError.innerText = "Please enter your full name";

    } else if (emailInput.value == "") {
        // If the email input is empty
        emailInput.style.border = "1px solid #f51414";
        emailError.innerText = "Please enter your email adress";

    } else if (!/[@]/.test(emailInput.value)) {
        // If the email input doesn't contain an @
        emailInput.style.border = "1px solid #f51414";
        emailError.innerText = "Please enter a valid email adress";

    } else if (birthInput.value == "") {
        // If the birth input is empty
        birthInput.style.border = "1px solid #f51414";
        birthError.innerText = "Please enter your date of birth";

    } else if (birthInput.value.length != 10) {
        // If the full birth hasn't been inputted
        birthInput.style.border = "1px solid #f51414";
        birthError.innerText = "Please enter a valid date with format dd/mm/yyyy";

    } else if (brandsDiv.childElementCount == 0) {
        // If the user hasn't inputted any brands
        brandsInput.style.border = "1px solid #f51414";
        brandsError.innerText = "Please enter at least one brand"

    } else if (categorySelector.selectedOptions[0].value == "") {
        // If no category is selected
        categorySelector.style.border = "1px solid #f51414";
        categoryError.innerText = "Please select a category"

    } else {
        // submitFormToServer();
    }
}