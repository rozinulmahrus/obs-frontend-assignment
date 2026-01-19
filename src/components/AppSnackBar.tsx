// import { Snackbar, Alert } from "@mui/material";

// interface Props {
//   open: boolean;
//   handleClose: () => void;
// }

// export default function SnackBar({ open, handleClose }: Props) {
//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={1500}
//       onClose={handleClose}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//     >
//       <Alert
//         onClose={handleClose}
//         severity="success"
//         variant="filled"
//         sx={{ width: "100%" }}
//       >
//         This is a success Alert inside a Snackbar!
//       </Alert>
//     </Snackbar>
//   );
// }

import { Snackbar, Alert, useMediaQuery } from "@mui/material";
import { useUserStore } from "../store/useUserStore";

export default function AppSnackbar() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { snackbar, closeSnackbar } = useUserStore();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={closeSnackbar}
      anchorOrigin={
        isMobile
          ? { vertical: "bottom", horizontal: "center" }
          : { vertical: "top", horizontal: "right" }
      }
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={
          isMobile
            ? { bottom: { xs: 90, sm: 0 }, mb: 10, width: "100%" }
            : { width: "100%" }
        }
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
