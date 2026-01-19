import { Container } from "@mui/material";
import UserList from "./components/UserList";
import AppSnackBar from "./components/AppSnackBar";

export default function App() {
  return (
    <Container>
      <UserList />
      <AppSnackBar />
    </Container>
  );
}
