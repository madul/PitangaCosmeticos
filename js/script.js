
function onMouse(element){ 
  element.style.cursor = 'pointer';
}

/** LOGIN **/
function loginpop(){
  let element = document.getElementById("login");

  element.style.display === 'flex'?
  element.style.display = 'none':
  element.style.display = 'flex';
}
/** CHECK DATA OF CUSTOMER REGISTRATION**/
function validate_data(element){
  let valid = false;
  let parent = element.parentNode;
  let message = ""

  switch (element.id){
    case 'cpf':
      valid = validarCPF(element.value);
      if (!valid){
        message = 'CPF inválido.'
      }
      break;
    case 'senha':
      if (element.value.length >= 6){
        valid = true;
      } else{
        message = 'A senha precisa ter mais do que 6 caracteres.'
      }
      break;
    case 'confirmSenha':
      let senha = document.getElementById('senha').value;
      if (element.value == senha){
        valid = true;
      } else{
        message = 'As senhas não são iguais.'
      }
      break;
    case 'cep':
      valid = pesquisacep(element.value);
      if(!valid){
        message = "Formato de CEP inválido.";
      }
    
      break;
    
    default:
      valid = true;
  }
  //console.log(parent.querySelectorAll(`p.alert_${element.id}`).length);
  console.log('valid',valid);
  if(parent.querySelectorAll(`p.alert_${element.id}`).length == 0 && !valid){
    let newElement = document.createElement('P');
    newElement.className = `alert_${element.id}`;
    newElement.innerText = message;
    newElement.style.cssText += 'color:red !important; font-size:0.75rem; margin:5px;';

    parent.appendChild(newElement);
  } 

  if(parent.querySelectorAll(`p.alert_${element.id}`).length != 0 && valid){
    let oldElements = document.getElementsByClassName(`alert_${element.id}`);
    Array.from(oldElements).forEach(oldElement => oldElement.remove());
  }

  let parag = document.getElementsByTagName('P');
  let numAlert  = Array.from(parag).filter(el => el.className.match(/^alert_*/g)).length;

  console.log("alert",
    Array.from(parag).filter(el => el.className.match(/^alert_*/g)).length   
  );
  if (numAlert != 0){
    $("#btn-register").prop('disabled', true);
  }
  else{
    $("#btn-register").prop('disabled', false);
  }
}

/** LOGOUT **/
$(function(){
  $('#exit-icon').click(function () {

    $.ajax({
      url: '../php/logout.php',
      cache:false
    }).done(function(  ) {
      alert("Volte logo :)");
    });
  });
});

/** CUSTOMER REGISTRATION**/
$(function () {

  $('#form-cadastro-cliente').on('submit', function (e) {

    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '../php/actions/register-client.php',
      data: $('form').serialize(),
      success: function (data) {
        let dataArray = data.split('|');
        alert(dataArray[1]);

        $('#messageBack').text(dataArray[1]);
        if(dataArray[0] == true){
          window.location.replace('../php/produtos.php');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +
              "error thrown: " + errorThrown
        );
      }
    });
  });
});

/** SHOPPING LIST **/
function openShopList(){
  let shopList = document.getElementById('shopping-list');
  let showcase = document.getElementById('showcase');

  shopList.style.display = 'flex';
  shopList.style.width = '300px';
  shopList.style.transition = 'width 0.5s';
  shopList.style.border = '1px solid var(--color-logo1)';

  showcase.style.marginRight = '300px';
}

function closeShopList(){
  let shopList = document.getElementById('shopping-list');
  let showcase = document.getElementById('showcase');

  shopList.style.display = 'flex';
  shopList.style.width = '0';
  shopList.style.transition = 'width 0.5s';
  shopList.style.border = '1px solid transparent';

  showcase.style.marginRight = '00';
}
/** END OF SHOPPING LIST **/


/**  PRE MADE FUNCTIONS**/

/** Função do site https://tiagoporto.github.io/gerador-validador-cpf/  **/
function validarCPF(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

/** Função baseada no site https://viacep.com.br/exemplo/javascript/  **/
function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
      //Atualiza os campos com os valores.
      document.getElementById('address').value=(conteudo.logradouro);
      document.getElementById('city').value=(conteudo.localidade);
      document.getElementById('uf').value=(conteudo.uf);
  } //end if.
  else {
      //CEP não Encontrado.
      let element = document.getElementById('cep');
      element.value = "";
      let oldElements = document.getElementsByClassName(`alert_${element.id}`);
      Array.from(oldElements).forEach(oldElement => oldElement.remove());

      alert("CEP não encontrado.");
  }
}
function pesquisacep(valor) {

  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

          //Preenche os campos com "..." enquanto consulta webservice.
          document.getElementById('address').value="...";
          document.getElementById('city').value="...";
          document.getElementById('uf').value="...";

          //Cria um elemento javascript.
          var script = document.createElement('script');

          //Sincroniza com o callback.
          script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

          //Insere script no documento e carrega o conteúdo.
          document.body.appendChild(script);
          return true;

      } //end if.
      else {
          //cep é inválido.
          return false;
      }
  } //end if.
  else {
      //cep sem valor, limpa formulário.
      return false;
  }
};

