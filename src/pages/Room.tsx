import { push, ref, remove } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import logoImage from "../assets/images/LogoDark.svg";
import emptyQuestions from "../assets/images/empty-questions.svg";

import Button from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";

import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

import { database } from "../services/firebase";

type RoomProps = {
  id: string;
};

export function Room() {
  const params = useParams<RoomProps>();
  const navigate = useNavigate();
  const roomId = params.id;
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");

  const { questions, title, closedAt } = useRoom(roomId);

  useEffect(() => {
    if (closedAt) {
      navigate("/");
    }
  }, [closedAt]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    push(ref(database, `/rooms/${roomId}/questions`), question);
    setNewQuestion("");
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      remove(
        ref(
          database,
          `/rooms/${roomId}/questions/${questionId}/likes/${likeId}`
        )
      );
    } else {
      push(ref(database, `/rooms/${roomId}/questions/${questionId}/likes`), {
        authorId: user?.id,
      });
    }
  }
  console.log(questions.length);

  return (
    <div className="dark:bg-slate-800 bg-slate-50 dark:text-white ">
      <header className="p-6 border-b-[1px] border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4  justify-between items-center">
          <img src={logoImage} alt="" className="w-24" />
          <RoomCode code={roomId || ""} />
        </div>
      </header>

      <main className="max-w-4xl md:mx-auto p-8">
        <div className="mt-8 mb-6 flex items-center gap-4 ">
          <h1 className="font-sans font-semibold text-2xl">Sala {title}</h1>
          {questions.length > 0 && (
            <span className="bg-purple-600 text-white  rounded-full px-4 py-2 font-medium	text-sm">
              {questions.length} pergunta(s)
            </span>
          )}
        </div>

        <form className="" onSubmit={handleSendQuestion}>
          <textarea
            name=""
            id=""
            placeholder="O que voce quer pergunta?"
            className="w-full border-0 p-4 rounded-lg dark:bg-slate-900 shadow-lg resize-y min-h-[130px]"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />
          <div className="flex justify-between items-center mt-4">
            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-full w-8"
                />
                <span className="text-slate-400 font-medium text-sm">
                  {user.name}
                </span>
              </div>
            ) : (
              <span className="text-sm flex md:gap-2 flex-col md:flex-row items-start text-slate-400 font-medium ">
                para enviar uma pergunta{" "}
                <button className="text-purple-600 underline text-sm font-medium">
                  Faca seu login
                </button>
              </span>
            )}
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>

        <div className="flex flex-col gap-4 mt-8 ">
          {questions.length != 0 ? (
            questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <button
                      className={
                        question.likeId
                          ? "flex items-center gap-1 bg-purple-500 h-9 px-2 rounded-full"
                          : "flex items-center gap-1 h-9 px-2 rounded-full"
                      }
                      type="button"
                      aria-label="marcar como gostei"
                      onClick={() =>
                        handleLikeQuestion(question.id, question.likeId)
                      }
                    >
                      {question.likeCount > 0 && (
                        <span>{question.likeCount}</span>
                      )}
                      <AiOutlineLike size={23} />
                    </button>
                  )}
                </Question>
              );
            })
          ) : (
            <div className="flex mt-8 gap-6 flex-col items-center justify-center">
              <img src={emptyQuestions} alt="" className="max-w-lg" />
              <div className="flex gap-1 flex-col items-center justify-center">
                <h1 className="text-2xl text-slate-500 font-medium">
                  Nenhuma pergunta por aqui...
                </h1>
                <span className="text-lg text-slate-400 text-center">
                  Envie o código desta sala para seus amigos e comece a
                  responder perguntas!
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
