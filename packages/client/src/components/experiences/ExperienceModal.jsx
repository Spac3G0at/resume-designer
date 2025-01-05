import { useForm } from "react-hook-form";
import styled from "styled-components";

const ExperienceModal = ({ onAdd, cancel }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const item = {
      id: `exp_${new Date().getTime()}`,
      company: data.company,
      title: data.title,
      location: data.location,
      from: new Date(data.from),
      to: data.to ? new Date(data.to) : null,
      description: data.description,
    };
    onAdd(item);
  };

  const fromDate = watch("from");

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          {...register("title", { required: "Title is required." })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <label htmlFor="company">Company:</label>
        <input
          id="company"
          {...register("company", { required: "Company is required." })}
        />
        {errors.company && (
          <ErrorMessage>{errors.company.message}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <label htmlFor="location">Location:</label>
        <input id="location" {...register("location")} />
      </FormGroup>

      <FormGroup>
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="date"
          {...register("from", { required: "Start date is required." })}
        />
        {errors.from && <ErrorMessage>{errors.from.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="to">To:</label>
        <input
          id="to"
          type="date"
          {...register("to", {
            validate: (value) =>
              !value ||
              new Date(value) >= new Date(fromDate) ||
              "End date must be after the start date.",
          })}
        />
        {errors.to && <ErrorMessage>{errors.to.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="description">Description:</label>
        <textarea id="description" {...register("description")} />
      </FormGroup>

      <BtnContainer>
        <ButtonGroup>
          <ConfirmButton type="submit">Submit</ConfirmButton>
          <CancelButton type="button" onClick={cancel}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </BtnContainer>
    </Form>
  );
};

export default ExperienceModal;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  label {
    font-weight: bold;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 300px;
`;

const ConfirmButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100px;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #c80404;
  border: 1px solid #c80404;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
  width: 100px;
`;

const ErrorMessage = styled.small`
  color: red;
`;
