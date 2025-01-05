import { useForm } from "react-hook-form";
import styled from "styled-components";

const SkillModal = ({ onAdd, cancel, skill }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: skill?.label || "",
      description: skill?.description || "",
    },
  });

  const onSubmit = (data) => {
    onAdd({ ...data, id: `skill_${new Date().getTime()}` });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Add a New Skill</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="item">
          <label>label:</label>
          <input
            type="text"
            {...register("label", { required: "Skill is required" })}
          />

          {errors.label && <span>{errors.label.message}</span>}
        </div>

        <div className="item">
          <label>Description:</label>

          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <BtnCtn>
          <Button type="submit">SUBMIT</Button>
          <Button $outlined onClick={cancel} type="button">
            CANCEL
          </Button>
        </BtnCtn>
      </Form>
    </div>
  );
};

export default SkillModal;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 550px;
  div.item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const BtnCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  background: ${({ $outlined }) => ($outlined ? "none" : "#ed2553")};
  color: ${({ $outlined }) => ($outlined ? "#ed2553" : "white")};
  padding: 8px 16px;
  font-size: 14px;
  border: 2px solid #ed2553;
`;
