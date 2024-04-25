import React from "react";
import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

const FormField = ({ name, label, control, errors }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item
          label={label}
          hasFeedback
          validateStatus={errors[name] ? "error" : ""}
          help={errors[name] && errors[name].message}
        >
          {name === "password" ? (
            <Input.Password {...field} />
          ) : (
            <Input {...field} />
          )}
        </Form.Item>
      )}
    />
  );
};

export default FormField;
