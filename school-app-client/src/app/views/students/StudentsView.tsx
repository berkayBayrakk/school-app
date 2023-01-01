import StudentCreate from "./StudentCreate";
import StudentForm from "./StudentForm";
import StudentsList from "./StudentsList";

export default function StudentsView() {
  return (
    <div style={{ display: "flex" ,justifyContent:'space-around'}}>
      <StudentsList />
      <StudentForm />
    </div>
  );
}
