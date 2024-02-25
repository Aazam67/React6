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
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  age: z
    .number({ invalid_type_error: "age field is required." })
    .min(18, { message: "Age must be at least 18." }),
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
  } = useForm<FormData>({ resolver: zodResolver(schema) });
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
          {...register("name")}
          // ref={nameRef}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
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
          {...register("age", { valueAsNumber: true })}
          //ref={ageRef}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button disabled={!isValid} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
