import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: (() => {
    try {
      return JSON.parse(localStorage.getItem("pastes")) || [];
    } catch {
      return [];
    }
  })(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      if (!paste || !paste.id) {
        console.error("Invalid payload for addToPaste");
        toast.error("Failed to create paste");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      } else {
        console.warn("Paste not found for update");
        toast.error("Failed to update paste");
      }
    },
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes reset successfully");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item.id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted successfully");
      } else {
        console.warn("Paste not found for deletion");
        toast.error("Failed to delete paste");
      }
    },
  },
});

// Action creators
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
