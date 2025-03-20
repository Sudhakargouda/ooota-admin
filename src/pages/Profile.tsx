import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";
import { validatePassword, validateConfirmPassword } from "../utils/validate";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { Lock, ExitToApp, Person } from "@mui/icons-material";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Handle Password Change
  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    const newPasswordError = validatePassword(passwords.newPassword);
    const confirmPasswordError = validateConfirmPassword(passwords.newPassword, passwords.confirmPassword);

    // Set errors
    setErrors({
      newPassword: newPasswordError || undefined,
      confirmPassword: confirmPasswordError || undefined,
    });

    // Check if there are no errors
    if (!newPasswordError && !confirmPasswordError) {
      alert("Password updated successfully!");
      setPasswords({ newPassword: "", confirmPassword: "" });
    }
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f4f4f9" p={3}>
      {/* Profile Card */}
      <Card sx={{ width: 400, mb: 3, textAlign: "center", boxShadow: 3, borderRadius: 2 }}>
        <CardHeader 
          avatar={<Avatar sx={{ bgcolor: "#3f51b5" }}><Person /></Avatar>} 
          title={<Typography variant="h6" fontWeight="bold">Profile Information</Typography>} 
        />
        <CardContent>
          <Typography variant="body1"><strong>Name:</strong> {user?.name || "N/A"}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user?.email || "N/A"}</Typography>
          <Typography variant="body1"><strong>Phone:</strong> +123 456 7890</Typography>
        </CardContent>
      </Card>

      {/* Change Password Card */}
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader 
          avatar={<Avatar sx={{ bgcolor: "#f50057" }}><Lock /></Avatar>} 
          title={<Typography variant="h6" fontWeight="bold">Change Password</Typography>} 
        />
        <CardContent>
          <form onSubmit={handlePasswordChange}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button
        variant="contained"
        color="error"
        startIcon={<ExitToApp />}
        sx={{ mt: 3, fontWeight: "bold", px: 4, py: 1.2, boxShadow: 2 }}
        onClick={() => setLogoutDialogOpen(true)}
      >
        Logout
      </Button>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        sx={{ "& .MuiPaper-root": { borderRadius: 3, p: 2 } }} // Centered & Styled
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1" textAlign="center">
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setLogoutDialogOpen(false)} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} variant="contained" color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
