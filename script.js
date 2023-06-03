import { flash } from "./helpers.js";

const material_lots_form = document.getElementById("material_lots_form");
const fetchPromise = fetch('http://localhost:3000/material_lots');
fetchPromise
.then( response => {
if (!response.ok) {
throw new Error(`HTTP error: ${response.status}`);
}
return response.json();
})
.then( json => {
// let's append all material_lots on to the page 

// get the table 
let material_lots_table = document.getElementById("material_lots_table");
// append total rows including header row in table
for(let i = 0; i < json.length + 1; i++)
{
  material_lots_table.appendChild(document.createElement('TR')); 
}
let header_row = material_lots_table.getElementsByTagName('tr')[0];

// append headers to header row
for(let key of Object.keys(json[0])) // need atleast 1 object in the array
{
//appendChild() returns the newly appended node
  let tableHeading = header_row.appendChild(document.createElement('TH'));
  tableHeading.innerText = key;
}
// append the Delete header 
let deleteHeading = header_row.appendChild(document.createElement('TH'));
deleteHeading.innerText = "Delete";
let editHeading = header_row.appendChild(document.createElement('TH'));
editHeading.innerText = "Edit";

for(let i = 1; i < material_lots_table.getElementsByTagName('tr').length; i++)
{
  for(let value of Object.values(json[i-1]))
  {
      let tableData = material_lots_table.getElementsByTagName('tr')[i].appendChild(document.createElement('TD'));
      tableData.innerText = value;
  }
  let tableRow = material_lots_table.getElementsByTagName('tr')[i];
  tableRow.setAttribute("data-lot_number", json[i-1].Lot_number.toString());
  let deleteButton = document.createElement("BUTTON");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("material_lots_delete-btn");
  deleteButton.addEventListener("click", function(){
    const deleteFetchPromise = fetch(`http://localhost:3000/material_lots/${this.parentNode.parentNode.getAttribute("data-lot_number")}`, {
    method : "DELETE"
    });

    deleteFetchPromise
    .then( response => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then( json => {
        console.log(json);
        // set the message span tag wit hthe json message sent by server 
        flash(json.message);
        // write code to append the row to the html table if json.hasOwnProperty(isSuccess)
    })
    .catch( error => {
      console.log(`Could not delete the row: ${error}`);
    });
  });
  let outerTag = material_lots_table.getElementsByTagName('tr')[i].appendChild(document.createElement('TD'));
  outerTag.appendChild(deleteButton);

  // make edit button 
  let editButton = document.createElement("BUTTON");
  editButton.textContent = "Edit";
  editButton.classList.add("material_lot-edit-btn");
  outerTag = material_lots_table.getElementsByTagName('tr')[i].appendChild(document.createElement('TD')); //reassing outerTag to anoter <td></td>
  outerTag.appendChild(editButton);
  let lot_number = editButton.parentNode.parentNode.getAttribute("data-lot_number");
  editButton.addEventListener("click", function(){
    // Populate the lot_number field and disable it in form and add a cancel btn next to submit btn 
    let lot_number_field = document.getElementById("lot_number");
    //lot_number_field.value = this.parentNode.parentNode.getAttribute("data-lot_number");
    // Populate all other fields - make a GET request given the lot_number 
    const getOneMaterialLotPromise = fetch(`http://localhost:3000/material_lots/${lot_number}`);
    getOneMaterialLotPromise
    .then(response => {
      if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
        // assume no errors occured and DB returned one json object for a record 
        if(json.hasOwnProperty("isSuccess"))
        {
          let material_lot_record = json.message[0];
          for (let material_lot_property in material_lot_record){
            let field =  document.getElementById(material_lot_property.toLowerCase());
            field.value = material_lot_record[material_lot_property];
          }
        }
        else
        {
          flash(json.message);
        }
    })
    .catch(error => {
        console.log(`Could not get material lot details: ${error}`);
    });

    // hide the submitButton in material_lots form
    const submitButton = material_lots_form.elements["submitButton"];
    submitButton.hidden = true;
    // make new edit btn if it does not exist
    if(!(material_lots_form.querySelector("button[name='update-btn']")))
    {
      let updateButton = document.createElement("BUTTON");
      updateButton.textContent = "Update";
      updateButton.type = "button";
      updateButton.setAttribute('name','update-btn');
      // append the updateButton
      material_lots_form.appendChild(updateButton);
      // make api call to material_lots api to the url that updates the record
      updateButton.addEventListener("click", function(){
        lot_number_field.disabled = true;
        const material_lots_form_data = new FormData(material_lots_form);
        // convert the data in URL encoded data 
        const material_lots_data = new URLSearchParams(material_lots_form_data);
        // figure out how to get the lot number now 
        const updateFetchPromise = fetch(`http://localhost:3000/material_lots/${document.getElementById("lot_number").value}`, {
          method : "PATCH",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body : material_lots_data
        });

        updateFetchPromise
        .then( response => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then( json => {
            // write code to see the updated columns in table if json.hasOwnProperty(isSuccess)
            console.log(json);
            // set the message span tag wit hthe json message sent by server 
            flash(json.message);
            // reset form
            lot_number_field.disabled = false;
            //material_lots_form.reset();
        })
        .catch( error => {
          console.log(`Could not update the row: ${error}`);
        });
      });
    }
    // make a cancel btn if there doesn't exist one 
    if(!(material_lots_form.querySelector("button[name='cancel-btn']")))
    {
      let cancelButton = document.createElement("BUTTON");
      cancelButton.textContent = "Cancel";
      cancelButton.setAttribute('name', 'cancel-btn');
      material_lots_form.appendChild(cancelButton);
      cancelButton.addEventListener("click", function(){
        lot_number_field.disabled = false;
        // remove the update btn 
        this.previousElementSibling.remove();
        // make submitButton appear 
        submitButton.hidden = false;
        // make the form blank
        material_lots_form.reset();
        this.remove();
      });
    }
  });
}
})
.catch( error => {
  console.log(`Could not get material_lots: ${error}`);
});

// code to process submission of a lot number and meterial id
material_lots_form.addEventListener("submit", function(event){
  event.preventDefault();

  const material_lots_form_data = new FormData(material_lots_form);
  // convert the data in URL encoded data 
  const material_lots_data = new URLSearchParams(material_lots_form_data);
  const postFetchPromise = fetch("http://localhost:3000/material_lots", {
    method : "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body : material_lots_data
  });

  postFetchPromise
  .then( response => {
    if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then( json => {
      console.log(json);
      // write code to append the row to the html table if json.hasOwnProperty(isSuccess)
      // set the message span tag wit hthe json message sent by server 
      flash(json.message);
  })
  .catch( error => {
    console.log(`Could not insert a row: ${error}`);
    });
    
});


