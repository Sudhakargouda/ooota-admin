// export const validateEmail = (email: string): string | null => {
//     if (!email.trim()) return "Email is required";
//     const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
//     return emailRegex.test(email) ? null : "Invalid email format";
//   };
  
//   export const validatePassword = (password: string): string | null => {
//     if (!password.trim()) return "Password is required";
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
//     return passwordRegex.test(password) ? null : "Password must be at least 6 characters and contain at least one letter and one number";
//   };
  
//   export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
//     if (!confirmPassword.trim()) return "Confirm Password is required";
//     return password === confirmPassword ? null : "Passwords do not match";
//   };
    
export const validateName = (name: string): string | null => {
  if (!name.trim()) return "Name is required";
  return name.length >= 3 ? null : "Name must be at least 3 characters long";
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "Email is required";
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email) ? null : "Invalid email format";
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return "Phone number is required";
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone) ? null : "Phone number must be 10 digits";
};

export const validatePassword = (password: string): string | null => {
  if (!password.trim()) return "Password is required";
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password) ? null : "Password must be at least 6 characters and contain at least one letter and one number";
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword.trim()) return "Confirm Password is required";
  return password === confirmPassword ? null : "Passwords do not match";
};
