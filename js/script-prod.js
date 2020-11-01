
let colorPitanga = 'rgb(212, 48, 25)';

function onMouseP(element){
    
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
    let order = document.getElementById("orderDoc");
    order.style.display = 'none';
    let products = document.getElementsByClassName('product');
    let showcase = document.getElementById('showcase');
    
    showcase.style.display = 'grid';
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

    let product = myData.filter(obj => obj.productID == id)[0];
   
    let image = document.createElement('img');
    image.src = "../images/" + product.imageURL;
    image.alt = product.name;   
    modalImage.appendChild(image);

    let title = document.createElement('P');
    title.className = 'modalTitle';
    title.innerHTML= product.name;
    modalText.appendChild(title);

    let info = document.createElement('P');
    info.className = 'modalProdInfo';
    info.innerHTML= product.range + " - " + product.content;
    modalText.appendChild(info);

    let modalDescription = document.createElement('div');
    modalDescription.className = 'modalProdDescription';

    let description = document.createElement('P');
    description.innerHTML = product.description;
    modalDescription.appendChild(description);

    //get first line of details to add bold style
    let firstLine = product.details.substr(0,product.details.indexOf('<br'));
    firstLine = '<strong>'.concat(firstLine,'</strong>');
    let benefits = document.createElement('P');
    benefits.innerHTML = firstLine.concat(product.details.slice(product.details.indexOf('<br')));
    modalDescription.appendChild(document.createElement('br'));
    modalDescription.appendChild(benefits);

    
    modalText.appendChild(modalDescription);    
}

/** ADD ITEM TO CART **/
function order(){
    let showcase = document.getElementById('showcase');
    let orderDoc = document.getElementById('orderDoc');
    let orderModule = document.getElementById('orderModule');
    let orderPlaced = document.getElementById('orderPlaced');

    showcase.style.display = 'none';
    orderDoc.style.display = 'flex';
    orderModule.style.display = 'flex';
    orderPlaced.style.display = 'none';

    if (orderPlaced.hasChildNodes())
        orderPlaced.removeChild(orderPlaced.childNodes[0]);
}; 

/** ORDER FORM**/
function updateValueOrder(){
    let totalPrice = document.getElementById('totalPriceOrder');
    let products = myData;
    let total = 0;

    for(product of products){
        let element = document.getElementById(`qtd-prod-product-${product['productID']}`);
        total += element.value * product['currentPrice'];
    }
    totalPrice.innerHTML = `R$ ${total.toFixed(2)}`;
}

 $(function(){
    $('#form-order').on('submit', function(event){
        event.preventDefault();
        $.ajax({
            type: 'post',
            url: '../php/actions/place-order.php',
            data: $(this).serialize(),
            success: function(data){
                let paragraph = document.createElement('P');
                paragraph.innerHTML = data;
                
                $("#orderModule").css("display", "none");
                $("#orderPlaced").append(paragraph);
                $("#orderPlaced").css("display", "block");

                clearForms("form-order");
            }
        });
    });
}); 

function clearForms(id){
    let forms = document.getElementById(id);
    let inputs = forms.getElementsByTagName("input");

    Array.prototype.forEach.call(inputs, (input) =>{
        if(input.type == "number")
            input.value = "0";
        else
            input.value = "";

    });


}