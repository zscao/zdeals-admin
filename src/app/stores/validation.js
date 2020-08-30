export const storeFormValidation = {
  name: {
    required: 'Name is required',
    maxLength: {
      value: 50,
      message: 'Name must be less than 50 characters'
    }
  },
  website: {
    required: 'Website is required',
    maxLength: {
      value: 100,
      message: 'Website URL must be less than 100 characters'
    }
  },
  domain: {
    required: 'Domain is required',
    maxLength: {
      value: 50,
      message: 'Domain name must be less than 50 characters' 
    }
  }
}