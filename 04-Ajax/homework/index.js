var url = 'http://localhost:5000/amigos'
let showFriends = function() {
    $('#lista').empty();
    $.get(`${url}`,function(data) {
        data.forEach(e=>{
            $('#lista').append(`<li id="${e.id}">${e.name} 
                                    <button id="${e.id}" 
                                    onclick="deleteAmigos(${e.id})">X
                                    </button> 
                                </li>`)
            //$(`<ul><li>${e.name}</li></ul>`).appendTo('h2') 
            // let li = document.createElement('li');
            // li.id = e.id
            // li.innerText = e.name;
            // let list = document.getElementById('lista');
            // list.appendChild(li);
        });
    })
}
$('#boton').click(showFriends)
$('#search').click(function() {
    let id = $('#input').val();
    console.log(id);
    if (id) {
        $.get(`${url}/${id}`, function(e) {
          $('#amigo').text(`${e.name} ${e.age} ${e.email}`);
          $('#input').val("")  
        })
    }else{
        $('#amigo').text('Tenes que ingresar un Id')
    }
})
let deleteAmigos= function(idX) {
    let id
    if (typeof idX === 'number') {
        id = idX;
    }else{
        id = $('#inputDelete').val();

    }
    let amigo;

    if (id) {
        $.get(`${url}/${id}`, function(f) {
            amigo = f
        })
        $.ajax({
           url: `${url}/${id}`, 
           type: "DELETE",
           success: function() {
                $('#sucess').text(`Tu amigo ${amigo.name} fue eliminado correctamente`);
                $('#inputDelete').val("");
                showFriends()
           }
       })
        
    }else{
        $('#sucess').text('Tenes que ingresar un Id')
    }
}
$('#delete').click(deleteAmigos)