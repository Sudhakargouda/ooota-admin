import React, { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { validateName, validateEmail, validatePhone } from "../utils/validate";

// Define User Type
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

// Initial Mock Data
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9876543210",
    status: "Inactive",
  },
];

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState<string>("");
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  // Validate Form Inputs
  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    newErrors.name = validateName(currentUser.name) || undefined;
    newErrors.email = validateEmail(currentUser.email) || undefined;
    newErrors.phone = validatePhone(currentUser.phone) || undefined;

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  // Open Add User Modal
  const handleOpenAddModal = () => {
    setCurrentUser({
      id: users.length + 1,
      name: "",
      email: "",
      phone: "",
      status: "Active",
    });
    setErrors({});
    setOpenAddModal(true);
  };

  // Handle Add User
  const handleAddUser = () => {
    if (!validateForm()) return;
    setUsers([...users, currentUser]);
    setOpenAddModal(false);
  };

  // Open Edit Modal
  const handleOpenEditModal = (user: User) => {
    setCurrentUser(user);
    setErrors({});
    setOpenEditModal(true);
  };

  // Handle Edit User
  const handleEditUser = () => {
    if (!validateForm()) return;
    setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    setOpenEditModal(false);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (id: number) => {
    setUserToDelete(id);
    setOpenDeleteModal(true);
  };

  // Handle Delete User
  const handleDeleteUser = () => {
    if (userToDelete !== null) {
      setUsers(users.filter((user) => user.id !== userToDelete));
    }
    setOpenDeleteModal(false);
  };

  return (
    <Box p={3}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardHeader
          title="Manage Users"
          action={
            <Stack direction="row" spacing={2}>
              <TextField
                label="Search Users"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ minWidth: 200 }}
              />
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenAddModal}
              >
                Add User
              </Button>
            </Stack>
          }
        />
        <CardContent>
          {/* User Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Phone No</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === "Active" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEditModal(user)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleOpenDeleteModal(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      <Dialog open={openAddModal} onClose={() => {}} disableEscapeKeyDown>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={currentUser.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={currentUser.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Phone No"
              name="phone"
              fullWidth
              value={currentUser.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/*Edit Confirmation Modal */}
      {/* Edit User Modal */}
      <Dialog open={openEditModal} onClose={() => {}} disableEscapeKeyDown>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={currentUser.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={currentUser.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Phone No"
              name="phone"
              fullWidth
              value={currentUser.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditUser}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={() => {}} disableEscapeKeyDown>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
