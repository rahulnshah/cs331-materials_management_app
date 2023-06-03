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