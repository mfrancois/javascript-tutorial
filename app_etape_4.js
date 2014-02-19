document.getElementById('hello').innerHTML = "Hello World !";
document.getElementById('hello').addEventListener('click',function(event){
    event.preventDefault();
    event.target.style.backgroundColor = "#00FFFF";

});