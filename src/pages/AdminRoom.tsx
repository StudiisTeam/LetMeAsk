import { ref, remove, update } from "firebase/database";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import logoImage from "../assets/images/LogoDark.svg";
import trashImg from "../assets/images/delete.svg";
import checkedImage from "../assets/images/check.svg";
import answersImage from "../assets/images/answer.svg";

import Question from "../components/Question";
import RoomCode from "../components/RoomCode";

import { useRoom } from "../hooks/useRoom";

import { database } from "../services/firebase";

type RoomProps = {
  id: string;
};

export function AdminRoom() {
  const navigate = useNavigate();
  const params = useParams<RoomProps>();
  const roomId = params.id;

  const { questions, title, closedAt } = useRoom(roomId);

  useEffect(() => {
    if (closedAt) {
      navigate("/");
    }
  }, [closedAt]);

  function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Deseja mesmo excluir a pergunta?")) {
      remove(ref(database, `/rooms/${roomId}/questions/${questionId}`));
    }
  }

  function handleHighlightQuestions(questionId: string) {
    update(ref(database, `/rooms/${roomId}/questions/${questionId}`), {
      isHighlighted: true,
    });
  }

  function handleCheckQuestionAsAnswerd(questionId: string) {
    update(ref(database, `/rooms/${roomId}/questions/${questionId}`), {
      isAnswered: true,
    });
  }

  function handleCloseRoom() {
    update(ref(database, `/rooms/${roomId}`), {
      closedAt: new Date(),
    });
    navigate("/");
  }

  return (
    <div className="dark:bg-slate-800 dark:text-white ">
      <header className="p-6 border-b-[1px] dark:border-slate-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4  justify-between items-center">
          <img src={logoImage} alt="" className="w-24" />
          <div className="flex flex-col md:flex-row gap-2">
            <RoomCode code={roomId || ""} />
            <button
              onClick={handleCloseRoom}
              className="bg-transparent text-purple-500 border-[1px] border-purple-500 md:px-4 h-11 rounded-lg font-medium"
            >
              Encerrar sala
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl md:mx-auto p-8">
        <div className="mt-8 mb-6 flex items-center gap-4 ">
          <h1 className="font-sans text-2xl">Sala {title}</h1>
          {questions.length > 0 && (
            <span className="bg-purple-600 rounded-full px-4 py-2 font-medium text-center	text-sm">
              {questions.length} pergunta(s)
            </span>
          )}
        </div>

        <div className="flex  flex-col gap-4 mt-8 ">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswerd(question.id)}
                    >
                      <img src={checkedImage} alt="" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestions(question.id)}
                    >
                      <img src={answersImage} alt="" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={trashImg} alt="" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
