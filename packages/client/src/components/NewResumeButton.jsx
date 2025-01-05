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
          <h3>Create a new resume</h3>
          <label>
            Give your resume a name
            <input
              placeholder="ex: Search for permanent position, internship, target company"
              {...register("name", { required: true })}
            />
          </label>
          <label>
            Position sought or sector of activity
            <input
              placeholder="ex: Web developer, Product manager"
              {...register("title", { required: true })}
            />
          </label>
          <ModalButtonsGroup>
            <Button type="submit">CREATE</Button>
            <Button $outlined type="button" onClick={close}>
              CANCEL
            </Button>
          </ModalButtonsGroup>
        </Form>
      </ModalPortal>
    </>
  );
};

export default NewResumeButton;

const Button = styled.button`
  background: ${({ $outlined }) => ($outlined ? "none" : "#ed2553")};
  color: ${({ $outlined }) => ($outlined ? "#ed2553" : "white")};
  padding: 8px 16px;
  font-size: 14px;
  border: 2px solid #ed2553;
`;

const ModalButtonsGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 550px;
  h3 {
    text-align: center;
    margin: 0.5rem;
  }
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
`;
