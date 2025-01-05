import { useForm } from "react-hook-form";
import styled from "styled-components";

const SkillModal = ({ onAdd, cancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    onAdd({ ...data, id: `skill_${new Date().getTime()}` });
  };

  return (
    <div>
      <h2>Add a New Skill</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>label:</label>
          <input
            type="text"
            {...register("label", { required: "Skill is required" })}
          />

          {errors.label && <span>{errors.label.message}</span>}
        </div>

        <div>
          <label>Description:</label>

          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <button type="submit">Add Skill</button>
        <button onClick={cancel} type="button">
          Cancel
        </button>
      </Form>
    </div>
  );
};

export default SkillModal;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
