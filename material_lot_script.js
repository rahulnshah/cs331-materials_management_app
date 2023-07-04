import { flash, setTableHeading } from "./helpers.js";

const material_lots_form = document.getElementById("material_lots_form");
const orders_form = document.getElementById("orders_form");
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
let all_lots = json.message;
setTableHeading(material_lots_table, all_lots);
// this is where you start adding evets to the buttons you made and added to the material_lots table earlier 
for(let i = 1; i < material_lots_table.getElementsByTagName('tr').length; i++)
{
  for(let value of Object.values(all_lots[i-1]))
  {
      let tableData = material_lots_table.getElementsByTagName('tr')[i].appendChild(document.createElement('TD'));
      tableData.innerText = value;
  }
  let tableRow = material_lots_table.getElementsByTagName('tr')[i];
  tableRow.setAttribute("data-lot_number", all_lots[i-1].Lot_number.toString());

  // make a delete button
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

  let viewOrdersButton = document.createElement("BUTTON");
  viewOrdersButton.textContent = "View Orders";
  viewOrdersButton.classList.add("view-orders-btn");
  outerTag = material_lots_table.getElementsByTagName('tr')[i].appendChild(document.createElement('TD'));
  outerTag.appendChild(viewOrdersButton);
  viewOrdersButton.addEventListener("click", function(){
    // get all order assoiated with this lot number 
    const getOrdersPromise = fetch(`http://localhost:3000/material_lots/${lot_number}/orders`);
    getOrdersPromise
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
          let orders_table = document.getElementById("orders_table");
          // clear out the existing rows first
          orders_table.innerHTML = "";
          let purchase_orders = json.message[0].allOrders;
          setTableHeading(orders_table, purchase_orders);
          // fill in the rows
          for(let i = 1; i < orders_table.getElementsByTagName('tr').length; i++)
          {
            for(let value of Object.values(purchase_orders[i-1]))
            {
                let tableData = orders_table.getElementsByTagName('tr')[i].appendChild(document.createElement('TD'));
                tableData.innerText = value;
            }
            // set the attribute values
            tableRow = orders_table.getElementsByTagName('tr')[i];
            for(let key of Object.keys(purchase_orders[0])) // need atleast 1 object in the array
            {
              let val = purchase_orders[i-1][key];
              if(typeof val !== 'string')
              {
                val = val.toString();
              }
              tableRow.setAttribute(`data-${key}`, val);
            }

            // add edit and delete btns in each row
            deleteButton = document.createElement("BUTTON");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("orders_delete-btn");
            outerTag = orders_table.getElementsByTagName('tr')[i].appendChild(document.createElement('TD')); //reassing outerTag to anoter <td></td>
            outerTag.appendChild(deleteButton);
            deleteButton.addEventListener("click", function(){
              let product_details = encodeURIComponent(this.parentNode.parentNode.getAttribute("data-product"));
              const deleteFetchPromise = fetch(`http://localhost:3000/orders/${this.parentNode.parentNode.getAttribute("data-lot_number")}/${this.parentNode.parentNode.getAttribute("data-quantity")}/${product_details}/${this.parentNode.parentNode.getAttribute("data-unit_price")}/${this.parentNode.parentNode.getAttribute("data-total_price")}`, {
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

            editButton = document.createElement("BUTTON");
            editButton.textContent = "Edit";
            editButton.classList.add("orders-edit-btn");
            outerTag = orders_table.getElementsByTagName('tr')[i].appendChild(document.createElement('TD')); //reassing outerTag to anoter <td></td>
            outerTag.appendChild(editButton);
            editButton.addEventListener("click", function(){
              let product_details = encodeURIComponent(this.parentNode.parentNode.getAttribute("data-product"));
              // Initalize every field variable for the orders_form 
              const getOneOrderPromise = fetch(`http://localhost:3000/orders/${this.parentNode.parentNode.getAttribute("data-lot_number")}/${this.parentNode.parentNode.getAttribute("data-quantity")}/${product_details}/${this.parentNode.parentNode.getAttribute("data-unit_price")}/${this.parentNode.parentNode.getAttribute("data-total_price")}`);
              getOneOrderPromise
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
              })
              .then(json => {
                if(json.hasOwnProperty("isSuccess"))
                {
                  let order_record = json.message[0];
                  for(let order_record_property in order_record)
                  {
                    let field =  orders_form.querySelector(`#${order_record_property.toLowerCase()}`);
                    let fieldValue = order_record[order_record_property];
                    if(order_record_property === "Order_Date")
                    {
                      fieldValue = fieldValue.split("T")[0];
                    }
                    field.value = fieldValue;
                  }
                }
                else
                {
                  flash(json.message);
                }
              })
              .catch(error => {
                console.log(`Could not get single order details: ${error}`);
              });
              // hide the submitButton in material_lots form
              const submitButton = orders_form.elements["submitButton"];
              submitButton.hidden = true;
              // make an update if it does not exist
              if(!(orders_form.querySelector("button[name='update-btn']")))
              {
                let updateButton = document.createElement("BUTTON");
                updateButton.textContent = "Update";
                updateButton.type = "button";
                updateButton.setAttribute('name','update-btn');
                // append the updateButton
                orders_form.appendChild(updateButton);
                // make api call to purchase_orders api to the url that updates the record
                updateButton.addEventListener("click", function(){
                  // TODO: disable all pk fields in orders_form wen user clicks on update btn
                  const orders_form_data = new FormData(orders_form);
                  // convert the data in URL encoded data 
                  const orders_data = new URLSearchParams(orders_form_data);
                  let product_details = encodeURIComponent(orders_form.querySelector('#product').value);
                  const updateFetchPromise = fetch(`http://localhost:3000/orders/${orders_form.querySelector('#lot_number').value}/${orders_form.querySelector('#quantity').value}/${product_details}/${orders_form.querySelector("#unit_price").value}/${orders_form.querySelector("#total_price").value}`, {
                    method : "PATCH",
                    headers: 
                    {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body : orders_data
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
                      // set the message span tag with the json message sent by server 
                      flash(json.message);
                      // TODO: enable all previously disabled fiedls in purchase order form
                  })
                  .catch( error => {
                    console.log(`Could not update orders row: ${error}`);
                  });
                });
              }
              // make a cancel btn if there doesn't exist one 
              if(!(orders_form.querySelector("button[name='cancel-btn']")))
              {
                let cancelButton = document.createElement("BUTTON");
                cancelButton.textContent = "Cancel";
                cancelButton.setAttribute('name', 'cancel-btn');
                orders_form.appendChild(cancelButton);
                cancelButton.addEventListener("click", function(){
                  // remove the update btn 
                  this.previousElementSibling.remove();
                  // make submitButton appear 
                  submitButton.hidden = false;
                  // make the form blank
                  orders_form.reset();
                  this.remove();
                });
              }


            });

          }

        }
        else
        {
          flash(json.message);
        }
    })
    .catch(error => {
        console.log(`Could not get orders details: ${error}`);
    });
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