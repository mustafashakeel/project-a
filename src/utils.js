import validator from 'validator';

export function checkFields(fields){
  let valid = 1;
  let keysArray = Object.keys(fields);
  keysArray.forEach(function(key) {
    if(fields[key].required){
      const emptyField = validator.isEmpty(fields[key].value)
      fields[key].error = emptyField;
      valid = (!emptyField) ? valid + 1 : valid;
    }
  });
  return { 
    fields, 
    valid: valid === keysArray.length 
  }
}

export function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}