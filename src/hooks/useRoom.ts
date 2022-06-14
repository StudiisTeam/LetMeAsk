import { onValue, ref, off } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionsProps = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number,
  likeId: string | undefined
};

type FirebaseQuestions = Record<
  string,
  {
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<string, {
      authorId: string;
    }>
  }
>;

export function useRoom(roomId: string | undefined) {
  const { user } = useAuth()
  const [title, setTitle] = useState("");
  const [closedAt, setClosedAt] = useState(null);
  const [questions, setQuestions] = useState<QuestionsProps[]>([]);


  useEffect(() => {
    onValue(ref(database, `/rooms/${roomId}`), (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          };
        }
      );
      if (databaseRoom.closedAt) {
        setClosedAt(databaseRoom.closedAt)
      }
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
    return () => {
      off(ref(database, `/rooms/${roomId}`))
    }
  }, [roomId, user?.id]);

  return { questions, title, closedAt }
}