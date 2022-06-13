import { push, ref } from "firebase/database";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import logoImage from "../assets/images/LogoDark.svg";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import { AiOutlineLike } from "react-icons/ai";

type RoomProps = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomProps>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  return (
    <div className="dark:bg-slate-800 dark:text-white ">
      <header className="p-6 border-b-[1px] dark:border-slate-700">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={logoImage} alt="" className="w-24" />
          <div className="flex flex-col md:flex-row gap-2">
            <RoomCode code={roomId} />
            <button className="bg-transparent text-purple-500 border-[1px] border-purple-500 h-12 rounded-lg font-medium">
              Encerrar sala
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl md:mx-auto p-8">
        <div className="mt-8 mb-6 flex items-center gap-4 ">
          <h1 className="font-sans text-2xl">Sala {title}</h1>
          {questions.length > 0 && (
            <span className="bg-purple-600 rounded-full px-4 py-2 font-medium	text-sm">
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
              >
                <button
                  className="flex items-center gap-1"
                  type="button"
                  aria-label="marcar como gostei"
                >
                  <span>10</span>
                  <AiOutlineLike size={20} />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
