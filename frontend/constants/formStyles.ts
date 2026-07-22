import { StyleSheet } from "react-native";
import { Colors } from "./theme";

export const formStyles = StyleSheet.create({
  form: {
    flexDirection: "column",
    gap: 10,
    backgroundColor: Colors.white,
    padding: 30,
    width: "100%",
    maxWidth: 450,
    borderRadius: 20,
  },
  flexColumn: {
    flexDirection: "column",
  },
  label: {
    color: Colors.dark,
    fontWeight: "600",
  },
  inputForm: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  input: {
    marginLeft: 10,
    borderRadius: 10,
    width: "85%",
    height: "100%",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  span: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: Colors.dark,
    borderRadius: 10,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "500",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  errorText: {
    color: Colors.error,
    fontSize: 13,
    textAlign: "center",
  },
  p: {
    textAlign: "center",
    color: "black",
    fontSize: 14,
    marginVertical: 5,
  },
  btn: {
    marginTop: 10,
    width: "48%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ededef",
    backgroundColor: Colors.white,
  },
  btnText: {
    fontWeight: "500",
  },
});
