//popup message
document.querySelector('.show-login').addEventListener('click', function(){
    document.querySelector('.popup').classList.add('active'); 
});

document.querySelector('.popup .close-btn').addEventListener('click', function(){
    document.querySelector('.popup').classList.remove('active'); 
});

//main
class Contact{
    constructor(nama, nomor, email, pesan){
        this.nama   = nama;
        this.nomor  = nomor;
        this.email  = email;
        this.pesan  = pesan;
    }
}

class UI{
    simpanData(contact){
        const list      = document.getElementById('data-contact');
        const row       = document.createElement('tr');
            row.innerHTML   = `
                            <td>${contact.nama}</td>
                            <td>${contact.nomor}</td>
                            <td>${contact.email}</td>
                            <td>${contact.pesan}</td>
                            <td><a href="#" class="delete">X</a></td>`;
                            list.appendChild(row)
    }
    deleteContact(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }

    }
    clearFields(){
        document.getElementById('nama').value = '';
        document.getElementById('nomor').value = '';
        document.getElementById('email').value = '';
        document.getElementById('pesan').value = '';
    }
}

class dataPesan{
    static getPesan(){
        let kata;
        if(localStorage.getItem('kata') === null){
            kata = [];
        }else{
            kata = JSON.parse(localStorage.getItem('kata'));
        }
        return kata;
    }

    static tampilKontak(){
        const kata = dataPesan.getPesan();
        kata.forEach(function(contact){
            const ui = new UI;
            ui.simpanData(contact);
        });
    }

    static addPesan(contact){
        const kata = dataPesan.getPesan();
        kata.push(contact);
        localStorage.setItem('kata', JSON.stringify(kata));
    }
    
    static deleteData(pesan){
        const kata = dataPesan.getPesan();
        kata.forEach(function(contact, index){
            if(contact.pesan === pesan){
                kata.splice(index, 1);  //splice untuk menambah data atau menghapus data
            }
        });
        localStorage.setItem('kata', JSON.stringify(kata));
    }
    
    
}

document.addEventListener('DOMContentLoaded', dataPesan.tampilKontak);

document.getElementById('data-message').addEventListener('submit', function(e){
    const nama = document.getElementById('nama').value,
         nomor = document.getElementById('nomor').value,
         email = document.getElementById('email').value,
         pesan = document.getElementById('pesan').value

    const contact = new Contact(nama, nomor, email, pesan);
    const ui      = new UI();

    if(nama ==='' || nomor ==='' || email ==='' || pesan ===''){
        alert('Please complete message');

    }else{
        ui.simpanData(contact);
        alert('Data has been saved');
        dataPesan.addPesan(contact);
        ui.clearFields();

    }
    e.preventDefault();
});

document.getElementById('data-contact').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteContact(e.target);
    dataPesan.deleteData(e.target.parentElement.previousElementSibling.textContent);
    alert('are you sure to delete this?');

    e.preventDefault();
})