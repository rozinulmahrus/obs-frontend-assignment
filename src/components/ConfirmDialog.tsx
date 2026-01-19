// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";

// interface Props {
//   open: boolean;
//   title: string;
//   description: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// }

// export default function ConfirmDialog({
//   open,
//   title,
//   description,
//   onConfirm,
//   onCancel,
// }: Props) {
//   return (
//     <Dialog open={open} onClose={onCancel}>
//       <DialogTitle>{title}</DialogTitle>
//       <DialogContent>{description}</DialogContent>
//       <DialogActions>
//         <Button onClick={onCancel}>Cancel</Button>
//         <Button color="error" variant="contained" onClick={onConfirm}>
//           Delete
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({ open, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete this user?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
