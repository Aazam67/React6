import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//bejaye interface az type estefade mikonim
/*interface FormData {
  name: string;
  age: number;
}*/
//az in
const schema = z.object({
  name: z.string().min(3),
  age: z.number().min(18),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  //const nameRef = useRef<HTMLInputElement>(null);
  //const ageRef = useRef<HTMLInputElement>(null);
  //const person = { name: "", age: 0 };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();
  const onSubmit = (data: FieldValues) => console.log(data);
  // console.log(register("name"));

  //dige be in state ehtiyajo nist vagti hook-form hast
  /*const [person, setPerson] = useState({
    name: "",
    age: 0,
  });*/
  //in function ham dige lazem nist
  /*const HandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // if (nameRef.current !== null) person.name = nameRef.current.value;
    // if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
    console.log(person);
  };*/

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          //  onChange={(event) =>
          //    setPerson({ ...person, name: event.target.value })
          //  }
          //be jaye balaiha iz code zir estefade mikonim
          {...register("name", { required: true, minLength: 3, maxLength: 30 })}
          // ref={nameRef}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name?.type === "required" && (
          <p className="text-danger">The name field is required.</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">The name must be at least 3 characters.</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          //  onChange={(event) =>
          //   setPerson({ ...person, age: parseInt(event.target.value) })
          // }
          //inja ham hamintor
          {...register("age")}
          //ref={ageRef}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button disabled={!isValid} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
