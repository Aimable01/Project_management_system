//  define the roles
enum Roles {
  ADMIN = "admin",
  WORKER = "worker",
}

//  admin model
interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Roles;
}

//   project model
interface project {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

//  task model
interface Task {
  id: number;
  title: string;
  deadline: Date;
  project_id: number;
}

//  worker model
interface Worker {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  task_id: number;
}
