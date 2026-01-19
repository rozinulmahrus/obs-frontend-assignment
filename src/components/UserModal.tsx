import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { User } from "../models/User";
import { useState, useEffect } from "react";
import { generateRandomId } from "../utils/generateId";

interface Props {
  open: boolean;
  user?: User;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

export default function UserModal({ open, user, onClose, onSubmit }: Props) {
  const [idForm, setIdForm] = useState<number>(generateRandomId());
  const initialValues = {
    id: user?.id || idForm,
    name: user?.name || "",
    // username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    // website: user?.website || "",
    avatar: user?.avatar || `https://picsum.photos/seed/${Date.now()}/200`,
  };

  const [form, setForm] = useState<User>({ ...initialValues });

  useEffect(() => {
    setForm(initialValues);
    setIdForm(generateRandomId());
  }, [user]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone must contain 10–15 digits and numbers only";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit(form);
    setForm(initialValues);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          error={!!errors.name}
          helperText={errors.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={form.phone}
          error={!!errors.phone}
          helperText={errors.phone}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions sx={{ padding: "24px" }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
