const form = document.querySelector('form');

const formFields = [
  ...form.querySelectorAll('input'), 
  ...form.querySelectorAll('select')
]
// .map((element) => {
//   return {
//     field: element.id,
//     value: element.value
//   }
// });

function handleSubmitForm(e) {
  e.preventDefault();
}

function setDataInFields(data) {
  formFields.forEach((formField) => {
    const id = formField.id.toLowerCase();

    if (id === 'uf' && data.uf) {
      formField.value = data.uf;
      formField.disabled = true;
    }

    if (id === 'cidade' && data.localidade) {
      formField.value = data.localidade;
      formField.disabled = true;
    }

    if (id === 'bairro' && data.bairro) {
      formField.value = data.bairro;
      formField.disabled = true;
    }
  });
}

async function getCepDataInApi(cep) {
  const response = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();
  return data;
}

async function handleGetCepInApi(e) {
  const cep = e.target.value;

  if (!cep.trim()) {
    e.target.value = ''
    return;
  }
  
  if (/\D/g.test(cep)) {
    alert('CEP deve possuir apenas números.');
    return;
  }

  if (cep.length !== 8) {
    alert('CEP deve possuir 8 dígitos.');
    return;
  }

  const data = await getCepDataInApi(cep);
  setDataInFields(data);
}

function initFormFields() {
  formFields.forEach((formField) => {
    if (formField.id === 'cep')
      formField.addEventListener('blur', handleGetCepInApi)
  })
}

form.addEventListener('submit', handleSubmitForm);

initFormFields();