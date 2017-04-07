import validator from 'validator';
import deepmerge from 'deepmerge'
export function checkFields(fields){
  let valid = 0;
  let required = 0;
  let keysArray = Object.keys(fields);
  keysArray.forEach(function(key) {
    if(fields[key].required){
      const emptyField = validator.isEmpty(fields[key].value)
      fields[key].error = emptyField;
      valid = (!emptyField) ? valid + 1 : valid;
      required++;
    }
  });
  return { 
    fields, 
    valid: valid === required 
  }
}

export function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

export function groupOfferingsByCat(services){
  var categoriesIndexed = [];
  var categories = [];
  var uncategorized = {
    id: 'uncategorized',
    cat_name: "Misc",
    children: []
  };

  services.forEach(function(service) {
    if (service.categories.length > 0 ) {
      service.categories.forEach(function(category) {
          if(!categoriesIndexed[category.id]) {
              categoriesIndexed[category.id] = {
                  id: category.id,
                  cat_name: category.name,
                  children: []
              };
              categories.push(categoriesIndexed[category.id]);
          }
          categoriesIndexed[category.id].children.push(service);
      });
    } else {
      uncategorized.children.push(service);
      // console.log(service);
    }
  });

  return categories.concat(uncategorized);
}

export function getProvidersFromAvailabilities(availabilities){

  if(typeof availabilities._days === undefined){
    return [];
  }

  var providersIndexed = [];
  var providers = [];

  availabilities._days.forEach(function(day) {
      day._schedules[0]._providers.forEach(function(provider) {
          if(!providersIndexed[provider.Id]) {
              provider.fullName = provider.User.FirstName + " " + provider.User.LastName;
              providersIndexed[provider.Id] = provider;

              providers.push(providersIndexed[provider.Id]);
          }
      });
  });

  return providers;
}


export function parseAvailabilities(availabilities){
  if(!availabilities){
    return [];
  }

  let availabilitiesArray = [];

  availabilities.forEach((provider) => {
    provider.availabilities.forEach((availabilities) => {
      const newTimeSlots = [];

      availabilities.timeSlots.forEach((timeslot)=>{
        newTimeSlots.push({
          "time": timeslot,
          "provider" : [provider.providerId]
        })
      })
      availabilities.timeSlots = newTimeSlots;
    });

    availabilitiesArray.push(provider.availabilities)
    // console.log(provider.availabilities);
  })
  if (availabilitiesArray.length > 1) {
    return deepmerge.all(availabilitiesArray);
  }else{
    return availabilitiesArray[0];    
  }


}