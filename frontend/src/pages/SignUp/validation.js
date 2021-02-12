
/** CHECK DATA OF CUSTOMER REGISTRATION**/
export function validate_data(event){
  event.preventDefault();
  console.log(event.target.value)
  let valid = false;
  let message = ""

  switch (event.target.id){
    case 'cpf':
      valid = validarCPF(event.target.value);
      if (!valid){
        message = 'CPF inválido.'
      }
      break;
    case 'senha':
      if (event.target.value.length >= 6){
        valid = true;
      } else{
        message = 'A senha precisa ter mais do que 6 caracteres.'
      }
      break;
    case 'confirmSenha':
      let senha = document.getElementById('senha').value;
      if (event.target.value === senha){
        valid = true;
      } else{
        message = 'As senhas não são iguais.'
      }
      break;
    case 'cep':
      valid = pesquisacep(event.target.value);
      if(!valid){
        message = "Formato de CEP inválido.";
      }
    
      break;
    
    default:
      valid = true;
  }
  //console.log(parent.querySelectorAll(`p.alert_${element.id}`).length);
  //console.log('valid',valid); 
  console.log('message: ', message)
  return {campo: event.target.id, valid: valid, message: message}
} 

/**  PRE MADE FUNCTIONS**/

/** Função do site https://tiagoporto.github.io/gerador-validador-cpf/  **/
function validarCPF(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf === '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length !== 11 || 
		cpf === "00000000000" || 
		cpf === "11111111111" || 
		cpf === "22222222222" || 
		cpf === "33333333333" || 
		cpf === "44444444444" || 
		cpf === "55555555555" || 
		cpf === "66666666666" || 
		cpf === "77777777777" || 
		cpf === "88888888888" || 
		cpf === "99999999999")
			return false;		
	// Valida 1o digito	
	let add = 0;	
  let rev = 0;
	for (let i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev === 10 || rev === 11)		
			rev = 0;	
		if (rev !== parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (let i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev === 10 || rev === 11)	
		rev = 0;	
	if (rev !== parseInt(cpf.charAt(10)))
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
  if (cep !== "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

          //Preenche os campos com "..." enquanto consulta webservice.
          document.getElementById('address').value="...";
          document.getElementById('city').value="...";
          document.getElementById('uf').value="...";


          //Sincroniza com o callback.
          let url = `https://viacep.com.br/ws/${cep}/json/`;

          fetch(url)
            .then(response => response.json())
            .then(data => meu_callback(data))
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