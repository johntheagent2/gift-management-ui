import React, { useState } from "react";
import * as yup from "yup";
import { authenticate, selectAuth } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import {
  selectLoading,
  removeLoading,
  addLoading,
} from "../../../redux/slices/loadingSlice";
import FormField from "../../common/FormField";
import errorHandler from "../../../utils/errorHandler";

export const LoginForm = () => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter the right email format"
      )
      .required("Please enter your email"),
    password: yup
      .string()
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,16}$/,
      //   "Minimum eight characters, at least one letter and one number"
      // )
      .required("Please enter your password"),
  });

  const loading = useSelector(selectLoading); // Get loading state from the Redux store
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isRedirectLogin, setRedirectLogin] = useState(false);
  const isLogin = useSelector(selectAuth).isLogin;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    dispatch(addLoading());
    try {
      const action = await dispatch(authenticate({ body: data }));
      if (action.payload.message != null) {
        const message = errorHandler(action.payload.message);
        setModalContent(message);
        setRedirectLogin(false);
      } else {
        setRedirectLogin(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setModalContent(`Server is under maintenance`);
      setRedirectLogin(false);
    } finally {
      dispatch(removeLoading());
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div className="form-container">
      <div className="wrapper">
        <h2>Login</h2>
        <Spin spinning={loading} />
        {!loading && (
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <FormField
              name="email"
              label="Email"
              control={control}
              errors={errors}
            />
            <FormField
              name="password"
              label="Password"
              control={control}
              errors={errors}
            />
            <Form.Item className="register-or">
              <Button
                classNames="submit"
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Login
              </Button>
              <p style={{ textAlign: "center" }}>
                Or <a onClick={() => navigate("/register")}>Register</a>
              </p>
            </Form.Item>
          </Form>
        )}
      </div>
      <Modal
        title="Login Status"
        open={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {modalContent}
      </Modal>
    </div>
  );
};
