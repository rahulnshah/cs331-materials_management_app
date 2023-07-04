export function flash(messages) {
    let flash = document.getElementById("messages");

    for(let message of messages)
    {
        //create a div (or whatever wrapper we want)
        let li = document.createElement("LI");

        //set the content
        li.innerText = message;

        //add the element to the DOM (if we don't it merely exists in memory)
        flash.appendChild(li);
    }
    setTimeout(function() {
        flash.textContent = "";
      }, 5000);
}

export function setTableHeading(table, json)
{
    // append total rows including header row in table
    for(let i = 0; i < json.length + 1; i++)
    {
        table.appendChild(document.createElement('TR')); 
    }
    
    let header_row = table.getElementsByTagName('tr')[0];

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
}
