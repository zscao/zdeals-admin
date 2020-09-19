export const categoryFormValidation = {
  title: {
    required: 'Title is required',
    maxLength: {
      value: 50,
      message: 'Title must be less than 50 characters'
    }
  },
  code: {
    required: 'Code is required',
    maxLength: {
      value: 20,
      message: 'Code URL must be less than 20 characters'
    }
  },
}