import { render, screen, fireEvent, within } from "@testing-library/react";
// import "@testing-library/jest-dom";
import UserList from "../UserList";
import { useUserStore } from "../../store/useUserStore";

// 1. Mock Zustand Store
jest.mock("../../store/useUserStore");
const mockedUseUserStore = useUserStore as jest.MockedFunction<
  typeof useUserStore
>;

// 2. Mock Komponen Anak (UserModal & ConfirmDialog)
jest.mock("../UserModal", () => ({
  __esModule: true,
  default: ({ open, user, onClose }: any) =>
    open ? (
      <div data-testid="user-modal">
        {user ? "Edit User" : "Add User"}{" "}
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

jest.mock("../ConfirmDialog", () => ({
  __esModule: true,
  default: ({ open, onClose, onConfirm }: any) =>
    open ? (
      <div data-testid="confirm-dialog">
        <button onClick={onConfirm}>Confirm Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
}));

describe("UserList Component", () => {
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123",
      avatar: "",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "456",
      avatar: "",
    },
  ];

  const mockFetchUsers = jest.fn();
  const mockDeleteUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Default state untuk store
    mockedUseUserStore.mockReturnValue({
      users: mockUsers,
      loading: false,
      fetchUsers: mockFetchUsers,
      addUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: mockDeleteUser,
    } as any);
  });

  test("harus menampilkan CircularProgress saat loading true", () => {
    mockedUseUserStore.mockReturnValueOnce({
      users: [],
      loading: true,
      fetchUsers: mockFetchUsers,
    } as any);

    render(<UserList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("harus memanggil fetchUsers saat pertama kali render", () => {
    render(<UserList />);
    expect(mockFetchUsers).toHaveBeenCalledTimes(1);
  });

  test("harus merender daftar user dengan benar di tampilan desktop", () => {
    render(<UserList />);

    expect(screen.getByText("User Dashboard")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  test("fungsi pencarian harus menyaring daftar user", () => {
    render(<UserList />);

    const searchInput = screen.getByPlaceholderText(/Search name or email.../i);
    fireEvent.change(searchInput, { target: { value: "Jane" } });

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  test("harus membuka UserModal saat tombol Add User diklik", () => {
    render(<UserList />);

    const addButton = screen.getByText(/Add User/i);
    fireEvent.click(addButton);

    expect(screen.getByTestId("user-modal")).toHaveTextContent("Add User");
  });

  test("harus membuka ConfirmDialog saat tombol delete diklik dan menjalankan deleteUser", () => {
    render(<UserList />);

    // Ambil tombol delete pertama (milik John Doe)
    const deleteButtons = screen.getAllByTestId("DeleteIcon");
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();

    const confirmBtn = screen.getByText("Confirm Delete");
    fireEvent.click(confirmBtn);

    expect(mockDeleteUser).toHaveBeenCalledWith(1);
  });
});
