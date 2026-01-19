import { render, screen, fireEvent } from "@testing-library/react";
import UserModal from "../UserModal";
import { User } from "../../models/User";

describe("UserModal", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Menampilkan kesalahan validasi saat mengirimkan formulir kosong.", async () => {
    render(<UserModal open onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Phone is required")).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("Menampilkan kesalahan ketika nomor telepon tidak valid.", async () => {
    render(<UserModal open onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "abc123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(
      await screen.findByText(
        "Phone must contain 10–15 digits and numbers only",
      ),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("Metode onSubmit dipanggil dengan data yang benar ketika formulir valid.", () => {
    render(<UserModal open onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Name" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "email@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "081234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    const submittedUser = onSubmit.mock.calls[0][0] as User;

    expect(submittedUser.name).toBe("Name");
    expect(submittedUser.email).toBe("email@gmail.com");
    expect(submittedUser.phone).toBe("081234567890");
    expect(submittedUser.id).toBeDefined();
  });

  test("memanggil onClose ketika tombol batal diklik", () => {
    render(<UserModal open onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
