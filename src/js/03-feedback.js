import { saveToLS, loadFormLS } from "./helpers";
//провірити як працюють ф-ції
//localStorage.clear()
//saveToLS('my-data', 'hello world');
//localStorage.setItem('my-data2', 'hello world')
//const result = loadFormLS('my-data');
//console.log(result);

const refs = {
    formElem: document.querySelector(".feedback-form"),
   // inputEl: document.querySelector("[name = email]"),
   // textareaEl: document.querySelector("[name = message]"),
    //btnEl:document.querySelector()
}
/*
//варіант коли у нас не багато полів
loadData()
function loadData() {
    console.log("srart");

    const value1 = loadFormLS('email');
    const value2 = loadFormLS('message');

    console.log(refs.formElem.elements);
    const emailElem = refs.formElem.elements.email;
    const messageElem = refs.formElem.elements['message'];
    console.log(emailElem, messageElem);

    emailElem.value = value1;
    messageElem.value = value2;
}

refs.formElem.addEventListener("input", e => {
    const nameElem = e.target.name; //звязуємось з атрибутом name in HTML
    const value = e.target.value;
    console.log(nameElem, value);

    saveToLS(nameElem, value);
})
*/
//======================
//якщо багато полів 

loadData();
function loadData() {
    const data = loadFormLS('objForm') || {};

    for (let key of Object.keys(data)) {
        console.log(key);
        refs.formElem.elements[key].value=data[key]
    }
}

//всі значення всіх полів будуть зберігатися в одному обєкті
refs.formElem.addEventListener("input", (e) => {
    const data = loadFormLS('objForm') || {};
   // console.log(data);

    const nameElem = e.target.name;
    data[nameElem] = e.target.value;
    //console.log(data);
    saveToLS('objForm', data)
})

//попередження якщо будуть порожні поля
refs.formElem.addEventListener('submit', e => {
    e.preventDefault();
  //первіряєм дві властивоості, якщо у нас буде багато інпутів
    const { email, message } = e.target.elements;
    for (let key of Object.keys(e.target.elements)) {
        //виводить лише ті елементи у яких є name
        if (Number.isNaN(Number(key))) {
            const elem = e.target.elements[key];
            //console.log(elem);
            if (elem.value.trim() === "") {
                alert("Заповненні не всі поля");
                return
            }
    }
}
    // //первіряєм дві властивоості, тобто у нас тільки 2 інпут
    // if (email.value === "" || message.value === ""){ 
    //     alert("Error");
    //     return
    // }

    localStorage.removeItem('objForm');
    e.target.reset();
})
