import styled from "styled-components";
import ModalPortal from "./ModalPortal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";

const defaultValues = {
  name: "",
  title: "",
};

const NewResumeButton = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const openModal = () => setOpen(true);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("resume", data);
      navigate(`/cv-editor/${res.data.resume._id}`);
    } catch (err) {
      console.error(err);
    } finally {
      close();
    }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [open, reset]);

  return (
    <>
      <Button onClick={openModal}>NEW RESUME</Button>
      <ModalPortal isOpen={open} onClose={close}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Give your resume a name
            <input {...register("name", { required: true })} />
          </label>
          <label>
            Position sought or sector of activity
            <input {...register("title", { required: true })} />
          </label>
          <div>
            <button type="submit">Create</button>
          </div>
        </Form>
      </ModalPortal>
    </>
  );
};

export default NewResumeButton;

const Button = styled.button`
  background: #ed2553;
  font-size: 14px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    display: flex;
    flex-direction: column;
  }
  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  div {
    text-align: center;
  }
  button {
    background: #ed2553;
    color: white;
    padding: 8px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
`;
