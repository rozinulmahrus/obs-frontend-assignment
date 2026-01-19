import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmDialog from "../ConfirmDialog";

describe("ConfirmDialog Component", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("harus merender dialog dengan judul yang benar saat open adalah true", () => {
    render(<ConfirmDialog {...defaultProps} />);

    // Mengecek apakah judul muncul
    expect(screen.getByText(/Delete this user\?/i)).toBeInTheDocument();
    // Mengecek apakah tombol-tombol muncul
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  test("tidak boleh menampilkan dialog saat open adalah false", () => {
    render(<ConfirmDialog {...defaultProps} open={false} />);

    // Dialog MUI biasanya menghapus konten dari DOM atau menyembunyikannya
    const title = screen.queryByText(/Delete this user\?/i);
    expect(title).not.toBeInTheDocument();
  });

  test("harus memanggil onClose saat tombol Cancel diklik", () => {
    render(<ConfirmDialog {...defaultProps} />);

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("harus memanggil onConfirm saat tombol Delete diklik", () => {
    render(<ConfirmDialog {...defaultProps} />);

    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteBtn);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test("tombol Delete harus memiliki warna error (merah)", () => {
    render(<ConfirmDialog {...defaultProps} />);

    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    // MUI mendistribusikan warna 'error' melalui class CSS
    expect(deleteBtn).toHaveClass("MuiButton-colorError");
  });
});
