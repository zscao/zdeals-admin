export const validation = {
  currentPassword: {
    required: 'Current password is required',
  },
  newPassword: {
    required: 'New password is required',
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message: 'Password must be minimum 8 characters, with at least 1 letter, 1 number and 1 special character'
    }
  }
}