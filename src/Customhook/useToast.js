import { toast } from "react-toastify";
const useToast = () => {
  const success = (msg) => {
    toast.success(msg, {
      style: {
        width: "200px",
        fontSize: "12px",
        float: "right",
        marginTop: "50px",
      },
    });
  };

  const error = (msg) => {
    toast.error(msg, {
      style: {
        width: "200px",
        fontSize: "12px",
        float: "right",
        marginTop: "50px",
      },
    });
  };

  return {
    error,
    success,
  };
};

export default useToast;
