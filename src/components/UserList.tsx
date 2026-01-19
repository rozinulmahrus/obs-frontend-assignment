import {
  Avatar,
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Pagination,
  useMediaQuery,
  Tooltip,
  CircularProgress,
  Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import UserModal from "./UserModal";
import ConfirmDialog from "./ConfirmDialog";
import { User } from "../models/User";

export default function UserList() {
  const { users, fetchUsers, addUser, updateUser, deleteUser, loading } =
    useUserStore();
  const isMobile = useMediaQuery("(max-width:768px)");
  const isMobileSmall = useMediaQuery("(max-width:480px)");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<User | undefined>();
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const PER_PAGE = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <Box p={2}>
      {!isMobile ? (
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            p: 0,
          }}
        >
          User Dashboard
        </Typography>
      ) : (
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            // border: "1px solid red",
            py: 2,
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          User Dashboard
        </Typography>
      )}

      <Box
        display="flex"
        justifyContent="right"
        mb={4}
        // border="1px solid red"
        gap={2}
        sx={
          isMobile
            ? {
                position: "sticky",
                top: 64,
                backgroundColor: "white",
                zIndex: 1,
                pb: 2,
              }
            : {}
        }
      >
        <TextField
          fullWidth={isMobile ? true : false}
          size="small"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {!isMobile ? (
          <Button
            variant="contained"
            onClick={() => {
              setSelected(undefined);
              setOpenModal(true);
            }}
          >
            Add User
          </Button>
        ) : (
          <Tooltip title="Add User">
            <Fab
              color="primary"
              aria-label="add"
              size="medium"
              sx={{ position: "fixed", bottom: 16, right: 16 }}
              onClick={() => {
                setSelected(undefined);
                setOpenModal(true);
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
      </Box>

      {!isMobile ? (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Avatar src={user.avatar} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          setSelected(user);
                          setOpenModal(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelected(user);
                          setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        paginated.map((user) => (
          <Card key={user.id} sx={{ mb: 2 }}>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow hover>
                    <TableCell>
                      <Avatar
                        src={user.avatar}
                        sx={isMobileSmall ? { width: 30, height: 30 } : {}}
                      />
                    </TableCell>
                    <TableCell />
                  </TableRow>
                  {!isMobileSmall ? (
                    <>
                      <TableRow hover>
                        <TableCell>
                          <Typography
                            fontWeight="bold"
                            // sx={isMobileSmall ? { fontSize: "14px" } : {}}
                          >
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell
                        // sx={isMobileSmall ? { fontSize: "12px" } : {}}
                        >
                          <b>: </b>
                          {user.name}
                        </TableCell>
                      </TableRow>
                      <TableRow hover>
                        <TableCell>
                          <Typography
                            fontWeight="bold"
                            // sx={isMobileSmall ? { fontSize: "14px" } : {}}
                          >
                            Email
                          </Typography>
                        </TableCell>
                        <TableCell
                        // sx={isMobileSmall ? { fontSize: "12px" } : {}}
                        >
                          <b>: </b>
                          {user.email}
                        </TableCell>
                      </TableRow>
                      <TableRow hover>
                        <TableCell>
                          <Typography
                            fontWeight="bold"
                            // sx={isMobileSmall ? { fontSize: "14px" } : {}}
                          >
                            Phone
                          </Typography>
                        </TableCell>
                        <TableCell
                        // sx={isMobileSmall ? { fontSize: "12px" } : {}}
                        >
                          <b>: </b>
                          {user.phone}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow hover>
                        <TableCell>
                          <Typography
                            fontWeight="bold"
                            sx={isMobileSmall ? { fontSize: "14px" } : {}}
                          >
                            Name
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            {user.name}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={isMobileSmall ? { fontSize: "12px" } : {}}
                        ></TableCell>
                      </TableRow>
                      <TableRow hover>
                        <TableCell>
                          <Typography
                            fontWeight="bold"
                            sx={isMobileSmall ? { fontSize: "14px" } : {}}
                          >
                            Email
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            {user.email}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={isMobileSmall ? { fontSize: "12px" } : {}}
                        ></TableCell>
                      </TableRow>
                      <TableRow hover>
                        <TableCell>
                          <Typography
                            fontWeight="bold"
                            sx={isMobileSmall ? { fontSize: "14px" } : {}}
                          >
                            Phone
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            {user.phone}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={isMobileSmall ? { fontSize: "12px" } : {}}
                        ></TableCell>
                      </TableRow>
                    </>
                  )}{" "}
                </TableBody>
              </Table>
              {/* <Avatar src={user.avatar} />
              <Divider sx={{ my: 1 }} />
              <Typography fontWeight="bold">{user.name}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>{user.email}</Typography>
              <Divider sx={{ my: 1 }} /> */}
              <Box mt={1} display="flex" justifyContent="flex-end" gap={1}>
                {!isMobileSmall ? (
                  <>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setSelected(user);
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setSelected(user);
                        setOpenDelete(true);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setSelected(user);
                          setOpenModal(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setSelected(user);
                          setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      <Pagination
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        count={Math.ceil(filtered.length / PER_PAGE)}
        page={page}
        onChange={(_, v) => setPage(v)}
      />

      <UserModal
        open={openModal}
        user={selected}
        onClose={() => setOpenModal(false)}
        onSubmit={(u) => {
          selected ? updateUser(u) : addUser(u);
          setOpenModal(false);
        }}
      />

      <ConfirmDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          if (selected) deleteUser(selected.id as number);
          setOpenDelete(false);
        }}
      />
    </Box>
  );
}
