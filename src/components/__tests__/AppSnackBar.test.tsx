import { render, screen, fireEvent } from "@testing-library/react";
import AppSnackbar from "../AppSnackBar";
import { useUserStore } from "../../store/useUserStore";
import { useMediaQuery } from "@mui/material";

// 1. Mock Zustand Store
jest.mock("../../store/useUserStore");
const mockedUseUserStore = useUserStore as jest.MockedFunction<
  typeof useUserStore
>;

// 2. Mock useMediaQuery untuk mensimulasikan Desktop/Mobile
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("AppSnackbar Component", () => {
  const mockCloseSnackbar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("harus merender SnackBar dengan pesan yang benar saat terbuka", () => {
    // Setup state store agar snackbar terbuka
    mockedUseUserStore.mockReturnValue({
      snackbar: {
        open: true,
        message: "Berhasil menyimpan data",
        severity: "success",
      },
      closeSnackbar: mockCloseSnackbar,
    } as any);

    render(<AppSnackbar />);

    expect(screen.getByText("Berhasil menyimpan data")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess");
  });

  test("tidak boleh merender apapun saat snackbar.open adalah false", () => {
    mockedUseUserStore.mockReturnValue({
      snackbar: { open: false, message: "", severity: "success" },
      closeSnackbar: mockCloseSnackbar,
    } as any);

    render(<AppSnackbar />);

    const alert = screen.queryByRole("alert");
    expect(alert).not.toBeInTheDocument();
  });

  test("harus memanggil closeSnackbar saat tombol close diklik", () => {
    mockedUseUserStore.mockReturnValue({
      snackbar: { open: true, message: "Test", severity: "info" },
      closeSnackbar: mockCloseSnackbar,
    } as any);

    render(<AppSnackbar />);

    // Tombol close pada MUI Alert biasanya memiliki title "Close"
    const closeButton = screen.getByTitle("Close");
    fireEvent.click(closeButton);

    expect(mockCloseSnackbar).toHaveBeenCalledTimes(1);
  });

  test("harus menyesuaikan posisi (anchorOrigin) pada tampilan Mobile", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    mockedUseUserStore.mockReturnValue({
      snackbar: { open: true, message: "Mobile View", severity: "success" },
      closeSnackbar: mockCloseSnackbar,
    } as any);

    const { container } = render(<AppSnackbar />);

    expect(useMediaQuery).toHaveBeenCalledWith("(max-width:768px)");
  });
});
