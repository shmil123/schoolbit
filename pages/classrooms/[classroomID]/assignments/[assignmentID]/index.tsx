import { useRouter } from "next/router";
import Head from "next/head";
import Title from "../../../../../components/general/Title";
import Question from "../../../../../components/assignment/Question";
import { useEffect, useState } from "react";
import AssignmentHeader from "../../../../../components/assignment/AssignmentHeader";
import ToggleCodeViewButton from "../../../../../components/assignment/CodeViewButton";
import CodeEditor from "../../../../../components/general/CodeEditor";
import SubmitButton from "../../../../../components/assignment/SubmitButton";
import useAppContext from "../../../../../hooks/useAppContext";
import Header from "../../../../../components/general/Header";
import Sidebar from "../../../../../components/general/Sidebar";
import EmptyArea from "../../../../../components/general/EmptyArea";
import Information from "../../../../../components/general/Information";
import TeacherSidebar from "../../../../../components/general/TeacherSidebar";
import StudentSidebar from "../../../../../components/general/StudentSidebar";
import AssignmentStudentSidebar from "../../../../../components/assignment/AssignmentStudentSidebar";

const AssignmentPage: React.FC = () => {
  const { user, classroom, getClassroom } = useAppContext();

  const [isCodeView, setIsCodeView] = useState(false);
  const [code, setCode] = useState("");

  const router = useRouter();
  const { classroomID, assignmentID } = router.query as {
    classroomID: string;
    assignmentID: string;
  };

  useEffect(() => {
    getClassroom(classroomID);
  }, [getClassroom, classroomID]);

  const toggleCodeView = () =>
    setIsCodeView((previousCodeView) => !previousCodeView);

  const closeCodeView = () => setIsCodeView(false);

  const changeCode = (newCode: string) => setCode(newCode);

  const assignment = classroom?.assignments.find(
    (currentAssignment) => currentAssignment.id === assignmentID
  );

  if (!classroom)
    return (
      <>
        <Head>
          <title>Classroom Not Found | SchoolBit</title>
        </Head>

        <Header title="Classroom Not Found" />

        <Sidebar />

        <EmptyArea>
          <Information
            primary="This classroom couldn't be accessed"
            secondary="Check with your teacher if you were accepted into the classroom"
          />
        </EmptyArea>
      </>
    );

  if (!assignment)
    return (
      <>
        <Head>
          <title>Assignment Not Found | SchoolBit</title>
        </Head>

        <Header title="Assignment Not Found" />

        {user?.uid === classroom.ownerID ? (
          <TeacherSidebar />
        ) : (
          <StudentSidebar />
        )}

        <EmptyArea>
          <Information
            primary="This assignment doesn't exist"
            secondary="Make sure you didn't change anything in the link"
          />
        </EmptyArea>
      </>
    );

  const didStudentSubmit = assignment.answers.some(
    (answer) => user?.uid === answer.senderID
  );

  return (
    <>
      <Head>
        <title>{assignment.name} | SchoolBit</title>
      </Head>

      <Header title={assignment.name} />

      {user?.uid === classroom.ownerID ? (
        <TeacherSidebar />
      ) : (
        <>
          {didStudentSubmit ? (
            <StudentSidebar />
          ) : (
            <AssignmentStudentSidebar
              isCodeView={isCodeView}
              toggleCodeView={toggleCodeView}
              closeCodeView={closeCodeView}
              code={code}
            />
          )}
        </>
      )}

      <EmptyArea>
        {isCodeView ? (
          <CodeEditor
            code={code}
            height="calc(100vh - 100px - 20px - 20px)"
            width="100%"
            changeCode={changeCode}
          />
        ) : (
          <>
            <AssignmentHeader />

            <Question question={assignment.question} />
          </>
        )}
      </EmptyArea>
    </>
  );
};

export default AssignmentPage;
