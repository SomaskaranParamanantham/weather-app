//alert("Hello JS");
fetch ("http://localhost:3000/weather?address=Colombo").then( (response) => {
        response.json().then((data) => {
             if(data.error){
                 console.log(data.error);
             }else{
                 console.log(data.location);
                 console.log(data.forecast);
             }
        });
})


const weatherForm = document.querySelector("form");
const locationInput = document.querySelector("#location");
const message1 = document.querySelector(".message-1");
const message2 = document.querySelector(".message-2");




weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    message1.textContent = "Loading.....";
    message2.textContent= "";
    message1.classList.remove("error");

    

    const location = locationInput.value;

    if(location.length === 0){
       // console.log("Please provide an address. From client");
        message1.textContent="Please provide an address.";
        message1.classList.add("error");
    }else{
        //fetch ("http://localhost:3000/weather?address="+ location).then( (response) => {
        fetch ("/weather?address="+ location).then( (response) => {
            response.json().then((data) => {
             if(data.error){
                // console.log(data.error);
                message1.textContent=data.error;
                message1.classList.add("error");
             }else{
                //  console.log(data.location);
                //  console.log(data.forecast);
                message1.textContent =data.location;
                message2.textContent = data.forecast;
             }
        });

    });
 }

    

   // console.log("Form submitted");
   //console.log("Colombo");
}) ;