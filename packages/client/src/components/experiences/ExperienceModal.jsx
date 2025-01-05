import { useForm } from "react-hook-form";
import styled from "styled-components";

const ExperienceModal = ({ onAdd, cancel, experience }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: experience?.title || "",
      company: experience?.company || "",
      location: experience?.location || "",
      from: experience?.from
        ? new Date(experience.from).toISOString().split("T")[0]
        : "",
      to: experience?.to
        ? new Date(experience.to).toISOString().split("T")[0]
        : "",
      description: experience?.description || "",
    },
  });

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
        <h3 style={{ textAlign: "center" }}>Add</h3>
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
          <Button type="submit">SUBMIT</Button>
          <Button $outlined type="button" onClick={cancel}>
            CANCEL
          </Button>
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
const Button = styled.button`
  background: ${({ $outlined }) => ($outlined ? "none" : "#ed2553")};
  color: ${({ $outlined }) => ($outlined ? "#ed2553" : "white")};
  padding: 8px 16px;
  font-size: 14px;
  border: 2px solid #ed2553;
`;

const ErrorMessage = styled.small`
  color: red;
`;
