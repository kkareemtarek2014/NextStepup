import { forwardRef } from "react";
import { FormikTouched, FormikErrors } from "formik";

interface InputProps {
  config: any;
  className?: string;
  error?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  isTouched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ config, isTouched, error, className }, ref) => {
    const errorMessage =
      typeof error === "string" ? error : error ? "Invalid input" : "";

    return (
      <div className="w-full">
        <input
          {...config}
          ref={ref}
          className={`form-field focus:border transition-all h-full !text-black placeholder:text-black appearance-none px-3 lg:px-4 font-normal lg:font-semimedium py-[14px] lg:py-[15px] w-full focus-within:!border-white focus-within:border-2 peer-checked:hidden ${
            className ? className : ""
          } !border-borderColor ${
            isTouched && error ? "border !border-[#A8200D]" : ""
          }`}
        />
        {isTouched && error && (
          <p className="text-[#A8200D] text-sm pt-2">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default Input;
