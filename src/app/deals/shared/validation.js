export const dealFormValidation = {
  source: {
    required: 'Source is required',
    maxLength: {
      value: 400,
      message: 'Source must be less than 400 characters'
    }
  },
  title: { 
    required: 'Title is required',
    maxLength: {
      value: 200,
      message: 'Title must be less than 200 characters'
    }
  },
  highlight: { 
    required: 'Highlight is required',
    maxLength: {
      value: 50,
      message: 'Highlight must be less than 50 characters'
    }
  },
  brand: {
    maxLength: {
      value: 20,
      message: "Brand can't be more than 20 characters"
    }
  },
  discount: {
    maxLength: {
      value: 50,
      message: 'Discount must be less than 50 characters'
    }
  },
  dealPrice: { 
    pattern: { 
      value: /^\d*(\.\d{1,2})?$/, 
      message: 'Deal price must be numbers with maximum 2 decimals' 
    } 
  },
  usedPrice: { 
    pattern: { 
      value: /^\d*(\.\d{1,2})?$/, 
      message: 'Used price must be numbers with maximum 2 decimals' 
    } 
  },
  description: {
    maxLength: {
      value: 400,
      message: "Description can't be more than 400 characters"
    }
  }
}