import StudentForm from "@/components/forms/StudentForm";
import { api } from "@/trpc/server";
import React from "react";

const AddStudentPage = async () => {
  const departments = await api.department.getDepartments.query();
  const requiredDepartments = departments.map((department) => {
    return {
      label: department.branch,
      value: department.branch,
    };
  });

  const years = await api.year.getYears.query();
  const requiredYears = years.map((year) => {
    return {
      label: year.year,
      value: year.year,
    };
  });

  const degrees = await api.degree.getDegrees.query();
  const requiredDegrees = degrees.map((degree) => {
    return {
      label: degree.degree,
      value: degree.degree,
    };
  });

  const colleges = await api.college.getColleges.query();
  const requiredColleges = colleges.map((college) => {
    return {
      label: college.name,
      value: college.name,
    };
  });

  return (
    <div>
      <div className="p-4">
        <p className="text-4xl text-primary font-bold">Add a student</p>
      </div>
      <StudentForm
        colleges={requiredColleges}
        degrees={requiredDegrees}
        departments={requiredDepartments}
        years={requiredYears}
      />
    </div>
  );
};

export default AddStudentPage;
