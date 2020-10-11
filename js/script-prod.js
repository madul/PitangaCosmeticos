
let colorPitanga = 'rgb(212, 48, 25)';

console.log(myData);

function onMouse(element){
    
    element.style.cursor === 'pointer' ? 
    element.style.cursor = 'auto' :
    element.style.cursor = 'pointer';

    element.style.color === 'rgb(212, 48, 25)' ? 
    element.style.color = 'black' : 
    element.style.color = colorPitanga;
}

function apareceModal(){
    let modal = document.getElementsByClassName('modal')[0];
    
    modal.style.display === 'flex' ?
    modal.style.display = 'none' :
    modal.style.display = 'flex';
}

function pointer(element){
    
    element.style.cursor === 'pointer' ? 
    element.style.cursor = 'auto' :
    element.style.cursor = 'pointer';
}

function select(category){
    let products = document.getElementsByClassName('product');
    
    if (category === 'todos')
        Array.prototype.forEach.call(products,product => product.style.display ='grid');
    else
        Array.prototype.forEach.call(products,product => {
            product.classList.contains(category) ?
                product.style.display = 'grid' :
                product.style.display = 'none';
        });
}

window.onclick = function(event) {
    let modal = document.getElementsByClassName("modal")[0];
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

function montarModal(element){
    let id = element.parentNode.parentNode.id;
    let modalImage = document.getElementsByClassName('modalImage')[0];
    let modalText = document.getElementsByClassName('modalText')[0]
    
    while(modalImage.hasChildNodes()){
        modalImage.removeChild(modalImage.firstChild);
    }
    while(modalText.hasChildNodes()){
        modalText.removeChild(modalText.firstChild);
    }
    console.log(id);

    let product = myData.filter(obj => obj.cod == id)[0];
    console.log(product);

    let image = document.createElement('img');
    image.src = product.image;
    image.alt = product.alt;   
    modalImage.appendChild(image);

    console.log(product.titulo);
    let title = document.createElement('P');
    title.className = 'modalTitle';
    title.innerHTML= product.titulo;
    modalText.appendChild(title);

    let info = document.createElement('P');
    info.className = 'modalProdInfo';
    info.innerHTML= product.linha + " - " + product.conteudo;
    modalText.appendChild(info);

    let modalDescription = document.createElement('div');
    modalDescription.className = 'modalProdDescription';

    let description = document.createElement('P');
    description.innerHTML = product.descricao;
    modalDescription.appendChild(description);

    let benefits = document.createElement('P');
    benefits.innerHTML = product.subDescricao;
    benefits.style.fontWeight = 'bold';
    modalDescription.appendChild(document.createElement('br'));
    modalDescription.appendChild(benefits);

    product.beneficios.forEach(item =>{
        let benefit = document.createElement('P');
        benefit.innerHTML = item;
        modalDescription.appendChild(benefit);
    });

    modalText.appendChild(modalDescription);    
}