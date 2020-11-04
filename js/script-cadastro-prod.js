//let colorPitanga = 'rgb(212, 48, 25)';

//console.log('aqui');
/* function onMouseCad(element){
    
    element.style.cursor === 'pointer' ? 
    element.style.cursor = 'auto' :
    element.style.cursor = 'pointer';

    element.style.color === 'rgb(212, 48, 25)' ? 
    element.style.color = 'black' : 
    element.style.color = colorPitanga;
} */

function selectCad(menu){
  let page = document.getElementById('mutable').children;
  
  Array.prototype.forEach.call(page,element => {
    if (element.id == menu){
      element.style.display = 'block';
    }
    else{
      element.style.display = 'none';
    }
  });
}

function alterar(element){

  let id = element.id;
  let product = myData.filter(obj => obj.productID == id)[0];

  let productID = document.getElementById('alt-productID');
  let imagem = document.getElementById('alt-imageURL');
  let category = document.getElementById('alt-category');
  let price = document.getElementById('alt-price');
  let currentPrice = document.getElementById('alt-currentPrice');
  let description = document.getElementById('alt-description');
  let name = document.getElementById('alt-name');
  let range = document.getElementById('alt-range');
  let content = document.getElementById('alt-content');
  let details = document.getElementById('alt-details');
  let href = document.getElementById('alt-href');
  
  productID.value = product['productID'];
  imagem.defaultValue = product['imageURL'];
  category.defaultValue = product['category'];
  price.defaultValue = product['price'];
  currentPrice.defaultValue = product['currentPrice'];
  description.defaultValue = product['description'];
  name.defaultValue = product['name'];
  range.defaultValue = product['range'];
  content.defaultValue = product['content'];
  details.defaultValue = product['details'];
  href.defaultValue = product['href'];

  selectCad('alterar-prod');
}



